# Ayesha's Portfolio

A high-performance, animated personal portfolio built with **Next.js 15**, **React 19**, and **Three.js** — designed to leave an impression.

> Not your average developer portfolio. This one has WebGL shaders, pixel explosions, and a dock that feels like macOS.

---

## Live Demo

Deployed on **Netlify** as a fully static site.
https://www.ayesha-naveed.space
---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15.5 (App Router, Turbopack) |
| **UI Library** | React 19.1 |
| **Styling** | Tailwind CSS 3.4 + PostCSS + Autoprefixer |
| **Animation** | Framer Motion 12, GSAP 3 (ScrollTrigger), Lenis |
| **3D / WebGL** | Three.js, PostProcessing, OGL |
| **Icons** | Lucide React, React Icons |
| **Loading** | DotLottie (Lottie animations) |
| **Linting** | ESLint 9 with Next.js core-web-vitals |
| **Deployment** | Netlify (static export) |

---

## Architecture — Atomic Design

The component structure follows **Atomic Design methodology**, keeping the codebase modular, scalable, and easy to reason about:

```
src/components/
├── atoms/          # Smallest building blocks
│   ├── GlowCursor        — Interactive radial cursor glow
│   ├── SkipToContent      — Accessibility skip link
│   ├── SplitText          — Text reveal animations (char/word/line)
│   ├── HighlightedSplitText — Neon-highlighted text splits
│   ├── PrimaryButton      — CTA with micro-animations
│   ├── PageLoader         — Full-screen Lottie loader
│   ├── Magnetic           — Cursor-attracted magnetic effect
│   ├── LightRays          — OGL fragment shader light rays
│   └── PixelBlast         — Three.js pixel noise + liquid distortion
│
├── molecules/      # Meaningful combinations of atoms
│   ├── WebMenu / Dock     — macOS-style navigation dock
│   ├── SmoothScroll       — Lenis + GSAP scroll wrapper
│   ├── SkillCard          — Animated skill display
│   ├── ProjectCard        — Project showcase card
│   ├── WorkCard           — Work portfolio entry
│   ├── SocialLinks        — Social media links
│   ├── ArticleCarousel    — Medium articles carousel
│   └── FixedLightRays     — Fixed background rays
│
└── organisms/      # Full page sections
    ├── Hero               — Image carousel + intro
    ├── About              — Bio with PixelBlast background
    ├── Skills             — Technical toolkit grid
    ├── Work               — Horizontal scroll portfolio (desktop)
    ├── Projects           — Featured projects grid
    └── Footer             — Contact with parallax effects
```

**Why Atomic Design?** Each layer builds on the previous one. Atoms are reusable everywhere, molecules compose atoms into meaningful UI chunks, and organisms wire everything into full sections. This makes it trivial to swap, test, or extend any piece without touching the rest.

---

## What Makes This Stand Out

### Accessibility First
- Semantic HTML with proper landmark roles (`<main>`, `<nav>`, `<section aria-labelledby>`)
- `SkipToContent` component for keyboard users
- `prefers-reduced-motion` respected across **every** animation
- ARIA attributes on all interactive elements (`aria-label`, `aria-hidden`, `role`)
- Focus-visible outlines throughout
- Proper heading hierarchy

### Performance Obsessed
- **Tree-shaking** configured for Framer Motion, Three.js, GSAP, React Icons, Lucide, and PostProcessing via `optimizePackageImports`
- **Dynamic imports** with `ssr: false` for WebGL-heavy components
- **Static export** — zero server runtime, pure CDN delivery
- **Turbopack** for dev and build
- **WebP images** throughout, lazy-loaded where appropriate
- **`next/font`** with `font-display: swap` for zero layout shift
- **GPU-accelerated** animations using `will-change: transform` and `backface-visibility: hidden`
- **IntersectionObserver** to pause off-screen animations
- **Proper cleanup** — every `useEffect` tears down listeners, observers, and RAF loops
- **Memoization** on expensive renders

### Animation & Interaction Design
- **Framer Motion** for declarative component animations and staggered reveals
- **GSAP ScrollTrigger** for scroll-driven section animations and horizontal scroll
- **Lenis** for buttery smooth scrolling with momentum
- **Three.js PixelBlast** with custom shaders, click-triggered ripples, and liquid distortion
- **OGL LightRays** with real-time mouse influence via fragment shaders
- **macOS-style Dock** with hover magnification
- **Magnetic cursor effect** on interactive elements
- **Custom glow cursor** following mouse movement
- **SplitText** character/word/line reveal animations

### Code Quality
- Clean separation of concerns via Atomic Design
- Data-driven components (portfolio data externalized)
- Responsive design with device-aware rendering (mobile/tablet/desktop conditional logic)
- WebGL context cleanup and memory management
- Error boundaries and fallbacks for image/WebGL failures
- ESLint with Next.js core-web-vitals ruleset

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm / bun

### Installation

```bash
# Clone the repo
git clone https://github.com/clockworkaiesh/portfolio-landing/
cd portfolio-landing

# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Build

```bash
# Production build (static export to /out)
npm run build
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
portfolio-landing/
├── public/              # Static assets (images, fonts, lotties)
├── src/
│   ├── app/
│   │   ├── layout.js    # Root layout + font config + metadata
│   │   ├── page.js      # Main page (assembles all organisms)
│   │   └── globals.css  # Tailwind directives + custom keyframes
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   └── hooks/           # Custom hooks (useReducedMotion, etc.)
├── next.config.mjs      # Static export + tree-shaking config
├── tailwind.config.js   # Custom design tokens (neon palette, etc.)
├── netlify.toml         # Deployment config
└── package.json
```

---

## Design Tokens

The custom Tailwind theme includes a curated dark-mode palette:

| Token | Value | Usage |
|---|---|---|
| `dark` | `#0a0a0f` | Primary background |
| `neon-blue` | `#00f0ff` | Accent, links, focus rings |
| `neon-purple` | `#a855f7` | Secondary accent |
| `neon-green` | `#00ff88` | Success / highlights |
| `neon-pink` | `#ff00aa` | Tertiary accent |
| `logoBlue` | `#4555e3` | Brand color |

---

## License

This is a personal portfolio project. Feel free to use it as inspiration, but please don't copy it wholesale and claim it as your own. Be cool.

---

Built with a lot of caffeine and an unhealthy obsession with smooth animations.
