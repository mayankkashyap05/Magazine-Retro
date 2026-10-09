# ENIAC — Digital Magazine

**Old machine. New thinking.**

ENIAC is a digital magazine about computing, artificial intelligence, cybersecurity,
digital life and the human relationship with technology. It takes its name from the
30-ton machine that helped begin the electronic computing age — and reads like the
future looking backward and forward at the same time.

## Issue 01 contents

| № | Story | Route |
|---|-------|-------|
| 01 | From Computer to Artificial Intelligence — a 5,000-year visual timeline | `/timeline` |
| 02 | ENIAC — the giant that started the digital age | `/eniac` |
| 03 | BCA Is Not Just a Degree — a launchpad | `/bca` |
| 04 | Cybersecurity — your one click can cost you everything | `/cyber` |
| 05 | Young Generation & AI — boon, bane or both? | `/ai` |
| 06 | Human Brain & Computer Games — who is controlling whom? | `/games` |

## Design system

- **Color** — warm paper `#f4efe4`, near-black ink `#16130e`, one oxidized signal red `#c8401a`.
- **Type** — Fraunces (display serif), Archivo (body grotesk), IBM Plex Mono (technical).
- **Identity** — editorial grid, archival numbering, crop/registration marks, punched-card
  motifs, oversized statistics, asymmetric layouts. No gradients, no glass, no cards-for-cards.

## Stack

Vite + React 18 + React Router, self-hosted variable fonts (`@fontsource`), zero other
runtime dependencies. All motion is scroll-driven, one-shot, and fully disabled under
`prefers-reduced-motion`.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run preview  # serve the production build
```

## Print edition (A4 PDF)

```bash
npm run pdf     # builds, then writes output/ENIAC-Complete-Edition.pdf
npm run pdf:qa  # structural checks (needs: pip install pymupdf)
```

Requires Google Chrome or Microsoft Edge (set `CHROME_PATH` if Playwright cannot find one).
See `docs/PRINT-EDITION.md` for the pipeline and `docs/PRINT-QA.md` for the QA report.

## Structure

```
src/
  data/magazine.js        # issue + story content model (add future issues here)
  lib/hooks.jsx           # in-view, count-up, scroll progress, reduced-motion
  components/             # masthead, footer, story shell, editorial primitives
  pages/                  # Home + one page per story
  styles/                 # tokens, base, components, home, stories
  assets/img/             # curated duotone editorial imagery
  print/                  # A4 print edition (print.html entry, export pipeline support)
scripts/                  # export-pdf.mjs (PDF pipeline), qa-pdf.py (PDF checks)
```

## Colophon

Set in Fraunces, Archivo & IBM Plex Mono.
Issue 01 / September 2026 — doc. no. EN-01-2026.

*Technology is not just about machines. It is about people.*
