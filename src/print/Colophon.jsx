import { ISSUE, STORIES } from '../data/magazine.js'
import { PunchStrip } from '../components/primitives.jsx'

/* Colophon — publication metadata carried over from the website footer. */
export default function Colophon() {
  return (
    <div className="colo">
      <p className="mono colo__kicker">
        <span className="sq" aria-hidden="true" /> Colophon
      </p>
      <p className="display colo__mark">
        ENIAC<span className="colo__dot">.</span>
      </p>
      <p className="colo__tag display display--light">Technology. People. Ideas.</p>

      <div className="colo__grid">
        <div>
          <h3 className="mono">About</h3>
          <p>
            A magazine about computing, AI, cybersecurity &amp; the human side of technology.
          </p>
          <p className="colo__quote">
            “Technology is not just about machines. It is about people.”
          </p>
        </div>
        <div>
          <h3 className="mono">Typefaces</h3>
          <p>
            Set in Fraunces, Archivo &amp; IBM Plex Mono.
          </p>
          <p className="mono colo__small">
            Fraunces — display<br />
            Archivo — body<br />
            IBM Plex Mono — technical
          </p>
        </div>
        <div>
          <h3 className="mono">Issue</h3>
          <p>
            Issue {ISSUE.no} / {ISSUE.date}
            <br />
            Doc. no. EN-{ISSUE.no}-2026
          </p>
          <p className="mono colo__small">
            {STORIES.length} stories
            <br />
            Reading order 01 → 06
          </p>
        </div>
      </div>

      <div className="colo__end">
        <PunchStrip pattern="0s10s11s0" />
        <p className="mono">
          ENIAC / DIGITAL MAGAZINE · END OF ISSUE {ISSUE.no} ⏚
        </p>
      </div>
    </div>
  )
}
