"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

export default function Projects() {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [contentScrollY, setContentScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Crypto Dashboard",
      description: "Real-time cryptocurrency analytics with interactive charts",
      thumbnail: "/projects/crypto-dash.jpg",
      liveUrl: "https://crypto-dash.example.com",
      githubUrl: "https://github.com/yourname/crypto-dash",
      skills: ["React", "D3.js", "WebSocket", "Tailwind", "Redux"],
      category: "Web App",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Modern online store with cart and payment integration",
      thumbnail: "/projects/ecommerce.jpg",
      liveUrl: "https://store.example.com",
      githubUrl: "https://github.com/yourname/ecommerce",
      skills: ["Next.js", "Stripe", "GraphQL", "Framer Motion", "MongoDB"],
      category: "Web App",
    },
    {
      id: 3,
      title: "Portfolio Builder",
      description: "Drag-and-drop portfolio generator for creatives",
      thumbnail: "/projects/portfolio-builder.jpg",
      liveUrl: "https://portfolio-builder.example.com",
      githubUrl: "https://github.com/yourname/portfolio-builder",
      skills: ["Vue.js", "Canvas API", "Firebase", "Sass", "WebGL"],
      category: "Tool",
    },
    {
      id: 4,
      title: "Health Analytics",
      description: "Healthcare data visualization for medical professionals",
      thumbnail: "/projects/health-analytics.jpg",
      liveUrl: "https://health.example.com",
      githubUrl: null,
      skills: ["React", "D3.js", "Python", "Chart.js", "PostgreSQL"],
      category: "Dashboard",
    },
    {
      id: 5,
      title: "Design System",
      description: "Component library with design tokens and documentation",
      thumbnail: "/projects/design-system.jpg",
      liveUrl: "https://design.example.com",
      githubUrl: "https://github.com/yourname/design-system",
      skills: ["Storybook", "TypeScript", "Figma", "Jest", "CSS-in-JS"],
      category: "Library",
    },
  ];

  // Check screen size for responsive behavior
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

  // Scroll animation effect
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

  // Navigation
  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // For mobile/tablet, show single card, for desktop show 3 cards
  const getDisplayedProjects = () => {
    if (isMobile || isTablet) {
      // Show only current project on mobile/tablet
      return [projects[currentIndex]];
    } else {
      // Show 3 projects on desktop (previous, current, next)
      const total = projects.length;
      const result = [projects[currentIndex]];
      
      if (total > 1) {
        const nextIndex = (currentIndex + 1) % total;
        result.push(projects[nextIndex]);
      }
      
      if (total > 2) {
        const prevIndex = (currentIndex - 1 + total) % total;
        result.unshift(projects[prevIndex]);
      }
      
      return result;
    }
  };

  const getContentTransform = (speed, offset = 0) => {
    const translateY = (contentScrollY - 0.5) * speed + offset;
    return `translateY(${translateY}px)`;
  };

  return (
    <div 
      ref={containerRef}
      className="text-center w-screen min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 md:py-0 overflow-hidden"
    >
      {/* Parallax background gradient */}
      <div 
        className="about-parallax-bg transition-opacity duration-500 ease-out"
        style={{
          transform: `translateY(${(scrollY - 0.5) * 30}px)`,
          opacity: isVisible ? 1 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      <div 
        className="content-wrapper w-full max-w-6xl transition-all duration-500 ease-out mx-auto flex flex-col justify-center"
        style={{
          transform: `${getContentTransform(20)} ${isEntering ? 'translateY(30px)' : isExiting ? 'translateY(-30px)' : 'translateY(0px)'}`,
          opacity: isVisible && !isEntering ? 1 : 0,
          willChange: 'transform, opacity'
        }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-6 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading">
            Selected Projects
          </h2>
          
        </motion.div>

        {/* Projects Display */}
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Navigation Arrows - Hidden on mobile, shown on tablet+ */}
          {!isMobile && (
            <>
              <button
                onClick={prevProject}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-3 md:-translate-x-4 lg:-translate-x-8 z-10 p-2 sm:p-3 rounded-full bg-dark-softer/80 backdrop-blur-sm border border-dark-softer text-text-base hover:text-text-heading hover:border-neon-blue/50 transition-all duration-300"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={nextProject}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-3 md:translate-x-4 lg:translate-x-8 z-10 p-2 sm:p-3 rounded-full bg-dark-softer/80 backdrop-blur-sm border border-dark-softer text-text-base hover:text-text-heading hover:border-neon-blue/50 transition-all duration-300"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}

          {/* Projects Container */}
          <div className={`relative ${isMobile ? 'h-[380px]' : isTablet ? 'h-[450px]' : 'h-[500px]'} flex items-center justify-center px-2 sm:px-4`}>
            {getDisplayedProjects().map((project, index) => {
              // Mobile/tablet: single centered card
              if (isMobile || isTablet) {
                return (
                  <motion.div
                    key={project.id}
                    className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProjectCard project={project} isMobile={isMobile} isTablet={isTablet} />
                  </motion.div>
                );
              } else {
                // Desktop: 3-card layout
                const position = index === 1 ? "center" : index === 0 ? "left" : "right";
                const isCenter = position === "center";
                
                return (
                  <motion.div
                    key={project.id}
                    className={`absolute transition-all duration-500 ease-out ${
                      isCenter 
                        ? "w-full max-w-2xl z-30" 
                        : position === "left"
                        ? "w-full max-w-xl -translate-x-1/2 z-20 opacity-60"
                        : "w-full max-w-xl translate-x-1/2 z-20 opacity-60"
                    }`}
                    initial={{ opacity: 0, x: position === "left" ? -100 : position === "right" ? 100 : 0 }}
                    animate={{ 
                      opacity: isCenter ? 1 : 0.6,
                      x: position === "left" ? "-50%" : position === "right" ? "50%" : 0,
                      scale: isCenter ? 1 : 0.9
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProjectCard project={project} isMobile={false} isTablet={false} />
                  </motion.div>
                );
              }
            })}
          </div>

  

          {/* Project Dots Indicator */}
          <div className="flex justify-center items-center gap-3 mt-4 sm:mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "w-3 h-3 rounded-full bg-neon-blue"
                    : "w-2 h-2 rounded-full bg-dark-softer hover:bg-text-muted"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate ProjectCard component for cleaner code
function ProjectCard({ project, isMobile, isTablet }) {
  return (
    <div className="bg-dark-light border border-dark-softer rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:border-neon-blue/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]">
      {/* Thumbnail */}
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-gradient-to-br from-dark-softer to-dark-light">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-gradient-to-br from-dark-softer to-dark-light border border-dark-softer flex items-center justify-center">
              <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-neon-blue`}>
                {project.id}
              </div>
            </div>
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-neon-blue`}>
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <h3 className={`${isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-xl'} font-bold text-text-heading mb-2 sm:mb-3 line-clamp-2`}>
          {project.title}
        </h3>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-text-muted mb-4 sm:mb-6 line-clamp-2`}>
          {project.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {project.skills.slice(0, isMobile ? 2 : 3).map((skill) => (
            <span
              key={skill}
              className={`px-2 py-1 ${isMobile ? 'text-xs' : 'text-xs'} rounded-md bg-dark-softer text-text-base`}
            >
              {skill}
            </span>
          ))}
          {project.skills.length > (isMobile ? 2 : 3) && (
            <span className={`px-2 py-1 ${isMobile ? 'text-xs' : 'text-xs'} rounded-md bg-dark-softer text-text-base`}>
              +{project.skills.length - (isMobile ? 2 : 3)}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 border-t border-dark-softer pt-3 sm:pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-sm font-medium text-neon-blue hover:text-neon-purple transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Live Site</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-sm font-medium text-text-muted hover:text-text-base transition-colors"
            >
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}