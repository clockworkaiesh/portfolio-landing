"use client";
import SplitText from "./SplitText";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const images = ["/2.png", "/3.png", "/5.png"];

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

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 600);
    return () => clearInterval(interval);
  }, [images.length]);

  // Get image size based on screen
  const getImageSize = () => {
    if (isMobile) return "size-[280px] sm:size-[320px]";
    if (isTablet) return "size-[350px] md:size-[380px]";
    return "size-[400px] lg:size-[420px]";
  };

  // Get container size based on screen
  const getContainerSize = () => {
    if (isMobile) return "w-full h-[280px] sm:h-[320px]";
    if (isTablet) return "w-full h-[350px] md:h-[380px]";
    return "w-[450px] h-[450px]";
  };

  return (
    <div className=" flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-6 relative">
      <div className={`flex ${isMobile ? 'flex-col-reverse' : 'flex-row'} justify-between items-center mx-auto w-full max-w-6xl gap-8 md:gap-12lg:gap-16`}>
        
        {/* Image Container - Position based on screen size */}
        <div className={`${isMobile ? 'w-full max-w-[300px] order-2' : 'order-1'} ${getContainerSize()} relative overflow-hidden`}>
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              className={`absolute inset-0 ${getImageSize()} object-contain transition-opacity duration-0 mx-auto ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              alt="Ayesha Naveed"
            />
          ))}
        </div>
        
        {/* Text Content */}
        <div className={`${isMobile ? 'w-full text-center order-1' : 'order-2 text-left'} flex-1`}>
          <SplitText
            text="Ayesha Naveed"
            tag="h1"
            className={`${isMobile ? 'text-4xl sm:text-5xl' : isTablet ? 'text-5xl md:text-6xl' : 'text-6xl lg:text-7xl'} font-bold leading-[1.1] mb-4 md:mb-6`}
            stagger={0.05}
            duration={0.8}
            splitType="chars"
            threshold={0.3}
            rootMargin="0px"
            textAlign={isMobile ? "center" : "left"}
          />
          
          <SplitText
            text="Frontend Developer & UI/UX Enthusiast"
            tag="h2"
            className={`${isMobile ? 'text-lg sm:text-xl' : isTablet ? 'text-xl md:text-2xl' : 'text-2xl lg:text-3xl'} font-medium leading-[150%] mb-3 md:mb-4 text-neon-blue opacity-90`}
            stagger={0.03}
            duration={0.7}
            splitType="words"
            threshold={0.3}
            rootMargin="0px"
            textAlign={isMobile ? "center" : "left"}
          />
          
          <div className="space-y-2 md:space-y-3">
            <SplitText
              text="Where logic meets motion."
              tag="p"
              className={`${isMobile ? 'text-base sm:text-lg' : isTablet ? 'text-lg md:text-xl' : 'text-xl'} text-text-muted leading-relaxed`}
              stagger={0.02}
              duration={0.6}
              splitType="lines"
              threshold={0.3}
              rootMargin="0px"
              textAlign={isMobile ? "center" : "left"}
            />
            
            <SplitText
              text="Scroll to explore."
              tag="p"
              className={`${isMobile ? 'text-base sm:text-lg' : isTablet ? 'text-lg md:text-xl' : 'text-xl'} text-text-muted leading-relaxed`}
              stagger={0.02}
              duration={0.6}
              splitType="lines"
              threshold={0.3}
              rootMargin="0px"
              textAlign={isMobile ? "center" : "left"}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <svg
        fill="#ffffff50"
        height="40px"
        width="40px"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 490 490"
        stroke="#ffffff50"
        className={`absolute ${isMobile ? '-bottom-16' : isTablet ? '-bottom-14' : 'bottom-10'} animate-bounce `}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <polygon points="237.339,0 237.339,458.069 99.333,300.928 87.832,311.038 244.996,490 402.168,311.038 390.652,300.928 252.654,458.069 252.654,0 "></polygon>
        </g>
      </svg>
    </div>
  );
}