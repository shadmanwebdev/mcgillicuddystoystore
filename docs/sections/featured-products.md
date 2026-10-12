# Featured products

Rebuilt on 13 October 2026. Homepage heading: The next additions to your collection. Four products from the existing all-products collection, square contained images, aligned full-width purchase buttons and image-overlay quick view. Existing store product titles, prices and photos are retained. User acceptance and visual browser verification are pending.

## Files and reuse

- `sections/arcadia-featured-products.liquid`: merchant settings, header, optional collection panel and product list.
- `snippets/arcadia-featured-product-card.liquid`: reusable compact card accepting product, instance_id, show_vendor, show_badges, quick_buy, quick_view and second_image.
- `assets/arcadia-featured-products.css`: section and card presentation, responsive layout.
- Existing quick-buy, product-form, media, quick-view, header and card extension hooks are reused. The existing product-card snippet used on other pages is unchanged.
- Existing carousel module handles arrows. New `assets/arcadia-carousel-pagination.js` optionally adds page dots to a `data-carousel-track` paired with `data-carousel-pagination`; it observes size, responds to scroll, supports RTL/reduced motion and cleans up on unload.

## Controls and defaults

Header visibility, heading/eyebrow/description, heading alignment, collection and collection-link label; 4–16 products; 2–6 desktop columns (default 4); 1 or 2 mobile columns (default 1). Desktop carousel defaults off; mobile carousel on. Arrows and pagination dots default on but appear only when the track overflows.

Image ratio offers square, portrait and landscape; fit offers contain or cover. Card surface can inherit theme surface or background, or disable the background/border through Content wrap. Card text aligns left, center or right. Vendor defaults off; sale/sold-out badges, purchase buttons, quick view and second-image hover default on. These explicit section inputs override global card preferences for this section. Top/bottom spacing defaults to 48px, adjustable 0–120px.

Optional collection panel defaults off. Controls include image override, collection-title override, uppercase title, desktop left/right placement, image opacity and theme surface/background. It stacks above products on smaller screens. Colors inherit existing light/dark tokens; imagery uses a scrim for readable overlaid text.

## Product behavior

Visual refinement: product names use a 20px equivalent token and current prices a 22px equivalent token at the default root size. Compare-at prices remain smaller and muted. Cards have inset imagery, increased responsive padding, a divider above purchase actions, and subtle theme-derived shadows and hover borders. All styling remains scoped to these cards; reduced motion disables transitions. Visual browser verification remains pending.

Titles remain complete and use their natural height, with prices directly below them. Purchase actions align at the card bottom; shorter titles may leave a small amount of space below the price instead of an oversized gap above it. Single default variants use the existing add-to-cart form; products requiring choices or subscriptions link to the product. Unavailable products get disabled sold-out buttons. Price ranges show From and the minimum price. Percentage badges use the selected available variant's compare-at price and are suppressed for variable-price products. No fabricated stock, ratings, savings or product labels.

Quick view is a real product link enhanced by the existing modal module; it remains a link if scripting fails. It appears on hover/focus for mouse users and remains visible for touch. Optional second-image hover uses actual product media. Keyboard focus remains visible, and reduced motion disables transitions and zoom. Empty collections show an editor-only hint. Storefronts show the configured header without invented products.

## Joyfy comparison

Reference: [official Ascent/Joyfy Featured collection documentation](https://ascent.webvista.studio/sections/featured-collection.md), read 13 October 2026. Installed Joyfy version and live editor controls were not reverified in this change.

| Documented Joyfy option | Arcadia implementation |
| --- | --- |
| Collection and product count | Collection selector and limit |
| Desktop/mobile carousel, arrows, dots | Independent desktop/mobile toggles, optional arrows and page dots |
| Square/portrait ratio | Square/portrait plus landscape and image-fit control |
| Content wrap and alignment | Card background/border toggle and left/center/right alignment |
| Content/collection color schemes | Adapted to theme surface/background tokens, preserving current dark/light identity |
| Collection image toggle, custom image, desktop position | Optional left/right panel with custom-image fallback |
| Image opacity, title override and uppercase | Panel controls implemented |

The compact card styling and section-specific quick view, purchase, badges and rollover controls are Arcadia additions. This is documented functional coverage, not a claim of identical Joyfy presentation or exhaustive global-settings parity.

## Verification

- Shopify Theme Check: no issues.
- Seven carousel/pagination tests passed: boundary states, resize, final-page clamping, RTL, reduced motion, multiple instances and cleanup.
- Source review checked sold-out/default-variant/variable-price branches, unique form IDs, optional panel and explicit settings.
- Browser security previously blocked localhost preview access; no workaround was attempted. Visual desktop/mobile, light/dark, live editor lifecycle, and actual quick-view/cart interactions still need browser verification. Earlier screenshots are not evidence of this rebuild.


## Responsive refinement — 13 October 2026
Use two product columns at widths through 1100px; retain configured mobile columns and carousel behavior through 600px. Phone card gaps and padding use 16px theme spacing, with natural-height titles and prominent prices retained. Pagination targets are 44px square and navigation wraps. On touch devices, Quick view is placed below the image so it stays visible without covering the product. Shared headings stack on tablets, with full-width header buttons on phones.
Validation: source review and existing carousel/pagination tests; live visual verification remains blocked by browser access.
