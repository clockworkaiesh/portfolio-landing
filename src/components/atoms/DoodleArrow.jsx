"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function DoodleArrow({ variant = "straight-down", className = "", delay = 0 }) {
  const pathRef = useRef(null);
  const triggerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable on mobile (<= 640px) or if reduced motion is preferred
    if (typeof window !== "undefined" && window.innerWidth <= 640) return;
    if (!pathRef.current || prefersReducedMotion) return;

    const path = pathRef.current;
    
    // Force a reflow to ensure length is calculated
    const length = path.getTotalLength();
    
    // Set initial state via GSAP to ensure it takes precedence
    gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        autoAlpha: 1 // Ensure it's visible (opacity) but path is undrawn
    });

    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none", // Linear mapping for scrub
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 90%", // Start drawing when entering viewport
        end: "bottom 40%", // Finish drawing near center
        scrub: 1, // Smooth scrub
      },
    });

    return () => {
      anim.kill();
    };
  }, [prefersReducedMotion]);

  // Different path definitions for variants
  const getPathData = () => {
    switch (variant) {
      case "curve-right":
        // Curved arrow pointing right
        return {
           viewBox: "0 0 100 100",
           // Smoother quadratic arch
           d: "M10,50 Q50,40 90,50 M90,50 L86,35 M90,50 L70,65"
        };
      case "loop-right":
        // Loopy arrow pointing right
        return {
            viewBox: "0 0 150 100",
            d: "M10,10 C50,50 90,0 110,40 C120,60 100,70 90,60 C80,50 110,50 130,80 M130,80 L115,75 M130,80 L125,65"
        };
      case "loop-left":
        // Loopy arrow pointing left
        return {
            viewBox: "0 0 150 100",
            d: "M140,10 C100,50 60,0 40,40 C30,60 50,70 60,60 C70,50 40,50 20,80 M20,80 L35,75 M20,80 L25,65"
        };
      case "swirl":
        // Swirly spiral
        return {
            viewBox: "0 0 100 120",
            d: "M50,10 C80,10 80,40 50,40 C20,40 20,70 50,70 C70,70 70,90 50,110 M50,110 L65,100 M50,110 L35,100"
        };
      case "zigzag":
        // Zigzag down
        return {
            viewBox: "0 0 60 150",
            d: "M30,10 L50,40 L10,70 L50,100 L30,130 M30,130 L15,115 M30,130 L45,115"
        };
      case "straight-down":
      default:
        // Simple wavy down
        return {
            viewBox: "0 0 50 150",
            d: "M25,5 C10,30 40,50 25,75 C10,100 40,120 25,145 M25,145 L10,130 M25,145 L40,130"
        };
    }
  };

  const { viewBox, d } = getPathData();

  return (
    <div ref={triggerRef} className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <path
          ref={pathRef}
          d={d}
          stroke="#00f0ff" // Neon Blue
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={prefersReducedMotion ? {} : { opacity: 1 }}
        />
      </svg>
    </div>
  );
}
