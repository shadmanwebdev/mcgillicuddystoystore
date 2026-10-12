# Community call to action

Redesigned 13 October 2026. Removed the oversized lavender promo panel and empty grid column. Uses the shared max-width content container, cream/dark theme background, subtle top/bottom rules, compact heading and green tabletop line art (cards, dice, pawn; no people). Mobile stacks artwork and copy. No fixed section height.

Files: `sections/arcadia-community-cta.liquid`, `assets/arcadia-community-cta.css`, reusable decorative `snippets/arcadia-community-art.liquid`. Existing heading, eyebrow, rich text, image, icon, manual member count, CTA and Discord configuration are preserved. Added artwork visibility/position and vertical spacing controls. Missing custom image falls back to bundled SVG; hiding artwork removes its column. Buttons render only with configured destinations. No community membership counts or links were invented.

Compared with the publisher's [Image with text](https://ascent.webvista.studio/sections/image-with-text) controls already reviewed during the banner work: artwork selection/position, editable text, alignment and CTA are supported. Shared Arcadia tokens replace independent palette controls. A second image and multiple social blocks are not implemented; exact installed Joyfy parity remains unverified.

Validation: Theme Check passed. Reviewed responsive rules, missing-image and hidden-artwork states, existing button conditions and the community-page consumer. Browser visual verification remains pending. Synced to development and unpublished Arcadia Demo, without publishing the live theme.
