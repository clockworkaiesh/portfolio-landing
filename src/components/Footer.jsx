"use client";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
} from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SplitText from "./SplitText";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const [articles, setArticles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const footerRef = useRef(null);
  const isInView = useInView(footerRef, {
    once: true,
    margin: "-20%",
  });

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 400,
  });

  const yOffset = useTransform(smoothVelocity, [-2000, 0, 2000], [-20, 0, 20]);

  useEffect(() => {
    async function loadArticles() {
      const cached = sessionStorage.getItem("mediumArticles");
      if (cached) {
        setArticles(JSON.parse(cached));
        return;
      }
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ayeshanaved23",
        );

        const data = await res.json();

        const latest = data.items.slice(0, 4).map((item) => ({
          title: item.title,
          link: item.link,
        }));

        setArticles(latest);
        sessionStorage.setItem("mediumArticles", JSON.stringify(latest));
      } catch (err) {
        console.error("Medium fetch failed", err);
      }
    }

    loadArticles();
  }, []);
  useEffect(() => {
    if (!articles.length) return;

    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % articles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [articles]);

  return (
    <motion.footer
      id="contact"
      ref={footerRef}
      style={{ y: yOffset }}
      className="sticky bottom-0 h-screen w-full flex items-center justify-center z-0 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className=" max-w-5xl w-full px-6 text-center "
      >
        <SplitText
          text="Let's Talk"
          tag="h2"
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

        {/* --- Medium Articles --- */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="uppercase text-xs tracking-widest opacity-50 mb-3">
            Recent Writing
          </p>

          <div className="relative h-12 flex items-center justify-center overflow-hidden">
            {articles.map((article, i) =>
              i === activeIndex ? (
                <motion.div
                  key={article.link}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute"
                >
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base xl:text-lg opacity-80 hover:opacity-100 transition-opacity line-clamp-2 lg:line-clamp-3"
                  >
                    {article.title}
                  </a>
                </motion.div>
              ) : null,
            )}
          </div>

          <a
            href="https://medium.com/@ayeshanaved23"
            target="_blank"
            className="text-sm opacity-50 mt-2 inline-block hover:opacity-80 transition-opacity"
          >
            View all articles →
          </a>
        </motion.div>
      </motion.div>

      {/* Lottie background */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl pointer-events-none z-0"
        style={{ filter: "grayscale(1) !important" }}
      >
        <DotLottieReact
          src="https://lottie.host/f0bc37ac-2589-4af5-ade7-d0170c73bb17/jOPA0rTx5r.lottie"
          loop
          autoplay
        />
      </div>
      <div
        className="absolute top-0 left-0 rotate-20 w-full max-w-3xl pointer-events-none z-0"
        style={{ filter: "grayscale(1) !important" }}
      >
        <DotLottieReact
          src="https://lottie.host/f0bc37ac-2589-4af5-ade7-d0170c73bb17/jOPA0rTx5r.lottie"
          loop
          autoplay
        />
      </div>
      {/* Floating blobs */}

      <motion.img
        className="absolute bottom-14 left-10 size-[80px]"
        src="/shapes/purple-blob1.png"
        alt=""
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6, y: [0, -20, 0] } : {}}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.img
        className="absolute bottom-32 -right-10"
        src="/shapes/purple-blob2.png"
        alt=""
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5, y: [0, 25, 0] } : {}}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.img
        className="absolute top-32 left-1/2 size-[80px]"
        src="/shapes/dots-big.png"
        alt=""
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4, y: [0, -15, 0] } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </motion.footer>
  );
}
