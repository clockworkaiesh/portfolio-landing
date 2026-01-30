"use client";
import { useState, useEffect } from "react";
import Hero from "../components/organisms/Hero";
import About from "../components/organisms/About";
import Work from "../components/organisms/Work";
import Skills from "../components/organisms/Skills";
import Footer from "../components/organisms/Footer";
import WebMenu from "../components/molecules/WebMenu";
import GlowCursor from "@/components/atoms/GlowCursor";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import Projects from "@/components/organisms/Projects";
import PageLoader from "@/components/atoms/PageLoader";
import SkipToContent from "@/components/atoms/SkipToContent";
import Image from "next/image";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SkipToContent />
      <PageLoader onFinished={() => setLoaded(true)} />

      {/* Fixed Header */}
      <header className="z-50 pointer-events-none bg-dark-default">
        <div className="layout-wrapper flex items-center justify-between py-3 pl-3 pr-5 pointer-events-auto ">
          <div
            className="cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => scrollTo("hero")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") scrollTo("hero");
            }}
            aria-label="Navigate to home section"
          >
            <Image
              src="/ayesha-naveed-logo.svg"
              alt="Ayesha Naveed"
              className="w-16 h-16 hover:opacity-80 transition-opacity duration-200"
              width={64}
              height={64}
            />
          </div>
          <PrimaryButton text="Contact" />
        </div>
      </header>

      <main id="main-content" className="relative w-full overflow-x-hidden">
        {/* Page Content */}
        <div id="page-content" className="relative z-10 bg-dark-default ">
          <div id="hero">
            <Hero />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="work">
            <Work />
          </div>

          <div
            id="projects"
            className="section min-h-screen w-full flex items-center justify-center"
          >
            <Projects />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>

      <WebMenu />
      <GlowCursor />
    </>
  );
}
