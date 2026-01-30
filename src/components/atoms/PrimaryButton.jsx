"use client";
import { useState } from "react";

export default function PrimaryButton({ text = "Contact", onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={(e) => {
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 150);
        onClick?.(e);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative
        px-7 py-3
        bg-transparent
        rounded-full
        font-medium
        text-text-heading
        transition-all duration-500
        overflow-hidden
        group
        before:absolute before:inset-0 before:rounded-full
        before:bg-gradient-to-r before:from-dark-softer before:to-dark-light
        before:transition-all before:duration-500
        before:opacity-100
        hover:before:opacity-0
        after:absolute after:inset-0 after:rounded-full after:p-[1px]
        after:opacity-0 after:transition-opacity after:duration-500
        hover:after:opacity-100
        ${isPressed ? 'scale-[0.98]' : ''}
      `}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-full p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue/20 via-transparent to-neon-purple/20 animate-gradient-shift" />
      </div>
      
      {/* Hover gradient fill */}
      <div 
        className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r from-neon-blue/5 to-neon-purple/5
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          ${isHovered ? 'animate-shimmer' : ''}
        `}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide font-normal">
        {text}
        
        {/* Creative dot indicator */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          <div className={`
            absolute w-1 h-1 rounded-full bg-neon-blue/60
            transition-all duration-300
            ${isHovered ? 'w-4 h-4 opacity-20' : 'w-1 h-1 opacity-60'}
          `} />
          <div className={`
            absolute w-1 h-1 rounded-full bg-neon-blue
            transition-all duration-300
            ${isHovered ? 'translate-x-1' : 'translate-x-0'}
          `} />
        </div>
      </span>

      {/* Minimal animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-shimmer {
          background-size: 200% auto;
          background-image: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.03),
            transparent
          );
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </button>
  );
}