import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------
   PAGIMOS, in 3D, drawn with text characters.

   The wordmark is real geometry, not a texture: the word is painted to
   an offscreen 2D canvas with the site's display face, the filled
   pixels are read back, and each one becomes an extruded cube. When
   the panel first comes on screen the cubes tumble in from a scattered
   cloud and lock into the word, left to right. After that the slab
   sways slowly and leans toward the cursor, and a light rides the
   cursor across the letters, wandering on its own when there is none.

   The scene is rendered by WebGL and rasterized to glyphs: luminance
   is sampled down to a character grid and each cell picks a glyph by
   brightness. Depth, lighting and silhouette are genuine 3D; the
   output is plain monospace text sitting in the page.

   It deliberately ignores prefers-reduced-motion: the owner wants the
   intro and the sway on every load, including on machines that have
   OS animations switched off.
   ------------------------------------------------------------------ */

// Sparse to dense. AsciiEffect maps luminance across this ramp in order.
const RAMP = " .:-=+*#%@";
const WORD = "PAGIMOS";

// Raster settings. The display face at a heavy weight gives the letters
// enough mass that the ascii grid can shade them instead of outlining them.
const FONT_PX = 32;
const FONT = `800 ${FONT_PX}px "Inter Tight", system-ui, sans-serif`;
// Tracking matters: at ascii resolution adjacent letters merge into one blob
// without a clear gap. Ignored by browsers that don't support it.
const TRACKING = "4px";

// Scene settings, in world units.
const WORD_W = 4; // width of the word at rest
const STRETCH = 2.3; // vertical stretch: condensed type, ~2x the ascii rows
const BULGE = 0.22; // cylindrical curve so the light falls off across the word
// Shallow extrusion: deep sides show up as extra glyph bands beside every
// stroke when the word turns, which clutters the letterforms.
const DEPTH = 0.18;
const CAM_Z = 4.8; // camera distance; the fov is fitted per panel in <Wordmark>
const INTRO_S = 1.25; // flight time of one cube, seconds

// Stable reference: a fresh literal each render would make r3f rebuild the
// camera and throw away the fitted fov.
const CAMERA = { position: [0, 0, CAM_Z], fov: 42 };
const ONE = new THREE.Vector3(1, 1, 1);
const NO_POINTER = { current: { cx: 0, cy: 0, active: false } };
const IDENTITY_Q = new THREE.Quaternion();
const easeOutQuint = (p) => 1 - Math.pow(1 - p, 5);

/** Paint the word, read back the filled pixels, return them plus their bounds. */
function useWordVoxels(word) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const build = async () => {
      // Without waiting, the silhouette is whatever fallback font happens to
      // be resolved at call time rather than the real face.
      try {
        await document.fonts.load(FONT);
        await document.fonts.ready;
      } catch {
        /* fall through to whatever sans-serif is available */
      }
      if (cancelled) return;

      const probe = document.createElement("canvas").getContext("2d");
      probe.font = FONT;
      probe.letterSpacing = TRACKING;

      const w = Math.max(8, Math.ceil(probe.measureText(word).width) + 8);
      const h = Math.ceil(FONT_PX * 1.4);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.font = FONT;
      ctx.letterSpacing = TRACKING;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.fillText(word, w / 2, h / 2);

      const px = ctx.getImageData(0, 0, w, h).data;
      const cells = [];
      let minX = w;
      let maxX = 0;
      let minY = h;
      let maxY = 0;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (px[(y * w + x) * 4 + 3] > 110) {
            cells.push(x, y);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (cancelled || cells.length === 0) return;
      setData({ cells, minX, maxX, minY, maxY });
    };

    build();
    return () => {
      cancelled = true;
    };
  }, [word]);

  return data;
}

