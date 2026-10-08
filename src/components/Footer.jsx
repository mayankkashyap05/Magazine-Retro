import { Link } from 'react-router-dom'
import { ISSUE, STORIES } from '../data/magazine.js'
import { PunchStrip } from './primitives.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page">
        <PunchStrip pattern="0100s10100101s01011s010010" />
        <div className="footer__grid footer__grid--spaced">
          <div>
            <p className="footer__mark">
              ENIAC<span style={{ color: 'var(--accent)' }}>.</span>
            </p>
            <p className="footer__tag">Technology. People. Ideas.</p>
          </div>
          <nav aria-label="Issue index">
            <h3>Issue {ISSUE.no} — Contents</h3>
            <ul>
              {STORIES.map((s) => (
                <li key={s.slug}>
                  <Link to={`/${s.slug}`}>
                    {s.no} — {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer__credits">
            <h3>Colophon</h3>
            <p>
              A magazine about computing, AI,
              <br />
              cybersecurity &amp; the human side
              <br />
              of technology.
              <br />
              <br />
              SET IN FRAUNCES,
              <br />
              ARCHIVO &amp; IBM PLEX MONO.
              <br />
              <br />
              ISSUE {ISSUE.no} / {ISSUE.date}
              <br />
              DOC. NO. EN-{ISSUE.no}-2026
            </p>
          </div>
        </div>
        <div className="footer__base">
          <span>
            <span className="sq" aria-hidden="true" /> ENIAC / DIGITAL MAGAZINE
          </span>
          <span>THE MACHINE AGE → THE AI AGE</span>
          <span>END OF ISSUE {ISSUE.no} ⏚</span>
        </div>
      </div>
    </footer>
  )
}
