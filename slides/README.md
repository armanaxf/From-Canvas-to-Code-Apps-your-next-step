# Workshop Slide Deck

Presentation slides for the "From Canvas to Code Apps" workshop, built with [Slidev](https://sli.dev).

## Running Locally

```bash
cd slides
npm install
npm run dev
```

This opens a live-reloading preview at `http://localhost:3030`.

## Building for Production

```bash
npm run build
```

The output goes to `slides/dist/` and can be hosted as a static site.

## Exporting to PDF

```bash
npm run export
```

Requires `playwright-chromium` to be installed (`npx playwright install chromium`).

## Theme

Custom cottagecore styling over the `seriph` base theme. Colours:

- **Cream** (`#faf6f0`) - slide backgrounds
- **Sage green** (`#7a9a7e` / `#4e6b52`) - headings, emphasis
- **Terracotta** (`#c4734e`) - links, accents
- **Soft brown** (`#8b6f4e`) - secondary text
- **Dark brown** (`#4a3728`) - body text
- **Dusty rose** (`#c9908a`) - decorative accents
- **Soft gold** (`#d4a96a`) - highlights

Fonts: Playfair Display (headings), Lora (body), JetBrains Mono (code).

Styles live in `styles/index.css`.
