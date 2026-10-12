# Demonstration preview

The local development server logged GET 401 / at 04:57:59 on 13 October 2026 after successful requests. CLI administrative access still worked. This establishes a preview authorization failure, but does not establish the exact session/token expiry cause. Restarting local development may renew the session; it is not a permanent demonstration guarantee.

Created unpublished **Arcadia Demo**, ID **200969650550**, from a full pull of the remote development theme (200926855542), preserving saved settings and assets. Development themes cannot be duplicated directly, so the copy was uploaded from `.tmp-demo-theme`. Staging directories are excluded from Git and normal theme uploads.

Preview: https://mcgillicuddystoystore.myshopify.com?preview_theme_id=200969650550

Admin: https://admin.shopify.com/store/mcgillicuddystoystore/themes/200969650550/editor

The live theme remains toy-store-theme (189859430774). The demo is a snapshot and is not auto-synced by the local dev watcher. A `demo` CLI environment targets it explicitly. Update deliberately before demonstrations, preserving remote settings; never publish as part of a preview update.

Use Online Store → Themes → Arcadia Demo → Preview for presenting. For guests, create a fresh visitor link from the preview bar shortly before the demonstration. Shopify documents visitor links as unauthenticated and valid for two days; merchant previews require admin authentication and last 30 days. Store access restrictions may still apply. Do not promise a permanently anonymous draft-theme URL.

Reference: https://help.shopify.com/en/manual/online-store/themes/adding-themes#share-a-theme-preview-with-others

Verified upload and unpublished role through Shopify CLI. Live browser navigation, checkout, cart, and guest access remain unverified due to the previously blocked preview browser access. A presentation rehearsal is still required; hosted previews remove local server/session dependency, not all possible Shopify/network interruptions.
