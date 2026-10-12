# Collection artwork sources

Replaced collection logos and product packaging with locally bundled artwork on 13 October 2026. These are sourced images, not generated artwork. They are included in the development theme; source availability does not establish a commercial reuse license.

| Collection | Theme asset | Official source |
| --- | --- | --- |
| Pokémon | assets/arcadia-game-pokemon.png | https://www.pokemon.com/us/pokedex/pikachu |
| Magic | assets/arcadia-game-magic.webp | https://magic.wizards.com/en/news |
| One Piece | assets/arcadia-game-onepiece.webp | https://en.onepiece-cardgame.com/ |
| Warhammer | assets/arcadia-game-warhammer.jpg | https://www.warhammer-community.com/en-gb/topics/ultramarines/ |
| Jellycat | assets/arcadia-game-jellycat.jpg | https://www.daisyandhen.com.au/products/jellycat-bashful-bunny-small-tulip-pink |
| LEGO | assets/arcadia-game-lego.jpg | https://www.guinnessworldrecords.com/products/books/bonus-content/competitions/win-a-lego-set |

Jellycat and LEGO now explicitly select bundled pink bunny and colorful brick images, replacing the collection-image fallback. Both source files were visually inspected. The single-row layout and hover animation are unchanged.

Downloaded image URLs:

- https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png
- https://images.ctfassets.net/s5n2t79q9icq/01SLZ1WmhSkV2LaL4Du1f1/12f5bb3cbae6e3a754bbff221b15bb63/FRA-8003_DSFHBFYJG_EN_461635_1920x1050_01.webp?q=80
- https://en.onepiece-cardgame.com/renewal/images/common/pc/footer_illust_chara.webp
- https://assets.warhammer-community.com/explore-more-cards/exploremore_40k-sep2024.jpg

Each block's Included artwork setting chooses one bundled illustration or the collection image. A merchant-selected Custom artwork image takes precedence. This preserves reuse across pages without depending on a particular collection handle. Circle mode hides optional logos and descriptions, centers the collection title, and uses an image scrim for contrast. Maximum circle size defaults to 200px (120–320px); Circle spacing defaults to 64px (24–100px). Both are section-scoped editor controls.

All four downloaded files were visually inspected and Shopify Theme Check returned no issues. Browser security policy blocked final localhost preview access, so current rendered appearance and responsive checks remain unverified. Earlier screenshots show the superseded artwork.
