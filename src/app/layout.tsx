import type { Metadata, Viewport } from "next";
import { MotionConfig } from "motion/react";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import type { ReactNode } from "react";
import { InquiryDrawer } from "@/components/inquiry/InquiryDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { Spotlight } from "@/components/ui/Spotlight";
import { InquiryProvider } from "@/context/InquiryContext";
import { site } from "@/data/site";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

const title = "STARMED General Trading LLC | Healthcare & Pharmaceutical Distribution UAE & GCC";
const description =
  "Official B2B website of STARMED General Trading LLC, established in 2020 in Abu Dhabi. Sister company of Dada Drug Store LLC. Serving over 2,000 outlets across UAE and GCC with owned brands STARMED, DADA, Mediz, and Dr.Care.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | STARMED General Trading LLC" },
  description,
  keywords: [
    "STARMED",
    "Dada Drug Store",
    "pharmaceutical distribution UAE",
    "Abu Dhabi healthcare",
    "medical supplies GCC",
    "DADA condoms",
    "Mediz thermometer",
    "Dr.Care serums",
    "Dermavia",
    "Rosemary Mint",
  ],
  openGraph: {
    title: "STARMED General Trading LLC | Healthcare & Pharmaceutical Distribution",
    description: "Official product catalogue and pharmaceutical distribution for UAE and GCC.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <MotionConfig reducedMotion="user">
          <InquiryProvider>
            <Preloader />
            <SmoothScroll />
            <Spotlight />
            <Cursor />
            <Header />
            <main>{children}</main>
            <Footer />
            <InquiryDrawer />
          </InquiryProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
