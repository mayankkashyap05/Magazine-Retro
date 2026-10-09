import { Link } from 'react-router-dom'
import { ISSUE, STORIES } from '../data/magazine.js'
import { usePageMeta } from '../lib/hooks.jsx'
import { Reveal, Eyebrow, Fig, TLink, PunchStrip, Ticker } from '../components/primitives.jsx'

import heroEniac from '../assets/img/hero-eniac.jpg'
import eniacTubes from '../assets/img/eniac-tubes.jpg'
import aiYoung from '../assets/img/ai-young.jpg'

/* The front page is split so the print edition can use the hero as its cover
   and the remaining front-page sections as continuation pages. On screen the
   two halves render exactly as the original single component did. */
export function HomeHero() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero page" aria-label="Front page">
        <div className="hero__meta">
          <span>
            ENIAC / VOL. {ISSUE.vol} / <b>DIGITAL EDITION</b>
          </span>
          <span>
            ISSUE {ISSUE.no} — {ISSUE.date}
          </span>
          <span>EST. LINEAGE / 1946</span>
        </div>

        <PunchStrip pattern="01s0110s01011s01001s1010110s0" />

        <h1 className="hero__word">
          ENIAC<span className="hole" aria-hidden="true" />
        </h1>

        <p className="hero__state">
          The machines that changed <span className="accent">how we think.</span>
        </p>

        <div className="hero__grid">
          <p className="hero__deck">
            <span className="mono">A magazine about computing, AI &amp; the human story</span>
            ENIAC takes its name from the 30-ton machine that helped begin the electronic
            computing age. From that room-sized giant to the intelligence in your pocket, we
            report on one continuous story — the machines we make, and what they make of us.
          </p>
          <p className="hero__lineage">
            THE MACHINE AGE <span className="arr">→</span>
            <br />
            THE COMPUTER AGE <span className="arr">→</span>
            <br />
            THE INTERNET AGE <span className="arr">→</span>
            <br />
            THE AI AGE
          </p>
        </div>

        <Reveal className="hero__fig">
          <Fig
            src={heroEniac}
            alt="Archival view of the ENIAC room: a wall of black panels, cables and switches, with two figures working at the machine."
            fig="FIG. 01 — THE ENIAC ROOM, MOORE SCHOOL OF ELECTRICAL ENGINEERING"
            note="1946 / ARCHIVE"
            eager
          />
          <span className="hero__year">ENIAC / 1946</span>
        </Reveal>
      </section>

    </>
  )
}

