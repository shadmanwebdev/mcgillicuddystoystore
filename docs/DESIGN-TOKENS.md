# Theme styling tokens

The shared baseline is `assets/arcadia-tokens.css`; merchant settings are mapped by `snippets/arcadia-theme-variables.liquid`. Existing light and dark palette values remain unchanged. Components inherit `--arcadia-bg`, `--arcadia-surface`, `--arcadia-ink`, `--arcadia-muted`, `--arcadia-line`, `--arcadia-accent`, `--arcadia-secondary`, font and radius tokens.

Find your game introduces these reusable values without changing other components' styling:

| Token suffix after `--arcadia-` | Default | Purpose |
| --- | --- | --- |
| space-xs / sm / md / lg | .5 / .75 / 1 / 1.5rem | Component spacing |
| card-gap | 1.5rem | Card grid gap |
| text-small / text-card | .875 / 1.3rem | Description and title size |
| text-display | clamp(4rem, 10vw, 9rem) | Decorative watermark size |
| weight-bold | 750 | Display weight |
| watermark-opacity | .06 | Decorative text opacity |
| motion-fast | 200ms | Hover transition duration |

Section-scoped `--game-columns`, `--game-mobile-columns`, `--game-margin-top` and `--game-margin-bottom` map editor controls to CSS. A card's optional `--game-accent` overrides the inherited theme accent only within that card. Font families and text colors remain inherited. Artwork gradients do not override text-surface colors.

Extend this inventory as other sections are refined; it is not yet a complete audit of legacy styling literals.
