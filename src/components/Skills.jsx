"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText";

export default function Skills() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  // Check screen size
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

  // Intersection Observer for skill animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, 200);
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Get color based on category
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

  // Get grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return "grid-cols-3"; // 3 columns on mobile
    if (isTablet) return "grid-cols-4"; // 4 columns on tablet
    return "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8"; // 4 → 6 → 8 on desktop
  };

  // Get gap size based on screen size
  const getGridGap = () => {
    if (isMobile) return "gap-3"; // Smaller gap on mobile
    if (isTablet) return "gap-4"; // Medium gap on tablet
    return "gap-4 sm:gap-5 lg:gap-6"; // Responsive gap on desktop
  };

  // Get card padding based on screen size
  const getCardPadding = () => {
    if (isMobile) return "p-3"; // Compact padding on mobile
    if (isTablet) return "p-4"; // Medium padding on tablet
    return "p-4 sm:p-5 lg:p-6"; // Responsive padding on desktop
  };

  // Get icon size based on screen size
  const getIconSize = () => {
    if (isMobile) return "w-10 h-10"; // Smaller icons on mobile
    if (isTablet) return "w-12 h-12"; // Medium icons on tablet
    return "w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"; // Responsive icons
  };

  // Get text size based on screen size
  const getTextSize = () => {
    if (isMobile) return "text-xs"; // Smaller text on mobile
    if (isTablet) return "text-sm"; // Medium text on tablet
    return "text-xs sm:text-sm lg:text-base"; // Responsive text
  };

  // Staggered grid animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.03 : isTablet ? 0.04 : 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
    <div
      ref={containerRef}
      className="w-screen min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 vertical-spacing"
    >
      {/* Content */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-8 sm:mb-10 lg:mb-12 px-4"
        >
          <SplitText
            text="Technical Toolkit"
            tag="h2"
            className="section-heading"
            stagger={0.05}
            duration={0.7}
            splitType="chars"
            threshold={0.3}
            rootMargin="0px"
          />
          <SplitText
            text="A curated selection of technologies I use to build exceptional digital experiences"
            tag="p"
            className="paragraph"
            stagger={0.02}
            duration={0.6}
            splitType="words"
            threshold={0.3}
            rootMargin="0px"
          />
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className={`grid ${getGridColumns()} ${getGridGap()} px-2 sm:px-4`}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{
                y: isMobile ? -4 : isTablet ? -6 : -8,
                scale: isMobile ? 1.03 : isTablet ? 1.04 : 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="relative group"
            >
              <motion.div
                className={`absolute inset-0 rounded-xl sm:rounded-2xl ${getCategoryColor(skill.category)} opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${isMobile ? 'blur-md' : 'blur-lg'}`}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl ${getCardPadding()} flex flex-col items-center justify-center h-full transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20`}>
                {/* Category indicator - Hidden on mobile, shown on tablet+ */}
                {!isMobile && (
                  <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2">
                    <motion.div
                      className={`${isTablet ? 'w-2.5 h-2.5' : 'w-3 h-3'} rounded-full ${getCategoryColor(skill.category)}`}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                )}
                
                {/* Skill icon with floating animation */}
                <motion.div
                  className={`${getIconSize()} mb-2 sm:mb-3 lg:mb-4 relative`}
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent ${isMobile ? 'blur-sm' : 'blur-md'}`} />
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-contain relative z-10"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const fallback = document.createElement("div");
                      fallback.className = `w-full h-full flex items-center justify-center ${getTextSize()} font-bold text-white`;
                      fallback.textContent = skill.name.charAt(0);
                      e.target.parentElement.appendChild(fallback);
                    }}
                  />
                </motion.div>
                
                {/* Skill name */}
                <motion.span
                  className={`${getTextSize()} font-medium text-white text-center leading-tight`}
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {skill.name}
                </motion.span>
                
                {/* Subtle category tag - Hidden on mobile, shown on hover for tablet+ */}
                {!isMobile && (
                  <span className={`text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isTablet ? 'hidden group-hover:block' : ''}`}>
                    {skill.category}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Legend - Hidden on mobile, shown on tablet+ */}
        {!isMobile && (
          <motion.div
            className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm text-gray-300 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              </div>
              <span className="text-xs sm:text-sm">Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              </div>
              <span className="text-xs sm:text-sm">Animation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              </div>
              <span className="text-xs sm:text-sm">UI/State</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs sm:text-sm">Tools</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}