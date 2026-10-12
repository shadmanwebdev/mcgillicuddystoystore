# Shop mega menu

## Current revision: text only

User requested no mega-menu images for now. Removed all image rendering and image editor controls. Collection navigation now uses two columns of generous text links with subtle row dividers and arrows, alongside the existing compact browse sidebar. Added editable collections heading. Desktop/mobile share this image-free markup. Existing navigation behavior is unchanged. Theme Check passed; uploaded to development and demo. Earlier image-led descriptions below are historical.

Rebuilt 13 October 2026 from the user's screenshot. The previous full-width panel contained one narrow nested link list and empty promotion columns. Shop now has a centered 1200px panel, quick-link sidebar and six image-led collection tiles in three columns/two rows. Cream/dark backgrounds and green/lime accents inherit theme tokens. No people images; existing bundled game artwork is reused. Unknown custom collections use their Shopify image or a neutral icon.

Files: `sections/arcadia-header.liquid`, shared `snippets/arcadia-shop-menu.liquid`, `assets/arcadia-navigation.css`, `assets/arcadia-navigation.js`. Desktop and mobile reuse the same collection/content snippet. Mobile Shop is a native details accordion with a two-column tile grid, within the scrollable navigation panel. The browse-all destination remains the Shopify parent menu URL, and quick links use the configured menu or existing immediate child links. Store navigation records were not edited.

Controls: enable visual Shop menu, case-insensitive parent title, eyebrow/heading/browse label, custom quick-links menu, up to six selected collections, image visibility, landscape/square ratio and desktop hover opening. Without chosen collections, uses the six existing homepage handles. Other dropdowns preserve their original content and promotion blocks.

Joyfy comparison: reviewed publisher [Custom Mega Menu](https://ascent.webvista.studio/header/custom-mega-menu) and [Header](https://ascent.webvista.studio/header) documentation. Adopted parent binding, selected submenu, images/ratio and optional hover. Exact installed theme parity remains unverified; product/article feeds, arbitrary alignment, bubble labels and multiple promotion modes are outside this specific collection-menu design.

Native details supports click/keyboard without JS. Enhanced navigation closes sibling desktop panels, handles Escape with focus restoration, outside click, focus leaving, and fine-pointer hover; listeners and timers are removed on editor cleanup. Existing account/search/cart behavior remains. Theme Check passed; four focused navigation tests cover sibling closing, Escape focus, outside click/cleanup and mouse-versus-touch hover. Browser visual and interaction verification remains pending due to the prior preview access restriction. Changes synced to development and unpublished demo only.
