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
  title: "Ayesha Naveed | Frontend Engineer",
  description: "Ayesha Naveed's Portfolio Website",
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
