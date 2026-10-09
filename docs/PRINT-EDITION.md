# ENIAC — Print Edition (A4 PDF)

Generates `output/ENIAC-Complete-Edition.pdf`: the complete Issue 01 as one A4 portrait PDF.

## Regenerate

```bash
npm install
npm run pdf            # vite build + export  → output/ENIAC-Complete-Edition.pdf
npm run pdf -- --skip-build   # reuse the existing dist/
npm run pdf:qa        # structural checks + thumbnails in output/qa/ (needs: pip install pymupdf)
```

Browser: the export uses Google Chrome (or Microsoft Edge via `CHROME_PATH`). On Windows,
either install Chrome, or set `CHROME_PATH` to `chrome.exe` / `msedge.exe`
(for example `set CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe`).

## How it works

| Piece | Where | Role |
|---|---|---|
| Print entry | `print.html`, `src/print/main.jsx` | Second Vite input. Not linked from the website; the website bundle is unchanged except for one inert flag check. |
| Segments | `src/print/segments.js` | Ordered list of sections (cover, contents, front page, six stories, colophon). Shared by the app and the export script. |
| Edition | `src/print/PrintEdition.jsx` | Renders the existing React pages (`HomeHero`, `HomeSections`, the six story components) inside a `MemoryRouter`, adds Contents and Colophon, and rewrites internal links to PDF anchors. |
| Named pages | `src/print/pageCss.js` | One CSS `@page` per section, generated from `magazine.js`. Running heads and folios come from these rules. |
| Print CSS | `src/print/print.css` | Print-only layer: hides web chrome, disables motion, forces reveals visible, keeps figures whole, styles Contents and Colophon. |
| Hooks | `src/lib/hooks.jsx` | `isPrintEdition()` flag: reveals show at once and counters show their final value in print. |
| Export | `scripts/export-pdf.mjs` | Build → serve `dist/` → render once → read each section's first sheet from the PDF text (pdfjs-dist) → write contents page numbers → re-render → verify the numbers did not move → stamp metadata, normalise A4 MediaBox. |
| QA | `scripts/qa-pdf.py` | PyMuPDF checks: page count, A4 size, blank sheets, route order and presence, fonts, links, outline, metadata. Writes thumbnails. |

Layout method: each sheet is printed at a 900 CSS px layout width and scaled to A4
(`scale: 0.78`), so the site's own breakpoints apply and body copy prints at about 9.5 pt.
Vector text and SVG stay vector. Photographs are embedded from the repository's JPEGs.

Pagination is data-driven. Contents page numbers are read from the rendered PDF, not hard-coded.
The export fails rather than writing wrong numbers if the passes disagree.

## Source fidelity

- All seven routes are included in the order `/`, `/timeline`, `/eniac`, `/bca`, `/cyber`, `/ai`, `/games`.
- Homepage: the hero is the cover. The remaining front-page sections (editor's note, feature teasers, the statement) follow the contents page as the front page.
- Hidden in print (web-only): the homepage "In this issue" index (replaced by the dedicated Contents page), the "next story" navigation, the reading progress hairline, and the masthead and footer (the colophon carries the footer's publication details).
- Source images are read from `src/assets/img` and never modified or deleted.

## Known limitations

See `docs/PRINT-QA.md` for measured results and the open items.
