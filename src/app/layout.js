import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/molecules/SmoothScroll";
import Footer from "../components/organisms/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.ayesha-naveed.space"),
  title: "Ayesha Naveed | Frontend Engineer",
  description: "Frontend Engineer specializing in React, Next.js, and modern web technologies. Explore my portfolio of creative and performant web applications.",
  keywords: ["Frontend Engineer", "React Developer", "Next.js", "Web Development", "Portfolio", "Ayesha Naveed"],
  authors: [{ name: "Ayesha Naveed" }],
  creator: "Ayesha Naveed",
  
  // Open Graph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ayesha-naveed.space",
    title: "Ayesha Naveed | Frontend Engineer",
    description: "Frontend Engineer specializing in React, Next.js, and modern web technologies. Explore my portfolio of creative and performant web applications.",
    siteName: "Ayesha Naveed Portfolio",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Ayesha Naveed - Frontend Engineer Portfolio",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Ayesha Naveed | Frontend Engineer",
    description: "Frontend Engineer specializing in React, Next.js, and modern web technologies. Explore my portfolio of creative and performant web applications.",
    images: ["/thumbnail.png"],
    creator: "@ayeshanaveed", // Update with actual Twitter handle if available
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <SmoothScroll>
          {/* Main content wrapper with background to cover fixed footer */}
          <div className="relative z-10 bg-[#0a0f1c] mb-[100vh]" id="main-content">
            {children}
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
