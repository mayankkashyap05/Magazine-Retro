#!/usr/bin/env node
/**
 * ENIAC — Contact Sheet Generator
 * 
 * Generates a PNG contact sheet overview of all PDF pages for rapid visual review.
 * Uses Playwright to render PDF pages as images via PDF.js or via screenshot of print edition paginated.
 * 
 * Approach:
 * 1. If PDF exists, try to use pdfjs-dist to render pages to canvas (node canvas) — fallback to Playwright screenshots of print edition scrolled.
 * 2. For simplicity in this environment, we will use Playwright to screenshot the print edition in paginated slices, or if pdfjs available, render PDF.
 * 
 * Output: ENIAC-PDF-Contact-Sheet.png
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PDF_PATH = path.join(ROOT, 'dist', 'ENIAC-Complete-Edition.pdf')
const OUTPUT_PNG = path.join(ROOT, 'dist', 'ENIAC-PDF-Contact-Sheet.png')
const OUTPUT_PNG_ALT = path.join(ROOT, 'ENIAC-PDF-Contact-Sheet.png')

async function generateViaPrintScreenshots() {
  console.log('Generating contact sheet via print edition screenshots (fallback)...')

  const { spawn } = await import('node:child_process')
  const { setTimeout: delay } = await import('node:timers/promises')

  function startVite() {
    return new Promise((resolve, reject) => {
      const proc = spawn('npx', ['vite', '--port', '5174', '--host', '0.0.0.0'], {
        cwd: ROOT,
        stdio: ['ignore', 'pipe', 'pipe'],
      })
      let output = ''
      let resolved = false
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true
          resolve(proc)
        }
      }, 15000)

      proc.stdout.on('data', d => {
        const s = d.toString()
        output += s
        if (!resolved && (s.includes('Local:') || s.includes('5174') || s.includes('ready in'))) {
          resolved = true
          clearTimeout(timeout)
          setTimeout(() => resolve(proc), 1200)
        }
      })
      proc.stderr.on('data', d => {
        output += d.toString()
      })
      proc.on('error', reject)
    })
  }

  let viteProc = null
  let browser = null

  try {
    viteProc = await startVite()
    console.log('Vite started for contact sheet')

    await delay(2000)

    const { chromium } = await import('playwright')
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
      viewport: { width: 794, height: 1123 },
      deviceScaleFactor: 2
    })
    const page = await context.newPage()
    await page.emulateMedia({ media: 'print' })
    await page.goto('http://localhost:5174/print.html', { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForFunction(() => window.__ENIAC_PRINT_READY__ === true, { timeout: 30000 }).catch(() => {})
    await delay(1000)

    const metrics = await page.evaluate(() => {
      const ref = document.createElement('div')
      ref.style.height = '297mm'
      ref.style.position = 'absolute'
      ref.style.visibility = 'hidden'
      document.body.appendChild(ref)
      const ph = ref.getBoundingClientRect().height
      document.body.removeChild(ref)
      return {
        pageHeight: ph,
        totalHeight: document.body.scrollHeight,
        totalPages: Math.ceil(document.body.scrollHeight / ph)
      }
    })

    console.log('Metrics for contact sheet:', metrics)

    // Take full page screenshot
    const fullScreenshot = await page.screenshot({ fullPage: true, type: 'png' })

    // For contact sheet, we need to slice the full screenshot into pages and tile them
    // Use sharp if available, otherwise use canvas or just save full screenshot as contact sheet
    let sharp = null
    try {
      const mod = await import('sharp')
      sharp = mod.default || mod
    } catch {
      console.warn('sharp not available, saving full screenshot as contact sheet')
      fs.writeFileSync(OUTPUT_PNG, fullScreenshot)
      fs.writeFileSync(OUTPUT_PNG_ALT, fullScreenshot)
      return { pages: metrics.totalPages, method: 'full-screenshot' }
    }

    // Use sharp to create contact sheet
    const pageHeightPx = Math.round(metrics.pageHeight * 2) // deviceScaleFactor 2
    const pageWidthPx = 794 * 2

    // Load full image metadata
    const metadata = await sharp(fullScreenshot).metadata()
    console.log('Full screenshot metadata:', metadata)

    const totalPages = metrics.totalPages
    const cols = 4
    const rows = Math.ceil(totalPages / cols)
    const thumbWidth = 200
    const thumbHeight = Math.round(thumbWidth * 297 / 210)
    const gap = 10
    const sheetWidth = cols * thumbWidth + (cols + 1) * gap
    const sheetHeight = rows * thumbHeight + (rows + 1) * gap + 40 // extra for title

    // Create blank sheet
    let composite = sharp({
      create: {
        width: sheetWidth,
        height: sheetHeight,
        channels: 4,
        background: { r: 244, g: 239, b: 228, alpha: 1 }
      }
    })

    const overlays = []

    // Title bar
    const titleSvg = `
      <svg width="${sheetWidth}" height="40" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#16130e"/>
        <text x="20" y="25" font-family="monospace" font-size="14" fill="#f4efe4" letter-spacing="2">ENIAC — CONTACT SHEET — ${totalPages} PAGES — ISSUE 01</text>
      </svg>
    `
    overlays.push({ input: Buffer.from(titleSvg), top: 0, left: 0 })

    for (let i = 0; i < totalPages; i++) {
      const top = i * pageHeightPx
      // Extract page slice
      const pageSlice = await sharp(fullScreenshot)
        .extract({ left: 0, top: Math.min(top, metadata.height - pageHeightPx), width: Math.min(pageWidthPx, metadata.width), height: Math.min(pageHeightPx, metadata.height - top) })
        .resize(thumbWidth, thumbHeight, { fit: 'cover' })
        .png()
        .toBuffer()

      const col = i % cols
      const row = Math.floor(i / cols)
      const x = gap + col * (thumbWidth + gap)
      const y = 40 + gap + row * (thumbHeight + gap)

      overlays.push({ input: pageSlice, top: y, left: x })

      // Page number label
      const labelSvg = `
        <svg width="${thumbWidth}" height="18" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="rgba(22,19,14,0.85)"/>
          <text x="6" y="12" font-family="monospace" font-size="10" fill="#f4efe4">P ${String(i + 1).padStart(2, '0')}</text>
        </svg>
      `
      overlays.push({ input: Buffer.from(labelSvg), top: y + thumbHeight - 18, left: x })
    }

    const finalBuffer = await composite.composite(overlays).png().toBuffer()
    fs.writeFileSync(OUTPUT_PNG, finalBuffer)
    fs.writeFileSync(OUTPUT_PNG_ALT, finalBuffer)

    console.log(`Contact sheet saved: ${OUTPUT_PNG} (${(finalBuffer.length / 1024).toFixed(1)} KB)`)

    return { pages: totalPages, method: 'sharp-tiled' }

  } finally {
    if (browser) await browser.close().catch(() => {})
    if (viteProc) {
      try { viteProc.kill('SIGTERM') } catch {}
    }
  }
}

async function main() {
  console.log('=== ENIAC Contact Sheet Generator ===')

  if (!fs.existsSync(PDF_PATH)) {
    console.warn(`PDF not found at ${PDF_PATH}, will generate from print edition screenshots`)
  } else {
    console.log(`PDF found at ${PDF_PATH}, but generating contact sheet via screenshots for visual rhythm`)
  }

  const result = await generateViaPrintScreenshots()
  console.log('Contact sheet result:', result)

  // Also try to generate simple representative previews if possible
  try {
    const { chromium } = await import('playwright')
    const { spawn } = await import('node:child_process')
    const { setTimeout: delay } = await import('node:timers/promises')

    function startVite2() {
      return new Promise((resolve) => {
        const proc = spawn('npx', ['vite', '--port', '5175', '--host', '0.0.0.0'], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] })
        let resolved = false
        const timeout = setTimeout(() => { if (!resolved) { resolved = true; resolve(proc) } }, 12000)
        proc.stdout.on('data', d => {
          const s = d.toString()
          if (!resolved && s.includes('5175')) {
            resolved = true
            clearTimeout(timeout)
            setTimeout(() => resolve(proc), 1000)
          }
        })
      })
    }

    let viteProc = await startVite2()
    await delay(2000)
    let browser = await chromium.launch({ headless: true })
    let context = await browser.newContext({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 })
    let page = await context.newPage()
    await page.emulateMedia({ media: 'print' })
    await page.goto('http://localhost:5175/print.html', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => window.__ENIAC_PRINT_READY__ === true, { timeout: 20000 }).catch(() => {})

    const previews = [
      { id: 'cover', desc: 'Cover' },
      { id: 'contents', desc: 'Contents' },
      { id: 'editorial', desc: 'Editorial' },
      { id: 'timeline', desc: 'Timeline Story' },
      { id: 'eniac', desc: 'ENIAC Story' },
      { id: 'colophon', desc: 'Colophon' }
    ]

    for (const p of previews) {
      try {
        const el = await page.$(`[data-section="${p.id}"]`)
        if (el) {
          const box = await el.boundingBox()
          if (box) {
            const buf = await page.screenshot({ clip: { x: box.x, y: box.y, width: Math.min(box.width, 794), height: Math.min(box.height, 1123) }, type: 'png' })
            const outPath = path.join(ROOT, 'dist', `ENIAC-preview-${p.id}.png`)
            fs.writeFileSync(outPath, buf)
            console.log(`Preview saved: ${outPath}`)
          }
        }
      } catch (e) {
        console.warn(`Preview ${p.id} failed:`, e.message)
      }
    }

    await browser.close()
    try { viteProc.kill('SIGTERM') } catch {}

  } catch (e) {
    console.warn('Preview generation failed:', e.message)
  }

  console.log('=== Contact Sheet Done ===')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
