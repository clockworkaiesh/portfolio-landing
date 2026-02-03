"use client";
import { useRef, useEffect } from "react";

export default function GlowCursor() {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    let isVisible = true;

    const updatePosition = () => {
      if (el) {
        el.style.setProperty('--mouse-x', `${posRef.current.x}px`);
        el.style.setProperty('--mouse-y', `${posRef.current.y}px`);
      }
    };

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          updatePosition();
          rafRef.current = null;
        });
      }
      if (!isVisible) {
        el.style.opacity = "1";
        isVisible = true;
      }
    };

    const onLeave = () => {
      el.style.opacity = "0";
      isVisible = false;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" style={{ opacity: 0 }} aria-hidden="true" />;
}
