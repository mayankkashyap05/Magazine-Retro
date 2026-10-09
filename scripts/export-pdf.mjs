#!/usr/bin/env node
/* ============================================================
   ENIAC — complete A4 print edition → PDF

   Pipeline (deterministic, no network calls, no paid services):
     1. vite build                       (website + print entry)
     2. vite preview on a local port     (serves dist/, incl. print.html)
     3. measure every segment alone      (true page count of each section)
     4. derive contents page numbers     (cover=1, contents, front, stories…)
     5. render the full edition once     (single PDF, named A4 pages, folios)
     6. stamp PDF metadata + verify      (page count, A4 size, reopenable)

   Usage:   npm run pdf            (build + export)
            npm run pdf -- --skip-build
   Browser: set CHROME_PATH to a Chrome/Chromium/Edge executable if
            Playwright cannot find one. Without it, the installed
            Google Chrome channel is used.
   ============================================================ */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { PDFDocument } from 'pdf-lib'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import { preview } from 'vite'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'output')
const OUT_FILE = path.join(OUT_DIR, 'ENIAC-Complete-Edition.pdf')
const PORT = Number(process.env.ENIAC_PDF_PORT || 4799)

/* Layout scale: A4 content box (186 mm) → 900 css px layout width, so the
   site's ≥900px breakpoints apply and body copy prints at ~9.5 pt. */
const SCALE = 0.78

const { SEGMENTS } = await import(path.join(ROOT, 'src/print/segments.js'))
const { ISSUE, STORIES } = await import(path.join(ROOT, 'src/data/magazine.js'))

const args = new Set(process.argv.slice(2))
const log = (...m) => console.log('[pdf]', ...m)

if (!args.has('--skip-build')) {
  log('building…')
  const r = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['vite', 'build'], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })
  if (r.status !== 0) throw new Error('vite build failed')
}

await fs.mkdir(OUT_DIR, { recursive: true })

const server = await preview({
  root: ROOT,
  preview: { host: '127.0.0.1', port: PORT, strictPort: true },
  logLevel: 'warn',
})
const base = `http://127.0.0.1:${PORT}`

const launchOptions = {
  headless: true,
  args: ['--font-render-hinting=none', ...(process.platform === 'linux' ? ['--no-sandbox'] : [])],
}
if (process.env.CHROME_PATH) launchOptions.executablePath = process.env.CHROME_PATH
else launchOptions.channel = 'chrome'
const browser = await chromium.launch(launchOptions)

async function renderPdf(query) {
  const page = await browser.newPage({ viewport: { width: 900, height: 1200 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' })
  await page.goto(`${base}/print.html${query}`, { waitUntil: 'load' })
  await page.waitForFunction(() => window.__PRINT_READY__ === true, null, { timeout: 120000 })
  const failures = await page.evaluate(() => window.__PRINT_IMAGE_FAILURES__ || [])
  if (failures.length) throw new Error(`images failed to load: ${failures.join(', ')}`)
  const buf = await page.pdf({
    format: 'A4',
    preferCSSPageSize: true,
    printBackground: true,
    scale: SCALE,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    tagged: true,
    outline: true,
  })
  await page.close()
  if (errors.length) log('console errors:', errors.slice(0, 5))
  return buf
}

/* Where each section starts, read from the rendered PDF's text. Every
   segment has a marker that occurs on its first sheet only (running heads and
   meta lines are unique per story). Whitespace is ignored because mono
   letter-spacing makes text extraction insert spaces. */
async function findSegmentStarts(pdfBytes) {
  const loading = pdfjs.getDocument({ data: new Uint8Array(pdfBytes), useSystemFonts: false })
  const pdf = await loading.promise
  const sheets = []
  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n)
    const content = await page.getTextContent()
    sheets.push(content.items.map((it) => it.str).join('').replace(/\s+/g, ''))
  }
  await pdf.destroy()
  const markers = {
    contents: 'CONTENTS',
    front: 'FRONTPAGE',
    colophon: 'ENDOFISSUE',
  }
  for (const s of STORIES) markers[`story-${s.no}`] = `ISSUE${ISSUE.no}/STORY${s.no}OF06`
  const starts = {}
  let from = 1 // sheet numbers, 1-based; cover is sheet 1
  for (const seg of SEGMENTS.slice(1)) {
    const key = seg.key === 'timeline' || seg.key === 'eniac' || seg.key === 'bca' || seg.key === 'cyber' || seg.key === 'ai' || seg.key === 'games'
      ? seg.page
      : seg.key === 'front' ? 'front' : seg.key === 'contents' ? 'contents' : 'colophon'
    const marker = markers[key].replace(/\s+/g, '')
    const idx = sheets.findIndex((t, i) => i + 1 > from && t.includes(marker))
    if (idx < 0) throw new Error(`marker not found for ${key}: ${marker}`)
    starts[key] = idx + 1
    from = idx + 1
  }
  return starts
}

try {
  // 3. render once with placeholder contents numbers, then read where every
  //    section actually starts in THAT document (text markers, not guesses)
  const first = await renderPdf('')
  const starts = await findSegmentStarts(first)
  log('segment starts', JSON.stringify(starts))

  // 4. contents page numbers from the real pagination
  const pages = { front: starts.front }
  for (const s of STORIES) pages[`story-${s.no}`] = starts[`story-${s.no}`]
  log('contents map', JSON.stringify(pages))

  // 5. final single document, then confirm the starts did not move
  const pagesParam = encodeURIComponent(JSON.stringify(pages))
  const full = await renderPdf(`?pages=${pagesParam}`)
  const verify = await findSegmentStarts(full)
  if (JSON.stringify(verify) !== JSON.stringify(starts)) {
    throw new Error(`pagination moved between passes: ${JSON.stringify(starts)} -> ${JSON.stringify(verify)}`)
  }
  const { totalPages } = { totalPages: (await PDFDocument.load(full)).getPageCount() }

  // 6. metadata + verification
  const doc = await PDFDocument.load(full)
  if (process.env.ENIAC_PDF_DEBUG) await fs.writeFile(path.join(OUT_DIR, 'debug-full.pdf'), full)
  // normalise every sheet to exact ISO A4 (595.28 × 841.89 pt), anchored at the top edge
  const A4_W = 595.28
  const A4_H = 841.89
  for (const page of doc.getPages()) {
    const { height } = page.getSize()
    const box = [0, height - A4_H, A4_W, height]
    page.setMediaBox(...box)
    page.setCropBox(...box)
  }
  doc.setTitle(`ENIAC — Issue ${ISSUE.no} — Complete Print Edition`)
  doc.setAuthor('ENIAC')
  doc.setSubject(
    'ENIAC digital magazine, Issue 01 — computing, AI, cybersecurity and the human side of technology (A4 print edition).'
  )
  doc.setKeywords(['ENIAC', 'magazine', 'computing', 'AI', 'cybersecurity', 'ENIAC 1946'])
  doc.setCreator('ENIAC print pipeline (Vite, React, Chromium)')
  doc.setProducer('pdf-lib')
  doc.setCreationDate(new Date())
  doc.setModificationDate(new Date())
  const bytes = await doc.save()
  await fs.writeFile(OUT_FILE, bytes)
  await fs.writeFile(
    path.join(OUT_DIR, 'pagination.json'),
    JSON.stringify({ totalPages, starts, contents: pages }, null, 2)
  )
  log(`wrote ${path.relative(ROOT, OUT_FILE)} — ${totalPages} pages, ${(bytes.length / 1048576).toFixed(2)} MB`)
} finally {
  await browser.close()
  await server.close()
}
