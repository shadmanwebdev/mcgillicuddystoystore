# Homepage breathing spaces

## Latest revision: shopping breaks, not section teasers

The user rejected events/blog teaser banners immediately preceding those sections. Homepage now retains the search break, uses `arcadia-shop-moments.liquid` after products, and places a compact Jellycat gift promotion after events. The latter uses gift line art and links to the real Jellycat collection. No countdown or discount claim is shown.

Shop the hobby mirrors the reference's text-plus-three-visuals layout with static linked artwork instead of an unconnected social/video feed. Blocks expose collection, title, image override and bundled artwork selection; section controls expose heading, eyebrow, rich text, CTA and spacing. Uses existing LEGO, Pokémon and Warhammer assets. Three columns on desktop/tablet, native horizontal swipe and visible next-card edge on mobile. No people imagery. Publisher image-with-text/banner references below remain relevant; exact Shop-the-feed editor parity is not verified and no live social integration is claimed. Theme Check passed; live visual preview remains unverified.

## Current revision: people-free community banner

The user rejected the large split-photo design. Replaced it with a compact banner: small dice line art, theme-background panel, green top border, text and desktop CTA side by side. Tablet CTA moves below the copy; mobile stacks with a full-width button. Removed the people-photo fallback entirely. The original generated photo below is historical provenance only and is no longer referenced by the section. The project workflow now records the user's no-people imagery preference.

Added 13 October 2026. Three instances of one reusable `arcadia-breathing-space` section interrupt consecutive card grids:

- Discovery, after Find your game: restrained card line art, divider rules, search CTA using Shopify's localized search route.
- Community, after products: wide gaming photo, short message, CTA to the homepage events section.
- Editorial, after events: book line art, accent border, CTA to the stories section.

Files: `sections/arcadia-breathing-space.liquid`, `snippets/arcadia-pause-art.liquid`, `assets/arcadia-breathing-space.css`, `assets/arcadia-community-table.jpg`. Shared spacing and body-size tokens live in `snippets/arcadia-theme-styles.liquid`. All three presets are available in the editor. On other pages use a custom destination; the events/stories shortcuts target homepage section IDs.

## Settings and Joyfy reference

Compared the publisher's [Image banner](https://ascent.webvista.studio/sections/image-banner) and [Image with text](https://ascent.webvista.studio/sections/image-with-text) documentation on 13 October 2026. The supplied examples establish the narrow-banner composition. Exact installed Joyfy version and editor parity remain unverified; the narrow-banner documentation URL was unavailable.

Adopted: image picker, heading/eyebrow/rich text, button label/link/outline style, text alignment, full width, desktop image placement, community image width, section spacing. Adapted: three restrained layouts share Arcadia's palette and primary button styles; text sits separately from images, so overlay controls are unnecessary. These below-fold breaks do not need transparent-header or above-fold image-priority controls. Two-image collages, social blocks, countdowns, video feeds and independent color schemes are outside this design.

At 700px and below, image and copy stack with full-width touch-friendly buttons. Compact banners use small decorative illustrations; the community photo is capped at 250px on mobile. No JavaScript or scroll animation is required. Text uses theme tokens in both modes; light section background remains #f6f5f0. Empty button labels/links suppress their CTA. An empty image picker uses bundled theme art. Clear the optional description or eyebrow to remove them.

## Image provenance

`assets/arcadia-community-table.jpg` is a generated illustrative scene, not a photograph of this shop or a real event. Built-in image-generation tool; saved as a 1536×1024 JPEG (about 330 KB) from the generated PNG. Final prompt:

> Use case: photorealistic-natural. Asset: wide website community banner photograph, landscape 3:2. Three adult friends enjoying an unbranded tabletop board game around a wooden table in a cozy hobby space. Candid natural smiles, dice and simple playing cards on table, warm daylight, subtle olive green and cream interior tones, realistic editorial photography. Medium wide composition with all faces inside central area for responsive crop. No text, logos, watermarks, or identifiable shop branding. Generic illustrative scene, not documentary evidence of a real store event.

## Validation

Shopify Theme Check passed with no offenses. Section schema/assets uploaded before homepage configuration. The image was visually inspected. Live storefront desktop/mobile/dark-mode rendering remains unverified because local-preview browser access was previously blocked; CSS breakpoint behavior was reviewed in code. No live theme publication.
