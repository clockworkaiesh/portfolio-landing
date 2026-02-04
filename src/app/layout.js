import { Montserrat } from "next/font/google";
import "./globals.css";
import ScrollManager from "../components/molecules/ScrollManager";
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
        {/* Fixed background for performance */}
        <div
          className="fixed inset-0 -z-50 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 20% 30%, #1a2233 0%, #0a0f1c 40%, #0a0f1c 100%),
            linear-gradient(135deg, #0a0f1c 0%, #1a2233 25%, #0a0f1c 50%, #2a3245 75%, #0a0f1c 100%)`
          }}
        />
        <ScrollManager>
          {/* Main content wrapper with background to cover fixed footer */}
          <div className="relative z-10 bg-[#0a0f1c] mb-[100vh]" id="main-content">
            {children}
          </div>
          <Footer />
        </ScrollManager>
      </body>
    </html>
  );
}
