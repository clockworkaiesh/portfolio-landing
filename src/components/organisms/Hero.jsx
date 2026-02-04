"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useReducedMotion from "../../hooks/useReducedMotion";
import BlobBackground from "./BlobBackground";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const images = ["/2.webp", "/3.webp", "/4.webp"];
  const prefersReducedMotion = useReducedMotion();

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
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length, prefersReducedMotion]);

  // Get image size based on screen
  const getImageSize = () => {
    if (isMobile) return "size-[280px] sm:size-[320px]";
    if (isTablet) return "size-[350px] md:size-[280px]";
    return "size-[400px] lg:size-[420px]";
  };

  // Get container size based on screen
  const getContainerSize = () => {
    if (isMobile) return "w-full h-[280px] h-[320px]";
    if (isTablet) return "w-full h-[300px] h-[320px]";
    return "w-[370px] h-[370px] xl:w-[450px] xl:h-[450px]";
  };

  return (
    <div className="hero-container">
      <div
        className={`flex ${isMobile ? "flex-col-reverse" : "flex-row"} justify-between items-center mx-auto w-full max-w-6xl gap-8 md:gap-12lg:gap-16`}
      >
        {/* Image Container - Position based on screen size */}
        <div
          className={`relative ${isMobile ? "w-full max-w-1/3 lg:max-w-[300px] order-2" : "order-1"} ${getContainerSize()} relative `}
        >
          <BlobBackground />
          {/* below is a series of my own avatar character image */}
          {images.map((src, index) => (
            <div 
              key={src}
              className={`absolute inset-0 ${getImageSize()} mx-auto transition-opacity duration-0 ${
                index === currentImageIndex ? "opacity-100 z-50" : "opacity-0 z-0"
              }`}
              style={{ willChange: 'opacity', position: 'absolute' }}
              aria-hidden={index !== currentImageIndex}
            >
              <Image
                src={src}
                alt={index === currentImageIndex ? "Ayesha Naveed" : ""}
                fill
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 350px, 450px"
                priority
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div
          className={`${isMobile ? "w-full text-center order-1" : isTablet ? "order-2 w-[50%] min-w-[50%]" : "order-2 text-left"} flex-1`}
        >
          <motion.h1
            className={`${isMobile ? "text-4xl sm:text-5xl" : isTablet ? "text-4xl" : "text-6xl lg:text-5xl xl:text-[80px]"} font-bold leading-[1.1] mb-3 md:mb-4`}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut" }}
          >
            Ayesha Naveed
          </motion.h1>

          <motion.h2
            className={`${isMobile ? "text-md" : isTablet ? "text-lg" : "text-2xl lg:text-lg xl:text-2xl"} font-medium leading-[150%] text-neon-blue opacity-90`}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.2 }}
          >
            Frontend Developer crafting fast, scalable, and human-centered web
            experiences.
          </motion.h2>

          <motion.p
            className={`${isMobile ? "text-md" : isTablet ? "text-lg" : "text-xl lg:text-lg xl:text-2xl"} text-text-muted leading-relaxed`}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.4 }}
          >
            const experience = design + performance + usability;
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 md:block hidden"
        aria-hidden="true"
        role="presentation"
      >
        <div className="c-scrolldown">
          <div className="c-line"></div>
        </div>
      </div>
    </div>
  );
}
