# Social story depth and contextual figures

Editorial revision checked on **October 10, 2026**. Eight existing stories gain worked situations and decision analysis; their identifiers, game associations, author, publication dates, original headings and existing figures remain in place. No game metadata is changed by this revision.

The new examples are authored editorial exercises, not reports of matches played by the writer. Numerical examples are explicitly hypothetical. Recommendations do not claim a current best weapon, balance patch, universal production rate, exact travel drain, or guaranteed match outcome.

## Source checks

- **Helldivers 2:** [PlayStation overview](https://www.playstation.com/en-us/games/helldivers-2/) currently confirms four-player cooperative play, stratagems, loadout collaboration and always-enabled friendly fire. The recovery route, stop condition and accident diagnosis are GameVerse advice applied to those systems, not an official prescribed tactic.
- **Palworld:** [Pocketpair overview](https://www.pocketpair.jp/en/games-en/palworld-en/) and the [publisher's Steam listing](https://store.steampowered.com/app/1623730/Palworld/) cover Pals working on farms and production, suitable abilities, and feeding the workforce. Steam currently records full release on July 9, 2026 and lists the earlier Early Access date separately. The 80-to-62 stock observation is invented and includes net production; it is not a consumption benchmark or an offline simulation guarantee.
- **Sea of Thieves:** [Rare's getting-started page](https://www.seaofthieves.com/getting-started) confirms the separate steering, navigation, sails, repairing and bailing jobs; its current search-indexed text was available when direct fetching failed. The [official Xbox player guide](https://news.xbox.com/en-us/wp-content/uploads/sites/2/2020/06/Sea_of_Thieves_Player_Guide-1.pdf) remains an existing source, but the PDF could not be freshly retrieved in this revision. New sections avoid new claims about Safer Seas rewards or restrictions. Departure geometry and repair handovers are illustrative crew planning.
- **No Man's Sky:** [Hello Games' Waypoint overview](https://www.nomanssky.com/waypoint-update/) confirms customizable survival/resource settings, separate technology and cargo management, and crafting guidance. Existing [Beyond repair guidance](https://www.nomanssky.com/beyond-update/) and [Omega readout guidance](https://www.nomanssky.com/omega-update/) remain in the story. The route and readings 100, 70 and projected 40 are invented; changing weather is explicitly a reason to reject that simple extrapolation.
- **Forza Horizon 5:** [Forza's launch overview](https://forza.net/news/forza-horizon-5-now-available) and [official Steam description](https://store.steampowered.com/app/1551360/Forza_Horizon_5/) establish the driving context. Entry/exit comparison, keeping experimental conditions steady, and three-run practice are original driving advice. No current car ranking, tune, telemetry measurement, fixed braking point or newer Horizon title behavior is presented as evidence for this guide.
- **Civilization VII:** [2K's Test of Time announcement](https://newsroom-anz.2k.com/news/sid-meiers-civilizationr-vii-test-of-time-update-now-available), dated May 20, 2026, confirms optional civilization continuity, Affirmation and Syncretism, the reworked victory system, and Triumphs replacing Legacy Paths across six Attributes. The new analysis uses these rules, with current campaign tooltips deciding costs and availability. The capital/town/frontier comparison is invented, without a launch-era build order or fixed cost.
- **Street Fighter 6:** [Capcom's Fighting Ground manual](https://game.capcom.com/manual/SF6/en/switch2/page/6/1) covers training and control schemes. [Capcom's recording settings guide in Japanese](https://game.capcom.com/manual/SF6/ja/switch2/page/8/6) describes recording an opponent's actions, playback slots and playback settings. Its current search-indexed text was read; direct manual fetching returned an access error. The example does not assert a character-specific command, anti-air range, frame count or punish guarantee. A player tests those in their version and chosen control scheme.
- **EA SPORTS FC 26:** [EA's gameplay deep dive](https://www.ea.com/games/ea-sports-fc/fc-26/news/pitch-notes-fc26-gameplay-deep-dive) supports Authentic/Competitive distinctions and role-based positioning. [EA's Career deep dive](https://www.ea.com/games/ea-sports-fc/fc-26/news/pitch-notes-fc26-career-mode-deep-dive) describes Manager Live restrictions, tactical/player eligibility limits, and energy/sharpness/training planning. The turnover sequence and three-match schedule are invented, with no player-price or current league-calendar claims.

## New artwork and exact placement

All eight assets are **original GameVerse SVG illustrations**, authored for the adjacent section. Each has a 1100 × 800 intrinsic size and full viewBox. They are schematic diagrams rather than game screenshots or recreated interfaces. No publisher image is cropped, repeated from a header, or presented as gameplay evidence. Their provenance is this editorial revision; publisher links above substantiate the game systems, not authorship of the diagrams.

| Story ID | Asset under `public/article-media/body/deeper-social/` | Exact section | After ordinary paragraph |
| --- | --- | --- | --- |
| `helldivers-2-squad-habits` | `helldivers-recovery-route.svg` | Recover a fallen diver without feeding the same fight | 3 |
| `palworld-working-base` | `palworld-food-buffer.svg` | Estimate the next trip from an observed buffer | 2 |
| `sea-of-thieves-first-crew` | `sea-island-departure.svg` | Leave an island with the crew ready to move | 3 |
| `no-mans-sky-safe-journey` | `nms-return-reserve.svg` | Plan a walking loop with a return reserve | 3 |
| `forza-horizon-5-clean-corners` | `forza-wide-or-sliding.svg` | Work backward from the wall you keep hitting | 4 |
| `civilization-vii-ages-plan` | `civ-investment-choice.svg` | Compare two settlements before spending the treasury | 3 |
| `street-fighter-6-practice-goals` | `sf-anti-air-test.svg` | Turn one replay into an anti-air test | 4 |
| `fc-26-first-career` | `fc-covering-pass.svg` | Trace a conceded goal back to the lost pass | 3 |

Each image has descriptive alternative text, a contextual caption and the credit **GameVerse illustration** in `inline-social.ts`. Existing figure anchors are unaffected because additions occur after all original prose sections. Seven stories now have three body figures each; FC 26 has two.

## Validation

The eight SVGs were rasterized at full aspect ratio using the installed Sharp runtime and visually inspected together. Intrinsic dimensions match their metadata; files are approximately 1.9–2.5 KB each. New sections and existing figures are checked against the same paragraph-anchor resolver used to render article bodies. Focused ESLint is run on the two edited TypeScript files. Publication/deployment checks are handled by the integrating task.
