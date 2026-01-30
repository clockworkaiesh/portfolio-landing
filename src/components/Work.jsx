"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import SplitText from "./SplitText";
import portfolioData from "../portfolioData.js";

gsap.registerPlugin(ScrollTrigger);

const PixelBlast = dynamic(() => import("./PixelBlast"), { ssr: false });

function WorkCard({ item }) {
  return (
    <div className="bg-dark-light border border-dark-softer rounded-2xl overflow-hidden transition-all duration-300 hover:border-neon-blue/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] flex flex-col">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-dark-softer to-dark-light">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <h3 className="text-xl sm:text-2xl font-bold text-text-heading mb-3">
          {item.title}
        </h3>
        <p className="text-sm sm:text-base text-text-muted leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Work() {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const panels = gsap.utils.toArray(".work-panel");
    if (!panels.length) return;

    const timeout = setTimeout(() => {
      if (!containerRef.current || !triggerRef.current) return;

      const ctx = gsap.context(() => {
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 0.5,
            end: () => "+=" + (containerRef.current?.scrollWidth ?? 0 - window.innerWidth),
            invalidateOnRefresh: true,
          },
        });
      }, triggerRef);

      triggerRef.current._gsapCtx = ctx;
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (triggerRef.current?._gsapCtx) {
        triggerRef.current._gsapCtx.revert();
      }
    };
  }, [isMobile]);

  return (
    <div className="vertical-spacing">
      {/* Header */}
      <div className="pb-12 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <SplitText
          text="What do I do?"
          tag="h2"
          className="section-heading"
          stagger={0.05}
          duration={0.7}
          splitType="chars"
          threshold={0.3}
          rootMargin="0px"
        />
        <SplitText
          text="I build polished, production-ready web experiences — from animated landing pages and decentralized apps to multilingual business sites. With hands-on expertise across React, Next.js, Web3, GSAP, and modern CSS, I turn complex requirements into seamless, responsive interfaces."
          tag="p"
          className="paragraph"
          stagger={0.02}
          duration={0.6}
          splitType="words"
          threshold={0.3}
          rootMargin="0px"
        />
      </div>

      {isMobile ? (
        /* Mobile: Stacked cards */
        <div className="grid grid-cols-1 gap-6 px-4 sm:px-6 max-w-4xl mx-auto pb-12">
          {portfolioData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <WorkCard item={item} />
            </motion.div>
          ))}
        </div>
      ) : (
        /* Desktop: Horizontal scroll */
        <div ref={triggerRef} className="relative overflow-hidden">
          <div className="w-full h-full absolute inset-0 opacity-20 pointer-events-none z-0">
            <PixelBlast
              variant="circle"
              pixelSize={6}
              color="#B19EEF"
              patternScale={3}
              patternDensity={1.2}
              pixelSizeJitter={0.5}
              enableRipples={false}
              speed={0.6}
              edgeFade={0.25}
              transparent
            />
          </div>

          <div
            ref={containerRef}
            className="flex flex-nowrap relative z-10"
            style={{ width: `${portfolioData.length * 100}%` }}
          >
            {portfolioData.map((project) => (
              <div
                key={project.id}
                className="pl-5 work-panel h-screen flex items-center justify-center"
                style={{ width: `${100 / portfolioData.length}%` }}
              >
                <div className="layout-wrapper">
                  <div className="rounded-2xl overflow-hidden flex flex-row backdrop-blur-md">
                    <div className="relative rounded-2xl h-[400px] w-1/2 overflow-hidden bg-gradient-to-br from-dark-softer to-dark-light">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain rounded-2xl"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 sm:p-8 lg:w-1/2 text-left flex flex-col justify-center">
                      <h3 className="text-2xl sm:text-3xl font-bold text-text-heading mb-4">
                        {project.title}
                      </h3>
                      <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-6">
                        {project.description}
                      </p>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
