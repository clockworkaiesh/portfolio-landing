"use client";
import { useRef, useEffect } from "react";

export default function GlowCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      el.style.background = `radial-gradient(300px at ${e.clientX}px ${e.clientY}px, rgba(79, 70, 229, 0.15), transparent)`;
      el.style.opacity = "1";
    };

    const onLeave = () => { el.style.opacity = "0"; };
    const onEnter = () => { el.style.opacity = "1"; };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" style={{ opacity: 0 }} aria-hidden="true" />;
}
