# Contextual images inside stories

Every one of the 25 published stories has at least one image in its body. The catalog contains 38 body figures: the four existing explanations and 34 new figures. Each story has one or two, chosen to illustrate a specific idea rather than repeat its cover.

The body-media catalogs are:

- `src/features/articles/lib/inline-original.ts`
- `src/features/articles/lib/inline-rpg.ts`
- `src/features/articles/lib/inline-social.ts`

Their associated source notes record the publisher page, original asset, chosen paragraph and reason for the placement:

- [Original stories](inline-original-sources.md)
- [RPG guides](inline-rpg-sources.md)
- [Co-op, racing, strategy and sports guides](inline-social-sources.md)

## Placement

An illustration names its exact `afterSection` heading and may specify `afterParagraph`. The paragraph number starts at one within that section and counts ordinary paragraphs, excluding bullet-list blocks. The figure is inserted immediately after that paragraph. Omitting the number retains the older section-end behavior.

The renderer keeps heading anchors stable, preserves image proportions and includes alt text, a contextual caption and a source credit. Body images load lazily. Article image sitemap entries include both the cover and these supporting figures.

Publication tests require body media for every seeded story, verify that every placement resolves, reject source-section placements and duplicate/cover image paths, and render the actual story bodies to confirm that the figures are inside the prose.

## Editorial choices

Official screenshots accompany the visible situations they show. Older interfaces and archived captures are identified where relevant. No generated gameplay or fabricated game interface is used. Original diagrams explain decisions that a still screenshot would not make clear, such as a crop's remaining growth nights, a ship's repair/bailing jobs or an action-specific boon condition.

The article text remains intact; the new media is attached to its paragraphs through the catalogs.
