import type { ArticleIllustration } from "./article-media";

const bodyPath = "/article-media/body/social";
const deeperBodyPath = "/article-media/body/deeper-social";

export const socialInline: Partial<Record<string, ArticleIllustration[]>> = {
  "helldivers-2-squad-habits": [
    {
      afterSection: "Call the danger, not your entire thought process",
      afterParagraph: 3,
      image: {
        src: `${bodyPath}/helldivers-squad.webp`,
        alt: "Four Helldivers spread across a snowy battlefield, firing toward insect-like enemies while explosions rise behind them.",
        width: 1600,
        height: 900,
        caption: "Four firing positions share a crowded battlefield in this official PS5 capture. Tell a teammate before crossing the space their weapon is covering.",
        credit: "Arrowhead Game Studios / PlayStation, via Steam",
        sourceUrl: "https://store.steampowered.com/app/553850/",
      },
    },
    {
      afterSection: "Give the terminal operator a chance to work",
      afterParagraph: 2,
      image: {
        src: `${bodyPath}/helldivers-terminal-coverage.svg`,
        alt: "Example overhead objective layout: an operator uses a terminal against a wall; two teammates watch separate open approaches while a third stays near the operator.",
        width: 1100,
        height: 760,
        caption: "An example arrangement for the terminal described above. Watch the open approaches and keep the operator's escape clear; terrain will decide the actual positions.",
        credit: "GameVerse illustration",
      },
    },
    {
      afterSection: "Recover a fallen diver without feeding the same fight",
      afterParagraph: 3,
      image: {
        src: `${deeperBodyPath}/helldivers-recovery-route.svg`,
        alt: "Hypothetical recovery layout: reinforce at the living squad, cover one diver approaching dropped items, then return to the rally point before heading toward extraction.",
        width: 1100,
        height: 800,
        caption: "The recovery needs its own approach and exit. Reinforce on usable ground, cover the returning diver, and reassess if the threat still blocks the dropped items.",
        credit: "GameVerse illustration",
      },
    },
  ],
  "palworld-working-base": [
    {
      afterSection: "Begin with the thing that keeps running out",
      afterParagraph: 2,
      image: {
        src: `${bodyPath}/palworld-production-chain.svg`,
        alt: "A simple meal production chain goes from crops to carrying, preparation and a food supply. An arrow follows the chain backward when the final supply is empty.",
        width: 1100,
        height: 760,
        caption: "Follow an empty food supply backward through its dependencies. The exact ingredients and work suitability come from the recipe and Pals in your version.",
        credit: "GameVerse illustration",
      },
    },
    {
      afterSection: "Walk the route before enclosing it",
      afterParagraph: 1,
      image: {
        src: `${bodyPath}/palworld-production.webp`,
        alt: "Pals carry boxes between machinery and cultivated plots in a large open Palworld base.",
        width: 1600,
        height: 900,
        caption: "Carriers, crops and machinery share the open floor in this official base scene. Walk the routes between them before enclosing your own stations with walls.",
        credit: "Pocketpair, via Steam",
        sourceUrl: "https://store.steampowered.com/app/1623730/",
      },
    },
    {
      afterSection: "Estimate the next trip from an observed buffer",
      afterParagraph: 2,
      image: {
        src: `${deeperBodyPath}/palworld-food-buffer.svg`,
        alt: "Invented food-stock observation: 80 units falls to 62 in ten minutes. A projected further thirty minutes at the same net loss uses 54 units and leaves eight.",
        width: 1100,
        height: 800,
        caption: "Observed stock is a planning clue. The dashed projection assumes the same food, workforce and production; it supplies no universal consumption rate or offline-server guarantee.",
        credit: "GameVerse illustration",
      },
    },
  ],
  "sea-of-thieves-first-crew": [
    {
      afterSection: "The helm should not have to guess",
      afterParagraph: 1,
      image: {
        src: `${bodyPath}/sea-crew.webp`,
        alt: "A Sea of Thieves crew occupies different positions on a ship: one pirate stands at the wheel while others work near a cannon and mast.",
        width: 1600,
        height: 900,
        caption: "The wheel, cannon and mast are separate places to work. This official crew scene shows why the player steering needs useful calls from the rest of the deck.",
        credit: "Rare / Xbox Game Studios, via Steam",
        sourceUrl: "https://store.steampowered.com/app/1172620/",
      },
    },
    {
      afterSection: "Repairs outrank a satisfying cannon shot",
      afterParagraph: 1,
      image: {
        src: `${bodyPath}/sea-repair-and-bail.svg`,
        alt: "A ship cutaway distinguishes two repair jobs: a plank seals a hole in the hull, and a bucket removes water already inside the ship.",
        width: 1100,
        height: 760,
        caption: "Planks and buckets solve different parts of the same problem. Seal the leak and remove the water already aboard while the helm keeps the ship away from fresh damage.",
        credit: "GameVerse illustration",
      },
    },
    {
      afterSection: "Leave an island with the crew ready to move",
      afterParagraph: 3,
      image: {
        src: `${deeperBodyPath}/sea-island-departure.svg`,
        alt: "Example island departure shows a last treasure carrier returning from shore, a ship with a clear exit past a rock, and a distant sail to report before departing together.",
        width: 1100,
        height: 800,
        caption: "Prepare the exit while the last carrier returns, then confirm the pickup. A reported sail is a reason to make a shared decision; its intentions remain unknown.",
        credit: "GameVerse illustration",
      },
    },
  ],
  "no-mans-sky-safe-journey": [
    {
      afterSection: "Repair the ship in an order you understand",
      afterParagraph: 1,
      image: {
        src: `${bodyPath}/nms-ship-repair-check.svg`,
        alt: "Separate checks for No Man's Sky ship components: read the Pulse Engine repair slot, pin and craft the product, then install it; inspect the Launch Thruster separately for damage or fuel.",
        width: 1100,
        height: 760,
        caption: "Check each component separately. Ingredients in the inventory do not fill a repair slot, and repairing the Pulse Engine does not repair or refuel the Launch Thruster.",
        credit: "GameVerse illustration",
      },
    },
    {
      afterSection: "A first base can be very small",
      afterParagraph: 1,
      image: {
        src: `${bodyPath}/nms-first-base.webp`,
        alt: "Several No Man's Sky travellers stand beside a round base module and glass dome among red grass on an alien planet.",
        width: 1600,
        height: 900,
        caption: "Travellers gather beside built modules in an official gallery scene. Your first base can start with a place to regroup; add the larger project once returning there feels straightforward.",
        credit: "Hello Games, via Steam",
        sourceUrl: "https://store.steampowered.com/app/275850/",
      },
    },
    {
      afterSection: "Plan a walking loop with a return reserve",
      afterParagraph: 3,
      image: {
        src: `${deeperBodyPath}/nms-return-reserve.svg`,
        alt: "Hypothetical walking loop from ship to deposit and back: protection starts at 100, reaches 70 at the deposit, and might return at 40 only if conditions remain similar; checked shelter is nearby.",
        width: 1100,
        height: 800,
        caption: "The outward walk has already spent part of the reserve. Recheck conditions at the deposit; a storm can invalidate the simple return estimate.",
        credit: "GameVerse illustration",
      },
    },
  ],
  "forza-horizon-5-clean-corners": [
    {
      afterSection: "Keep the first comparison fair",
      afterParagraph: 2,
      image: {
        src: `${bodyPath}/forza-road.webp`,
        alt: "A white Chevrolet Corvette races alongside other cars on a paved street between buildings in Forza Horizon 5.",
        width: 1600,
        height: 900,
        caption: "A paved street race from the official gallery. Keep the car and route familiar for practice; this promotional scene is not a recommendation to begin with a powerful Corvette.",
        credit: "Playground Games / Xbox Game Studios, via Steam",
        sourceUrl: "https://store.steampowered.com/app/1551360/",
      },
    },
    {
      afterSection: "Slow down before asking for the turn",
      afterParagraph: 2,
      image: {
        src: `${bodyPath}/forza-corner-sequence.svg`,
        alt: "An illustrative right-hand bend separates a straight braking zone, a curved turning line, and an exit where power is added as steering straightens.",
        width: 1100,
        height: 760,
        caption: "Separate the jobs on a simple bend: slow on the approach, guide the car through, then add power as the steering opens. The drawing supplies no fixed braking distance or speed.",
        credit: "GameVerse illustration",
      },
    },
    {
      afterSection: "Work backward from the wall you keep hitting",
      afterParagraph: 4,
      image: {
        src: `${deeperBodyPath}/forza-wide-or-sliding.svg`,
        alt: "Two schematic corner failures: running wide before acceleration calls for an entry-speed test, while sliding after adding power calls for a throttle test.",
        width: 1100,
        height: 800,
        caption: "Locate the moment the line fails before changing the setup. These illustrative symptoms suggest separate entry and exit tests, without prescribing a fixed speed or braking distance.",
        credit: "GameVerse illustration",
      },
    },
  ],
  "civilization-vii-ages-plan": [
    {
      afterSection: "Read the objective before choosing the next project",
      afterParagraph: 1,
      image: {
        src: `${bodyPath}/civ-triumphs.webp`,
        alt: "Civilization VII's Your Empire's Legacy window displays the Triumphs tab, with Major Triumph objectives, progress and Dedication rewards.",
        width: 1600,
        height: 900,
        caption: "The publisher's Triumphs screen lists objectives beside their progress and rewards. Read the goals available in your campaign before committing its next project.",
        credit: "Firaxis Games / 2K, via Steam",
        sourceUrl: "https://store.steampowered.com/app/1295660/",
      },
    },
    {
      afterSection: "Give towns and cities different responsibilities",
      afterParagraph: 2,
      image: {
        src: `${bodyPath}/civ-settlements.webp`,
        alt: "A developed Civilization VII settlement with stepped temples and dense neighborhoods beside a river and steep cliffs.",
        width: 1600,
        height: 900,
        caption: "This official settlement view shows developed districts beside a river. Decide which settlement should receive the next investment; the landscape view itself does not show costs or settlement status.",
        credit: "Firaxis Games / 2K, via Steam",
        sourceUrl: "https://store.steampowered.com/app/1295660/",
      },
    },
    {
      afterSection: "Compare two settlements before spending the treasury",
      afterParagraph: 3,
      image: {
        src: `${deeperBodyPath}/civ-investment-choice.svg`,
        alt: "Example empire connects a developed capital to a nearby town with a development opportunity and an exposed frontier with a defense need; choose one investment while retaining a reserve.",
        width: 1100,
        height: 800,
        caption: "Compare what the town investment enables with what the frontier requires. The example supplies a decision structure; actual costs and benefits come from the current campaign.",
        credit: "GameVerse illustration",
      },
    },
  ],
  "street-fighter-6-practice-goals": [
    {
      afterSection: "Read the input display when a move fails",
      afterParagraph: 2,
      image: {
        src: `${bodyPath}/sf-input-both-sides.svg`,
        alt: "An example quarter-circle motion is mirrored for facing right and facing left: down, down-forward, forward and attack. The middle direction is highlighted for checking a missed input.",
        width: 1100,
        height: 760,
        caption: "An example motion from both sides. Compare each direction with the input history, then follow the move list for your character and control scheme; this is not a universal special-move command.",
        credit: "GameVerse illustration",
      },
    },
    {
      afterSection: "Blocking gives you information",
      afterParagraph: 3,
      image: {
        src: `${bodyPath}/sf-match.webp`,
        alt: "Ken jumps toward a crouching Ryu in a Street Fighter 6 match; both players' green Drive gauges are visible beneath the health bars.",
        width: 1600,
        height: 900,
        caption: "The green Drive gauges sit below health in this official Ryu-versus-Ken match. Keep an eye on that resource while choosing how to respond to the next approach.",
        credit: "CAPCOM, via Steam",
        sourceUrl: "https://store.steampowered.com/app/1364780/",
      },
    },
    {
      afterSection: "Turn one replay into an anti-air test",
      afterParagraph: 4,
      image: {
        src: `${deeperBodyPath}/sf-anti-air-test.svg`,
        alt: "Three-stage anti-air drill: test a predictable recorded jump, add the grounded move that preceded the miss, then mix jumping and grounded approaches to test recognition.",
        width: 1100,
        height: 800,
        caption: "Test the answer, whether your character can act, and recognition in separate stages. A successful response to a guaranteed jump does not establish that you can read a mixed approach.",
        credit: "GameVerse illustration",
      },
    },
  ],
  "fc-26-first-career": [
    {
      afterSection: "Inspect the squad as a set of jobs",
      afterParagraph: 2,
      image: {
        src: `${bodyPath}/fc-squad-jobs.svg`,
        alt: "An illustrative 4-3-3 squad shape marks wide players, a central forward, two linking midfielders, a covering midfielder, four defenders and a goalkeeper.",
        width: 1100,
        height: 900,
        caption: "One example shape for thinking about jobs: provide width, connect passes and protect the defense. Choose the formation and actual FC 26 roles that suit your squad, then check the bench for cover.",
        credit: "GameVerse illustration",
      },
    },
    {
      afterSection: "Trace a conceded goal back to the lost pass",
      afterParagraph: 3,
      image: {
        src: `${deeperBodyPath}/fc-covering-pass.svg`,
        alt: "Illustrative half-pitch shows a winger returning a blocked attack to support and switching toward the far side, with a covering midfielder remaining behind the ball and ahead of two center-backs.",
        width: 1100,
        height: 800,
        caption: "One calmer route around a closed center. Keep the supporting pass and covering job visible, then check whether your FC 26 roles produce that spacing in the actual match.",
        credit: "GameVerse illustration",
      },
    },
  ],
};
