"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
    if (isTablet) return "size-[350px] md:size-[280px]";
    return "size-[400px] lg:size-[420px]";
  };

  // Get container size based on screen
  const getContainerSize = () => {
    if (isMobile) return "w-full h-[280px] sm:h-[320px]";
    if (isTablet) return "w-full h-[350px] md:h-[380px]";
    return "w-[450px] h-[450px]";
  };

  return (
    <div className="hero-container">
      <div
        className={`flex ${isMobile ? "flex-col-reverse" : "flex-row"} justify-between items-center mx-auto w-full max-w-6xl gap-8 md:gap-12lg:gap-16`}
      >
        {/* Image Container - Position based on screen size */}
        <div
          className={`relative ${isMobile ? "w-full max-w-1/3 lg:max-w-[300px] order-2" : "order-1"} ${getContainerSize()} relative overflow-hidden`}
        >
          <img
            src="/blob.gif"
            alt="blob"
            className="absolute -bottom-3 -left-2 opacity-[0.1]"
          />
          <img
            src="/blob2.gif"
            alt="blob"
            className="absolute inset-3 opacity-[0.1]"
          />

          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              className={`absolute z-50 inset-0 ${getImageSize()} object-contain transition-opacity duration-0 mx-auto ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              alt="Ayesha Naveed"
            />
          ))}
        </div>

        {/* Text Content */}
        <div
          className={`${isMobile ? "w-full text-center order-1" : isTablet ? "order-2 w-[50%] min-w-[50%]" : "order-2 text-left"} flex-1`}
        >
          <motion.h1
            className={`${isMobile ? "text-4xl sm:text-5xl" : isTablet ? "text-5xl" : "text-6xl lg:text-5xl xl:text-[80px]"} font-bold leading-[1.1] mb-3 md:mb-4`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Ayesha Naveed
          </motion.h1>

          <motion.h2
            className={`${isMobile ? "text-lg" : isTablet ? "text-xl" : "text-2xl lg:text-lg xl:text-2xl"} font-medium leading-[150%] text-neon-blue opacity-90`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            Frontend Developer crafting fast, scalable, and human-centered web experiences.
          </motion.h2>

          <motion.p
            className={`${isMobile ? "text-base sm:text-lg" : isTablet ? "text-lg md:text-xl" : "text-xl lg:text-lg xl:text-2xl"} text-text-muted leading-relaxed`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            const experience = design + performance + usability;
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`-scale-[0.7] rotate-180 absolute ${isMobile ? "-bottom-16" : isTablet ? "bottom-36" : "bottom-24"} `}
      >
        <DotLottieReact
                      src="https://lottie.host/23410713-3874-4301-9f7f-365585e0c013/45DnF5vmFR.lottie"


          loop
          autoplay
        />
      </div>
    </div>
  );
}
