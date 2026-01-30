"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function SkillCard({ skill, isMobile, isTablet, getCategoryColor, getCardPadding, getIconSize, getTextSize, itemVariants }) {
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const floatingAnimation = prefersReducedMotion
    ? {}
    : { y: [0, -3, 0] };

  const floatingTransition = prefersReducedMotion
    ? {}
    : { duration: 3, repeat: Infinity, ease: "easeInOut" };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={prefersReducedMotion ? {} : {
        y: isMobile ? -4 : isTablet ? -6 : -8,
        scale: isMobile ? 1.03 : isTablet ? 1.04 : 1.05,
        transition: { type: "spring", stiffness: 300 },
      }}
      className="relative group h-full"
    >
      <motion.div
        className={`absolute inset-0 rounded-xl sm:rounded-2xl ${getCategoryColor(skill.category)} opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${isMobile ? 'blur-md' : 'blur-lg'}`}
        aria-hidden="true"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={prefersReducedMotion ? {} : {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl ${getCardPadding()} flex flex-col items-center justify-center h-full transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20`}>
        {/* Category indicator */}
        {!isMobile && (
          <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2" aria-hidden="true">
            <motion.div
              className={`${isTablet ? 'w-2.5 h-2.5' : 'w-3 h-3'} rounded-full ${getCategoryColor(skill.category)}`}
              animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* Skill icon with floating animation */}
        <motion.div
          className={`${getIconSize()} mb-2 sm:mb-3 lg:mb-4 relative`}
          animate={floatingAnimation}
          transition={floatingTransition}
        >
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent ${isMobile ? 'blur-sm' : 'blur-md'}`} aria-hidden="true" />
          {imgError ? (
            <div className={`w-full h-full flex items-center justify-center ${getTextSize()} font-bold text-white relative z-10`}>
              {skill.name.charAt(0)}
            </div>
          ) : (
            <img
              src={skill.image}
              alt={skill.name}
              className="w-full h-full object-contain relative z-10"
              onError={() => setImgError(true)}
            />
          )}
        </motion.div>

        {/* Skill name */}
        <motion.span
          className={`${getTextSize()} font-medium text-white text-center leading-tight`}
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {skill.name}
        </motion.span>

        {/* Category tag */}
        {!isMobile && (
          <span className={`text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isTablet ? 'hidden group-hover:block' : ''}`}>
            {skill.category}
          </span>
        )}
      </div>
    </motion.div>
  );
}
