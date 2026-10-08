import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import Topbar from "@/components/Topbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Torvault Safe Company | Fire & High-Security Safes, Canada",
  description:
    "Torvault engineers UL-rated fire and burglary safes — from UL 72 fire protection to UL TL-30 tool resistance — for Canadian businesses and dealers.",
  icons: { icon: "/icon-blue.png" },
};

export const viewport: Viewport = {
  themeColor: "#0b1d3a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body className="theme-light">
        <Topbar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
