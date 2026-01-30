"use client";
import { useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import WebMenu from "../components/WebMenu";
import GlowCursor from "@/components/GlowCursor";
import PrimaryButton from "@/components/PrimaryButton";
import Projects from "@/components/Projects";
import PageLoader from "@/components/PageLoader";
import Image from "next/image";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
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

      <main className="relative w-full overflow-x-hidden">
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

          <section
            id="projects"
            className="section min-h-screen w-full flex items-center justify-center"
          >
            <Projects />
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </main>

      <WebMenu />
      <GlowCursor />
    </>
  );
}
