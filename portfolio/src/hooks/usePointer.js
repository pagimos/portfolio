import { useEffect, useRef } from "react";

/**
 * Window-wide pointer, kept in a ref so moving the mouse never triggers a
 * React render. The 3D scene reads it inside useFrame.
 *
 * x/y are normalised device coords across the window (-1..1); cx/cy are the
 * raw client pixels, for callers that need to map the cursor onto their own
 * element.
 */
export default function usePointer() {
  const pointer = useRef({ x: 0, y: 0, cx: 0, cy: 0, active: false });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
        cx: e.clientX,
        cy: e.clientY,
        active: true,
      };
    };
    const onLeave = () => {
      pointer.current = { ...pointer.current, active: false };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return pointer;
}
