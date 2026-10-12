# Homepage

Template: `templates/index.json`. Current order: Campaign hero, Find your game, Featured products, Upcoming event strip, Community call to action, Newsletter. Shared header and footer surround the template.

[Find your game](../sections/shop-by-game.md), [Featured products](../sections/featured-products.md), and [Upcoming events](../sections/upcoming-events.md) have been rebuilt under the [agreed workflow](../WORKFLOW.md). Featured products and Upcoming events are awaiting live visual verification and user review. Other sections retain their existing implementation.

Find your game includes all six known collections: Pokémon, Magic: The Gathering, One Piece, Warhammer, Jellycat and LEGO. All six appear in one row on desktop. The row scrolls horizontally on tablet and mobile, with navigation arrows when needed. All six use selected bundled artwork, including a pink Jellycat bunny and colorful LEGO bricks. Maintain these through the section's collection blocks. The page also depends on store products and event data for its other sections. No new store content or template assignments were created for this change.


Featured blog (Stories from the table) now sits after Upcoming events and uses the existing News blog's four published articles. See [Featured blog](../sections/featured-blog.md) for settings and verification limits.
# Homepage pacing update

Products and blog now use individual centered [content section containers](../features/homepage-container.md); other sections keep their normal width. The hero is configured in `sections/hero-group.json`; content order remains in `templates/index.json`.

Three reusable [breathing-space banners](../sections/breathing-space.md) now separate the content grids: discovery after collections, community after products, and editorial after events. Homepage order: hero → games → discovery → products → community image → events → editorial → stories → community CTA → newsletter.
