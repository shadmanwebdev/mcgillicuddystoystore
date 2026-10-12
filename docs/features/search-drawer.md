# Search drawer

Added 13 October 2026 from the user's side-modal reference. Header Search is now a linked trigger for a rounded right-side native dialog. Plain localized search-route links elsewhere (including the discovery banner/footer) open the same drawer. Query links, modified clicks and external/new-tab links retain ordinary navigation. Without JS, Search links navigate normally.

Files: `snippets/arcadia-search-drawer.liquid`, `assets/arcadia-search-drawer.css`, `assets/arcadia-search-drawer.js`; assembled by the header. Reuses the native `dialog` module and existing search form/predictive-search module. Dialog provides modal focus containment, Escape and inert background; shared modal code restores trigger focus and closes on backdrop/close button. Search module focuses input, closes open navigation panels, updates the full-results link with the entered query, and cleans up delegated listeners on editor unload. Background scrolling is locked while open.

Desktop panel width is capped at 560px, inset 16px, with scrollable content and green bottom CTA. Mobile is inset 8px and almost full-screen. Theme cream/dark colors and shared button tokens apply. Suggested searches default to six relevant game/hobby terms, without claiming analytics popularity. Header settings allow a suggestions menu, heading and full-results label. Predictive results use Shopify when enabled; failure leaves normal search available. Suggestions hide for queries of two or more characters.

Reference comparison: the user's Joyfy screenshot establishes the right drawer, pill input, suggested links, close control and pinned bottom action. Exact installed Joyfy search settings remain unverified.

Validation: Theme Check passed; four focused tests cover opening/focus, preserving query and modified-link navigation, encoded full-results query/reset, and editor listener cleanup. Native browser dialog behavior and actual predictive results were not exercised in a storefront browser because preview access was previously blocked. Updated development and unpublished demo themes; no live publication.
