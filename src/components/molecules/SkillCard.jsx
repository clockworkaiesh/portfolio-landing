"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function SkillCard({ skill, isMobile, isTablet, getCategoryColor, getCardPadding, getIconSize, getTextSize, itemVariants }) {
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={itemVariants}
      whileHover={prefersReducedMotion ? {} : {
        y: isMobile ? -4 : isTablet ? -6 : -8,
        scale: isMobile ? 1.03 : isTablet ? 1.04 : 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative group h-full"
    >
      <div
        className={`absolute inset-0 rounded-xl sm:rounded-2xl ${getCategoryColor(skill.category)} opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${isMobile ? 'blur-md' : 'blur-lg'}`}
        aria-hidden="true"
      />

      <div className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl ${getCardPadding()} flex flex-col items-center justify-center h-full transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20`}>
        {/* Category indicator */}
        {!isMobile && (
          <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2" aria-hidden="true">
            <div className={`${isTablet ? 'w-2.5 h-2.5' : 'w-3 h-3'} rounded-full ${getCategoryColor(skill.category)}`} />
          </div>
        )}

        {/* Skill icon */}
        <div className={`${getIconSize()} mb-2 sm:mb-3 lg:mb-4 relative`}>
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent ${isMobile ? 'blur-sm' : 'blur-md'}`} aria-hidden="true" />
          {imgError ? (
            <div className={`w-full h-full flex items-center justify-center ${getTextSize()} font-bold text-white relative z-10`}>
              {skill.name.charAt(0)}
            </div>
          ) : (
            <Image
              src={skill.image}
              alt={skill.name}
              fill
              sizes="(max-width: 768px) 48px, 64px"
              className="object-contain relative z-10"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Skill name */}
        <span className={`${getTextSize()} font-medium text-white text-center leading-tight transition-opacity duration-200 opacity-80 group-hover:opacity-100`}>
          {skill.name}
        </span>

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
