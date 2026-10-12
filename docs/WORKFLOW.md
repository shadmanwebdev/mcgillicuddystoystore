# Arcadia development workflow

Agreed project workflow, saved 13 October 2026.

## Direction

Homepage pacing: use useful search, shopping inspiration and promotional breaks. Do not insert a separate events/blog teaser immediately above the corresponding events/blog section; it duplicates the content and adds unnecessary scrolling.

**Imagery preference:** Do not use pictures of people in any section unless the user explicitly requests them or the section obviously requires people imagery. Default to products, game pieces, artwork, objects, or abstract illustrations. A general community message alone does not require a people photo. Applies to generated images, stock photos, and selected store assets.

Build and refine the theme section by section, starting with the homepage Find your game (Shop by game) section. Preserve the existing light and dark palettes and basic visual identity. User-provided images guide the design of the relevant section; clarify material conflicts with the shared styling before implementing them.

Use Joyfy's equivalent section as a customization benchmark for every section without requiring the user to repeat this instruction. Match its relevant customization options, adapt their presentation to Arcadia, and document any differences or unverified behavior. Do not equate matching section names or setting counts with matching functionality.

## Before implementation begins

1. Establish Git version control and record a baseline of the current theme and development tooling before modifying storefront code. Exclude dependencies, caches, credentials, and generated artifacts.
2. Record the current appearance of the section in light and dark modes and identify its files, shared components, and existing behavior.
3. Extend the existing token system as sections are developed, preserving the current appearance. Avoid an unrelated theme-wide rewrite.

Saving this workflow does not mean these implementation steps have been completed.

## Workflow for each section

### 1. Inspect and compare

- Read the existing section, its snippets, CSS, JavaScript, schema, and relevant documentation.
- Check Joyfy's equivalent section using its editor when available and official documentation otherwise. Record the source, review date, version when known, and any unverified controls.
- Review the user's visual reference, if provided, and identify desktop and mobile requirements.
- Identify reusable components and Shopify data requirements before adding new files or controls.

### 2. Define the section

- Describe the intended appearance, content, interactions, responsive behavior, and empty states.
- List the editor settings and repeatable blocks, with sensible defaults and limits.
- Explain which Joyfy controls will be adopted, adapted, or omitted and why.
- Resolve important design choices with the user; use judgment for routine implementation details already covered by the agreed direction.
- Capture the specification in the section document before or alongside implementation.

### 3. Implement reusable components

- Sections assemble content and expose Shopify editor settings.
- Snippets render reusable components such as headings, buttons, cards, media, and forms.
- JavaScript modules provide reusable behavior through the existing Arcadia registry and event system.
- Shared features should accept explicit inputs and work across pages. Avoid duplicating implementations or relying on a particular page's DOM structure.
- Scope each component's selectors, IDs, styles, and event handlers so multiple instances work independently.
- Initialize and clean up behavior correctly when Shopify's editor loads or removes a section. Cancel obsolete requests and remove listeners or timers on cleanup.
- Load feature assets where needed and keep essential content and navigation usable when JavaScript is unavailable where practical.

### 4. Validate

- Run Shopify Theme Check after storefront changes.
- Preview with actual Shopify data and check desktop, tablet, and mobile layouts.
- Check both light and dark modes, long text, missing media, empty collections, and relevant unavailable-product states.
- Exercise the controls changed in this section, including their defaults and useful boundary values.
- Check keyboard navigation, focus visibility, labels, contrast, and reduced-motion behavior where relevant.
- Verify multiple instances and theme-editor add, remove, reorder, and reload behavior.
- Check other consumers when a shared component or token changes.
- Add focused automated tests when they protect meaningful behavior; avoid tests that merely repeat implementation details.
- Record what was tested, the result, and any remaining limitations. Do not describe an untested feature as verified.

### 5. Document and review

- Update the section, page, and shared-feature documentation with the implementation.
- Present the working preview, summarize the available customization, and record outstanding decisions.
- Incorporate the user's feedback before treating the section as accepted and moving to the next planned section.
- Make focused Git commits for completed work once version control is established.

