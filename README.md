# OpenRosary Web

OpenRosary Web is a simple browser-based rosary tool built with Next.js.

The Android app landing page is available at `/app`. The existing browser prayer tool remains at `/`, and the landing page links to it with **Open web version**.

## Android app landing page

- `app/app/` contains the landing page and Android privacy page.
- `public/app/screenshots/` contains 1080 × 2220 (18.5:9 portrait) captures of the signed Android 0.4 release, including English light mode and Latin dark mode. Capture the app at this resolution so its layout reflows; do not stretch or crop a shorter screen.
- `public/app/downloads/openrosary-0.4.apk` is the signed APK for Android 8.0 and newer. Its signing certificate matches the public 0.3 release.
- The adjacent `.sha256` file records the APK checksum. Replace the APK, checksum, screenshot assets, versioned links, and download headers together when publishing another version.
- `public/_headers` makes Cloudflare serve the APK as an Android package download.
- `public/app/social.svg` is the editable source for the social preview PNG.

The landing page follows ryanson.id’s font stack: Google Sans, Google Sans Text, and a bundled DM Sans fallback. Headings and the wordmark use weight 700, body and navigation text use 400, and action labels use 600. This font is scoped to `/app`; the browser prayer tool keeps its existing typography. Blue/navy light and dark colour tokens remain shared with the app. Phone frames contain real screenshots. Keyboard focus, a skip link, and native FAQ disclosures support navigation without a mouse.

Production is deployed by the existing **Workers Builds: openrosary-web** GitHub integration when `main` is updated. Run `npm run build` and `npx tsc --noEmit` before publishing. Do not run a production build while the development server is using the same output directory.

The site lets you pick a set of mysteries, step through the rosary prayer by prayer, and read a Scripture passage for each decade. It is designed for phone use as well as desktop, with keyboard and swipe navigation.

## What The Website Does

- Choose from the Joyful, Luminous, Sorrowful, and Glorious mysteries.
- Highlights a suggested mystery for today on the home screen.
- Walk through the full rosary with progress tracking.
- Shows the mystery title, prayer label, prayer text, and decade reading as you advance.
- Supports English and Indonesian for readings and general UI.
- Supports a home-screen toggle for Latin prayers while keeping the decade readings in the selected vernacular language.
- Includes vibration feedback for navigation on supported devices.

## Current Prayer And Reading Behavior

- `EN` on the rosary page switches the mystery readings and interface to English.
- `ID` switches the mystery readings and interface to Indonesian.
- Turning on `latin prayers` from the home page changes the prayers and prayer labels to Latin.
- Latin mode does not change the mystery readings; those stay in the selected reading language.

## Navigation

- Desktop:
  Use the left/right or up/down arrow keys to move through the rosary.
- Mobile:
  Swipe left to advance and swipe right to go back.
- The rosary page also shows progress out of `80` steps.

## Project Structure

- `app/page.tsx`
  Home screen with mystery selection and the Latin prayers toggle.
- `app/rosary/page.tsx`
  Main rosary experience, reading-language selector, navigation, and completion modal.
- `lib/prayers.ts`
  Prayer texts, prayer titles, and mystery readings for English, Indonesian, and Latin prayers.
- `lib/rosaryState.ts`
  Rosary progression logic and current-step state.
- `lib/vibration.ts`
  Vibration helpers for supported devices.

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Verification

TypeScript can be checked with:

```bash
npx tsc --noEmit
```

## Notes

- The app currently uses Google Fonts in `app/layout.tsx`.
- In restricted or offline environments, `next build` can fail if those fonts cannot be fetched.
