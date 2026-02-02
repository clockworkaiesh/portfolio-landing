"use client";
import { useState, useEffect } from "react";

export default function PageLoader({ onFinished }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Only wait for the page to load, no artificial delay
    const pageLoad = new Promise((resolve) => {
      if (typeof document !== "undefined" && document.readyState === "complete") {
        resolve();
        return;
      }
      window.addEventListener("load", resolve, { once: true });
    });

    // Reduce safety timeout to 3s
    const maxWait = new Promise((r) => setTimeout(r, 3000));

    Promise.race([pageLoad, maxWait]).then(() => {
      // Small buffer to ensure smooth transition
      setTimeout(() => {
        setFadeOut(true);
      }, 500);
    });
  }, []);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        setHidden(true);
        onFinished?.();
      }, 700); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onFinished]);

  if (hidden) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#030014] transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <span className="sr-only">Loading, please wait...</span>
      
      {/* Custom CSS Loader */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-t-[#00f0ff] border-r-[#a855f7] border-b-[#ff00aa] border-l-transparent rounded-full animate-spin"></div>
        {/* Inner Pulse */}
        <div className="absolute inset-0 m-auto w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
