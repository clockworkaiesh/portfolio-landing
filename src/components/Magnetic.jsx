"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Magnetic({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 200, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 15 });

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    x.set(offsetX * 0.3);
    y.set(offsetY * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
