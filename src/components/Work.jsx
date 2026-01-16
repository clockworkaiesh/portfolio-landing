"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../portfolioData.js";
import PixelBlast from "./PixelBlast";

export default function Work({
  isActive,
  enteredFromBelow = false,
  onExitWork,
}) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = portfolioData.length;
  const isAnimating = useRef(false);
  const lastScrollDirection = useRef("down");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // PixelBlast background states
  const [scrollY, setScrollY] = useState(0);
  const [contentScrollY, setContentScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle PixelBlast background scroll animations
  useEffect(() => {
    let contentTimeout;
    let animationTimeout;
    
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, -sectionTop / sectionHeight));
      const isInView = sectionTop < viewportHeight && sectionTop > -sectionHeight;
      const isFullyInView = sectionTop <= 0 && sectionTop > -sectionHeight;
      
      if (isInView && !isVisible) {
        setIsVisible(true);
        setIsEntering(true);
        setIsExiting(false);
        
        setScrollY(scrollProgress);
        
        animationTimeout = setTimeout(() => {
          setContentScrollY(scrollProgress);
          setIsEntering(false);
        }, 400);
      } else if (!isInView && isVisible) {
        setIsVisible(false);
        setIsExiting(true);
        setIsEntering(false);
        
        setContentScrollY(0);
        
        animationTimeout = setTimeout(() => {
          setScrollY(0);
          setIsExiting(false);
        }, 300);
      } else if (isVisible && isFullyInView) {
        setScrollY(scrollProgress);
        
        if (contentTimeout) {
          clearTimeout(contentTimeout);
        }
        
        contentTimeout = setTimeout(() => {
          setContentScrollY(scrollProgress);
        }, 300);
      }
    };

    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        if (contentTimeout) clearTimeout(contentTimeout);
        if (animationTimeout) clearTimeout(animationTimeout);
      };
    }
  }, [isVisible]);

  // Navigation functions for desktop
  const goToNextSlide = useCallback(() => {
    if (isAnimating.current || !isActive || isMobile || isTablet) return;
    
    isAnimating.current = true;
    lastScrollDirection.current = "down";
    
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onExitWork?.("down");
    }
    
    setTimeout(() => {
      isAnimating.current = false;
    }, 600);
  }, [currentSlide, totalSlides, onExitWork, isActive, isMobile, isTablet]);

  const goToPrevSlide = useCallback(() => {
    if (isAnimating.current || !isActive || isMobile || isTablet) return;
    
    isAnimating.current = true;
    lastScrollDirection.current = "up";
    
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    } else {
      onExitWork?.("up");
    }
    
    setTimeout(() => {
      isAnimating.current = false;
    }, 600);
  }, [currentSlide, onExitWork, isActive, isMobile, isTablet]);

  // Handle slide navigation only on desktop
  useEffect(() => {
    if (!isActive || isMobile || isTablet) return;

    const handleWheel = (e) => {
      e.preventDefault();
      
      if (e.deltaY > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToPrevSlide();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, goToNextSlide, goToPrevSlide, isMobile, isTablet]);

  // Initialize slide position based on entry direction
  useEffect(() => {
    if (isActive) {
      isAnimating.current = false;
      
      if (enteredFromBelow) {
        setCurrentSlide(totalSlides - 1);
        lastScrollDirection.current = "up";
      } else {
        setCurrentSlide(0);
        lastScrollDirection.current = "down";
      }
    } else {
      setCurrentSlide(0);
      lastScrollDirection.current = "down";
    }
  }, [isActive, enteredFromBelow, totalSlides]);

  const getContentTransform = (speed, offset = 0) => {
    const translateY = (contentScrollY - 0.5) * speed + offset;
    return `translateY(${translateY}px)`;
  };

  // For mobile/tablet, show all projects stacked
  const renderStackedProjects = () => {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-12 sm:space-y-16">
        {portfolioData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="w-full"
          >
            <div className="bg-dark-light border border-dark-softer rounded-2xl overflow-hidden">
              {/* Project Image */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-dark-softer to-dark-light">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = document.createElement("div");
                    fallback.className = "w-full h-full flex items-center justify-center text-text-muted";
                    fallback.innerHTML = `<div class="text-center">
                      <div class="text-4xl mb-4">📁</div>
                      <div class="text-lg">Project Preview</div>
                    </div>`;
                    e.currentTarget.parentElement.appendChild(fallback);
                  }}
                />
              </div>
              
              {/* Project Info */}
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-heading mb-4">
                  {project.title}
                </h3>
                
                <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-6">
                  {project.description}
                </p>
                
                {/* Project Links */}
                {(project.liveUrl || project.githubUrl) && (
                  <div className="flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-sm sm:text-base font-medium text-text-heading hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
                      >
                        View Live Site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-dark-softer text-sm sm:text-base font-medium text-text-base hover:bg-dark-softer/80 transition-all duration-300"
                      >
                        View Source Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // For desktop, show horizontal slides
  const renderDesktopSlides = () => {
    return (
      <div className="w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {portfolioData.map((project, index) => {
            if (index !== currentSlide) return null;
            
            return (
              <motion.div
                key={project.id}
                initial={{ 
                  opacity: 0, 
                  x: lastScrollDirection.current === "down" ? 200 : -200 
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ 
                  opacity: 0, 
                  x: lastScrollDirection.current === "down" ? -200 : 200 
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full max-w-6xl px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center justify-center"
              >
                {/* Project Info */}
                <div className="w-full lg:w-1/2 text-left">
                  <div className="mb-6 lg:mb-8">
                    
                    <h3 className="text-3xl  font-bold text-text-heading mb-4 lg:mb-6">
                      {project.title}
                    </h3>
                    
                    <p className="text-lg lg:text-xl  text-text-base opacity-80 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
                
                {/* Project Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative  bg-dark-softer rounded-2xl overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = document.createElement("div");
                        fallback.className = "w-full h-full flex items-center justify-center text-text-muted";
                        fallback.innerHTML = `<div class="text-center">
                          <div class="text-4xl mb-4">📁</div>
                          <div class="text-lg">Project Preview</div>
                        </div>`;
                        e.currentTarget.parentElement.appendChild(fallback);
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="text-center w-screen min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 lg:py-0 lg:h-screen overflow-hidden"
    >
      {/* PixelBlast background */}
      <div className="w-full h-full absolute inset-0 opacity-20">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>
      
      {/* Parallax background gradient */}
      <div 
        className="about-parallax-bg transition-opacity duration-500 ease-out"
        style={{
          transform: `translateY(${(scrollY - 0.5) * 30}px)`,
          opacity: isVisible ? 1 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Content wrapper with scroll animations */}
      <div 
        className="content-wrapper w-full max-w-7xl transition-all duration-500 ease-out mx-auto flex flex-col justify-center"
        style={{
          transform: `${getContentTransform(20)} ${isEntering ? 'translateY(30px)' : isExiting ? 'translateY(-30px)' : 'translateY(0px)'}`,
          opacity: isVisible && !isEntering ? 1 : 0,
          willChange: 'transform, opacity'
        }}
      >
        <section
          ref={sectionRef}
          className="relative w-full flex flex-col items-center justify-center"
        >
          {/* Fixed Header */}
          <div className="w-full max-w-4xl lg:max-w-6xl mx-auto mb-8 sm:mb-10 lg:mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-heading">
                What do I do?
              </h2>
              <p className="section-content">
                Clean, responsive frontends built from experience.
              </p>
            </motion.div>
          </div>

          {/* Projects Content */}
          <div className="w-full flex-1 flex items-center justify-center">
            {isMobile || isTablet ? renderStackedProjects() : renderDesktopSlides()}
          </div>
        </section>
      </div>
    </div>
  );
}