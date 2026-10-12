# Upcoming events

Homepage eyebrow: **Play locally. Connect for real.** Heading: **The table is waiting.**

## Design and files

Three-column desktop event cards, two columns through 1100px, and a swipeable phone row through 600px with part of the next card visible. Phone columns and carousel behavior are configurable. Cards use existing theme typography, surfaces, spacing, rounded corners and primary buttons. The section uses `--arcadia-bg` in light mode (default `#f6f5f0`); dark colors retain the existing palette. Date/time is emphasized, descriptions are muted, and actions align at the bottom. Missing images produce text-only cards rather than unrelated stock imagery. Calendar actions are inside a disclosure to reduce clutter.

- `sections/arcadia-upcoming-events.liquid`: event sources, availability filtering, settings and section rendering.
- `snippets/arcadia-event-card.liquid`: shared event card; optional `card_options` enables the upcoming-section action layout, button style and status visibility. Existing consumers omit it and retain their action layout.
- `assets/arcadia-upcoming-events.css`: scoped responsive presentation, loaded after shared event styles.
- Existing events, calendar and countdown modules retain their behavior; shared carousel handles overflow, arrow boundaries, RTL, reduced motion and editor selection.
- Shared header accepts optional `button_secondary`; omitted means secondary as before.

## Joyfy benchmark

