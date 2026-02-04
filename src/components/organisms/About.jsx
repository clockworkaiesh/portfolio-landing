"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import useReducedMotion from "../../hooks/useReducedMotion";
import DoodleArrow from "../atoms/DoodleArrow";

const PixelBlast = dynamic(() => import("../atoms/PixelBlast"), { ssr: false });

export default function About() {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);



  return (
    <section
      ref={containerRef}
      aria-labelledby="about-heading"
      className="text-center w-screen vertical-spacing flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 overflow-visible relative"
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

      {/* Doodle Arrow - Bottom Left */}
      <div className="absolute bottom-10 left-10 md:left-20 lg:-left-10 xl:left-20 hidden lg:block w-40 h-40 z-10">
        <DoodleArrow variant="curve-right" className="rotate-[-45deg]" />
      </div>

      <div className="w-[90dvw] max-w-[800px] sm:w-[80dvw] md:w-[90dvw] mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="about-heading"
          className="section-heading"
        >
          Who am I?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="paragraph"
        >
          I'm a <span className="text-neon-blue font-semibold">Frontend Developer</span> with <span className="text-neon-blue font-semibold">6+ years</span> of experience turning ideas into digital products that are both functional and visually engaging. From sleek landing pages to complex dashboards, I focus on building interfaces that are <span className="text-neon-blue font-semibold">responsive</span>, <span className="text-neon-blue font-semibold">intuitive</span>, and <span className="text-neon-blue font-semibold">performance-driven</span>. My toolkit includes <span className="text-neon-blue font-semibold">React</span>, <span className="text-neon-blue font-semibold">Next</span>, <span className="text-neon-blue font-semibold">Redux Toolkit</span>, and <span className="text-neon-blue font-semibold">Tailwind</span>, along with <span className="text-neon-blue font-semibold">Framer Motion</span> for animations, <span className="text-neon-blue font-semibold">D3</span> for data visualizations, and <span className="text-neon-blue font-semibold">Web3</span> integrations that bring interactivity and modern functionality to the web.
        </motion.p>
      </div>

    </section>
  );
}
