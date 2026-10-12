# Reusable carousel

`assets/arcadia-carousel.js` registers `carousel` with the existing Arcadia registry. Add `data-arcadia-module="carousel"` to an instance root, a scrollable child marked `data-carousel-track`, a controls wrapper marked `data-carousel-controls`, and buttons marked `data-carousel-direction="-1"` or `"1"`. Buttons should reference a unique track ID through `aria-controls` and have descriptive labels.

The consuming section owns CSS layout and scrolling. Controls start hidden; the module reveals them only on overflow and disables buttons at the ends. It scrolls one track viewport in the correct text direction and respects reduced motion. ResizeObserver and passive scroll events update navigation state. Shopify block selection scrolls the selected list item into view.

The registry initializes each root independently. Cleanup removes click, scroll and block-selection listeners and disconnects ResizeObserver. Missing track or controls is a no-op. Content remains navigable without JavaScript; arrows require JavaScript. This module does not alter the existing `slider` module or its consumers.

Run `node --test tests/carousel.test.cjs` for behavior tests. Browser verification and editor limitations are recorded in [Find your game](../sections/shop-by-game.md).
