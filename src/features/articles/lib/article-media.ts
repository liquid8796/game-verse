import { expansionArtwork } from "@/features/games/lib/expansion-artwork";
import { originalInline } from "./inline-original";
import { rpgInline } from "./inline-rpg";
import { socialInline } from "./inline-social";

export interface ArticleImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  credit: string;
  sourceUrl?: string;
}

export interface ArticleIllustration {
  afterSection: string;
  /** One-based ordinary paragraph within the section; omitted means section end. */
  afterParagraph?: number;
  image: ArticleImage;
}

export interface ArticleMedia {
  cover: ArticleImage;
  illustrations?: ArticleIllustration[];
}

const minecraftCover: ArticleImage = {
  src: "/article-media/minecraft-scene.webp",
  alt: "Sandstone houses, villagers and a crop plot in a Minecraft desert village.",
  width: 1920,
  height: 1080,
  caption: "A village gives a shared world a starting point: paths to improve, buildings to adapt and room for another project.",
  credit: "Mojang Studios / PlayStation",
  sourceUrl: "https://www.playstation.com/en-us/games/minecraft/",
};

export const articleMedia: Partial<Record<string, ArticleMedia>> = {
  "gta-vi-runway": {
    cover: {
      src: "/game-media/gta-vi-official-cover-v4.webp",
      alt: "Official Grand Theft Auto VI artwork featuring Jason and Lucia against a collage of Leonida scenes.",
      width: 3840,
      height: 2160,
      caption: "Rockstar's promotional artwork introduces Jason, Lucia and the places around them. It is artwork, rather than a gameplay screenshot.",
      credit: "Rockstar Games",
      sourceUrl: "https://www.rockstargames.com/VI/media/artwork-wallpapers",
    },
  },
  "valorant-crosshair": {
    cover: {
      src: "/article-media/valorant-scene.webp",
      alt: "A first-person VALORANT view of a sunlit courtyard, with a purple rifle and an opponent ahead.",
      width: 1920,
      height: 1080,
      caption: "A crosshair has to stay readable against the map, not just against the settings preview.",
      credit: "Riot Games / PlayStation",
      sourceUrl: "https://www.playstation.com/en-us/games/valorant/",
    },
    illustrations: [{
      afterSection: "Check contrast on the map",
      image: {
        src: "/article-media/valorant-crosshair-check.svg",
        alt: "The same cyan crosshair with a thin dark outline compared against a bright wall and a dark doorway.",
        width: 1200,
        height: 720,
        caption: "Compare the same shape on different backgrounds. If contrast is the problem, test an outline before making every part of the crosshair larger.",
        credit: "GameVerse illustration",
      },
    }],
  },
  "cs2-economy": {
    cover: {
      src: "/article-media/counter-strike-2-scene.webp",
      alt: "Five Counter-Strike 2 Counter-Terrorist teammates standing together with their equipment.",
      width: 1920,
      height: 1080,
      caption: "A useful buy supports five players' attempt at the round. One expensive weapon cannot substitute for a shared plan.",
      credit: "Valve",
      sourceUrl: "https://store.steampowered.com/app/730/CounterStrike_2/",
    },
    illustrations: [{
      afterSection: "Calculate the next buy before committing",
      image: {
        src: "/article-media/cs2-buy-budget.svg",
        alt: "Hypothetical buy calculation: a 4,800-dollar next-round target minus 2,400 dollars in expected income leaves 2,400 to keep; from 3,200 dollars now, 800 can be spent.",
        width: 1200,
        height: 720,
        caption: "The article's hypothetical budget: keep $2,400 now, add $2,400 in expected income, and reach the $4,800 target. The $800 spending ceiling is an example, not a current weapon price.",
        credit: "GameVerse illustration",
      },
    }],
  },
  "minecraft-second-screen": { cover: minecraftCover },
  "fortnite-loadout": {
    cover: {
      src: "/article-media/fortnite-scene.webp",
      alt: "Three Fortnite characters look out over a green island, river and distant settlements from a grassy ridge.",
      width: 1920,
      height: 717,
      caption: "Think about the next crossing as well as the next fight. A good loadout helps you recover and reach cover.",
      credit: "Epic Games / PlayStation",
      sourceUrl: "https://www.playstation.com/en-us/games/fortnite/",
    },
    illustrations: [{
      afterSection: "Give each weapon a clear purpose",
      image: {
        src: "/article-media/fortnite-loadout-roles.svg",
        alt: "Four jobs to check in a Fortnite loadout: handle close pressure, deal damage at distance, recover and reposition.",
        width: 1200,
        height: 720,
        caption: "These are jobs to cover, not a fixed inventory. Your playlist and its available items determine which tools fill them.",
        credit: "GameVerse illustration",
      },
    }],
  },
  "release-calendar": {
    cover: {
      src: "/article-media/release-calendar-desk.webp",
      alt: "A game controller, open paper planner, pencil and coffee mug on a wooden gaming desk in warm evening light.",
      width: 1600,
      height: 900,
      caption: "A realistic plan begins with the evenings you have free, including the games you already play.",
      credit: "GameVerse editorial illustration, AI-generated",
    },
    illustrations: [{
      afterSection: "Put returning games on the calendar honestly",
      image: {
        src: "/article-media/release-planning.svg",
        alt: "An example week leaves room for two evenings with friends, one story session and several evenings without a gaming commitment.",
        width: 1200,
        height: 720,
        caption: "An example week, not a schedule to copy. Leave room around existing sessions before assigning a new release to your calendar.",
        credit: "GameVerse illustration",
      },
    }],
  },
  "league-first-week": {
    cover: {
      src: "/article-media/league-of-legends-scene.webp",
      alt: "Blue crystals and ruined stone towers surrounded by forest in Riot's Summoner's Rift illustration.",
      width: 1920,
      height: 1080,
      caption: "Summoner's Rift, illustrated in Riot's official beginner guide. Start with one role while learning how the map connects.",
      credit: "Riot Games",
      sourceUrl: "https://www.leagueoflegends.com/en-us/how-to-play/",
    },
  },
  "roblox-first-session": {
    cover: {
      src: "/article-media/roblox-scene.webp",
      alt: "A Roblox avatar stands beside planted garden plots in the Grow a Garden experience.",
      width: 1920,
      height: 1080,
      caption: "Grow a Garden is one example of a Roblox experience. Check the activity and creator before deciding what deserves another session.",
      credit: "Roblox / PlayStation",
      sourceUrl: "https://www.playstation.com/en-us/games/roblox/",
    },
  },
  "genshin-small-plan": {
    cover: {
      src: "/article-media/genshin-impact-scene.webp",
      alt: "Overgrown stone ruins and floating platforms above a Genshin Impact landscape with waterfalls and mountains.",
      width: 1920,
      height: 1080,
      caption: "Official early Genshin Impact scenery. An interesting detour can be a session's destination without becoming a region-wide checklist.",
      credit: "HoYoverse / PlayStation",
      sourceUrl: "https://www.playstation.com/en-us/games/genshin-impact/",
    },
  },
};

const bodyIllustrations: Partial<Record<string, ArticleIllustration[]>> = {
  ...originalInline,
  ...rpgInline,
  ...socialInline,
};

export function getArticleMedia(articleId: string, gameId?: string | null): ArticleMedia | undefined {
  const selected = articleMedia[articleId];
  const additional = bodyIllustrations[articleId] ?? [];
  if (selected) return { ...selected, illustrations: [...(selected.illustrations ?? []), ...additional] };
  const artwork = gameId ? expansionArtwork[gameId] : undefined;
  return artwork ? { cover: artwork, illustrations: additional } : undefined;
}