## Theme styling and variables

Use CSS custom properties as the shared source for reusable styling values:

- Colors and backgrounds for both light and dark modes.
- Font families, font sizes, weights, line heights, and letter spacing.
- Spacing, component gaps, page widths, and common sizing.
- Borders, corner radii, shadows, and reusable motion durations.

Build on `snippets/arcadia-theme-styles.liquid` and `snippets/arcadia-theme-styles.liquid`. Keep baseline values centralized and map merchant-editable global settings to the same tokens. Preserve existing palette values and styling unless the user requests a change.

Use this precedence: shared theme default, then an explicit section-level override. Scope section overrides to the section instance so they cannot change unrelated sections. Shared components inherit the relevant tokens rather than repeat literal theme values.

All sections we build must use `var(--arcadia-bg)` as their light-mode section background (default `#f6f5f0`). Apply the shared `arcadia-section-background` class to each section root; its rule lives in `snippets/arcadia-theme-styles.liquid`. Find your game and Featured products use this foundation. The cookie banner also uses this background in light mode. Cards and image surfaces remain separate component treatments; preserve the existing dark-mode styling.

Expose useful design controls consistently: alignment, width, spacing, media sizing, and responsive layout where appropriate. Avoid adding settings that do not visibly affect the output. Ordinary structural CSS values do not all need tokens; standard media-query breakpoints should remain coordinated in CSS because CSS custom properties cannot be used directly in media-query conditions.

## Documentation structure

Create these documents as the corresponding work is inspected or implemented. Only this workflow is established by this step; the remaining entries are planned documentation.

```text
docs/
  WORKFLOW.md
  ARCHITECTURE.md
  DESIGN-TOKENS.md
  EXTENSIONS.md
  TESTING.md
  pages/
    home.md
  sections/
    shop-by-game.md
    campaign-hero.md
  features/
    theme-mode.md
    cart.md
```

- **Page documents:** purpose, template, section order, dependencies, content setup, and completion status.
- **Section documents:** intended design, source files, settings and blocks, defaults, Joyfy comparison, data requirements, responsive behavior, shared components, accessibility, and verification results.
- **Feature documents:** behavior, public inputs and events, dependencies, lifecycle, integration examples, and limitations.
- **Design tokens:** token names, purpose, defaults, dark/light behavior, editor mappings, and override rules.
- **Extensions:** existing extension hooks, named arguments, supported usage, and app-block alternatives.
- **Testing:** reusable checks and a record of relevant results and outstanding issues.

Link documents from the README or their parent page/feature document. Keep documentation in the same change as the code it describes. Record planned behavior separately from implemented and verified behavior.

## Shopify preview and store content

Use the existing local Shopify development preview for implementation and review. A theme template and a Shopify page are separate: document required pages, template assignments, collections, products, metafields, and metaobject definitions explicitly.

Treat creation of store content, upload of a permanent draft, and publishing as separate tasks with clear user scope. The section development workflow uses the development theme; publishing requires an explicit user request.

## Definition of done

- The section matches the agreed design and preserves the shared theme identity.
- Its supported controls, blocks, and defaults work as documented.
- Responsive layouts, both appearance modes, and relevant empty states have been checked.
- Accessibility, multiple instances, and editor lifecycle checks relevant to the change pass.
- Theme Check passes, and relevant shared-component regressions have been checked.
- Documentation reflects the actual implementation and test results.
- The user has reviewed the result and any unresolved limitations are clearly recorded.

## Initial sequence

1. Establish the Git baseline and document the relevant existing tokens and architecture.
2. Review and implement the homepage Find your game section using this workflow.
3. Continue through Campaign hero, Featured products, Upcoming events, Community call to action, and Newsletter, adjusting the order to the user's priorities.
4. Refine shared header/footer components and expand to other pages as directed.

Current status: Git baseline recorded as cf700df. Find your game implemented for development-preview review; see sections/shop-by-game.md. User acceptance is pending.
