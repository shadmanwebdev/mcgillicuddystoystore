# Arcadia Shopify theme

Arcadia is a buildless Shopify theme. Liquid, JSON, CSS, and JavaScript source files are served directly by Shopify.

Shared theme styling has one source: `snippets/arcadia-theme-styles.liquid`. Edit palettes, typography, buttons, spacing tokens and merchant-setting mappings there. Section CSS remains modular for layout and behavior. See [design tokens](docs/DESIGN-TOKENS.md).

## Local preview on Windows

From this project folder, run:

```powershell
.\shopify.ps1 theme dev
```

The default store is `mcgillicuddystoystore.myshopify.com`, configured in `shopify.theme.toml`. Complete the Shopify account login when prompted. The account needs access to this store's themes.

The CLI uploads a temporary development theme and serves a local preview, normally at `http://127.0.0.1:9292`. Keep the terminal running while testing; local edits trigger preview updates. Press Ctrl+C to stop. This command does not publish the theme.

Shopify supplies the Liquid renderer, products, collections, cart, and checkout. The preview therefore requires an internet connection and store access; it is not an offline Shopify server. Use the preview and editor URLs printed by the CLI.

## Checks and packaging

```powershell
.\shopify.ps1 theme check
.\shopify.ps1 theme package
```

With Node.js 22.12+ and npm installed, the equivalent commands are `npm run dev`, `npm run check`, and `npm run package`. To install the pinned project dependencies on another machine, run `npm ci`. The PowerShell launcher can also use the Node runtime bundled with Codex on this computer.

For this computer's project-local npm installation:

```powershell
node .tools/package/bin/npm-cli.js ci --cache .tools/npm-cache
```

## Content needed for testing

- Products and collections come from the connected Shopify store.
- Configure images, navigation, collections, and section blocks in the development theme editor.
- Custom page templates include events, a single event, community, releases, FAQ, and contact.
- Events support manual section blocks or `arcadia_event` metaobjects configured in Shopify. Product rarity and preorder messaging use product metafields.
- Test the homepage, collection filtering, product variants, cart updates, search, and mobile navigation. Use test-payment settings before testing a checkout transaction.

## Documentation

- [Agreed development workflow](docs/WORKFLOW.md)
- [Homepage](docs/pages/home.md)
- [Find your game settings and Joyfy comparison](docs/sections/shop-by-game.md)
- [Featured products settings and Joyfy comparison](docs/sections/featured-products.md)
- [Upcoming events settings and Joyfy comparison](docs/sections/upcoming-events.md)
- [Reusable carousel](docs/features/carousel.md)
- [Cookie consent styling](docs/features/cookie-consent.md)
- [Theme styling tokens](docs/DESIGN-TOKENS.md)
- [Shopify CLI for themes](https://shopify.dev/docs/storefronts/themes/tools/cli)
- [Theme development preview](https://shopify.dev/docs/api/shopify-cli/theme/theme-dev)

Development tooling is excluded from theme uploads through `.shopifyignore`.

- [Featured blog settings and reference comparison](docs/sections/featured-blog.md)
