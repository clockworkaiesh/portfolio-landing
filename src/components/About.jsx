"use client";
import { useRef, useEffect, useState } from "react";
import SplitText from "./SplitText";
import HighlightedSplitText from "./HighlightedSplitText";
import PixelBlast from "./PixelBlast";

export default function About() {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [contentScrollY, setContentScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  useEffect(() => {
    let contentTimeout;
    let animationTimeout;
    
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      // Get the scroll position relative to this section
      const rect = container.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within this section (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, -sectionTop / sectionHeight));
      
      // Determine section visibility and state
      const isInView = sectionTop < viewportHeight && sectionTop > -sectionHeight;
      const isFullyInView = sectionTop <= 0 && sectionTop > -sectionHeight;
      
      // Handle entrance animation (shapes first, then content)
      if (isInView && !isVisible) {
        setIsVisible(true);
        setIsEntering(true);
        setIsExiting(false);
        
        // Shapes appear immediately
        setScrollY(scrollProgress);
        
        // Content fades in after 0.4s delay
        animationTimeout = setTimeout(() => {
          setContentScrollY(scrollProgress);
          setIsEntering(false);
        }, 400);
      }
      
      // Handle exit animation (content first, then shapes)
      else if (!isInView && isVisible) {
        setIsVisible(false);
        setIsExiting(true);
        setIsEntering(false);
        
        // Content fades out immediately
        setContentScrollY(0);
        
        // Shapes fade out after 0.3s delay
        animationTimeout = setTimeout(() => {
          setScrollY(0);
          setIsExiting(false);
        }, 300);
      }
      
      // Handle normal scrolling within section
      else if (isVisible && isFullyInView) {
        // Background elements move immediately
        setScrollY(scrollProgress);
        
        // Clear any existing timeout
        if (contentTimeout) {
          clearTimeout(contentTimeout);
        }
        
        // Content follows with 0.3s delay
        contentTimeout = setTimeout(() => {
          setContentScrollY(scrollProgress);
        }, 300);
      }
    };

    // Listen to scroll events on the main container
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      // Initial call to set correct position
      handleScroll();
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        if (contentTimeout) {
          clearTimeout(contentTimeout);
        }
        if (animationTimeout) {
          clearTimeout(animationTimeout);
        }
      };
    }
  }, [isVisible]);

  const getContentTransform = (speed, offset = 0) => {
    const translateY = (contentScrollY - 0.5) * speed + offset;
    return `translateY(${translateY}px)`;
  };

  // Get content width based on screen size
  const getContentWidth = () => {
    if (isMobile) return "w-[90dvw] max-w-[500px]";
    if (isTablet) return "w-[80dvw] max-w-[600px]";
    return "w-[60dvw] max-w-[800px]";
  };

  return (
    <div 
      ref={containerRef}
      className="text-center w-screen min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 overflow-hidden py-8 sm:py-0"
    >
      {/* PixelBlast background - reduced intensity on mobile */}
      <div className="w-full h-full absolute inset-0 opacity-10 sm:opacity-15 md:opacity-20">
        <PixelBlast
          variant="circle"
          pixelSize={isMobile ? 8 : isTablet ? 7 : 6}
          color="#B19EEF"
          patternScale={isMobile ? 2 : isTablet ? 2.5 : 3}
          patternDensity={isMobile ? 1.5 : isTablet ? 1.3 : 1.2}
          pixelSizeJitter={0.5}
          enableRipples={!isMobile} // Disable ripples on mobile for performance
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={!isMobile} // Disable liquid effect on mobile for performance
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>
      
      {/* Parallax background gradient - reduced motion on mobile */}
      <div 
        className="about-parallax-bg transition-opacity duration-500 ease-out"
        style={{
          transform: `translateY(${(scrollY - 0.5) * (isMobile ? 15 : isTablet ? 20 : 30)}px)`,
          opacity: isVisible ? 1 : 0,
          willChange: isMobile ? 'opacity' : 'transform, opacity' // Reduced will-change on mobile
        }}
      />
      
      <div 
        className={`content-wrapper ${getContentWidth()} mx-auto transition-all duration-500 ease-out`}
        style={{
          transform: `${getContentTransform(isMobile ? 15 : isTablet ? 18 : 20)} ${isEntering ? `translateY(${isMobile ? 20 : 30}px)` : isExiting ? `translateY(${isMobile ? -20 : -30}px)` : 'translateY(0px)'}`,
          opacity: isVisible && !isEntering ? 1 : 0,
          willChange: isMobile ? 'opacity' : 'transform, opacity' // Reduced will-change on mobile
        }}
      >
        <SplitText
          text="Who am I?"
          tag="h2"
          className={`${isMobile ? 'text-3xl sm:text-4xl' : isTablet ? 'text-4xl md:text-5xl' : 'text-5xl lg:text-6xl'} font-bold text-text-heading mb-4 sm:mb-6`}
          stagger={0.05}
          duration={0.7}
          splitType="chars"
          threshold={0.3}
          rootMargin="0px"
        />
        <HighlightedSplitText
          text="I'm a Frontend Developer with 6+ years of experience turning ideas into digital products that are both functional and visually engaging. From sleek landing pages to complex dashboards, I focus on building interfaces that are responsive, intuitive, and performance-driven. My toolkit includes React.js, Next.js, Redux Toolkit, and Tailwind, along with Framer Motion for animations, D3.js for data visualizations, and Web3 integrations that bring interactivity and modern functionality to the web."
          tag="p"
          className={`${isMobile ? 'text-sm sm:text-base' : isTablet ? 'text-base md:text-lg' : 'text-lg lg:text-xl'} text-text-muted leading-relaxed sm:leading-loose`}
          stagger={0.02}
          duration={0.6}
          splitType="words"
          threshold={0.3}
          rootMargin="0px"
          highlights={[
            { word: 'Frontend Developer', color: 'neon-blue' },
            { word: '6+ years', color: 'neon-blue' },
            { word: 'React.js', color: 'neon-blue' },
            { word: 'Next.js', color: 'neon-blue' },
            { word: 'Redux Toolkit', color: 'neon-blue' },
            { word: 'Tailwind', color: 'neon-blue' },
            { word: 'Framer Motion', color: 'neon-blue' },
            { word: 'D3.js', color: 'neon-blue' },
            { word: 'Web3', color: 'neon-blue' },
            { word: 'responsive', color: 'neon-blue' },
            { word: 'intuitive', color: 'neon-blue' },
            { word: 'performance-driven', color: 'neon-blue' }
          ]}
        />
      </div>
    </div>
  );
}