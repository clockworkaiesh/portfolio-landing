"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function ArticleCarousel({ isInView }) {
  const [articles, setArticles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

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
    if (!articles.length || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % articles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [articles, prefersReducedMotion]);

  return (
    <motion.div
      className="mt-14 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      role="region"
      aria-label="Recent articles from Medium"
    >
      <p className="uppercase text-xs tracking-widest opacity-50 mb-3">
        Recent Writing
      </p>

      <div className="relative h-12 flex items-center justify-center overflow-hidden">
        {articles.map((article, i) =>
          i === activeIndex ? (
            <motion.div
              key={article.link}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
              className="absolute"
            >
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base xl:text-lg opacity-80 hover:opacity-100 transition-opacity line-clamp-2 lg:line-clamp-3"
                aria-label={`Read article: ${article.title} on Medium (opens in new tab)`}
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
        rel="noopener noreferrer"
        className="text-sm opacity-50 mt-2 inline-block hover:opacity-80 transition-opacity"
        aria-label="View all articles on Medium (opens in new tab)"
      >
        View all articles &rarr;
      </a>
    </motion.div>
  );
}
