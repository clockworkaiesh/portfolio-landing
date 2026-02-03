"use client";

import useReducedMotion from "../../hooks/useReducedMotion";

export default function BlobBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
      {/* Primary Blob */}
      <div 
        className={`absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 mix-blend-screen opacity-20 filter blur-xl ${!prefersReducedMotion ? 'animate-blob-float' : ''}`}
        style={{ transform: 'translateZ(0)' }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4555e3" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-18,89.1,-2.9C88.1,12.3,83.5,27.1,75.4,40.1C67.3,53.1,55.7,64.2,42.3,71.1C28.9,78,13.7,80.7,-0.7,81.9C-15.1,83.1,-29.4,82.8,-42.6,76.5C-55.8,70.2,-67.9,57.9,-75.7,43.5C-83.5,29.1,-87,12.6,-85.4,-3C-83.8,-18.6,-77.1,-33.2,-67.3,-45.5C-57.5,-57.8,-44.6,-67.8,-31.2,-75.4C-17.8,-83,-3.9,-88.2,9.6,-87.4C23.1,-86.6,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Secondary Blob */}
      <div 
        className={`absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 mix-blend-screen opacity-20 filter blur-xl ${!prefersReducedMotion ? 'animate-blob-float-reverse' : ''}`}
        style={{ transform: 'translateZ(0)' }}
      >
         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#00f0ff" d="M41.7,-68.9C54.1,-62.7,64.6,-53.2,72.6,-42.1C80.6,-31,86.1,-18.3,84.9,-6.1C83.7,6.1,75.8,17.8,67.3,28.8C58.8,39.8,49.7,50.1,38.8,57.8C27.9,65.5,15.2,70.6,2,67.2C-11.2,63.8,-24.9,51.9,-37.8,41.9C-50.7,31.9,-62.8,23.8,-68.1,13C-73.4,2.2,-71.9,-11.3,-66.2,-23.4C-60.5,-35.5,-50.6,-46.2,-39.3,-52.8C-28,-59.4,-15.3,-61.9,-1.6,-59.1C12.1,-56.3,29.3,-75.1,41.7,-68.9Z" transform="translate(100 100)" />
        </svg>
      </div>
    </div>
  );
}
