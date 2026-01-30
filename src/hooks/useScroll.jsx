import { useState, useEffect, useRef } from "react";

export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is in middle of viewport
      }
    );

    sectionIds.forEach((id) => {
      // Logic: Convert "What I Do" -> "what-i-do" to match HTML IDs
      const formattedId = id.toLowerCase().replace(/\s+/g, "-");
      const element = document.getElementById(formattedId);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const formattedId = id.toLowerCase().replace(/\s+/g, "-");
        const element = document.getElementById(formattedId);
        if (element) observer.unobserve(element);
      });
    };
  }, [sectionIds]);

  return activeSection;
};

// Hook to detect when element is in viewport for fade animations (unchanged)
export const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};
