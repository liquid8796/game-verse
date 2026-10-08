import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GameVerse — Game Guides, Features & Releases",
    short_name: "GameVerse",
    description:
      "Find your next game and get more out of the ones you play. Practical guides, game features, platform details and upcoming releases.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0e14",
    theme_color: "#0b0e14",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
