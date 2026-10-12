# Theme styling tokens

## Single theme styling source

All shared theme styling now lives in **`snippets/arcadia-theme-styles.liquid`**: palettes and tokens, reset/base typography, accessible focus and hidden-content rules, buttons/form controls, shared containers and reusable components, font-face declarations, and merchant-setting mappings. Main, password and gift-card layouts render this one file. The former four CSS assets and separate variables snippet have been removed.

Section CSS contains component-specific structure and interactions; it references shared tokens. Hardcoded component palette and shadow literals were moved into the centralized token block with their exact existing values. Light/dark mode and editor settings continue using the same variable names. Because merchant settings are Liquid values, the shared stylesheet is emitted inline by the snippet and requires no build step.

Validated with Shopify Theme Check and all 19 existing behavior tests. Storefront visual regression checks remain pending; no assertion of pixel-identical browser output is made.

## Shared primary buttons

Basic button CSS lives in `snippets/arcadia-theme-styles.liquid`; its shared styling variables live in `snippets/arcadia-theme-styles.liquid`. Hero, purchase and cookie Accept/Decline buttons use `--arcadia-button-primary-bg`, `--arcadia-button-primary-ink`, and `--arcadia-button-primary-border`. They inherit the current theme accent/background: green with light text in light mode, lime with dark text in dark mode. Merchant light/dark accent settings continue to control these colors.

Shared sizing tokens are `--arcadia-button-radius` (8px), `--arcadia-button-min-height` (46px), `--arcadia-button-padding-y` (.75rem), `--arcadia-button-padding-x` (1.35rem), `--arcadia-button-font-size` (1rem), `--arcadia-button-weight` (theme bold weight), and `--arcadia-button-line-height` (1.3). Cookie styles reference these same tokens; secondary buttons retain their outlined treatment.

The shared baseline is `snippets/arcadia-theme-styles.liquid`; merchant settings are mapped by `snippets/arcadia-theme-styles.liquid`. Existing light and dark palette values remain unchanged. Components inherit `--arcadia-bg`, `--arcadia-surface`, `--arcadia-ink`, `--arcadia-muted`, `--arcadia-line`, `--arcadia-accent`, `--arcadia-secondary`, font and radius tokens.

Find your game introduces these reusable values without changing other components' styling:

| Token suffix after `--arcadia-` | Default | Purpose |
| --- | --- | --- |
| space-xs / sm / md / lg | .5 / .75 / 1 / 1.5rem | Component spacing |
| card-gap | 1.5rem | Card grid gap |
| text-small / text-card | .875 / 1.3rem | Description and title size |
| text-product-title | 1.25rem | Product title |
| text-product-price | 1.375rem | Prominent current product price |
| product-card-padding | clamp(1rem, 1.6vw, 1.5rem) | Responsive card content padding |
| product-card-shadow / product-card-hover-shadow | Theme-derived 7% / 12% black shadows | Subtle card depth and hover emphasis |
| text-section-compact | clamp(1.75rem, 3vw, 2.75rem) | Compact section heading |
| product-media-bg | #ffffff | Product photography surface, stable in both modes |
| text-display | clamp(4rem, 10vw, 9rem) | Decorative watermark size |
| weight-bold | 750 | Display weight |
| watermark-opacity | .06 | Decorative text opacity |
| motion-fast | 200ms | Hover transition duration |
| motion-emphasis / motion-ease | 280ms / cubic-bezier(.2,.7,.2,1) | Overlay label transition |
| label-hover-lift / label-hover-scale | -3px / 1.06 | Overlay label hover and focus transform |
| overlay-ink / overlay-shade | #ffffff / #000000 | Readable image-overlay text and scrim in both modes |
| overlay-title | clamp(1rem, 2.2vw, 1.6rem) | Round collection title size |

Section-scoped `--game-columns`, `--game-mobile-columns`, `--game-margin-top` and `--game-margin-bottom` map editor controls to CSS. A card's optional `--game-accent` overrides the inherited theme accent only within that card. Font families and text colors remain inherited. Artwork gradients do not override text-surface colors.

Extend this inventory as other sections are refined; it is not yet a complete audit of legacy styling literals.
