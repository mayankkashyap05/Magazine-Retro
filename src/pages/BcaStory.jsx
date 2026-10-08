import StoryShell from '../components/StoryShell.jsx'
import { storyBySlug } from '../data/magazine.js'
import { Reveal, Eyebrow, Fig } from '../components/primitives.jsx'

import bcaStudent from '../assets/img/bca-student.jpg'

const VERBS = [
  { w: 'CODE', d: 'TURN IDEAS INTO SOFTWARE' },
  { w: 'BUILD', d: 'WEBSITES, APPS, DIGITAL PRODUCTS' },
  { w: 'SOLVE', d: 'BREAK COMPLEX PROBLEMS INTO SMALLER ONES' },
  { w: 'THINK', d: 'LOGIC AND ANALYSIS, AS A HABIT' },
]

const RUNWAYS = [
  {
    no: '01',
    name: 'THE CAREER RUNWAY',
    sub: 'DESTINATIONS: 07',
    dests: [
      'Software Developer',
      'Web Developer',
      'App Developer',
      'Data Analyst',
      'Cybersecurity Analyst',
      'UI/UX Designer',
      'Cloud Engineer',
    ],
  },
  {
    no: '02',
    name: 'THE HIGHER STUDIES RUNWAY',
    sub: 'DESTINATIONS: 04',
    dests: ['MCA', 'M.Sc. IT', 'MBA / IT Management', 'MS & International Studies'],
  },
  {
    no: '03',
    name: 'THE CREATOR RUNWAY',
    sub: 'DESTINATIONS: 05',
    dests: ['Freelancing', 'Startups', 'Apps & Products', 'Digital Agencies', 'Entrepreneurship'],
  },
]

const NOTES = [
  { t: 'LOGIC', d: 'How to break problems down until they can be solved.' },
  { t: 'PATIENCE', d: 'Because code rarely works perfectly the first time.' },
  { t: 'TEAMWORK', d: 'Because great software is almost never built alone.' },
  { t: 'ADAPTABILITY', d: 'Because the technology itself never stops changing.' },
]

export default function BcaStory() {
  const story = storyBySlug('bca')

  return (
    <StoryShell story={story}>
      {/* -------- opening -------- */}
      <header className="page art-head">
        <div className="art-head__kicker">
          <Eyebrow>PEOPLE / EDUCATION — THE NEXT GENERATION</Eyebrow>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(2.7rem, 8vw, 7.4rem)', maxWidth: '12em' }}>
          BCA is not just a degree.
        </h1>
        <p className="dek">
          It’s <span className="accent">a launchpad.</span>
        </p>
        <div className="art-intro">
          <p>
            <span className="mono mono-tag">STORY 03 / FLIGHT PLAN</span>
          </p>
          <p>
            A degree gives you knowledge. The Bachelor of Computer Applications gives you the
            opportunity to build with it. You don’t just study technology — you create it.
          </p>
        </div>
      </header>

      {/* -------- you learn to -------- */}
      <section className="page chapter-band" aria-label="You learn to">
        <h2 className="chapter">CH. 01 — YOU LEARN TO…</h2>
        <div className="verbs" style={{ marginTop: 'clamp(2rem,4vw,3.4rem)' }}>
          {VERBS.map((v, i) => (
            <Reveal key={v.w} delay={i * 60} className="verb">
              <span className="w">{v.w}</span>
              <span className="d">{v.d}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="page" style={{ paddingBlock: 'var(--sp-5)' }}>
        <Reveal>
          <Fig
            src={bcaStudent}
            alt="A young student writing code on a laptop at a desk in warm afternoon light."
            fig="FIG. 01 — A BCA STUDENT, MID-FLIGHT"
            note="SUBJECT / CREATOR"
          />
        </Reveal>
      </div>

      {/* -------- runways -------- */}
      <section className="page" aria-label="Runways">
        <h2 className="chapter">CH. 02 — ONE DEGREE. MANY RUNWAYS.</h2>
        <div className="runways" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          {RUNWAYS.map((r, i) => (
            <Reveal key={r.no} delay={i * 70} className="runway">
              <span className="runway__no">RWY {r.no}</span>
              <h3 className="runway__name">
                {r.name}
                <small>{r.sub}</small>
              </h3>
              <ul className="runway__dests">
                {r.dests.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="runway__line" aria-hidden="true" />
            </Reveal>
          ))}
        </div>
        <p className="lede" style={{ marginTop: '2rem' }}>
          A BCA student isn’t someone choosing one future. You are someone standing at the
          beginning of <b>many possible futures</b> — the degree is the tarmac.
        </p>
      </section>

      {/* -------- field notes -------- */}
      <section className="page chapter-band" aria-label="Field notes" style={{ paddingBottom: 'var(--sp-5)' }}>
        <h2 className="chapter">CH. 03 — FIELD NOTES / WHAT THE DEGREE ALSO TEACHES</h2>
        <div className="fieldnotes" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          {NOTES.map((n, i) => (
            <Reveal key={n.t} delay={i * 50}>
              <span className="t">{n.t}</span>
              <span className="d">{n.d}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------- real advantage -------- */}
      <section className="ink-section" aria-label="The real advantage" style={{ padding: 'var(--sp-6) 0' }}>
        <div className="page">
          <Reveal>
            <Eyebrow>THE REAL ADVANTAGE</Eyebrow>
            <p className="pull" style={{ marginTop: '1.6rem' }}>
              AI. Data science. Cloud. Cybersecurity. Automation. The technology keeps
              changing — <em>strong fundamentals keep you ready.</em>
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------- takeoff -------- */}
      <section className="page" aria-label="Takeoff" style={{ paddingBlock: 'var(--sp-6)', textAlign: 'center' }}>
        <Reveal>
          <p className="display" style={{ fontSize: 'clamp(2rem, 5.4vw, 4.6rem)' }}>
            BCA IS NOT THE DESTINATION.
          </p>
          <p className="display" style={{ fontSize: 'clamp(2rem, 5.4vw, 4.6rem)', marginTop: '0.3em' }}>
            IT’S YOUR <em style={{ color: 'var(--accent)' }}>TAKE-OFF POINT.</em>
          </p>
          <div
            aria-hidden="true"
            style={{
              margin: '3rem auto 0',
              maxWidth: 560,
              borderTop: '2px dashed var(--line-strong)',
              position: 'relative',
              paddingTop: '0.8rem',
            }}
          >
            <span className="mono" style={{ color: 'var(--muted)' }}>
              CLEAR FOR TAKE-OFF — RWY 03
            </span>
          </div>
        </Reveal>
      </section>
    </StoryShell>
  )
}
