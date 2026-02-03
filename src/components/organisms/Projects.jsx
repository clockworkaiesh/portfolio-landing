"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import SplitText from "../atoms/SplitText";
import ProjectCard from "../molecules/ProjectCard";
import useReducedMotion from "../../hooks/useReducedMotion";
import DoodleArrow from "../atoms/DoodleArrow";

export default function Projects() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const projects = [
    {
      id: 1,
      title: "BubsyAI Landing Page",
      description: "A product landing page for BubsyAI featuring smooth GSAP micro-animations and a clean, responsive layout.",
      liveUrl: "https://bubsy-ai-landingpage.netlify.app/",
      githubUrl: "https://github.com/techthreeio/bubsy-v2",
      skills: ["React", "Tailwind CSS", "GSAP"],
      category: "Landing Page",
      banner: "/work/bubsy-ai-landing.webp"
    },
    {
      id: 2,
      title: "BubsyAI dApp",
      description: "A decentralized application for BubsyAI with Web3 wallet integration, real-time data via WebSockets, and interactive charts.",
      liveUrl: "https://bubsyai-dapp.netlify.app/",
      githubUrl: "https://github.com/techthreeio/vibescope-dapp",
      skills: ["React", "Wagmi", "Ethers.js", "Redux", "Tailwind CSS", "Socket.IO"],
      category: "dApp",
      banner: "/work/bubsy-dapp.webp"
    },
    {
      id: 3,
      title: "NextGPU",
      description: "A fully animated landing page for NextGPU driven by GSAP ScrollTrigger, featuring 3D visuals with Three.js and smooth Lenis scrolling.",
      liveUrl: "https://next-gpu-landing.netlify.app/",
      githubUrl: null,
      skills: ["Next.js", "GSAP", "Three.js", "Styled Components", "Tailwind CSS"],
      category: "Landing Page",
      banner: "/work/next-gpu-landing.webp"
    },
    {
      id: 4,
      title: "GeneAlpha",
      description: "A product website for GeneAlpha built with React and Framer Motion animations, featuring markdown-driven content and smooth navigation.",
      liveUrl: "https://genealpha-landing.netlify.app/",
      githubUrl: null,
      skills: ["React", "Tailwind CSS", "Framer Motion", "GSAP"],
      category: "Web App",
      banner: "/work/gene-alpha-landing.webp"
    },
    {
      id: 5,
      title: "NSCO",
      description: "A multilingual business website built with Next.js, featuring i18n support, interactive flow diagrams, and GSAP-powered animations.",
      liveUrl: "https://nsco-landing.netlify.app/",
      githubUrl: "https://github.com/NXT-Labs/nsco-website",
      skills: ["Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "i18next"],
      category: "Web App",
      banner: "/work/NSCO.webp"
    },
  ];



  return (
    <section
      ref={containerRef}
      aria-labelledby="projects-heading"
      className="text-center w-screen min-h-screen flex flex-col justify-center items-center vertical-spacing overflow-visible relative"
    >
       {/* Doodle Arrow - Left */}
       <div className="absolute top-1/3 xl:-left-5 2xl:left-10 hidden 2xl:block w-32 h-32">
         <DoodleArrow variant="curve-right" className="rotate-12" />
       </div>

       {/* Doodle Arrow - Right */}
       <div className="absolute top-2/3 right-10 hidden xl:block w-32 h-32">
         <DoodleArrow variant="curve-right" className="rotate-[220deg]" />
       </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <SplitText
            text="Selected Projects"
            tag="h2"
            id="projects-heading"
            className="section-heading"
            stagger={0.05}
            duration={0.7}
            splitType="chars"
            threshold={0.3}
            rootMargin="0px"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.95 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: "easeOut"
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
