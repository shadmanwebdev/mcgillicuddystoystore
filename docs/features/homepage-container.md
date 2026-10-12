# Content section containers

Updated 13 October 2026: the user rejected applying large padding to all homepage content. The outer homepage wrapper and its padding rules have been removed. Hero stays in its editable group; other sections use their original `.arcadia-container` widths.

Featured products and featured blog now also use `.arcadia-content-container`, a reusable class defined in `snippets/arcadia-theme-styles.liquid`. It sets a maximum content width of 1400px and automatic inline margins, with a minimum 24px side gutter. Below 700px, separate mobile gutters default to 20px. The max width is the content width, not a padded outer box. Headers and cards remain aligned inside each section.

Theme settings → Content section containers exposes width and desktop/mobile gutters. Variables are `--arcadia-content-width`, `--arcadia-content-gutter`, and `--arcadia-content-gutter-mobile`, emitted by `snippets/arcadia-theme-styles.liquid`. The previous homepage-wide settings no longer apply.

Applied to development theme 200926855542 and unpublished Arcadia Demo 200969650550. Theme Check passed. Visual browser verification remains pending. No live publication.
