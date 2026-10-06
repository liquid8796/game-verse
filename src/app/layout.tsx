import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: "GameVerse — Play the signal", template: "%s | GameVerse" },
  description:
    "Mainstream game news, useful guides, release radar and the stories worth opening.",
  openGraph: {
    type: "website",
    siteName: "GameVerse",
    title: "GameVerse — Play the signal",
    description:
      "Mainstream game news, useful guides, release radar and the stories worth opening.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable + " " + body.variable}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
