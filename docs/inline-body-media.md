# Contextual images inside stories

Every one of the 25 published stories has contextual images in its body. The catalog contains 63 body figures: the 38 previously published figures and 25 additions for the deeper worked examples. Each story has two or three, chosen to illustrate a specific idea rather than repeat its cover.

The body-media catalogs are:

- `src/features/articles/lib/inline-original.ts`
- `src/features/articles/lib/inline-rpg.ts`
- `src/features/articles/lib/inline-social.ts`

Their associated source notes record the publisher page, original asset, chosen paragraph and reason for the placement:

- [Original stories](inline-original-sources.md)
- [RPG guides](inline-rpg-sources.md)
- [Co-op, racing, strategy and sports guides](inline-social-sources.md)

The October 10 depth revision adds one further figure to every story. Its editorial changes, primary references and exact placements are recorded in [original stories](deeper-original-sources.md), [RPG guides](deeper-rpg-sources.md) and [social guides](deeper-social-sources.md).

## Placement

An illustration names its exact `afterSection` heading and may specify `afterParagraph`. The paragraph number starts at one within that section and counts ordinary paragraphs, excluding bullet-list blocks. The figure is inserted immediately after that paragraph. Omitting the number retains the older section-end behavior.

The renderer uses title-based article heading anchors so that additional paragraphs do not change section URLs. Previously published numbered section targets remain as aliases in `legacy-heading-ids.ts`. Game overview heading URLs retain their earlier format. Images preserve their proportions and include alt text, a contextual caption and a source credit. Body images load lazily. Article image sitemap entries include both the cover and these supporting figures.

Publication tests require body media for every seeded story, verify that every placement resolves, reject source-section placements and duplicate/cover image paths, and render the actual story bodies to confirm that the figures are inside the prose.

## Editorial choices

Official screenshots accompany the visible situations they show. Older interfaces and archived captures are identified where relevant. No generated gameplay or fabricated game interface is used. Original diagrams explain decisions that a still screenshot would not make clear, such as a crop's remaining growth nights, a ship's repair/bailing jobs or an action-specific boon condition.

The depth revision expands all existing stories with practical examples and retains their original sections, sources and media. Image placement remains attached to exact paragraphs through the catalogs; article IDs, public URLs and saved-story references are preserved.
