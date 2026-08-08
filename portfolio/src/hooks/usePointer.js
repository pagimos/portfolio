import { useEffect, useRef } from "react";

/**
 * Window-wide pointer in normalised device coords, kept in a ref so moving
 * the mouse never triggers a React render. The 3D scene reads it inside
 * useFrame.
 */
export default function usePointer() {
  const pointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
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
