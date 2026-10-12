# Footer

## Current design — screenshot-led correction

The user rejected the large green brand panel and nested sitemap. Replaced the accumulated CSS with a clean layout: independent 1400px footer frame, plain compact brand area, optional six-collection column (resource picker with existing homepage collection fallbacks), and top-level-only menu navigation. Shared header/navigation snippets and store menus are unchanged; nested menu destinations remain accessible elsewhere. Removed decorative marker and heading rules. Removed the white utility box; localization controls form a slim row with visually hidden accessible labels. No submission behavior changed. Mobile navigation uses two columns with 44px targets. This revision supersedes the earlier visual descriptions below. Theme Check passed; screenshot supplied by user informed the redesign, but the new storefront rendering has not been visually verified.

## Second visual revision

Replaced equal-width columns with a distinct brand/navigation composition: green brand panel using accent/background tokens, game-symbol mark, optional shop CTA to `routes.all_products_collection_url`, flexible link columns with accent heading rules, and a bordered surface utility bar. Below 900px the brand panel stacks above two navigation columns. Signup on other pages occupies its own full-width row. All previous menu, localization, policy and visibility controls remain. Brand padding is a shared CSS token. Theme Check passed; browser-rendered appearance remains unverified. Synced to development and demo themes.

Rebuilt 13 October 2026 with the shared content max-width, cream/dark background tokens, responsive navigation columns, linked store name or optional logo, compact utility/legal rows and bordered social links. Menus remain connected to existing Shopify navigation, including nested links; no menu records or destinations were changed. On mobile, brand and newsletter span the width while menu columns sit side by side with 44px link targets. Long names wrap.

Files: `sections/arcadia-footer.liquid`, `assets/arcadia-footer.css`, brand/heading tokens in `snippets/arcadia-theme-styles.liquid`. Existing newsletter and localization snippets and footer extension hook remain. Newsletter defaults to hidden on the homepage to avoid repeating the standalone signup, and remains available elsewhere. Required consent and feedback in the shared form are unchanged.

Reviewed the publisher's [Footer documentation](https://ascent.webvista.studio/footer) on 13 October 2026. Added top-border and uppercase-heading toggles, image/opacity controls, social visibility, localization visibility, payment/policy visibility, optional logo, text blocks, vertical spacing and Powered by Shopify toggle. Existing menu blocks remain editable. Arcadia uses shared palette tokens, text-labeled social links in a fixed order, and a static background; independent color schemes, configurable social-icon styles/order and fixed-background effects are not implemented. Exact installed Joyfy parity is not claimed.

Payment icons come only from enabled Shopify payment types; policies only from existing policy records, and social links only from configured URLs. No invented payment, contact, location, opening-hours or shipping claims. No people imagery.

Validation: Theme Check; reviewed missing logo/social/menu states, wrapping and mobile rules. No newsletter or localization form was submitted. Live browser visual and interaction checks remain pending due to the prior preview access restriction. Changes target development and unpublished Arcadia Demo only.
