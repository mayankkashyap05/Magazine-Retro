import { useEffect } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ISSUE, STORIES } from '../data/magazine.js'
import { HomeHero, HomeSections } from '../pages/Home.jsx'
import TimelineStory from '../pages/TimelineStory.jsx'
import EniacStory from '../pages/EniacStory.jsx'
import BcaStory from '../pages/BcaStory.jsx'
import CyberStory from '../pages/CyberStory.jsx'
import AiStory from '../pages/AiStory.jsx'
import GamesStory from '../pages/GamesStory.jsx'
import Contents from './Contents.jsx'
import Colophon from './Colophon.jsx'
import { SEGMENTS, routeToSegmentId } from './segments.js'
import { printPageCss } from './pageCss.js'

const STORY_COMPONENTS = {
  timeline: TimelineStory,
  eniac: EniacStory,
  bca: BcaStory,
  cyber: CyberStory,
  ai: AiStory,
  games: GamesStory,
}

function renderSegment(seg, pages) {
  switch (seg.key) {
    case 'cover':
      return <HomeHero />
    case 'contents':
      return <Contents pages={pages} />
    case 'front':
      return <HomeSections />
    case 'colophon':
      return <Colophon />
    default: {
      const Story = STORY_COMPONENTS[seg.key]
      return Story ? <Story /> : null
    }
  }
}

/* Waits until everything the PDF needs is really present: fonts decoded,
   every image decoded (lazy images forced eager), links rewritten to
   PDF-internal anchors. Sets window.__PRINT_READY__ when done. */
async function prepareEdition() {
  document.title = `ENIAC — Issue ${ISSUE.no} — Complete Print Edition`

  document.querySelectorAll('img').forEach((img) => {
    img.loading = 'eager'
    img.removeAttribute('fetchpriority')
  })

  document.querySelectorAll('a[href^="/"]').forEach((a) => {
    const target = routeToSegmentId(a.getAttribute('href'))
    a.setAttribute('href', `#${target || 'print-front'}`)
  })

  // two frames so that fonts referenced only by the freshly-committed DOM are requested
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
  await document.fonts.ready
  await Promise.all(
    [...document.images].map((img) => img.decode().catch(() => null))
  )
  await document.fonts.ready
  const missing = [...document.images].filter((i) => !i.complete || i.naturalWidth === 0)
  window.__PRINT_IMAGE_FAILURES__ = missing.map((i) => i.getAttribute('src'))
  window.__PRINT_READY__ = true
}

export default function PrintEdition({ only = null, pages = {} }) {
  const segments = only ? SEGMENTS.filter((s) => s.key === only) : SEGMENTS

  useEffect(() => {
    prepareEdition()
  }, [])

  return (
    <MemoryRouter>
      <div className="print-edition">
        <style>{printPageCss(STORIES, SEGMENTS)}</style>
        {segments.map((seg) => (
          <section key={seg.key} id={seg.id} className={`seg seg--${seg.key}`} data-page={seg.page}>
            {renderSegment(seg, pages)}
          </section>
        ))}
      </div>
    </MemoryRouter>
  )
}
