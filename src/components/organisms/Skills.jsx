"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

import SkillCard from "../molecules/SkillCard";
import useReducedMotion from "../../hooks/useReducedMotion";

import DoodleArrow from "../atoms/DoodleArrow";

export default function Skills() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const skills = [
    { name: "React", image: "/skills/reactjs.webp", category: "frontend" },
    { name: "Next.js", image: "/skills/nextjs.webp", category: "frontend" },
    { name: "Vue.js", image: "/skills/vuejs.webp", category: "frontend" },
    { name: "Vanilla JS", image: "/skills/js.webp", category: "frontend" },
    { name: "Node.js", image: "/skills/nodejs.webp", category: "backend" },
    { name: "Redux", image: "/skills/redux.webp", category: "state" },
    { name: "D3.js", image: "/skills/d3js.webp", category: "visualization" },
    { name: "Framer Motion", image: "/skills/framermotion.webp", category: "animation" },
    { name: "Tailwind CSS", image: "/skills/tailwind.webp", category: "styling" },
    { name: "Sass", image: "/skills/sass.webp", category: "styling" },
    { name: "Material-UI", image: "/skills/mui.webp", category: "ui" },
    { name: "Figma", image: "/skills/figma.webp", category: "design" },
    { name: "Git", image: "/skills/git.webp", category: "tools" },
    { name: "VS Code", image: "/skills/vscode.webp", category: "tools" },
    { name: "WordPress", image: "/skills/wordpress.webp", category: "cms" },
    { name: "Bootstrap", image: "/skills/brand.webp", category: "ui" },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), 200);
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      frontend: "bg-gradient-to-r from-blue-500 to-cyan-500",
      backend: "bg-gradient-to-r from-green-500 to-emerald-500",
      state: "bg-gradient-to-r from-purple-500 to-pink-500",
      visualization: "bg-gradient-to-r from-orange-500 to-yellow-500",
      animation: "bg-gradient-to-r from-cyan-500 to-blue-500",
      styling: "bg-gradient-to-r from-pink-500 to-rose-500",
      ui: "bg-gradient-to-r from-indigo-500 to-purple-500",
      design: "bg-gradient-to-r from-red-500 to-orange-500",
      tools: "bg-gradient-to-r from-gray-500 to-slate-500",
      cms: "bg-gradient-to-r from-blue-600 to-indigo-600",
    };
    return colors[category] || "bg-gradient-to-r from-gray-500 to-slate-500";
  };

  const getGridColumns = () => {
    if (isMobile) return "grid-cols-3";
    if (isTablet) return "grid-cols-4";
    return "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8";
  };

  const getGridGap = () => {
    if (isMobile) return "gap-3";
    if (isTablet) return "gap-4";
    return "gap-4 sm:gap-5 lg:gap-6";
  };

  const getCardPadding = () => {
    if (isMobile) return "p-3";
    if (isTablet) return "p-4";
    return "p-4 sm:p-5 lg:p-6";
  };

  const getIconSize = () => {
    if (isMobile) return "w-10 h-10";
    if (isTablet) return "w-12 h-12";
    return "w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16";
  };

  const getTextSize = () => {
    if (isMobile) return "text-xs";
    if (isTablet) return "text-sm";
    return "text-xs sm:text-sm lg:text-base";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : (isMobile ? 0.03 : isTablet ? 0.04 : 0.05),
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: isMobile ? 120 : isTablet ? 110 : 100,
            damping: isMobile ? 20 : isTablet ? 17 : 15,
          },
        },
      };

  return (
    <section
      ref={containerRef}
      aria-labelledby="skills-heading"
      className="w-screen min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 vertical-spacing relative overflow-visible"
    >
       {/* Doodle Arrow - Right */}
       <div className="absolute top-1/4 right-10 hidden xl:block w-40 h-40">
        <DoodleArrow variant="loop-left" />
      </div>

       {/* Doodle Arrow - Left */}
       <div className="absolute xl:bottom-[2%] 2xl:bottom-1/4 left-10 rotate-[300deg] hidden xl:block w-40 h-40">
        <DoodleArrow variant="loop-left" className="scale-x-[-1]" />
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            id="skills-heading"
            className="section-heading"
          >
            Technical Toolkit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="paragraph"
          >
            A curated selection of technologies I use to build exceptional digital experiences
          </motion.p>
        </div>


        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className={`grid ${getGridColumns()} ${getGridGap()} px-2 sm:px-4`}
          role="list"
          aria-label="Technical skills"
        >
          {skills.map((skill) => (
            <div key={skill.name} role="listitem">
              <SkillCard
                skill={skill}
                isMobile={isMobile}
                isTablet={isTablet}
                getCategoryColor={getCategoryColor}
                getCardPadding={getCardPadding}
                getIconSize={getIconSize}
                getTextSize={getTextSize}
                itemVariants={itemVariants}
              />
            </div>
          ))}
        </motion.div>

        {/* Category Legend */}
        {!isMobile && (
          <motion.div
            className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm text-gray-300 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            role="group"
            aria-label="Skill categories legend"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-500" aria-hidden="true"></div>
              </div>
              <span className="text-xs sm:text-sm">Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-500" aria-hidden="true"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500" aria-hidden="true"></div>
              </div>
              <span className="text-xs sm:text-sm">Animation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-purple-500" aria-hidden="true"></div>
                <div className="w-2 h-2 rounded-full bg-pink-500" aria-hidden="true"></div>
              </div>
              <span className="text-xs sm:text-sm">UI/State</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" aria-hidden="true"></div>
                <div className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true"></div>
              </div>
              <span className="text-xs sm:text-sm">Tools</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
