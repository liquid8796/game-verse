# Article image sources

The article catalog is `src/features/articles/lib/article-media.ts`. Each of the nine published stories has a lead image. The VALORANT, Counter-Strike 2, Fortnite and release-planning stories also have original explanatory figures placed after the relevant section. Credits and descriptive captions appear with the images; promotional artwork is not presented as a screenshot.

The seven new official scenes are stored in `public/article-media`. They were inspected before conversion and saved as WebP at up to 1920px wide. Original proportions are preserved in article figures. Card thumbnails use a separate 16:9 crop. The GTA VI lead reuses the existing full-width official artwork.

| Asset | Publisher page | Original asset |
| --- | --- | --- |
| minecraft-scene.webp | [PlayStation / Mojang](https://www.playstation.com/en-us/games/minecraft/) | [1920px scene](https://gmedia.playstation.com/is/image/SIEPDC/minecraft-screenshot-03-ps4-05dec19-en?wid=1920&fmt=png) |
| fortnite-scene.webp | [PlayStation / Epic](https://www.playstation.com/en-us/games/fortnite/) | [Official island scene](https://gmedia.playstation.com/is/image/SIEPDC/fornite-battle-pass-page-banner-hero-desktop-01-en-05aug20?wid=1920&fmt=png) |
| valorant-scene.webp | [PlayStation / Riot](https://www.playstation.com/en-us/games/valorant/) | [Courtyard scene](https://gmedia.playstation.com/is/image/SIEPDC/valorant-screenshot-07-en-30may24?wid=1920&fmt=png) |
| roblox-scene.webp | [PlayStation / Roblox](https://www.playstation.com/en-us/games/roblox/) | [Grow a Garden example](https://gmedia.playstation.com/is/image/SIEPDC/roblox-screenshot-02-en-09dec25?wid=1920&fmt=png) |
| genshin-impact-scene.webp | [PlayStation / HoYoverse](https://www.playstation.com/en-us/games/genshin-impact/) | [Early official scenery](https://gmedia.playstation.com/is/image/SIEPDC/genshin-impact-screen-01-ps4-en-02sep19?wid=1920&fmt=png) |
| counter-strike-2-scene.webp | [Valve / Steam](https://store.steampowered.com/app/730/CounterStrike_2/) | [Team gallery image](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/4ef95eed5fcd98c576bf13e024bc6c845b622132/ss_4ef95eed5fcd98c576bf13e024bc6c845b622132.1920x1080.jpg?t=1789251637) |
| league-of-legends-scene.webp | [Riot beginner guide](https://www.leagueoflegends.com/en-us/how-to-play/) | [Summoner's Rift illustration](https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/ffe8f50201af51a0956875d2aeeb9e662eb0b228-3840x2160.png?accountingTag=LoL) |
| gta-vi-official-cover-v4.webp | [Rockstar media and artwork](https://www.rockstargames.com/VI/media/artwork-wallpapers) | Existing asset in `public/game-media` |

## Original explanatory figures

These are code-native SVG illustrations, each 1200 × 720, credited to GameVerse:

- `valorant-crosshair-check.svg`: one crosshair against two backgrounds; an enlarged illustration, not an in-game settings recommendation.
- `cs2-buy-budget.svg`: the article's hypothetical $3,200/$800/$2,400/$4,800 worked budget; no current weapon-price claim.
- `fortnite-loadout-roles.svg`: four jobs to cover, independent of inventory slot counts and playlist-specific items.
- `release-planning.svg`: a sample week with Tuesday/Thursday multiplayer, Sunday story time and room for other plans.

## Generated calendar lead

Saved asset: `public/article-media/release-calendar-desk.webp`, 1600 × 900. Created with the built-in `image_gen` tool, then converted to WebP with Sharp. It is credited visibly as an AI-generated GameVerse editorial illustration. It does not depict a real game, release calendar or product endorsement.

Prompt used:

> Use case: photorealistic-natural. Asset type: landscape editorial lead photograph for a gaming magazine article about fitting game releases and a backlog into a realistic week. Create one 16:9 horizontal image, ideally 1536x864 or larger. A believable, gently lived-in home gaming desk in late-afternoon window light: an unbranded black game controller resting beside an open paper weekly planner, a pencil, a ceramic mug and a closed game case. The planner has a simple faint calendar grid and a few subtle colored pencil marks, but no legible words, numbers, fake release dates or slogans. A softly defocused monitor in the background suggests a paused game without depicting a recognizable game screenshot. Natural photographic detail, thoughtful understated framing, warm paper and wood against dark equipment, comfortable evening atmosphere. Objects proportional, modest uncluttered real desk, no neon RGB overload, no people, no branding or watermarks. The entire image is photography, not a web UI or cover design.
