/* ============================================================
   Named CSS pages for the print edition. Generated from the story data so
   every running head matches the magazine's own labels.
   Layout width: the export renders at a fixed scale, so the A4 content box
   maps to a desktop-width CSS viewport and the site's own breakpoints apply.
   ============================================================ */

import { ISSUE } from '../data/magazine.js'

const INK = '#16130e'
const MUTED = '#6f6754'
const MONO = "'IBM Plex Mono', 'Courier New', monospace"

const runningHead = (left, right) => `
  @top-left { content: "${left}"; font-family: ${MONO}; font-size: 6.4pt; letter-spacing: 0.16em; text-transform: uppercase; color: ${MUTED}; vertical-align: middle; }
  @top-right { content: "${right}"; font-family: ${MONO}; font-size: 6.4pt; letter-spacing: 0.16em; text-transform: uppercase; color: ${MUTED}; vertical-align: middle; }`

const folio = (left) => `
  @bottom-left { content: "${left}"; font-family: ${MONO}; font-size: 6.4pt; letter-spacing: 0.16em; text-transform: uppercase; color: ${MUTED}; vertical-align: middle; }
  @bottom-right { content: counter(page, decimal-leading-zero); font-family: ${MONO}; font-size: 7.4pt; letter-spacing: 0.08em; color: ${INK}; vertical-align: middle; }`

export function printPageCss(stories, segments) {
  /* every segment is bound to its named @page: a new sheet, its own running head */
  const binding = segments
    .map((seg) => `.print-edition .seg--${seg.key} { page: ${seg.page}; break-before: page; }`)
    .join('\n')
    + '\n.print-edition .seg:first-child { break-before: auto; }'
  const storyPages = stories
    .map(
      (s) => `
@page story-${s.no} {
  size: A4;
  margin: 22mm 12mm 20mm;
  ${runningHead(`ENIAC — Issue ${ISSUE.no}`, `${s.no} — ${s.short}`)}
  ${folio(`Doc. no. EN-${ISSUE.no}-2026`)}
}
}`
    )
    .join('\n')

  return `
${binding}
@page cover { size: A4; margin: 0 12mm; }
@page frontmatter { size: A4; margin: 22mm 12mm 20mm; ${folio(`ENIAC — Issue ${ISSUE.no} — Contents`)} }
@page front {
  size: A4;
  margin: 22mm 12mm 20mm;
  ${runningHead(`ENIAC — Issue ${ISSUE.no}`, 'Front page')}
  ${folio('ENIAC / Digital magazine')}
}
@page colophon { size: A4; margin: 22mm 12mm 20mm; ${folio('ENIAC / Digital magazine')} }
${storyPages}
`
}
