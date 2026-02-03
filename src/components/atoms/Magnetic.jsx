"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function Magnetic({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const smoothX = useSpring(x, { stiffness: 200, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 15 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const updateRect = () => {
      if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
    };
    
    updateRect();
    const resizeObserver = new ResizeObserver(updateRect);
    if (ref.current) resizeObserver.observe(ref.current);
    
    return () => resizeObserver.disconnect();
  }, []);

  function handleMove(e) {
    if (prefersReducedMotion || !rectRef.current) return;
    
    const rect = rectRef.current;
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      x.set(offsetX * 0.3);
      y.set(offsetY * 0.3);
    });
  }

  function handleLeave() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
