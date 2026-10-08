import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import StoryShell from '../components/StoryShell.jsx'
import { storyBySlug } from '../data/magazine.js'
import { Reveal, Eyebrow, PunchStrip } from '../components/primitives.jsx'

const MILESTONES = [
  {
    era: 'early',
    year: 'c. 3000 BC',
    title: 'ABACUS',
    note: 'Counting becomes a machine — the first revolution in calculation.',
    sig: true,
  },
  {
    era: 'early',
    year: '1642',
    title: 'PASCAL’S CALCULATOR',
    note: 'Blaise Pascal builds one of the first mechanical calculators to help with his father’s tax arithmetic.',
  },
  {
    era: 'early',
    year: '1833',
    title: 'ANALYTICAL ENGINE',
    note: 'Charles Babbage designs a general-purpose machine with memory, a “mill” and punched-card input — a computer in everything but electronics.',
  },
  {
    era: 'early',
    year: '1843',
    title: 'ADA LOVELACE',
    note: 'Her Notes contain what is widely regarded as the first published computer program — an algorithm written for a machine that did not yet exist.',
    sig: true,
  },
  {
    era: 'early',
    year: '1946',
    title: 'ENIAC',
    note: 'The age of electronic computing begins in a Philadelphia room full of glowing tubes.',
    xref: '/eniac',
    sig: true,
  },
  {
    era: 'mid',
    year: '1947',
    title: 'TRANSISTORS',
    note: 'Bell Labs replaces the vacuum tube: smaller, cooler, far more reliable.',
  },
  {
    era: 'mid',
    year: '1958',
    title: 'INTEGRATED CIRCUITS',
    note: 'Whole circuits etched onto single chips. Computing begins to shrink.',
  },
  {
    era: 'mid',
    year: '1971',
    title: 'MICROPROCESSOR',
    note: 'The Intel 4004 puts an entire processor on one chip. Computing becomes smaller, faster, personal.',
    sig: true,
  },
  {
    era: 'mid',
    year: '1977–81',
    title: 'PERSONAL COMPUTER',
    note: 'Machines arrive on desks and in homes. Computing becomes ours.',
  },
  {
    era: 'late',
    year: '1990s',
    title: 'INTERNET',
    note: 'The web opens to everyone. Computers become globally connected.',
  },
  {
    era: 'late',
    year: '2000s',
    title: 'BIG DATA',
    note: 'The world begins generating information at unprecedented scale.',
  },
  {
    era: 'late',
    year: '2010s',
    title: 'MACHINE LEARNING',
    note: 'Instead of following hand-written rules, computers learn patterns from data.',
  },
  {
    era: 'late',
    year: '2012',
    title: 'DEEP LEARNING',
    note: 'Neural networks reach critical scale — a deep network sweeps the major image-recognition benchmark, and the field ignites.',
  },
  {
    era: 'late',
    year: '2022—',
    title: 'GENERATIVE AI',
    note: 'Machines generate text, images, code and audio. The journey turns from calculating to creating.',
    sig: true,
  },
]

/* The timeline spine fills as you travel through it. */
function useSpineProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fill = el.querySelector('.tl__fill')
    let raf = null
    const update = () => {
      raf = null
      const rect = el.getBoundingClientRect()
      const anchor = window.innerHeight * 0.55
      const p = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height))
      fill.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return ref
}

