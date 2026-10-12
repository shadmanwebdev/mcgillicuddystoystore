# Featured blog

Rebuilt 13 October 2026 from the user's Joyfy screenshot. Homepage placement: after Upcoming events, before Community. Uses the existing News blog (`news`); Shopify Admin verified four Visible posts with images and author Hobby Space. Existing content is theme-demo copy and was not rewritten or republished.

Files: `sections/arcadia-featured-blog.liquid`, `snippets/arcadia-journal-card.liquid`, `assets/arcadia-featured-blog.css`. The previous article card remains unchanged for the blog listing. The new card takes `article` and `options`, so it can be reused independently.

Centered heading, description and primary View-all link; four image-led cards on desktop, two columns through 1100px, one card or swipeable 88%-width cards through 600px. Rounded image corners, up to three non-interactive tag pills, publication date, author, full title, trimmed excerpt and accessible 46px arrow links. Image/title/arrow links use the real article URL. Missing images get a neutral theme placeholder; unpublished posts are not fabricated. Empty blogs show an honest empty state with editor setup guidance.

## Controls and Joyfy comparison

The screenshot establishes tags, date, author, title, excerpt, image, circular article action and a centered section CTA. Implemented controls: blog selection, header visibility, heading/description/CTA label, heading alignment, post count, desktop columns, square/portrait/landscape image ratio, card alignment/wrapper, tag/date/author/excerpt visibility, excerpt length, mobile carousel, arrows and section padding.

Public documentation search did not expose Joyfy's exact featured-blog settings. [Multicolumn documentation](https://ascent.webvista.studio/sections/multicolumn) offers a related layout benchmark (ratio/alignment/wrapper/mobile controls), but exact installed Joyfy blog-control parity is unverified. No claim of full parity. Arcadia deliberately uses its existing light/dark theme tokens rather than a separate color-scheme picker. Tags are metadata, not filters.

Light section background uses `--arcadia-bg` (#f6f5f0 default); buttons inherit the shared primary tokens. Dark mode inherits existing dark surface and lime accent. Native scrolling works without JS; shared carousel handles arrows, RTL, boundaries and editor cleanup. Reduced-motion disables image zoom.

Validation: Shopify Theme Check and existing carousel regression tests. Live visual verification remains pending due to the previously blocked local-preview browser access. Store blog contents were verified read-only in Shopify Admin; no store records were modified.

## Empty section repair — 13 October 2026

The development theme's downloaded homepage template showed `journal.settings: {}` despite the local template selecting `news`. This left the blog picker empty, hiding both articles and the View-all link. Re-uploaded `templates/index.json` after the section schema was present. When adding new sections, upload their schema before their configured template and read back the saved template to verify resource selections survived synchronization. No article publication changes or Liquid fallback to an unrelated blog were needed.
