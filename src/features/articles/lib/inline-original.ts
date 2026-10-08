import type { ArticleIllustration } from "./article-media";

/** Figures anchored beside the paragraph they explain, separate from story covers. */
export const originalInline: Partial<Record<string, ArticleIllustration[]>> = {
  "gta-vi-runway": [
    {
      afterSection: "The people matter more than a map estimate",
      afterParagraph: 1,
      image: {
        src: "/article-media/body/original/gta-jason-lucia.webp",
        alt: "Lucia holds a pistol beside Jason, with the Vice City skyline and a helicopter behind them.",
        width: 1600,
        height: 900,
        caption: "Jason and Lucia in a screenshot released by Rockstar. Their partnership is the premise to follow here; this selected scene does not establish how the finished game plays.",
        credit: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI/media/screenshots",
      },
    },
    {
      afterSection: "Watch once for mood, then again for questions",
      afterParagraph: 1,
      image: {
        src: "/article-media/body/original/gta-vice-city.webp",
        alt: "A jet flies above the large Vice City sign and palm trees at sunset in an official GTA VI screenshot.",
        width: 1600,
        height: 900,
        caption: "Rockstar's Vice City scene conveys a place and a mood. It leaves practical questions about controls, readability and performance for other evidence to answer.",
        credit: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI/media/screenshots",
      },
    },
  ],
  "minecraft-second-screen": [
    {
      afterSection: "The place remembers the decisions",
      afterParagraph: 2,
      image: {
        src: "/article-media/body/original/minecraft-first-shelter.webp",
        alt: "A small, uneven dirt shelter with an open doorway stands in a grassy Minecraft landscape.",
        width: 1280,
        height: 720,
        caption: "The first dirt shelter from Mojang's 2017 beginner guide. An awkward little building can become a shared world's most familiar landmark, even after better houses arrive.",
        credit: "Mojang Studios",
        sourceUrl: "https://www.minecraft.net/en-us/article/how-minecraft",
      },
    },
  ],
  "league-first-week": [
    {
      afterSection: "Practice getting paid",
      afterParagraph: 1,
      image: {
        src: "/article-media/body/original/league-last-hit.svg",
        alt: "Two stages of a last-hit exercise: wait while a minion has more health than your attack can remove, then attack when the hit will finish it.",
        width: 1200,
        height: 720,
        caption: "An illustrated timing exercise for farming lane champions. The bars show the idea, not a fixed health threshold: your champion's attack must deliver the finishing damage. Support income follows different responsibilities.",
        credit: "GameVerse illustration",
        sourceUrl: "https://www.leagueoflegends.com/en-us/how-to-play/",
      },
    },
  ],
  "roblox-first-session": [
    {
      afterSection: "Inspect the page, then test the game",
      afterParagraph: 2,
      image: {
        src: "/article-media/body/original/roblox-driving-empire.webp",
        alt: "Roblox drivers sit in brightly colored stock cars at a racetrack in a Driving Empire promotional screenshot.",
        width: 1600,
        height: 900,
        caption: "Driving Empire, shown in Roblox's PlayStation gallery, asks different things of a player than a gardening or building experience. Test the basic controls on your device before judging the activity or its extras.",
        credit: "Driving Empire / Roblox / PlayStation",
        sourceUrl: "https://www.playstation.com/en-us/games/roblox/",
      },
    },
  ],
  "genshin-small-plan": [
    {
      afterSection: "Learn the characters already in your party",
      afterParagraph: 1,
      image: {
        src: "/article-media/body/original/genshin-jean-skill.webp",
        alt: "Jean uses a green Anemo wind effect to lift enemies in a grassy, rocky Genshin Impact landscape.",
        width: 1600,
        height: 900,
        caption: "Jean's wind effect in an early official Genshin scene. Watching what an ability actually does is a useful start; read its description before deciding where it belongs in your party's sequence.",
        credit: "HoYoverse / PlayStation",
        sourceUrl: "https://www.playstation.com/en-us/games/genshin-impact/",
      },
    },
  ],
};
