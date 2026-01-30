import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Ayesha Naveed",
  description: "Ayesha Naveed's Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
