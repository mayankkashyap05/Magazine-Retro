import { ISSUE, STORIES } from '../data/magazine.js'
import { Eyebrow, PunchStrip } from '../components/primitives.jsx'

/* Dedicated contents page. Page numbers come from `pages`, which the export
   script computes from the real pagination of each segment (never guessed). */
export default function Contents({ pages = {} }) {
  const entries = [
    {
      id: 'print-front',
      no: '—',
      cat: 'FRONT PAGE / EDITORIAL',
      title: 'The Front Page',
      dek: 'The issue at a glance, the editor’s note, and the story index in brief.',
      page: pages.front,
    },
    ...STORIES.map((s) => ({
      id: `story-${s.no}`,
      no: s.no,
      cat: s.cat,
      title: s.title,
      dek: s.dek,
      read: s.read,
      page: pages[`story-${s.no}`],
    })),
  ]

  return (
    <div className="pc">
      <header className="pc__head">
        <Eyebrow>
          ISSUE {ISSUE.no} — {ISSUE.date}
        </Eyebrow>
        <h2 className="display pc__title">Contents</h2>
        <p className="pc__lede">
          Six stories, one thread: from the machine that filled a room to the questions a
          generation now asks of its tools.
        </p>
      </header>

      <ol className="pc__list">
        {entries.map((e) => (
          <li key={e.id} className="pc__row">
            <a href={`#${e.id}`}>
              <span className="pc__no mono">{e.no === '—' ? 'FRONT' : `STORY ${e.no}`}</span>
              <span className="pc__body">
                <span className="pc__cat mono">{e.cat}</span>
                <span className="pc__title-line display">{e.title}</span>
                <span className="pc__dek">{e.dek}</span>
              </span>
              <span className="pc__page">{e.page ?? '··'}</span>
            </a>
          </li>
        ))}
      </ol>

      <footer className="pc__foot">
        <PunchStrip pattern="0100s10100101s01011s010010" />
        <p className="mono">
          Stories are listed in reading order. Page numbers refer to this PDF.
        </p>
      </footer>
    </div>
  )
}
