"use client";
import { useRef, useEffect, useState } from "react";
import SplitText from "../atoms/SplitText";
import HighlightedSplitText from "../atoms/HighlightedSplitText";
import dynamic from "next/dynamic";
import useReducedMotion from "../../hooks/useReducedMotion";

const PixelBlast = dynamic(() => import("../atoms/PixelBlast"), { ssr: false });

export default function About() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-labelledby="about-heading"
      className="text-center w-screen vertical-spacing flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 overflow-hidden relative mt-28 md:mt-0"
    >
      {/* PixelBlast background - desktop only */}
      {isDesktop && !prefersReducedMotion && <div className="w-full h-full absolute inset-5 opacity-20" aria-hidden="true">
        <PixelBlast
          variant="circle"
          pixelSize={7}
          color="#B19EEF"
          patternScale={2.5}
          patternDensity={1.3}
          pixelSizeJitter={0.5}
          enableRipples={false}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>}

      <div
        className="w-[90dvw] max-w-[800px] sm:w-[80dvw] md:w-[90dvw] mx-auto transition-opacity duration-700"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <SplitText
          text="Who am I?"
          tag="h2"
          id="about-heading"
          className="section-heading"
          stagger={0.05}
          duration={0.7}
          splitType="chars"
          threshold={0.3}
          rootMargin="0px"
        />
        <HighlightedSplitText
          text="I'm a Frontend Developer with 5+ years of experience turning ideas into digital products that are both functional and visually engaging. From sleek landing pages to complex dashboards, I focus on building interfaces that are responsive, intuitive, and performance-driven. My toolkit includes React, Next, Redux Toolkit, and Tailwind, along with Framer Motion for animations, D3 for data visualizations, and Web3 integrations that bring interactivity and modern functionality to the web."
          tag="p"
          className="paragraph"
          stagger={0.02}
          duration={0.6}
          splitType="words"
          threshold={0.3}
          rootMargin="0px"
          highlights={[
            { word: 'Frontend Developer', color: 'neon-blue' },
            { word: '6+ years', color: 'neon-blue' },
            { word: 'React', color: 'neon-blue' },
            { word: 'Next', color: 'neon-blue' },
            { word: 'Redux Toolkit', color: 'neon-blue' },
            { word: 'Tailwind', color: 'neon-blue' },
            { word: 'Framer Motion', color: 'neon-blue' },
            { word: 'D3', color: 'neon-blue' },
            { word: 'Web3', color: 'neon-blue' },
            { word: 'responsive', color: 'neon-blue' },
            { word: 'intuitive', color: 'neon-blue' },
            { word: 'performance-driven', color: 'neon-blue' }
          ]}
        />
      </div>
    </section>
  );
}
