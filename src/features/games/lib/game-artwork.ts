export interface GameArtwork {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
}

export const gameArtwork: Record<string, GameArtwork> = {
  "gta-vi": {
    src: "/game-media/gta-vi.webp",
    alt: "Grand Theft Auto VI promotional artwork",
    credit: "Rockstar Games",
    sourceUrl: "https://www.rockstargames.com/VI/media",
  },
  fortnite: {
    src: "/game-media/fortnite.webp",
    alt: "Fortnite promotional artwork",
    credit: "Epic Games / PlayStation",
    sourceUrl: "https://www.playstation.com/en-us/games/fortnite/",
  },
  minecraft: {
    src: "/game-media/minecraft.webp",
    alt: "Minecraft promotional artwork",
    credit: "Mojang / PlayStation",
    sourceUrl: "https://www.playstation.com/en-us/games/minecraft/",
  },
  valorant: {
    src: "/game-media/valorant.webp",
    alt: "VALORANT promotional artwork",
    credit: "Riot Games / PlayStation",
    sourceUrl: "https://www.playstation.com/en-us/games/valorant/",
  },
  "counter-strike-2": {
    src: "/game-media/counter-strike-2.webp",
    alt: "Counter-Strike 2 promotional artwork",
    credit: "Valve",
    sourceUrl: "https://www.counter-strike.net/cs2",
  },
  "league-of-legends": {
    src: "/game-media/league-of-legends.webp",
    alt: "League of Legends promotional artwork",
    credit: "Riot Games",
    sourceUrl: "https://www.leagueoflegends.com/",
  },
  roblox: {
    src: "/game-media/roblox.webp",
    alt: "Roblox promotional artwork",
    credit: "Roblox / PlayStation",
    sourceUrl: "https://www.playstation.com/en-us/games/roblox/",
  },
  "genshin-impact": {
    src: "/game-media/genshin-impact.webp",
    alt: "Genshin Impact promotional artwork",
    credit: "HoYoverse / PlayStation",
    sourceUrl: "https://www.playstation.com/en-us/games/genshin-impact/",
  },
};

export function getGameArtwork(slug: string) {
  return gameArtwork[slug];
}
