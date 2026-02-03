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
import Image from "next/image";

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

  // Removed manual margin adjustment that caused forced reflows
  // Instead, the parent layout in page.js should handle the spacing/overlap via z-index and CSS Grid or Flexbox.
  // We will simply ensure the main content has enough bottom padding/margin via CSS if needed,
  // or rely on the fixed position footer revealing itself.

  return (
    <motion.footer
      id="contact"
      ref={footerRef}
      style={prefersReducedMotion ? {} : { y: yOffset }}
      className="fixed bottom-0 left-0 h-screen w-full flex items-center justify-center -z-10 overflow-hidden"
      aria-label="Contact and social links"
    >
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
        whileInView={isInView ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true }}
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
      <motion.div
        className="absolute bottom-14 left-10 size-[80px] hidden md:block"
        initial={{ opacity: 0 }}
        whileInView={!prefersReducedMotion ? { opacity: 0.6, y: [0, -20, 0] } : { opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{
          duration: 7,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <Image
          src="/shapes/purple-blob1.webp"
          alt=""
          fill
          sizes="80px"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-32 -right-3 size-[80px]"
        initial={{ opacity: 0 }}
        whileInView={!prefersReducedMotion ? { opacity: 0.5, y: [0, 25, 0] } : { opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{
          duration: 9,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <Image
          src="/shapes/purple-blob2.webp"
          alt=""
          fill
          sizes="80px"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute top-32 left-1/2 size-[80px]"
        initial={{ opacity: 0 }}
        whileInView={!prefersReducedMotion ? { opacity: 0.4, y: [0, -15, 0] } : { opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{
          duration: 8,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <Image
          src="/shapes/dots-big.webp"
          alt=""
          fill
          sizes="80px"
          className="object-contain"
        />
      </motion.div>
    </motion.footer>
  );
}
