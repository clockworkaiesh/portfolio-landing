"use client";

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-dark-default focus:text-neon-blue focus:rounded-md focus:outline-2 focus:outline-neon-blue"
    >
      Skip to main content
    </a>
  );
}