function Wordmark({ pointer = NO_POINTER, onFrame, onCount }) {
  const voxels = useWordVoxels(WORD);
  const group = useRef(null);
  const meshRef = useRef(null);
  const lightRef = useRef(null);
  const framing = useRef({ aspect: 0, height: 0, halfW: 2, halfH: 2 });
  const introStart = useRef(-1);
  const settled = useRef(false);
  const fpsLast = useRef(0);
  const fpsFrames = useRef(0);

  // Scratch objects, allocated once.
  const tmp = useMemo(
    () => ({
      pos: new THREE.Vector3(),
      axis: new THREE.Vector3(),
      quat: new THREE.Quaternion(),
      mat: new THREE.Matrix4(),
    }),
    []
  );

  const layout = useMemo(() => {
    if (!voxels) return null;
    const { cells, minX, maxX, minY, maxY } = voxels;
    const cols = maxX - minX + 1;
    const rows = maxY - minY + 1;

    const sx = WORD_W / cols;
    // Seven letters of heavy sans sit at roughly 6.5:1, but the panel is
    // about 1.3:1. Fitting that to the width leaves the word only a few
    // character rows tall, too few for the ascii grid to resolve the
    // letterforms. So the voxels are stretched vertically: the wordmark
    // reads as condensed display type and gets ~2x the rows to be drawn with.
    const sy = sx * STRETCH;

    const count = cells.length / 2;
    const home = new Float32Array(count * 3); // resting position
    const start = new Float32Array(count * 3); // where the cube flies in from
    const axis = new Float32Array(count * 3); // tumble axis during the flight
    const meta = new Float32Array(count * 2); // [delay, tumble angle]

    for (let i = 0; i < count; i++) {
      const x = cells[i * 2] - minX;
      const y = cells[i * 2 + 1] - minY;
      const u = cols > 1 ? x / (cols - 1) : 0.5;

      const hx = (x - (cols - 1) / 2) * sx;
      const hy = -(y - (rows - 1) / 2) * sy;
      // Gentle cylindrical bulge. Every cube's front face shares one normal,
      // so a perfectly flat slab lights to a single tone and the ascii output
      // collapses to one repeated glyph. Curving it makes the light fall off
      // across the word and gives the letters shading.
      const hz = Math.cos((u - 0.5) * Math.PI) * BULGE;
      home[i * 3] = hx;
      home[i * 3 + 1] = hy;
      home[i * 3 + 2] = hz;

      // Scatter: a random direction, a couple of units out, kept in front of
      // the camera so no cube pops in from behind the viewer.
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const r = 1.6 + Math.random() * 2.6;
      start[i * 3] = hx + r * Math.sin(ph) * Math.cos(th);
      start[i * 3 + 1] = hy + r * Math.sin(ph) * Math.sin(th);
      start[i * 3 + 2] = THREE.MathUtils.clamp(hz + r * Math.cos(ph), -2.6, 2.2);

      const ax = Math.random() - 0.5;
      const ay = Math.random() - 0.5;
      const az = Math.random() - 0.5;
      const al = Math.hypot(ax, ay, az) || 1;
      axis[i * 3] = ax / al;
      axis[i * 3 + 1] = ay / al;
      axis[i * 3 + 2] = az / al;

      // Left-to-right sweep with some jitter, so the word types itself in.
      meta[i * 2] = u * 1.1 + Math.random() * 0.4;
      meta[i * 2 + 1] = 2 + Math.random() * 4;
    }

    return { sx, sy, count, home, start, axis, meta, height: rows * sy };
  }, [voxels]);

  useEffect(() => {
    if (layout) onCount(layout.count);
  }, [layout, onCount]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    // Own clock: r3f resets its clock whenever the frameloop toggles, which
    // would restart the intro every time the panel scrolls back into view.
    const now = performance.now() / 1000;

    /* ---------------------------------------------------- framing */
    // Fit the lens to the panel: the word fills ~84% of the width, or ~60% of
    // the height on wide panels, whichever binds. The camera distance stays
    // fixed and the field of view adapts, so perspective looks the same on
    // every screen instead of a landscape stage getting a fisheye close-up or
    // the word shrinking to a strip.
    const aspect = state.size.width / state.size.height;
    const f = framing.current;
    if (layout && (f.aspect !== aspect || f.height !== layout.height)) {
      const halfHFromW = WORD_W / 0.84 / 2 / aspect;
      const halfHFromH = layout.height / 0.6 / 2;
      const halfH = Math.max(halfHFromW, halfHFromH);
      const cam = state.camera;
      cam.position.z = CAM_Z;
      cam.fov = THREE.MathUtils.radToDeg(2 * Math.atan(halfH / CAM_Z));
      cam.updateProjectionMatrix();
      framing.current = { aspect, height: layout.height, halfH, halfW: halfH * aspect };
    }

    /* ---------------------------------------------------- cursor */
    // Window pointer, mapped into the stage: -1..1 across the panel, and
    // beyond it when the cursor is elsewhere on the page. Clamped so the word
    // leans toward a far-away cursor without turning edge-on.
    const { cx, cy, active } = pointer.current;
    let lx = 0;
    let ly = 0;
    if (active) {
      const rect = state.gl.domElement.getBoundingClientRect();
      lx = THREE.MathUtils.clamp(((cx - rect.left) / rect.width) * 2 - 1, -1.2, 1.2);
      ly = THREE.MathUtils.clamp(-(((cy - rect.top) / rect.height) * 2 - 1), -1.2, 1.2);
    }

    /* ---------------------------------------------------- slab */
    // A slow sway rather than a spin, plus a lean toward the cursor. Both
    // shallow: a wordmark that turns far stops being readable, which defeats
    // the point of it being the name. Damped so the cursor never jerks it.
    const g = group.current;
    if (g) {
      const yaw = Math.sin(now * 0.5) * 0.26 + (active ? lx * 0.22 : 0);
      const pitch = Math.sin(now * 0.37 + 1.2) * 0.07 + (active ? -ly * 0.14 : 0);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, yaw, 3, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pitch, 3, delta);
    }

    /* ---------------------------------------------------- light */
    // The key light sits just in front of the word and follows the cursor,
    // so the bright glyphs travel with the mouse. With no pointer it wanders
    // across the word on its own. Damped so the sweep stays smooth.
    const light = lightRef.current;
    if (light) {
      const fr = framing.current;
      const tx = active ? lx * fr.halfW : Math.cos(now * 0.45) * 1.3;
      const ty = active ? ly * fr.halfH : Math.sin(now * 0.32) * 0.6 + 0.2;
      light.position.x = THREE.MathUtils.damp(light.position.x, tx, 4, delta);
      light.position.y = THREE.MathUtils.damp(light.position.y, ty, 4, delta);
    }

    /* ---------------------------------------------------- cubes */
    // Intro: every cube flies from its scatter point to its slot, tumbling
    // on the way. Timed from the first rendered frame, so if the page loads
    // in a background tab the intro plays when the tab is first looked at.
    // Once every cube has landed the matrices are final and the loop stops
    // touching them; only the group moves after that.
    const mesh = meshRef.current;
    if (mesh && layout && !settled.current) {
      if (introStart.current < 0) introStart.current = now;
      const T = now - introStart.current;
      const { count, home, start, axis, meta } = layout;
      const { pos, quat, mat } = tmp;
      let done = true;

      for (let i = 0; i < count; i++) {
        const hx = home[i * 3];
        const hy = home[i * 3 + 1];
        const hz = home[i * 3 + 2];
        const e = easeOutQuint(
          THREE.MathUtils.clamp((T - meta[i * 2]) / INTRO_S, 0, 1)
        );

        if (e < 1) {
          done = false;
          pos.set(
            start[i * 3] + (hx - start[i * 3]) * e,
            start[i * 3 + 1] + (hy - start[i * 3 + 1]) * e,
            start[i * 3 + 2] + (hz - start[i * 3 + 2]) * e
          );
          tmp.axis.set(axis[i * 3], axis[i * 3 + 1], axis[i * 3 + 2]);
          quat.setFromAxisAngle(tmp.axis, meta[i * 2 + 1] * (1 - e));
          mat.compose(pos, quat, ONE);
        } else {
          pos.set(hx, hy, hz);
          mat.compose(pos, IDENTITY_Q, ONE);
        }
        mesh.setMatrixAt(i, mat);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (done) settled.current = true;
    }

    /* ---------------------------------------------------- fps */
    // Honest fps readout for the caption under the panel.
    fpsFrames.current += 1;
    if (now - fpsLast.current >= 0.5) {
      if (fpsLast.current > 0) {
        onFrame(Math.round(fpsFrames.current / (now - fpsLast.current)));
      }
      fpsFrames.current = 0;
      fpsLast.current = now;
    }
  });

  return (
    <>
      {/* Opaque black, not a transparent canvas. AsciiEffect forces
          brightness=1 wherever alpha is 0, which under invert lands on the
          densest glyph, so a see-through background floods the panel with
          '@'. Painting it black makes empty space read as 0 luminance and
          fall off the sparse end of the ramp. */}
      <color attach="background" args={["#000000"]} />

      {/* Enough ambient that the far end of the word, away from the point
          light, still lands on mid-ramp glyphs and stays readable. */}
      <ambientLight intensity={0.3} />
      {/* Fill from the front so the extruded sides sit a step or two darker
          than the faces instead of vanishing. */}
      <directionalLight position={[0.6, 1.2, 2.5]} intensity={0.7} />
      {/* Close point light with falloff: this is what varies brightness
          across the letters, so the ramp gets used instead of one flat tone.
          Its x/y follow the cursor in useFrame. */}
      <pointLight
        ref={lightRef}
        position={[1.3, 0.2, 1.5]}
        intensity={11}
        distance={9}
        decay={2}
      />

      <group ref={group}>
        {layout && (
          <instancedMesh
            // count is fixed at construction, so a new voxel set needs a new mesh
            key={layout.count}
            ref={meshRef}
            args={[undefined, undefined, layout.count]}
            frustumCulled={false}
          >
            <boxGeometry args={[layout.sx * 1.06, layout.sy * 1.06, DEPTH]} />
            <meshStandardMaterial color="#bfc9d6" roughness={0.5} metalness={0} />
          </instancedMesh>
        )}
      </group>
    </>
  );
}

