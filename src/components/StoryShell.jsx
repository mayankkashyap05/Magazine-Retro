import { Link } from 'react-router-dom'
import { ISSUE, STORIES } from '../data/magazine.js'
import { usePageMeta, useScrollProgress } from '../lib/hooks.jsx'
import { ProgressHair } from './primitives.jsx'

/* Shared chrome for every story: meta band, progress hairline,
   reading order, next-story handoff. */
export default function StoryShell({ story, children, theme = '' }) {
  usePageMeta(
    `${story.short} — ENIAC Magazine`,
    `${story.dek} Issue ${ISSUE.no}, story ${story.no}.`
  )
  const progress = useScrollProgress()
  const idx = STORIES.findIndex((s) => s.slug === story.slug)
  const next = STORIES[(idx + 1) % STORIES.length]

  return (
    <article className={`story ${theme}`.trim()}>
      <ProgressHair value={progress} />
      <div className="page">
        <div className="story__meta">
          <span>
            <b>ISSUE {ISSUE.no}</b> / STORY {story.no} OF 06
          </span>
          <span>{story.cat}</span>
          <span>READING TIME ≈ {story.read}</span>
          <span>DOC. NO. EN-{story.no}</span>
        </div>
      </div>

      {children}

      <div className="page">
        <div className="next-story">
          <Link to={`/${next.slug}`}>
            <span className="mono">NEXT — STORY {next.no} / {next.cat}</span>
            <span className="display">{next.short}</span>
            <span className="tlink" aria-hidden="true">
              CONTINUE <span className="arr">→</span>
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}
