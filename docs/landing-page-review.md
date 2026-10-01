# Landing page review, 1 October 2026

Design read: an app landing page for people praying the Rosary, retaining the existing navy/blue palette and Google Sans / DM Sans typography. ENERGY 1 / RHYTHM 2 / MOTION 2. The requested antislop copywriting rules were applied during the rewrite.

## Design decisions

- Keep the existing palette and type stack so the landing page still belongs to OpenRosary and ryanson.id.
- Keep the header wordmark blue in both themes, including hover, as requested.
- Use a shared content width and section columns to align headings, screenshots, prose, and actions.
- Align both feature screenshots at the top instead of staggering one below the other.
- Center desktop navigation, with download and theme controls grouped at the right; keep all three section links visible on phones.
- Show sun/moon icons for the theme action, with an accessible name and tooltip.
- Smooth scrolling connects a navigation link to its destination; the underline marks the current section, and a brief heading animation confirms arrival. Reduced-motion preferences disable these animations.
- Give the footer a separate surface, a clear OpenRosary wordmark, three useful destinations, and an author credit.
- Use full-width action buttons below 480px so wrapped buttons do not leave uneven edges.
- Keep actual Android screenshots as product evidence. The phone frame alone has a shadow to separate it from the page.
- Rewrite the copy around choosing prayers, keeping progress, and moving at the reader's pace. The future-language sentence comes directly from the user's request.
- Update the social preview branding and image version so shared links use OpenRosary too.

## Recorded browser checks

| Control | Result |
| --- | --- |
| Header and footer OpenRosary links | Return to `/app`. |
| Features | Navigates to `#features`; smooth scrolling, active underline, and heading animation observed. |
| How to pray | Navigates to `#how-it-works`. |
| Questions | Navigates to `#faq`; also activated with Enter. |
| Theme toggle | Both light and dark mode work; icon, accessible label, and hero screenshot change together. Keyboard activation works, and the choice survives navigation/reload. |
| All four Download APK links | Each produced an APK download in the browser. No installation performed. |
| All three Open web version links | Each opens `/`, with the existing mystery-selection page. |
| Footer Pray in your browser | Opens `/`. |
| All six FAQ summaries | Each opens its corresponding answer; the first also opened with Space. |
| Privacy policy | Opens `/app/privacy`; Back to OpenRosary returns to `/app`. |
| GitHub source | Opens `https://github.com/pinterbanget/openrosary` in another tab. |
| Made by Ryanson | Opens `https://ryanson.id/` in another tab. |
| Skip to content | Tab exposes a visible focus outline; Enter moves focus to main content. |

## Delivery gate

- Hard Gate PASS: no em dashes, invented statistics, testimonials, features, or dead navigation; existing product facts and screenshots retained. Copy scan completed.
- Responsive layout PASS: checked desktop, 768px, 390px, and 320px; DOM bounds checks found no overflowing content. Screenshot comparisons covered both themes.
- Contrast PASS: muted light text 5.61:1, muted dark footer text 9.55:1, light accent 5.35:1, dark accent 11.44:1. Computed with the antislop contrast checker.
- Keyboard PASS: skip link, section navigation, theme action, and native FAQ disclosures operated by keyboard, with visible focus styling.
- Functionality PASS: click-through results are recorded above. Static marketing content does not fetch data or require loading/empty/error views.
- Purpose-Gate PASS: palette, typography, screenshot framing, section layout, footer structure, and motion have written reasons above; no gradients, glow, ornamental badges, or new illustration assets.
- Liveliness PASS: restrained headings and real prayer screens remain the focal points; varied screenshot, text, FAQ, and footer compositions match the declared dials.
- Craftsmanship PASS: original identity retained, shared alignment and responsive states verified, and product claims grounded in existing source content. Reduced-motion behavior reviewed in source; the browser tool did not provide OS motion-preference emulation.
- Build PASS: `npm run build`, `npx tsc --noEmit`, and `git diff --check` completed successfully.
- Console PASS: the exported production preview reported no warnings or errors. Next.js's smooth-scroll attribute was added after a development warning.

Changes are in the existing `codex/app-landing` worktree at `C:/Users/rjsec/Codes/openrosary-landing`. Publishing to `main` triggers the existing Git-connected production deployment.
