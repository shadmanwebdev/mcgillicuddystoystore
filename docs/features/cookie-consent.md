# Cookie consent appearance

The Shopify customer-privacy banner is styled by `assets/arcadia-cookie-consent.css`, loaded globally from `layout/theme.liquid`. Styles target the banner IDs previously observed on this store, rather than replacing Shopify's consent implementation.

The banner uses Arcadia's light/dark surface, text, accent, font and radius tokens. It is fixed at the bottom and centered horizontally in both LTR and RTL, at 80% of the viewport width, with padded content, rounded buttons and a soft shadow. At viewport widths of 768px and below it uses the available width with 1rem side margins; the panel scrolls if its contents exceed the available height. Accept and Decline receive equal visual emphasis. Manage preferences and policy links remain available with visible keyboard focus.

Shared tokens in `snippets/arcadia-theme-styles.liquid`: `--arcadia-consent-width`, `--arcadia-consent-padding`, `--arcadia-consent-title-size`, and `--arcadia-consent-shadow`.

In light mode the banner background uses `var(--arcadia-bg)` (default `#f6f5f0`), matching the shared section background. Dark mode retains `var(--arcadia-surface)`.

This is CSS only. Shopify continues to control consent choices, persistence, regional display rules, text, button order and the preference dialog. The preference dialog has not been redesigned. Scoped `!important` declarations override Shopify's injected banner styles. If Shopify changes its markup, these selectors need review.

Verification: Theme Check is run with this change. Live visual and interaction verification remains pending because browser access was blocked earlier in this session. No consent choice was submitted or reset during this change.

Primary Accept and Decline buttons share the hero button tokens in snippets/arcadia-theme-styles.liquid. The light-theme accent supplies their green background. Selectors include both banner and button IDs so the generic banner button rule cannot override the primary colors. Manage preferences retains secondary styling.

## Responsive refinement — 13 October 2026
The full-width inset layout now applies through 1100px (replacing the earlier 768px breakpoint); larger desktops retain 80% width. Phones use 16px padding, full-width action buttons, bottom safe-area spacing and a scrollable panel capped at 75% of viewport height. Light/dark colors and Shopify consent handling remain unchanged. Live visual verification remains pending due to blocked browser access.
