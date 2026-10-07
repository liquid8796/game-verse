/* eslint-disable @next/next/next-script-for-ga -- Raw Google tag snippet in <head> for instant crawler verification */
import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AdcashAds, AdcashHead } from "@/components/AdcashAds";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0e14",
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "GameVerse — Game Guides, Features & Releases",
    template: "%s | GameVerse",
  },
  description:
    "Find your next game and get more out of the ones you play. Practical guides, game features, platform details and upcoming releases.",
  keywords: [
    "game news",
    "gaming guides",
    "video games",
    "release radar",
    "game reviews",
    "GameVerse",
    "PC games",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
  ],
  authors: [{ name: "GameVerse Editorial Team" }],
  creator: "GameVerse",
  publisher: "GameVerse",
  applicationName: "GameVerse",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getSiteUrl(),
    siteName: "GameVerse",
    title: "GameVerse — Game Guides, Features & Releases",
    description:
      "Practical guides, game features and release information for your next session.",
    images: [{ url: "/game-media/gta-vi-official-cover-925e8e0e.webp", alt: "Grand Theft Auto VI promotional artwork" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GameVerse — Game Guides, Features & Releases",
    description:
      "Practical guides, game features and release information for your next session.",
    images: ["/game-media/gta-vi-official-cover-925e8e0e.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable + " " + body.variable}>
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PQES332NL4"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-PQES332NL4');`,
          }}
        />
        <meta name="google-adsense-account" content="ca-pub-7851683096379872" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7851683096379872"
          crossOrigin="anonymous"
        />
        <AdcashHead />
      </head>
      <body>
        <SiteHeader />
        <AdcashAds />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
