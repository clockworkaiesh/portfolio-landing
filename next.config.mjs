/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "react-icons",
      "lucide-react",
      "three",
      "postprocessing",
      "gsap",
    ],
  },
};

export default nextConfig;
