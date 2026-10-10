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
    {
      afterSection: "Ask what the setting could contribute to the story",
      afterParagraph: 1,
      image: {
        src: "/article-media/body/deeper-original/gta-leonida-keys.webp",
        alt: "A seaplane passes above Leonida Keys, with a bridge joining islands and the distant city skyline across the water.",
        width: 1600,
        height: 900,
        caption: "Rockstar's official Leonida Keys screenshot connects quiet islands to a city on the horizon. It supports a question about how different places could shape a journey, rather than establishing the playable map or a mission.",
        credit: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI/only-in-leonida",
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
    {
      afterSection: "A bridge shows how shared work can stay flexible",
      afterParagraph: 2,
      image: {
        src: "/article-media/body/deeper-original/minecraft-quartz-bridge.webp",
        alt: "Chipster70's pale quartz bridge crosses a Minecraft river between grass and sand, with lanterns lighting the railings at night.",
        width: 920,
        height: 518,
        caption: "Chipster70's quartz bridge, featured by Mojang in 2019. A crossing gives a project a visible purpose; this finished community build is a reference for the result, rather than the imagined group's construction process above.",
        credit: "Chipster70 / Mojang Studios",
        sourceUrl: "https://www.minecraft.net/en-us/article/build-with-it--quartz",
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
    {
      afterSection: "Compare two recalls before choosing one",
      afterParagraph: 2,
      image: {
        src: "/article-media/body/deeper-original/league-recall.svg",
        alt: "Two hypothetical recall situations: enemy minions approach your turret, or your wave has reached the enemy turret. Safety and health affect whether leaving is sensible.",
        width: 1200,
        height: 720,
        caption: "The two recall examples separate having a purchase ready from having a safe opportunity to leave. Actual health, champions, wave position and nearby players can change either decision; the sketch is not an automatic rule.",
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
    {
      afterSection: "Read the duration of a purchase as carefully as its price",
      afterParagraph: 2,
      image: {
        src: "/article-media/body/deeper-original/roblox-purchase-duration.svg",
        alt: "Three invented Roblox racing offers compare a one-time garage-access pass, a repeatable boost for one attempt and a renewing monthly club subscription.",
        width: 1200,
        height: 720,
        caption: "Invented offers make the commitment visible: a pass, a repeatable product and a subscription ask different questions. None is a real shop listing. Read the actual benefit, duration, price and renewal terms before deciding.",
        credit: "GameVerse illustration",
        sourceUrl: "https://create.roblox.com/docs/production/monetization/passes",
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
    {
      afterSection: "Diagnose a party that works once and struggles afterward",
      afterParagraph: 2,
      image: {
        src: "/article-media/body/deeper-original/genshin-party-test.svg",
        alt: "Three observations in a repeatable party test point to different checks: unavailable burst to energy, competing field time to talent descriptions, and interrupted actions to survival.",
        width: 1200,
        height: 720,
        caption: "Start with the problem that repeats in your own party. This diagnostic example supplies no fixed rotation or numerical build: inspect the actual talents and equipment, change one contribution, and try a comparable encounter again.",
        credit: "GameVerse illustration",
        sourceUrl: "https://wiki.hoyolab.com/pc/genshin/aggregate/tutorial",
      },
    },
  ],
  "valorant-crosshair": [
    {
      afterSection: "Give a missed first shot the right explanation",
      afterParagraph: 2,
      image: {
        src: "/article-media/body/deeper-original/valorant-first-shot.svg",
        alt: "Three conceptual missed-shot cues compare a hard-to-find center, aim starting below a target, and shooting while moving, with a separate practice task for each.",
        width: 1200,
        height: 720,
        caption: "Three similar misses can begin with different problems. Test contrast when the center disappears, placement when it begins too low, and stopping when movement continues. These are enlarged conceptual cues, rather than gameplay or an accuracy measurement.",
        credit: "GameVerse illustration",
        sourceUrl: "https://playvalorant.com/en-us/news/announcements/beginners-guide/",
      },
    },
  ],
  "cs2-economy": [
    {
      afterSection: "Check the teammate who cannot reach the next target",
      afterParagraph: 2,
      image: {
        src: "/article-media/body/deeper-original/cs2-budget-gap.svg",
        alt: "Hypothetical next-round budgets compare a player with 3,200 dollars, who can spend 800, with one holding 2,100, who is already 300 short of the same 4,800-dollar target after 2,400 expected income.",
        width: 1200,
        height: 720,
        caption: "The article's hypothetical second player is $300 short even after saving everything. A shared buy needs a drop, a cheaper package or a revised target. These figures are an arithmetic exercise, not current reward amounts or weapon prices.",
        credit: "GameVerse illustration",
      },
    },
  ],
  "fortnite-loadout": [
    {
      afterSection: "Work backward from the next piece of cover",
      afterParagraph: 3,
      image: {
        src: "/article-media/body/deeper-original/fortnite-cover-route.svg",
        alt: "An illustrative post-fight terrain sketch compares crossing directly to an exposed stop with moving through intermediate cover toward a covered destination.",
        width: 1200,
        height: 720,
        caption: "Choose where you can recover and stop before taking another loot upgrade. The sketch explains the imagined crossing in the text; it is not a route on the current island or a guarantee of safety.",
        credit: "GameVerse illustration",
        sourceUrl: "https://www.fortnite.com/news/fortnite-zero-build-take-the-offensive-in-this-no-build-battle-royale",
      },
    },
  ],
  "release-calendar": [
    {
      afterSection: "Give a six-hour week an honest second pass",
      afterParagraph: 2,
      image: {
        src: "/article-media/body/deeper-original/calendar-hours.svg",
        alt: "A hypothetical 360-minute week assigns 90 minutes to friends, 30 to setup and 30 as spare time, leaving 210 minutes for a solo game and about nine weeks for a 30-hour example.",
        width: 1200,
        height: 720,
        caption: "Six hours of calendar space leaves three and a half hours for the solo game after friends, setup and spare time receive their share. At that pace, the hypothetical thirty-hour adventure takes about nine weeks. These are planning examples, rather than a game's promised length.",
        credit: "GameVerse illustration",
      },
    },
  ],
};