Reviewed 13 October 2026 against [Joyfy/Ascent Multicolumn documentation](https://ascent.webvista.studio/sections/multicolumn). Installed Joyfy version and live editor verification remain unconfirmed.

| Joyfy control | Arcadia implementation |
| --- | --- |
| Show header, title, description, watermark | Section header toggle, heading, description and watermark; existing eyebrow retained |
| Section button text/link/style | Heading link label, URL and primary/secondary button style |
| Image ratio | Adapt, square, portrait, landscape; also cover/contain fit |
| Text alignment | Start, center, end for card content; separate heading alignment |
| Content wrapper and color scheme | Wrapper toggle, theme surface/background; light/dark palettes remain centralized |
| Mobile column count | One or two; optional mobile carousel |
| Per-column image/title/text/button | Event block artwork/title/description/action label and destination |

Additional controls: desktop columns (2–4), desktop carousel, overflow arrows, top/bottom padding, event status and badges, date sources, calendar and countdown options, and existing event detail toggles. Button style applies to both header and event actions. A theme-wide scheme picker is intentionally represented by the existing light/dark palette and surface choice. Legacy card styles remain available; compact hides artwork, poster retains uppercase titles, and the section image ratio governs artwork proportions. Explicit block backgrounds override the section card surface.

## Data and content setup

Use existing `arcadia_event` metaobjects or manual Event blocks. The homepage template does not currently define manual event blocks; live metaobject availability has not been verified. No event dates, prices, stock, registrations or store records were created by this change.

Metaobjects are selected chronologically, then manual blocks in editor order, up to the shared maximum-events limit. With the combined source, metaobjects take priority for the limit; selected cards are sorted chronologically by the existing client module, with undated manual cards last. Metaobjects-only mode uses manual blocks as a fallback when no eligible metaobjects render. Completed, cancelled and past-start events are excluded. Ongoing events whose start time has passed remain excluded under the existing upcoming-only behavior.

Supply ISO 8601 start/end values including the timezone offset. Cards display the date/time and numeric offset through the shared date snippet. Calendar export requires a valid start; Google Calendar also needs an end after the start. Capacity, spaces and status are merchant-supplied, not live booking inventory.

CTA destination priority remains event landing page, registration link, ticket link, entry product. No CTA renders without a destination. The heading CTA likewise requires a real configured URL; a route was not invented. Without upcoming records, a localized empty message renders even without JavaScript. The theme editor additionally explains how to add content.

## Validation and limits

Shopify Theme Check and the carousel/events regression tests validate syntax, chronological filtering, empty states, countdown completion, boundaries, RTL, reduced motion, instance isolation and cleanup. No new store content was created or live theme published.

Live desktop/mobile/tablet, light/dark, theme-editor and calendar-download visual verification remains pending because browser access is blocked in this session. User review is still required; code checks do not establish visual correctness.

User screenshot confirms the light-mode empty state renders on the homepage. Replaced the generic filter-empty translation with `events.upcoming_empty` in all six locales, because this section has no filter controls. The local homepage has no manual event blocks; eligible live metaobjects have not been independently verified.

## Shopify demo records — 13 October 2026

### Homepage card action update

Calendar downloads are disabled explicitly on the homepage and default off for new Upcoming event sections. Cards without an event destination now offer a primary **Explore this game** button, resolving the event game name to one of the six existing collection handles. Unknown games or missing collections produce no link. The fallback is optional and its label is editable. Event artwork and titles remain unlinked when no event destination exists; only the clearly labeled collection button goes shopping. Existing event destinations retain priority. Other sections' calendar controls remain unchanged.

Created with the user's explicit request to populate the section. Shopify previously had no custom metaobject definitions. Created `arcadia_event` with `title` (single-line text), `start_at` (date/time), `short_description` (multi-line text), `image` (image file), `game` and `status` (single-line text). Active/draft and storefront access are enabled; standalone web-page publishing is disabled. Other optional fields can be added when real event details are available.

All three entries were verified saved and Active in Shopify:

| Title | Metaobject ID | Demo start |
| --- | --- | --- |
| Demo: Pokémon casual play | 672587841910 | 7 Nov 2026, 13:00 EST (18:00 UTC) |
| Demo: Magic Commander evening | 672599572854 | 14 Nov 2026, 13:00 EST (18:00 UTC) |
| Demo: Warhammer paint and play | 672599900534 | 21 Nov 2026, 13:00 EST (18:00 UTC) |

The admin form displayed EST for these dates. Times are demonstration values, not confirmed store bookings. Each description explicitly labels the record as preview-only; there are no booking URLs, prices, capacity or availability claims. All have `status=upcoming`. Pokémon and Magic reuse the bundled collection artwork uploaded to Shopify Files; Warhammer uses an existing matching store image. Record handles are `demo-pokemon-casual-play`, `demo-magic-commander-evening`, and `demo-warhammer-paint-and-play`.

Manage at https://admin.shopify.com/store/mcgillicuddystoystore/content/metaobjects/entries/arcadia_event . Screenshot: `docs/screenshots/shopify-demo-events.jpg`. Admin browser access worked for this task; the previous local-preview security block was not bypassed, and storefront rendering of these records remains unverified. The existing homepage source `both` reads active metaobjects without adding manual blocks. These dated examples naturally disappear from the upcoming-only list after their start dates. Set the entries to Draft when testing is complete, or replace their demo content with confirmed event details before launch.

## Event detail buttons — 13 October 2026

Supersedes the collection fallback above: removed game-collection fallback code/settings entirely. Cards now use the existing event destination and the English default label `View event details`. Calendar downloads remain off. Enabled Shopify web-page publishing for `arcadia_event`, using the `events` URL prefix, Title as SEO title and Short description as SEO description. The active demos receive `/pages/events/{entry-handle}` URLs; the Pokémon URL was verified in Shopify's Search engine listing. This exposes event pages, not a new live theme publication.

The development theme already has `templates/metaobject/arcadia_event.json`; sync logs confirm it uploaded successfully. Its hero displays the actual event title, description, image and date; calendar is off, and currently-empty Details, Tournament and FAQ sections are disabled in this template (re-enable as real data is added). Registration/ticket buttons render only when actual links/products exist. Related events exclude the current entry. Location remains absent until supplied; no venue was invented.

Theme Check passes. Shopify admin confirmation is saved at `docs/screenshots/event-detail-url.jpg`. End-to-end local navigation remains unverified due to the earlier preview browser-access restriction. The live theme may report no template because this template is installed on the development theme only.