export function HomeSections() {
  return (
    <>
      {/* ================= FROM THE EDITOR ================= */}
      <section className="home-sec" aria-labelledby="ed-note">
        <div className="page">
          <div className="home-sec__head">
            <h2 className="mono" id="ed-note">
              SEC. 01 — FROM THE EDITOR
            </h2>
            <span className="home-sec__no">FIELD NOTE 001</span>
          </div>
          <div className="note-grid">
            <p className="note-grid__label">
              <b>■</b> EDITORIAL
              <br />
              SYSTEM / HUMAN
              <br />
              SIGNAL: ON
            </p>
            <Reveal className="note-body">
              <p className="dropcap">
                Every tool we have ever built was a bet on human curiosity. The abacus. The
                press. The vacuum tube. The neural network.
              </p>
              <p>
                This issue travels from a machine that weighed thirty tons to the artificial
                intelligence in your pocket — and asks the only question that matters: what
                are we for, now that machines can think?
              </p>
              <p className="close">The machine is the subject. Human curiosity is the story.</p>
              <p className="note-sign">— THE EDITORS, ISSUE {ISSUE.no}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= IN THIS ISSUE ================= */}
      <section className="home-sec" aria-labelledby="contents" style={{ paddingTop: 0 }}>
        <div className="page">
          <div className="home-sec__head">
            <h2 className="mono" id="contents">
              SEC. 02 — IN THIS ISSUE
            </h2>
            <span className="home-sec__no">{STORIES.length} STORIES / ONE THREAD</span>
          </div>
          <nav aria-label="Table of contents">
            {STORIES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link className="irow" to={`/${s.slug}`}>
                  <span className="irow__no">STORY {s.no}</span>
                  <span className="irow__title">{s.short}</span>
                  <span className="irow__cat">{s.cat}</span>
                  <span className="irow__arr" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </nav>
        </div>
      </section>

      {/* ================= FEATURE: TIMELINE ================= */}
      <section className="home-sec" aria-labelledby="feature-timeline">
        <div className="page">
          <div className="home-sec__head">
            <h2 className="mono" id="feature-timeline">
              SEC. 03 — FEATURE / TECHNOLOGY
            </h2>
            <span className="home-sec__no">5,000 YEARS IN ONE LINE</span>
          </div>
          <Reveal>
            <Eyebrow>THE HISTORICAL SPINE</Eyebrow>
            <p
              className="display"
              style={{
                fontSize: 'clamp(2.2rem, 6vw, 5.6rem)',
                maxWidth: '12em',
                marginTop: '1.2rem',
              }}
            >
              From Computer to <em style={{ color: 'var(--accent)' }}>Artificial Intelligence.</em>
            </p>
            <p className="lede" style={{ marginTop: '1.6rem' }}>
              We began with the abacus. We arrived at artificial intelligence. Fourteen
              milestones, five thousand years, one direction of travel — from counting to
              creating.
            </p>
            <div className="tstrip" aria-hidden="true">
              <span className="tstrip__line" />
              <div className="tstrip__row">
                <span className="tstrip__pt">3000 BC</span>
                <span className="tstrip__pt">1642</span>
                <span className="tstrip__pt">1833</span>
                <span className="tstrip__pt tstrip__pt--sig">1946</span>
                <span className="tstrip__pt">1971</span>
                <span className="tstrip__pt">1990s</span>
                <span className="tstrip__pt tstrip__pt--sig">NOW</span>
              </div>
            </div>
            <div style={{ marginTop: '2.4rem' }}>
              <TLink to="/timeline" accent>
                READ THE TIMELINE
              </TLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= THE MACHINE ================= */}
      <section className="machine ink-section" aria-labelledby="machine-h">
        <div className="page">
          <Reveal>
            <Fig
              src={eniacTubes}
              alt="Rows of glass vacuum tubes glowing warmly inside the ENIAC."
              fig="FIG. 02 — VACUUM TUBES, THE GLOWING HEART OF ENIAC"
              note="17,468 UNITS"
            />
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>SEC. 04 — THE MACHINE / ARCHIVE 1946</Eyebrow>
              <h2
                className="display"
                id="machine-h"
                style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.8rem)', marginTop: '1.2rem' }}
              >
                The giant that started the digital age.
              </h2>
            </Reveal>
            <ul className="machine__stats">
              <li>
                <Reveal as="span" className="v">
                  30 <span className="accent">TONS</span>
                </Reveal>
                <span className="k">TOTAL WEIGHT</span>
              </li>
              <li>
                <Reveal as="span" className="v" delay={80}>
                  17,468 <span className="accent">TUBES</span>
                </Reveal>
                <span className="k">VACUUM TUBES</span>
              </li>
              <li>
                <Reveal as="span" className="v" delay={160}>
                  150 <span className="accent">KW</span>
                </Reveal>
                <span className="k">POWER DRAW</span>
              </li>
              <li>
                <Reveal as="span" className="v" delay={240}>
                  5,000<span className="accent">/SEC</span>
                </Reveal>
                <span className="k">ADDITIONS PER SECOND</span>
              </li>
            </ul>
            <div style={{ marginTop: '2.2rem' }}>
              <TLink to="/eniac" accent>
                ENTER THE MACHINE
              </TLink>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE NEXT GENERATION: BCA ================= */}
      <section className="home-sec runway-teaser" aria-labelledby="bca-h">
        <svg viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="120" x2="1200" y2="280" stroke="var(--line)" strokeWidth="1" strokeDasharray="6 8" />
          <line x1="0" y1="300" x2="1200" y2="300" stroke="var(--line)" strokeWidth="1" strokeDasharray="6 8" />
          <line x1="0" y1="480" x2="1200" y2="320" stroke="var(--line)" strokeWidth="1" strokeDasharray="6 8" />
        </svg>
        <div className="page">
          <div className="home-sec__head">
            <h2 className="mono" id="bca-h">
              SEC. 05 — THE NEXT GENERATION
            </h2>
            <span className="home-sec__no">PEOPLE / EDUCATION</span>
          </div>
          <div style={{ display: 'grid', gap: '2.5rem', alignItems: 'end' }}>
            <Reveal>
              <p
                className="display"
                style={{ fontSize: 'clamp(2.4rem, 6.4vw, 6rem)', maxWidth: '11em' }}
              >
                Not just a degree. <em style={{ color: 'var(--accent)' }}>A launchpad.</em>
              </p>
              <p className="lede" style={{ marginTop: '1.4rem' }}>
                A degree gives you knowledge. The Bachelor of Computer Applications gives you
                the runway to build with it — three of them, in fact.
              </p>
              <div className="runway-chips">
                <span>
                  <b>01</b> THE CAREER RUNWAY
                </span>
                <span>
                  <b>02</b> THE HIGHER STUDIES RUNWAY
                </span>
                <span>
                  <b>03</b> THE CREATOR RUNWAY
                </span>
              </div>
              <div style={{ marginTop: '2.2rem' }}>
                <TLink to="/bca" accent>
                  SEE THE RUNWAYS
                </TLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= DIGITAL THREAT: CYBER ================= */}
      <section className="cyber-teaser" aria-labelledby="cyber-h">
        <div className="page">
          <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: '1fr' }}>
            <Reveal>
              <p className="mono-field">
                SEC. 06 — DIGITAL THREAT // THREAT BRIEF 001
                <br />
                IN THE PHYSICAL WORLD, WE DON’T OPEN THE DOOR TO STRANGERS.
              </p>
              <h2 className="click" id="cyber-h">
                ONE CLICK<span className="dot">.</span>
              </h2>
              <p className="lede" style={{ color: 'var(--muted-light)', marginTop: '1.4rem' }}>
                Online, we sometimes open the door with a single tap. The bait changes. The
                goal doesn’t.
              </p>
              <div className="triad" aria-label="Fear, greed, curiosity">
                <span>FEAR</span>
                <span>GREED</span>
                <span>CURIOSITY</span>
              </div>
              <div style={{ marginTop: '2.4rem' }}>
                <TLink to="/cyber" accent>
                  READ THE THREAT BRIEF
                </TLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= HUMAN × AI ================= */}
      <section className="home-sec" aria-labelledby="ai-h">
        <div className="page">
          <div className="home-sec__head">
            <h2 className="mono" id="ai-h">
              SEC. 07 — HUMAN × AI
            </h2>
            <span className="home-sec__no">BOON, BANE OR BOTH?</span>
          </div>
          <Reveal>
            <p
              className="display"
              style={{ fontSize: 'clamp(2.2rem, 5.8vw, 5.4rem)', maxWidth: '13em' }}
            >
              Are we using AI — <em>or is AI using us?</em>
            </p>
          </Reveal>
          <div className="ai-split" style={{ marginTop: 'clamp(2rem,4vw,3.4rem)' }}>
            <Reveal>
              <span className="side-tag">BOON — AI AS SUPERPOWER</span>
              <h3>Super-tutor. Super-creator. Accelerator.</h3>
              <ul>
                <li>LEARN AT YOUR OWN PACE</li>
                <li>WRITE. DESIGN. CODE. CREATE.</li>
                <li>IDEA → FIRST DRAFT IN MINUTES</li>
                <li>NEW CAREERS, NEW INDUSTRIES</li>
              </ul>
            </Reveal>
            <Reveal className="bane" delay={120}>
              <span className="side-tag">BANE — AI AS DEPENDENCY</span>
              <h3>Every superpower has a price.</h3>
              <ul>
                <li>DEPENDENCE — OUTSOURCING THOUGHT</li>
                <li>COMPARISON — SYNTHETIC PERFECTION</li>
                <li>DECEPTION — DEEPFAKES &amp; SCAMS</li>
                <li>THE RISK OF STOPPING THINKING</li>
              </ul>
            </Reveal>
          </div>
          <div style={{ marginTop: '2.4rem', display: 'grid', gap: '1rem', justifyItems: 'start' }}>
            <Fig
              src={aiYoung}
              alt="A thoughtful young person resting their chin on their hand beside an open laptop in a dim study."
              fig="FIG. 03 — THE GENERATION THAT ASKS"
              note="SYSTEM / HUMAN"
              ratio="16 / 7"
              className="ai-split__fig"
            />
            <TLink to="/ai" accent>
              READ THE GENERATION QUESTION
            </TLink>
          </div>
        </div>
      </section>

      {/* ================= HUMAN × MACHINE: GAMES ================= */}
      <section className="home-sec games-teaser" aria-labelledby="games-h" style={{ paddingTop: 0 }}>
        <Ticker
          label="The dopamine loop"
          items={['PLAY', 'REWARD', 'DOPAMINE', 'REPEAT']}
        />
        <div className="page" style={{ paddingTop: 'clamp(2.5rem,5vw,4rem)' }}>
          <div className="home-sec__head">
            <h2 className="mono" id="games-h">
              SEC. 08 — HUMAN × MACHINE
            </h2>
            <span className="home-sec__no">ATTENTION STUDY</span>
          </div>
          <Reveal>
            <p className="dop">
              Who is <em>controlling</em> whom?
            </p>
            <p className="lede" style={{ marginTop: '1.2rem' }}>
              You think you control the game. But every reward, sound and victory is designed
              to keep your brain engaged. The game is not the enemy — losing control is.
            </p>
            <div style={{ marginTop: '2.2rem' }}>
              <TLink to="/games" accent>
                PLAY → REWARD → READ
              </TLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FINAL STATEMENT ================= */}
      <section className="statement ink-section" aria-label="Final statement">
        <div className="page">
          <Reveal>
            <p className="display">WE BUILT MACHINES</p>
            <p className="display">
              TO THINK <em style={{ color: 'var(--accent)' }}>FASTER.</em>
            </p>
            <p className="display display--light" style={{ marginTop: '0.9em' }}>
              Now we must learn
            </p>
            <p className="display display--light">
              how to think <em style={{ color: 'var(--accent)' }}>better.</em>
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="sig" style={{ marginTop: '3rem' }}>
              <PunchStrip pattern="0s10s11s0" />
              <span className="mono" style={{ color: 'var(--muted-light)' }}>
                ENIAC / END OF FRONT PAGE
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default function Home() {
  usePageMeta(
    'ENIAC — Technology. People. Ideas.',
    'ENIAC is a digital magazine exploring computing, artificial intelligence, cybersecurity and the human relationship with technology.'
  )

  return (
    <>
      <HomeHero />
      <HomeSections />
    </>
  )
}