export default function AsciiObject({ pointer, active = true }) {
  const [fps, setFps] = useState(0);
  const [count, setCount] = useState(0);

  const isCoarse =
    typeof window !== "undefined" &&
    !window.matchMedia("(pointer: fine)").matches;

  // Seven letters need a minimum number of cells before the shapes resolve,
  // so phones keep a fairly fine grid even though the glyphs end up small.
  const resolution = isCoarse ? 0.28 : 0.26;

  return (
    <div className="flex h-full flex-col">
      <div className="ascii-stage relative min-h-0 flex-1">
        <Canvas
          dpr={1}
          camera={CAMERA}
          // preserveDrawingBuffer: AsciiEffect draws the WebGL canvas into a
          // 2D canvas to sample it, so the buffer has to survive the render
          // call. alpha:false so every sampled pixel has alpha 255 (see the
          // background note in <Wordmark>). The canvas itself is hidden by
          // the effect anyway; only the glyph overlay is visible.
          gl={{ antialias: false, preserveDrawingBuffer: true, alpha: false }}
          // Runs whenever the panel is on screen, pauses when scrolled away.
          frameloop={active ? "always" : "never"}
          resize={{ scroll: false, debounce: 0 }}
          style={{ pointerEvents: "none" }}
        >
          <Wordmark pointer={pointer} onFrame={setFps} onCount={setCount} />
          {/* invert maps bright→dense, which is what a glowing-on-black
              terminal wants. It only works because the scene background is
              opaque black; see the note in <Wordmark>.
              Keyed on resolution: drei rebuilds the effect when it changes but
              only styles the first one, so a resolution swap (a mouse docked
              to a tablet, say) would otherwise lose the green. */}
          <AsciiRenderer
            key={resolution}
            fgColor="#4ADE80"
            bgColor="transparent"
            characters={RAMP}
            resolution={resolution}
            invert
          />
        </Canvas>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line px-4 py-2 text-[11px] text-comment">
        <span>
          &quot;{WORD}&quot; → <span className="text-acid">{count || "…"}</span>{" "}
          cubes → ascii
        </span>
        <span className="flex items-center gap-3">
          <span>
            ramp <span className="text-acid">{RAMP.length}</span>
          </span>
          <span>
            <span className="text-acid">{fps || "--"}</span> fps
          </span>
        </span>
      </div>
    </div>
  );
}
