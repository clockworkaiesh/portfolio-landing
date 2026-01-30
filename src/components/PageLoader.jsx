"use client";
import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function PageLoader({ onFinished }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const minDisplay = new Promise((r) => setTimeout(r, 3500));

    const pageLoad = new Promise((resolve) => {
      // If the page already fully loaded, resolve immediately
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      window.addEventListener("load", resolve, { once: true });
    });

    // Safety timeout so the loader never gets stuck
    const maxWait = new Promise((r) => setTimeout(r, 8000));

    Promise.all([minDisplay, Promise.race([pageLoad, maxWait])]).then(() => {
      setFadeOut(true);
    });
  }, []);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        setHidden(true);
        onFinished?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onFinished]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-dark-default transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-40 h-40 sm:w-52 sm:h-52">
        <DotLottieReact
          src="https://lottie.host/72c6a8cf-e60f-4775-972f-61ccd1f37278/gMEhieb4oG.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
