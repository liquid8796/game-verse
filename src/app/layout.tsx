/* eslint-disable @next/next/next-script-for-ga -- Raw Google tag snippet in <head> for instant crawler verification */
import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  ExoClickHead,
  ExoClickInterstitial,
  ExoClickInPagePush,
  ExoClickPopunder,
  ExoClickVideoSlider,
} from "@/components/exoclick";
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

const siteUrl = getSiteUrl();

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GameVerse",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  description:
    "Find your next game and get more out of the ones you play. Practical guides, game features, platform details and upcoming releases.",
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GameVerse",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/discover?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
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
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      process.env.GOOGLE_SITE_VERIFICATION ||
      undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : {}),
      "6a97888e-site-verification": "87c58674c7eabd0e162f44e609b0a49c",
      clckd: "185ab99214f74580f75b3dd7dfcc84e4",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable + " " + body.variable}>
      <head>
        {/* Clickadu site verification */}
        <meta name="clckd" content="185ab99214f74580f75b3dd7dfcc84e4" />

        {/* Search Engine & Feed discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="GameVerse Stories & Guides"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd),
          }}
        />

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

        {/* ExoClick verification & client hints */}
        <meta
          name="6a97888e-site-verification"
          content="87c58674c7eabd0e162f44e609b0a49c"
        />
        <ExoClickHead />
      </head>
      <body>
        <ExoClickInterstitial />
        <ExoClickPopunder />
        <ExoClickVideoSlider />
        <ExoClickInPagePush />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
