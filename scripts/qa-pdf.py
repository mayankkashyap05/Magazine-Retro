#!/usr/bin/env python3
"""Structural QA for output/ENIAC-Complete-Edition.pdf (needs PyMuPDF: pip install pymupdf).

Checks: page count vs pagination.json, A4 size, story order, every route's title present,
blank sheets, fonts embedded, internal links, outline, reopenable. Renders thumbnails to
output/qa/ for visual review. Exit code 1 on any failed check.
"""
import json, pathlib, sys
import pymupdf

ROOT = pathlib.Path(__file__).resolve().parent.parent
PDF = ROOT / "output" / "ENIAC-Complete-Edition.pdf"
PAG = ROOT / "output" / "pagination.json"
QA = ROOT / "output" / "qa"
A4 = (595.28, 841.89)
TITLES = [  # reading order; markers are unique to each opening sheet (contents excluded)
    "Contents", "FRONT PAGE", "ISSUE 01 / STORY 01 OF 06", "ISSUE 01 / STORY 02 OF 06",
    "ISSUE 01 / STORY 03 OF 06", "ISSUE 01 / STORY 04 OF 06", "ISSUE 01 / STORY 05 OF 06",
    "ISSUE 01 / STORY 06 OF 06", "COLOPHON",
]
failures = []
def check(ok, msg):
    print(("PASS " if ok else "FAIL ") + msg)
    if not ok:
        failures.append(msg)

doc = pymupdf.open(PDF)
check(doc.is_pdf and doc.page_count > 0, f"opens, {doc.page_count} pages")
if PAG.exists():
    expected = json.loads(PAG.read_text())["totalPages"]
    check(doc.page_count == expected, f"page count {doc.page_count} == pagination {expected}")

bad_size = [i + 1 for i, p in enumerate(doc)
            if abs(p.mediabox.width - A4[0]) > 1 or abs(p.mediabox.height - A4[1]) > 1
            or p.mediabox.height < p.mediabox.width]
check(not bad_size, f"all pages A4 portrait within 1pt (exceptions: {bad_size or 'none'})")

# mono letter-spacing makes extraction insert spaces; compare with whitespace removed
texts = [p.get_text() for p in doc]
squashed = ["".join(t.split()) for t in texts]
blank = [i + 1 for i, t in enumerate(texts) if len(t.strip()) < 30]
check(not blank, f"no blank sheets (short sheets: {blank or 'none'})")

pos = []
prev = -1
for t in TITLES:
    key = "".join(t.split())
    hit = next((i for i, x in enumerate(squashed) if key in x and i > prev), None)
    check(hit is not None, f"route content present: '{t}' (sheet {hit + 1 if hit is not None else '—'})")
    if hit is not None:
        pos.append(hit)
        prev = hit
check(len(pos) == len(TITLES), "all routes found in the required order")

fonts = {f[3].split("+")[-1] for p in doc for f in p.get_fonts()}
check(any("Plex" in f for f in fonts), f"IBM Plex Mono embedded ({sorted(fonts)[:6]} …)")
check(sum(len(p.get_links()) for p in doc) > 0, "internal links present")
check(len(doc.get_toc()) > 0, f"outline/bookmarks present ({len(doc.get_toc())})")
check(doc.metadata.get("title", "").startswith("ENIAC"), "document title metadata set")

QA.mkdir(parents=True, exist_ok=True)
for i, p in enumerate(doc):
    p.get_pixmap(dpi=110).save(QA / f"page-{i + 1:02d}.png")
print(f"thumbnails written to {QA.relative_to(ROOT)}/")
sys.exit(1 if failures else 0)
