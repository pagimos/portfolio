import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------
   PAGIMOS, in 3D, drawn with text characters.

   The wordmark is real geometry, not a texture: the word is painted to
   an offscreen 2D canvas using the site's own webfont, the filled
   pixels are read back, and each one becomes an extruded cube. That
   avoids shipping a typeface JSON just to get 3D text, and the
   letterforms match the rest of the page exactly.

   The slab is then rendered by WebGL and rasterized to glyphs: scene
   luminance is sampled down to a character grid, each cell picking a
   glyph by brightness. The depth, lighting and silhouette are all
   genuine 3D; the output is plain monospace text sitting in the page.
   ------------------------------------------------------------------ */

// Sparse to dense. AsciiEffect maps luminance across this ramp in order.
const RAMP = " .:-=+*#%@";
const WORD = "PAGIMOS";
const FONT_PX = 22;

/** Paint the word, read back the filled pixels, return them plus their bounds. */
function useWordVoxels(word) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const build = async () => {
      // Without waiting, the silhouette is whatever fallback font happens to
      // be resolved at call time rather than JetBrains Mono.
      try {
        await document.fonts.load(`700 ${FONT_PX}px "JetBrains Mono"`);
        await document.fonts.ready;
      } catch {
        /* fall through to whatever monospace is available */
      }
      if (cancelled) return;

      const font = `700 ${FONT_PX}px "JetBrains Mono", ui-monospace, monospace`;
      const probe = document.createElement("canvas").getContext("2d");
      probe.font = font;
      // Tracking matters here: at ascii resolution, adjacent letters merge
      // into one blob without a clear gap between them. Ignored by browsers
      // that don't support it, which just gives tighter letters.
      probe.letterSpacing = "3px";

      const w = Math.max(8, Math.ceil(probe.measureText(word).width) + 6);
      const h = Math.ceil(FONT_PX * 1.5);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.font = font;
      ctx.letterSpacing = "3px";
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

function Wordmark({ pointer, animate, onFrame, onCount }) {
  const voxels = useWordVoxels(WORD);
  const group = useRef(null);
  const meshRef = useRef(null);
  const last = useRef(0);
  const frames = useRef(0);

  const layout = useMemo(() => {
    if (!voxels) return null;
    const { cells, minX, maxX, minY, maxY } = voxels;
    const cols = maxX - minX + 1;
    const rows = maxY - minY + 1;
    const TARGET_W = 3.5; // world units the word spans

    const sx = TARGET_W / cols;
    // Seven letters of mono sit at roughly 5.7:1, but the panel is about
    // 1.3:1. Fitting that to the width leaves the word only a few character
    // rows tall, far too few for the ascii grid to resolve letterforms. So
    // the voxels are stretched vertically: the wordmark reads as condensed
    // type and gets ~3x the rows to be drawn with.
    const sy = sx * 1.8;

    const count = cells.length / 2;
    const items = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = cells[i * 2] - minX;
      const y = cells[i * 2 + 1] - minY;
      const u = cols > 1 ? x / (cols - 1) : 0.5;

      items[i * 3] = (x - (cols - 1) / 2) * sx;
      items[i * 3 + 1] = -(y - (rows - 1) / 2) * sy;
      // Gentle cylindrical bulge. Every cube's front face shares one normal,
      // so a perfectly flat slab lights to a single tone and the ascii output
      // collapses to one repeated glyph. Curving it makes the light fall off
      // across the word and gives the letters shading.
      items[i * 3 + 2] = Math.cos((u - 0.5) * Math.PI) * sx * 1.2;
    }

    return { sx, sy, count, items };
  }, [voxels]);

  useLayoutEffect(() => {
    if (!layout || !meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < layout.count; i++) {
      dummy.position.set(
        layout.items[i * 3],
        layout.items[i * 3 + 1],
        layout.items[i * 3 + 2]
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    onCount(layout.count);
  }, [layout, onCount]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    const g = group.current;

    if (g) {
      const { x, y, active } = pointer.current;
      // Oscillate rather than spin: a wordmark that turns past 90 degrees
      // stops being readable, which defeats the point of it being the name.
      const yaw = (animate ? Math.sin(t * 0.45) * 0.22 : 0.16) + (active ? x * 0.3 : 0);
      const pitch = (animate ? Math.sin(t * 0.33) * 0.07 : 0.04) + (active ? -y * 0.2 : 0);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, yaw, 3.5, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pitch, 3.5, delta);
    }

    // Honest fps readout for the caption under the panel.
    frames.current += 1;
    if (t - last.current >= 0.5) {
      onFrame(Math.round(frames.current / (t - last.current)));
      frames.current = 0;
      last.current = t;
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

      <ambientLight intensity={0.16} />
      <directionalLight position={[2, 3, 4]} intensity={0.85} />
      {/* Close point light with falloff: this is what varies brightness
          across the letters, so the ramp gets used instead of one flat tone. */}
      <pointLight position={[0.8, 0.5, 2.4]} intensity={17} distance={10} decay={2} />

      <group ref={group}>
        {layout && (
          <instancedMesh
            // count is fixed at construction, so a new voxel set needs a new mesh
            key={layout.count}
            ref={meshRef}
            args={[undefined, undefined, layout.count]}
          >
            <boxGeometry
              args={[layout.sx * 1.06, layout.sy * 1.06, layout.sx * 7]}
            />
            <meshStandardMaterial
              color="#c2ccda"
              roughness={0.55}
              metalness={0}
            />
          </instancedMesh>
        )}
      </group>
    </>
  );
}

export default function AsciiObject({ pointer, active = true, animate = true }) {
  const [fps, setFps] = useState(0);
  const [count, setCount] = useState(0);

  const isCoarse =
    typeof window !== "undefined" &&
    !window.matchMedia("(pointer: fine)").matches;

  // Seven letters need a minimum number of cells before the shapes resolve,
  // so phones keep a fairly fine grid even though the glyphs end up small.
  const resolution = isCoarse ? 0.23 : 0.24;

  return (
    <div className="flex h-full flex-col">
      <div className="ascii-stage relative min-h-0 flex-1">
        <Canvas
          dpr={1}
          // Framed so the word spans most of the panel width without the
          // letters clipping as the slab turns.
          camera={{ position: [0, 0, 4.6], fov: 42 }}
          // preserveDrawingBuffer: AsciiEffect draws the WebGL canvas into a
          // 2D canvas to sample it, so the buffer has to survive the render
          // call. alpha:false so every sampled pixel has alpha 255 (see the
          // background note in <Wordmark>). The canvas itself is hidden by
          // the effect anyway; only the glyph overlay is visible.
          gl={{ antialias: false, preserveDrawingBuffer: true, alpha: false }}
          frameloop={animate ? (active ? "always" : "never") : "demand"}
          resize={{ scroll: false, debounce: 0 }}
          style={{ pointerEvents: "none" }}
        >
          <Wordmark
            pointer={pointer}
            animate={animate}
            onFrame={setFps}
            onCount={setCount}
          />
          {/* invert maps bright→dense, which is what a glowing-on-black
              terminal wants. It only works because the scene background is
              opaque black; see the note in <Wordmark>. */}
          <AsciiRenderer
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
