"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollManager({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reset scroll position on mount
    window.scrollTo(0, 0);

    // Manual scroll restoration to ensure we start at the top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Since we are not using Lenis, we don't need to hook into GSAP ticker
    // But we should ensure ScrollTrigger refreshes correctly after mount
    // Only refresh on desktop (> 640px) to avoid performance hits on mobile
    if (window.innerWidth > 768) {
      ScrollTrigger.refresh();
    }
  }, []);

  return children;
}
