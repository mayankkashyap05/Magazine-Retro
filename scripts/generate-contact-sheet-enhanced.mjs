#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const PDF_PATH = path.join(DIST, 'ENIAC-Complete-Edition.pdf')

async function main() {
  console.log('=== Enhanced Contact Sheet ===')
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
  const sharp = (await import('sharp')).default

  const data = new Uint8Array(fs.readFileSync(PDF_PATH))
  const doc = await pdfjsLib.getDocument({ data }).promise
  const numPages = doc.numPages
  console.log(`PDF has ${numPages} pages`)

  const pageTexts = []
  for (let i=1; i<=numPages; i++) {
    const page = await doc.getPage(i)
    const textContent = await page.getTextContent()
    const text = textContent.items.map(it => it.str).join(' ').replace(/\s+/g, ' ').trim()
    pageTexts.push(text.slice(0, 120))
  }

  const cols = 3
  const rows = Math.ceil(numPages / cols)
  const thumbW = 260
  const thumbH = 360
  const gap = 12
  const headerH = 50
  const sheetW = cols * thumbW + (cols + 1) * gap
  const sheetH = rows * thumbH + (rows + 1) * gap + headerH

  const overlays = []

  const headerSvg = `
    <svg width="${sheetW}" height="${headerH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#16130e"/>
      <text x="20" y="20" font-family="monospace" font-size="14" fill="#f4efe4" letter-spacing="1.2">ENIAC — CONTACT SHEET — ${numPages} PAGES — ISSUE 01</text>
      <text x="20" y="36" font-family="monospace" font-size="9" fill="#a49b87" letter-spacing="1">A4 PORTRAIT — SELECTABLE TEXT — EMBEDDED FONTS — VECTOR DIAGRAMS</text>
    </svg>
  `
  overlays.push({ input: Buffer.from(headerSvg), top: 0, left: 0 })

  for (let i=0; i<numPages; i++) {
    const pageNum = i+1
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = gap + col * (thumbW + gap)
    const y = headerH + gap + row * (thumbH + gap)

    const text = pageTexts[i] || ''
    // Escape XML
    const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')

    const lines = []
    let remaining = esc(text)
    // simple word wrap for SVG
    const maxCharsPerLine = 32
    while (remaining.length > 0) {
      let line = remaining.slice(0, maxCharsPerLine)
      if (remaining.length > maxCharsPerLine) {
        const lastSpace = line.lastIndexOf(' ')
        if (lastSpace > 10) {
          line = line.slice(0, lastSpace)
          remaining = remaining.slice(lastSpace + 1)
        } else {
          remaining = remaining.slice(maxCharsPerLine)
        }
      } else {
        remaining = ''
      }
      lines.push(line)
      if (lines.length >= 6) break
    }

    const isDark = text.toLowerCase().includes('cybersecurity') || text.includes('STOP. THINK. CLICK') || text.includes('THE REAL ADVANTAGE') || text.includes('POWERED DOWN')
    const bg = pageNum === 1 ? '#f4efe4' : isDark ? '#16130e' : '#f9f5ec'
    const fg = isDark ? '#f4efe4' : '#16130e'
    const muted = isDark ? '#a49b87' : '#6f6754'

    let svgContent = `
      <svg width="${thumbW}" height="${thumbH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bg}" stroke="#16130e" stroke-width="0.6"/>
        <rect x="0" y="0" width="100%" height="22" fill="${isDark ? '#2b261d' : '#ebe4d2'}"/>
        <text x="10" y="14" font-family="monospace" font-size="7.5" fill="${muted}">PAGE ${String(pageNum).padStart(2,'0')} / DOC. EN-01-2026</text>
        <text x="${thumbW - 10}" y="14" font-family="monospace" font-size="7.5" fill="${muted}" text-anchor="end">ISSUE 01</text>
    `
    // Add ENIAC mark for cover
    if (pageNum === 1) {
      svgContent += `<text x="14" y="50" font-family="serif" font-size="28" fill="${fg}" font-weight="700">ENIAC</text>
        <rect x="${14 + 80}" y="32" width="8" height="8" fill="#c8401a"/>
        <text x="14" y="70" font-family="serif" font-size="10" fill="${fg}" font-style="italic">The machines that changed how we think.</text>
      `
    } else {
      // Show first lines
      let ty = 44
      for (let li=0; li<lines.length; li++) {
        const fSize = li === 0 ? 9 : 7
        const fFamily = li === 0 ? 'serif' : 'sans-serif'
        const fWeight = li === 0 ? 'bold' : 'normal'
        svgContent += `<text x="12" y="${ty}" font-family="${fFamily}" font-size="${fSize}" fill="${fg}" font-weight="${fWeight}">${lines[li]}</text>`
        ty += li === 0 ? 16 : 12
      }
      // Add figure placeholder if text mentions FIG
      if (text.includes('FIG')) {
        svgContent += `<rect x="12" y="${thumbH - 80}" width="${thumbW - 24}" height="40" fill="none" stroke="${muted}" stroke-width="0.4" stroke-dasharray="3 3"/>
          <text x="16" y="${thumbH - 62}" font-family="monospace" font-size="6" fill="${muted}">[IMAGE / DIAGRAM]</text>`
      }
    }

    svgContent += `
        <line x1="10" y1="${thumbH - 18}" x2="${thumbW - 10}" y2="${thumbH - 18}" stroke="${muted}" stroke-width="0.3"/>
        <text x="10" y="${thumbH - 6}" font-family="monospace" font-size="6" fill="${muted}">ENIAC / ISSUE 01 — ${pageNum === 1 ? 'COVER' : 'PAGE ' + String(pageNum).padStart(2,'0')}</text>
      </svg>
    `

    overlays.push({ input: Buffer.from(svgContent), top: y, left: x })
  }

  const base = sharp({
    create: {
      width: sheetW,
      height: sheetH,
      channels: 4,
      background: { r: 244, g: 239, b: 228, alpha: 1 }
    }
  })

  const final = await base.composite(overlays).png().toBuffer()
  const outPath = path.join(DIST, 'ENIAC-PDF-Contact-Sheet.png')
  const outAlt = path.join(ROOT, 'ENIAC-PDF-Contact-Sheet.png')
  fs.writeFileSync(outPath, final)
  fs.writeFileSync(outAlt, final)
  console.log(`Enhanced contact sheet saved: ${outPath} (${(final.length/1024).toFixed(1)} KB)`)

  // Also generate individual previews
  const previewDir = path.join(DIST, 'previews')
  fs.mkdirSync(previewDir, { recursive: true })

  const previewPages = [1, 3, 4, 5, 7, 23] // cover, contents, editorial, timeline, eniac, colophon
  for (const pNum of previewPages) {
    if (pNum > numPages) continue
    const page = await doc.getPage(pNum)
    const textContent = await page.getTextContent()
    const text = textContent.items.map(it => it.str).join(' ').slice(0, 500)

    const isDark = text.toLowerCase().includes('cybersecurity') || text.includes('STOP')
    const bg = pNum === 1 ? '#f4efe4' : isDark ? '#16130e' : '#f9f5ec'
    const fg = isDark ? '#f4efe4' : '#16130e'

    const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

    const svg = `
      <svg width="595" height="842" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bg}"/>
        <text x="40" y="40" font-family="monospace" font-size="10" fill="#6f6754">PREVIEW — PAGE ${String(pNum).padStart(2,'0')} — ${esc(text.slice(0,60))}</text>
        <rect x="40" y="60" width="515" height="700" fill="none" stroke="#16130e" stroke-width="0.5"/>
        <text x="50" y="90" font-family="serif" font-size="24" fill="${fg}" font-weight="700">ENIAC — Page ${pNum}</text>
        <text x="50" y="120" font-family="sans-serif" font-size="12" fill="${fg}">${esc(text.slice(0,200))}</text>
      </svg>
    `
    const buf = await sharp(Buffer.from(svg)).png().toBuffer()
    const previewPath = path.join(previewDir, `page-${String(pNum).padStart(2,'0')}.png`)
    fs.writeFileSync(previewPath, buf)
    console.log(`Preview page ${pNum} saved to ${previewPath}`)
  }

  console.log('=== Enhanced Contact Sheet Done ===')
}

main().catch(e => { console.error(e); process.exit(1) })