export default function TimelineStory() {
  const story = storyBySlug('timeline')
  const spineRef = useSpineProgress()

  return (
    <StoryShell story={story}>
      {/* -------- opening spread -------- */}
      <header className="page art-head">
        <div className="art-head__kicker">
          <Eyebrow>TECHNOLOGY — 5,000 YEARS OF HUMAN INNOVATION</Eyebrow>
        </div>
        <h1
          className="display"
          style={{ fontSize: 'clamp(2.6rem, 7.4vw, 7rem)', maxWidth: '13em' }}
        >
          From Computer to Artificial Intelligence.
        </h1>
        <p className="dek">
          A journey from counting to creating — <span className="accent">fourteen milestones,
          one direction of travel.</span>
        </p>
        <div className="art-intro">
          <p>
            <span className="mono mono-tag">STORY 01 / THE HISTORICAL SPINE</span>
          </p>
          <p>
            We began with the abacus. We arrived at artificial intelligence. For thousands of
            years, humans have built tools to make thinking faster, easier and more powerful.
            Scroll to travel the whole road — early milestones get the room to themselves;
            the recent ones arrive faster, because that is what happened.
          </p>
        </div>
      </header>

      {/* -------- the journey -------- */}
      <section className="page chapter-band" aria-label="The journey">
        <h2 className="chapter">CH. 01 — THE JOURNEY / SCROLL TO TRAVEL</h2>

        <div className={`tl tl-era`} ref={spineRef}>
          <div className="tl__spine" aria-hidden="true">
            <div className="tl__fill" />
          </div>

          {MILESTONES.map((m, i) => {
            const side = i % 2 === 0 ? 'tl-node--l' : 'tl-node--r'
            return (
              <div
                key={m.title}
                className={`tl-node tl-era--${m.era} ${side} ${m.sig ? 'tl-node--sig' : ''}`}
              >
                <Reveal>
                  <span className="tl-node__year">{m.year}</span>
                  <h3 className="tl-node__title">{m.title}</h3>
                  <p className="tl-node__note">{m.note}</p>
                  {m.xref && (
                    <Link to={m.xref} className="tl-node__xref">
                      SEE STORY 02 — THE MACHINE
                    </Link>
                  )}
                </Reveal>
              </div>
            )
          })}

          <div className="tl-accel" aria-hidden="true">
            <span>▲ NOTE THE DENSITY — ACCELERATION IS THE POINT</span>
          </div>
        </div>
      </section>

      {/* -------- conclusion -------- */}
      <section className="page" aria-label="The big idea" style={{ paddingBlock: 'var(--sp-6)' }}>
        <Reveal style={{ textAlign: 'center' }}>
          <Eyebrow className="" style={{}}>
            THE BIG IDEA
          </Eyebrow>
          <p className="conclusion-word" style={{ marginTop: '1.4rem' }}>
            COMPUTER <span className="plus">+</span> HUMAN
          </p>
          <p className="ask" style={{ margin: '2rem auto 0' }}>
            The computer was built to <b>calculate</b>. AI is being built to help us{' '}
            <b>decide, create and solve</b>. The future isn’t computer versus human — it’s
            computer plus human.
          </p>
        </Reveal>
      </section>

      {/* -------- three levels of AI -------- */}
      <section className="page chapter-band" aria-label="Three levels of AI" style={{ paddingBottom: 'var(--sp-6)' }}>
        <h2 className="chapter">CH. 02 — THREE LEVELS OF AI</h2>
        <div className="levels" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          <Reveal>
            <svg viewBox="0 0 420 420" role="img" aria-label="Nested diagram: machine learning contains deep learning, which contains generative AI.">
              <circle cx="210" cy="210" r="196" fill="none" stroke="var(--ink)" strokeWidth="1" />
              <circle cx="210" cy="210" r="132" fill="none" stroke="var(--ink)" strokeWidth="1" />
              <circle cx="210" cy="210" r="70" fill="none" stroke="var(--accent)" strokeWidth="2" />
              <text x="210" y="46" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2" fill="var(--ink)">MACHINE LEARNING</text>
              <text x="210" y="108" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--ink)">DEEP LEARNING</text>
              <text x="210" y="206" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--accent)">GENERATIVE</text>
              <text x="210" y="222" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--accent)">AI</text>
              <text x="210" y="392" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="var(--muted)">FIG. 02 — EACH LEVEL LEARNS MORE DEEPLY THAN THE LAST</text>
            </svg>
          </Reveal>
          <Reveal delay={120}>
            <ul className="levels__list">
              <li>
                <span className="n">LEVEL 01</span>
                <span className="t">Machine Learning</span>
                <span className="d">Learning from data instead of following hand-written rules.</span>
              </li>
              <li>
                <span className="n">LEVEL 02</span>
                <span className="t">Deep Learning</span>
                <span className="d">Learning through layered neural networks — pattern recognition at scale.</span>
              </li>
              <li>
                <span className="n">LEVEL 03</span>
                <span className="t">Generative AI</span>
                <span className="d">Creating new text, images, code and audio from learned patterns.</span>
              </li>
            </ul>
            <div style={{ marginTop: '2.4rem' }}>
              <PunchStrip pattern="10s0110s0101s10" />
            </div>
          </Reveal>
        </div>
      </section>
    </StoryShell>
  )
}
