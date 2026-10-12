# Cookie consent appearance

## Saved-choice visibility

Correction after the user reported Accept still leaving the banner visible: the original all-three-fields requirement was too strict. Saved cookie-category decisions now count even when unused fields are empty; sale-of-data-only GPC is still ignored. Accept/Decline actions are handled through Shopify's `setTrackingConsent` and dismiss only after its successful callback. The preference dialog remains handled by Shopify. Seven tests now cover direct button saves, partial saved records, refresh, preferences, API readiness and cleanup. Actual storefront behavior still requires user/browser verification.

Added `assets/arcadia-cookie-consent.js` to read Shopify's `currentVisitorConsent()` on initial load, after `visitorConsentCollected`, and on `pageshow`. Explicit yes/no decisions for analytics, marketing and preferences mark the body `data-arcadia-consent="saved"`; a scoped CSS rule then hides only the banner, including a late-inserted banner. Shopify continues saving the actual choice. No localStorage dismissal flag, consent-cookie rewrite or forced acceptance is used. Undecided/partial consent and sale-of-data-only GPC signals leave the banner behavior intact. The preferences dialog remains available.

Loads the Customer Privacy API via `Shopify.loadFeatures` if needed, and leaves normal banner behavior in place if unavailable. Listener cleanup guards against delayed initialization after unload. Four tests cover accept/decline after refresh, undecided/GPC, custom preferences/reset, and delayed API/cleanup. Theme Check passed. Storefront browser interactions remain unverified. Reference: [Shopify Customer Privacy API](https://shopify.dev/docs/api/customer-privacy). This visibility enhancement supersedes the original CSS-only description below.

The Shopify customer-privacy banner is styled by `assets/arcadia-cookie-consent.css`, loaded globally from `layout/theme.liquid`. Styles target the banner IDs previously observed on this store, rather than replacing Shopify's consent implementation.

The banner uses Arcadia's light/dark surface, text, accent, font and radius tokens. It is fixed at the bottom and centered horizontally in both LTR and RTL, at 80% of the viewport width, with padded content, rounded buttons and a soft shadow. At viewport widths of 768px and below it uses the available width with 1rem side margins; the panel scrolls if its contents exceed the available height. Accept and Decline receive equal visual emphasis. Manage preferences and policy links remain available with visible keyboard focus.

Shared tokens in `snippets/arcadia-theme-styles.liquid`: `--arcadia-consent-width`, `--arcadia-consent-padding`, `--arcadia-consent-title-size`, and `--arcadia-consent-shadow`.

In light mode the banner background uses `var(--arcadia-bg)` (default `#f6f5f0`), matching the shared section background. Dark mode retains `var(--arcadia-surface)`.

This is CSS only. Shopify continues to control consent choices, persistence, regional display rules, text, button order and the preference dialog. The preference dialog has not been redesigned. Scoped `!important` declarations override Shopify's injected banner styles. If Shopify changes its markup, these selectors need review.

Verification: Theme Check is run with this change. Live visual and interaction verification remains pending because browser access was blocked earlier in this session. No consent choice was submitted or reset during this change.

Primary Accept and Decline buttons share the hero button tokens in snippets/arcadia-theme-styles.liquid. The light-theme accent supplies their green background. Selectors include both banner and button IDs so the generic banner button rule cannot override the primary colors. Manage preferences retains secondary styling.

## Responsive refinement — 13 October 2026
The full-width inset layout now applies through 1100px (replacing the earlier 768px breakpoint); larger desktops retain 80% width. Phones use 16px padding, full-width action buttons, bottom safe-area spacing and a scrollable panel capped at 75% of viewport height. Light/dark colors and Shopify consent handling remain unchanged. Live visual verification remains pending due to blocked browser access.
