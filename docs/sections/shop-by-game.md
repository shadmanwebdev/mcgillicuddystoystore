# Find your game

Homepage collection navigation, implemented 13 October 2026 and awaiting user review. The editor calls this section **Shop by game**. It preserves Arcadia's light and dark palettes, typography, rounded cards, and accent styling.

## Files and composition

- `sections/arcadia-shop-by-game.liquid`: schema, header, list, scoped variables and navigation.
- `snippets/arcadia-game-card.liquid`: reusable collection card with explicit content inputs.
- `assets/arcadia-game-browser.css`: scoped layout and card presentation.
- `assets/arcadia-carousel.js`: reusable scrolling behavior through the Arcadia module registry.
- `templates/index.json`: homepage collection selection.
- Shared `arcadia-section-header`, `arcadia-button`, `arcadia-icon` and design tokens.

## Joyfy comparison

Benchmark: installed Joyfy trial theme 192158204278, Collection thumbnails section, inspected in the store editor on 13 October 2026. Installed version was not established. Official reference: https://ascent.webvista.studio/sections/collection-thumbnails. This comparison concerns this section's controls, not every Joyfy global setting or the latest theme release.

| Joyfy control observed | Arcadia implementation |
| --- | --- |
| Show section header | Header visibility toggle |
| Heading and rich text description | Heading and description, plus existing eyebrow |
| Watermark background text | Decorative, low-opacity header watermark; hidden from assistive technology |
| Button label and link | Shared secondary button; hidden if either is blank |
| Horizontal or vertical layout | Image beside or above card text |
| Adapt for transparent image | Contain and pad artwork when enabled; cover when disabled |
| Show navigation buttons | Scrollable cards with arrows only when there is overflow; disabled ends |
| Top and bottom margin | Independent 0–120px controls, 4px increments, default 32px |
| Per-block image, collection and heading | Custom artwork, collection, custom title; collection fallbacks |
| Custom CSS | Shopify's native section Custom CSS panel remains available |

Joyfy's control names and availability were verified; its numeric margin limits and precise carousel geometry were not established. Arcadia adds desktop columns (2–6, default 4), mobile columns (1 or 2, default 1), alignment, description, custom link, logo, accent, artwork gradient and hover lift. Existing block setting IDs remain compatible. Gradients now sit behind artwork so text retains theme contrast. Empty accent inherits the theme rather than hardcoding the dark-mode green.

## Content and defaults

Homepage update: all six known collections are configured, adding `jellycat` and `lego` after the original four. These two use bundled pink bunny and colorful brick images. The homepage uses six desktop columns in a single row, with horizontal scrolling and navigation on smaller screens; small circles, spacing and text animation are preserved.

Homepage blocks link to `pokemon-tcg`, `magic-the-gathering-tcg`, `one-piece-tcg`, and `warhammer`. Artwork comes from the existing collection image unless overridden. These are store records, not new collections. Several collections currently have no products; their links remain useful navigation and do not imply stock availability.

Custom title and image override collection defaults. Custom URL overrides collection URL. Missing artwork shows a decorative Arcadia icon. Missing URL renders an unlinked card. Missing title uses “Choose a game”. No blocks renders an editor setup hint; storefront retains only any enabled header. The add-section preset supplies four unconfigured blocks, maximum twelve.

Images are lazy-loaded and decorative within the link; the visible title supplies the accessible name. Existing images include white backgrounds: the transparency setting controls image fit, it does not remove image backgrounds.

## Layout and behavior

Circle labels lift 3px and scale to 106% over 280ms on mouse hover or keyboard focus, returning smoothly when the interaction ends. Text stays visible throughout. Hover animation is limited to fine pointers; reduced-motion preferences disable the transform and transition. Shared motion tokens control timing, easing and distance. This label effect is independent of the existing whole-card Lift on hover setting.

The homepage now selects **Round image with overlay**, an additional Arcadia layout requested after the initial Joyfy comparison. Cards use circular crops, centered collection names over a dark gradient, and theme-based focus/hover styling. Descriptions and arrows are hidden in this compact layout; their settings remain available for horizontal and vertical layouts. Image fitting and logo overrides still apply. Overlay ink, shade and title size are shared tokens. New official game artwork is bundled and selected for all four homepage blocks. Circles now default to 200px maximum diameter with 64px spacing and vertically centered names. See [artwork sources and verification](game-artwork.md).

Desktop uses the configured column count; widths up to 1000px use two columns; widths up to 600px use the mobile count. Scrolling mode shows a partial next card on mobile. Disabling navigation uses a wrapping grid. Native scrolling and collection links work without JavaScript. Keyboard focus is visible; the track is focusable for keyboard scrolling. Reduced motion disables lift and smooth scrolling. Multiple instances use unique section-based track IDs.

See [Carousel](../features/carousel.md) for lifecycle and [design tokens](../DESIGN-TOKENS.md) for styling inputs.

## Verification and remaining review

- Shopify Theme Check: no issues.
- Four Node carousel tests pass: boundaries/resize, RTL/reduced motion, instance isolation/cleanup and editor block selection.
- Real storefront preview: four collection links and loaded images; dark and light modes; desktop width 1440 and mobile width 390; no page-level horizontal overflow at mobile width.
- Mobile arrow click advances the track and enables Previous. Desktop arrows hide when all cards fit.
- Temporary two-instance preview verified horizontal grid, vertical scrolling, hidden header, watermark, centered heading, 120px bottom margin, long-title wrapping and missing-image fallback. Test content was restored afterward.
- Shopify editor exposes all section controls and collection blocks. An unsaved layout toggle was reverted; Joyfy and development editor Save buttons returned to disabled.
- Embedded editor preview was inaccessible to automation. End-to-end add/remove/reorder and visual live editor reload remain a manual verification item; module isolation/cleanup is covered by automated tests. Full cross-browser and screen-reader testing remains outstanding.
- No live publishing or permanent draft upload was performed. User visual acceptance is pending.



## Responsive refinement — 13 October 2026
At 1100px and below, show up to three collection tiles with 24px gaps. Phones use 16px gaps, preserve the mobile-columns setting, and cap circle track cells at the configured circle size so swipe navigation has no oversized empty cells. Center phone arrows; disable hover lift on touch. Shared section headings stack below 1100px and phone header links use full-width buttons. Desktop retains six collections in one row.
Validation: source review and existing carousel tests; current live mobile/tablet visual verification remains blocked by browser access, so these refinements are not yet visually verified.
