"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SplitText from "./SplitText";

export default function Projects() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const projects = [
    {
      id: 1,
      title: "BubsyAI Landing Page",
      description: "A product landing page for BubsyAI featuring smooth GSAP micro-animations and a clean, responsive layout.",
      liveUrl: "https://app.netlify.com/projects/bubsy-ai-landingpage/",
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
      liveUrl: "https://next-gpu-landing.netlify.app",
      githubUrl: null,
      skills: ["Next.js", "GSAP", "Three.js", "Styled Components", "Tailwind CSS"],
      category: "Landing Page",
      banner: "/work/next-gpu-landing.webp"
    },
    {
      id: 4,
      title: "GeneAlpha",
      description: "A product website for GeneAlpha built with React and Framer Motion animations, featuring markdown-driven content and smooth navigation.",
      liveUrl: "https://genealpha-landing.netlify.app/token",
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-center w-screen min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 vertical-spacing overflow-hidden"
    >
      <div
        className="w-full max-w-6xl mx-auto transition-opacity duration-700"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <SplitText
            text="Selected Projects"
            tag="h2"
            className="section-heading"
            stagger={0.05}
            duration={0.7}
            splitType="chars"
            threshold={0.3}
            rootMargin="0px"
          />
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="bg-dark-light border border-dark-softer rounded-2xl overflow-hidden transition-all duration-300 hover:border-neon-blue/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] h-full flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-dark-softer to-dark-light">
        <img
          src={project.banner}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-text-heading mb-2 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-[13px] text-text-muted mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="px-2 py-1 text-xs rounded-md bg-dark-softer text-text-base">
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="relative group/tooltip px-2 py-1 text-xs rounded-md bg-dark-softer text-text-base cursor-pointer">
              +{project.skills.length - 3}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg bg-dark-softer border border-dark-softer text-text-base whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 z-10">
                {project.skills.slice(3).join(', ')}
              </span>
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 border-t border-dark-softer pt-4 mt-auto">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-neon-blue hover:text-neon-purple transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="text-xs sm:text-sm">Live Site</span>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text-base transition-colors">
              <Github className="w-3.5 h-3.5" />
              <span className="text-xs sm:text-sm">Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
