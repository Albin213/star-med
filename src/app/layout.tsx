import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { InquiryDrawer } from "@/components/inquiry/InquiryDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { InquiryProvider } from "@/context/InquiryContext";
import { site } from "@/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionConfig reducedMotion="user">
          <InquiryProvider>
            <Preloader />
            <SmoothScroll />
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
