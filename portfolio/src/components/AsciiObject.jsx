import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------
   ASCII renderer.

   A real WebGL torus knot is rendered every frame, then rasterized to
   text glyphs: the scene's luminance is sampled down to a character
   grid and each cell picks a glyph by brightness. So the depth, the
   lighting and the silhouette are all genuine 3D, and the output is
   plain monospace text sitting in the page.

   The knot is lit hard from one side on purpose. ASCII output only has
   ~10 brightness steps, so a soft even light collapses into a single
   flat character and the form disappears.
   ------------------------------------------------------------------ */

// Sparse to dense. AsciiEffect maps luminance across this ramp in order.
const RAMP = " .:-=+*#%@";

function Knot({ pointer, animate, onFrame }) {
  const mesh = useRef(null);
  const last = useRef(0);
  const frames = useRef(0);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const m = mesh.current;
    if (!m) return;

    const { x, y, active } = pointer.current;

    if (animate) {
      m.rotation.y += delta * 0.42;
      m.rotation.z += delta * 0.11;
    }
    // Cursor tips the knot toward you rather than spinning it, so the
    // silhouette keeps reading while it responds.
    m.rotation.x = THREE.MathUtils.damp(
      m.rotation.x,
      active ? -y * 0.55 : 0.22,
      3,
      delta
    );
    m.position.x = THREE.MathUtils.damp(m.position.x, active ? x * 0.18 : 0, 3, delta);

    // Honest fps readout for the caption under the panel.
    frames.current += 1;
    const now = state.clock.elapsedTime;
    if (now - last.current >= 0.5) {
      onFrame(Math.round(frames.current / (now - last.current)));
      frames.current = 0;
      last.current = now;
    }
  });

  return (
    <>
      {/* Opaque black, not a transparent canvas. AsciiEffect forces
          brightness=1 wherever alpha is 0, which under invert lands on the
          *densest* glyph, so a see-through background floods the panel with
          '@'. Painting the background black instead makes it read as 0
          luminance and fall off the sparse end of the ramp. */}
      <color attach="background" args={["#000000"]} />

      {/* Only ~10 luminance steps exist. Keep the key well short of blowing
          out or the whole knot saturates to a solid '@' slab, and keep some
          ambient so the shadow side lands on mid glyphs rather than blank. */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 3, 2]} intensity={2.7} />
      <directionalLight position={[-4, -1, -2]} intensity={0.5} />
      {/* scale keeps the knot at roughly 80% of frame height, so it reads big
          without ever clipping the panel edges as it turns */}
      <mesh ref={mesh} rotation={[0.22, 0, 0]} scale={0.92}>
        <torusKnotGeometry args={[1, 0.34, 180, 32]} />
        <meshStandardMaterial color="#aab4c2" roughness={0.6} metalness={0} />
      </mesh>
    </>
  );
}

export default function AsciiObject({ pointer, active = true, animate = true }) {
  const [fps, setFps] = useState(0);
  const isCoarse =
    typeof window !== "undefined" &&
    !window.matchMedia("(pointer: fine)").matches;

  // Coarser grid on phones: fewer cells means fewer glyphs to lay out, and
  // the characters stay legible at small physical sizes.
  const resolution = isCoarse ? 0.14 : 0.2;

  const stats = useMemo(
    () => ({ chars: RAMP.length, res: resolution }),
    [resolution]
  );

  return (
    <div className="flex h-full flex-col">
      <div className="ascii-stage relative min-h-0 flex-1">
        <Canvas
          dpr={1}
          // Far enough back that the knot never touches the panel edges. The
          // stage is portrait, so horizontal framing is the tight axis and the
          // silhouette is the only thing carrying the shape at this glyph count.
          camera={{ position: [0, 0, 5.5], fov: 42 }}
          // preserveDrawingBuffer: AsciiEffect draws the WebGL canvas into a
          // 2D canvas to sample it, so the buffer has to survive the render
          // call. alpha:false so every sampled pixel has alpha 255 (see the
          // background note in <Knot>). The canvas itself is hidden by the
          // effect anyway; only the glyph overlay is visible.
          gl={{ antialias: false, preserveDrawingBuffer: true, alpha: false }}
          frameloop={animate ? (active ? "always" : "never") : "demand"}
          resize={{ scroll: false, debounce: 0 }}
          style={{ pointerEvents: "none" }}
        >
          <Knot pointer={pointer} animate={animate} onFrame={setFps} />
          {/* invert maps bright→dense, which is what a glowing-on-black
              terminal wants. It only works because the scene background is
              opaque black; see the note in <Knot>. */}
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
          torusKnot(<span className="text-orange">1</span>,{" "}
          <span className="text-orange">0.34</span>) → ascii
        </span>
        <span className="flex items-center gap-3">
          <span>
            ramp <span className="text-acid">{stats.chars}</span>
          </span>
          <span>
            res <span className="text-acid">{stats.res}</span>
          </span>
          <span>
            <span className="text-acid">{fps || "--"}</span> fps
          </span>
        </span>
      </div>
    </div>
  );
}
