"use client";
import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import SplitText from "../atoms/SplitText";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => null,
  }
);
import SocialLinks from "../molecules/SocialLinks";
import ArticleCarousel from "../molecules/ArticleCarousel";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function Footer() {
  const footerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(footerRef, {
    once: true,
    margin: "-10%", 
  });

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 400,
  });

  const yOffset = useTransform(smoothVelocity, [-2000, 0, 2000], [-10, 0, 10]);

  // Adjust main content margin to match footer height
  useEffect(() => {
    const updateMargin = () => {
      if (footerRef.current) {
        const footerHeight = footerRef.current.offsetHeight;
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.style.marginBottom = `${footerHeight}px`;
        }
      }
    };

    // Initial update
    const timeoutId = setTimeout(updateMargin, 100); // Small delay to ensure render
    
    // Observer for resize
    const resizeObserver = new ResizeObserver(updateMargin);
    if (footerRef.current) {
        resizeObserver.observe(footerRef.current);
    }

    window.addEventListener("resize", updateMargin);
    
    return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("resize", updateMargin);
        resizeObserver.disconnect();
    };
  }, []);

  return (
    <motion.footer
      id="contact"
      ref={footerRef}
      style={prefersReducedMotion ? {} : { y: yOffset }}
      className="fixed bottom-0 left-0 h-screen w-full flex items-center justify-center -z-10 overflow-hidden bg-default-softer"
      aria-label="Contact and social links"
    >
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        className=" max-w-5xl w-full px-6 text-center relative z-50"
      >

        <SplitText
          text="Let's Talk"
          tag="h2"
          id="contact-heading"
          className="section-heading"
          stagger={0.05}
          duration={0.8}
          splitType="chars"
        />

        <SplitText
          text="Looking to turn your idea into a polished product?"
          tag="div"
          className="section-content"
          stagger={0.02}
          duration={0.3}
          splitType="lines"
        />

        <SplitText
          text="Let's make it happen."
          tag="div"
          className="section-content"
          stagger={0.02}
          duration={0.3}
          splitType="lines"
        />

        {/* Social Links */}
        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <SocialLinks stagger />
        </div>

        {/* Medium Articles */}
        <ArticleCarousel isInView={isInView} />
      </motion.div>

      {/* Lottie background */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl pointer-events-none z-0"
        style={{ filter: "grayscale(1) !important" }}
        aria-hidden="true"
      >
        <DotLottieReact
          src="https://lottie.host/f0bc37ac-2589-4af5-ade7-d0170c73bb17/jOPA0rTx5r.lottie"
          loop
          autoplay
        />
      </div>
      <div
        className="absolute top-0 left-0 rotate-20 w-full max-w-3xl pointer-events-none z-0  hidden lg:block"
        style={{ filter: "grayscale(1) !important" }}
        aria-hidden="true"
      >
        <DotLottieReact
          src="https://lottie.host/f0bc37ac-2589-4af5-ade7-d0170c73bb17/jOPA0rTx5r.lottie"
          loop
          autoplay
        />
      </div>

      {/* Floating blobs */}
      <motion.img
        className="absolute bottom-14 left-10 size-[80px] hidden md:block"
        src="/shapes/purple-blob1.webp"
        alt=""
        loading="lazy"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={isInView && !prefersReducedMotion ? { opacity: 0.6, y: [0, -20, 0] } : isInView ? { opacity: 0.6 } : {}}
        transition={{
          duration: 7,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.img
        className="absolute bottom-32 -right-10"
        src="/shapes/purple-blob2.webp"
        alt=""
        loading="lazy"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={isInView && !prefersReducedMotion ? { opacity: 0.5, y: [0, 25, 0] } : isInView ? { opacity: 0.5 } : {}}
        transition={{
          duration: 9,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.img
        className="absolute top-32 left-1/2 size-[80px]"
        src="/shapes/dots-big.webp"
        alt=""
        loading="lazy"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={isInView && !prefersReducedMotion ? { opacity: 0.4, y: [0, -15, 0] } : isInView ? { opacity: 0.4 } : {}}
        transition={{
          duration: 8,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </motion.footer>
  );
}
