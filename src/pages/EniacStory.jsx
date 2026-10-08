import StoryShell from '../components/StoryShell.jsx'
import { storyBySlug } from '../data/magazine.js'
import { Reveal, Eyebrow, Fig, CountUp, PunchStrip } from '../components/primitives.jsx'

import heroEniac from '../assets/img/hero-eniac.jpg'
import punchCards from '../assets/img/punch-cards.jpg'
import eniacSix from '../assets/img/eniac-six.jpg'

const SIX = [
  'Kay McNulty',
  'Betty Jennings',
  'Betty Holberton',
  'Marlyn Wescoff',
  'Fran Bilas',
  'Ruth Lichterman',
]

const STATS = [
  { v: 30, unit: 'TONS', note: 'Total weight — a machine the size of a large room.', flip: false },
  { v: 17468, unit: 'VACUUM TUBES', note: 'The glowing heart of the machine.', flip: true },
  { v: 1800, unit: 'SQ. FT.', note: 'It occupied an entire hall.', prefix: '≈', flip: false },
  { v: 150, unit: 'KW', note: 'Its enormous power draw.', flip: true },
  { v: 5000, unit: 'ADDITIONS / SEC', note: 'Extraordinary speed for its era.', flip: false },
]

function Schematic() {
  const box = (x, label, sub, hot = false) => (
    <g key={label}>
      <rect
        x={x}
        y={70}
        width={118}
        height={64}
        fill={hot ? 'var(--ink)' : 'none'}
        stroke={hot ? 'var(--ink)' : 'var(--ink)'}
        strokeWidth="1"
      />
      <text
        x={x + 59}
        y={97}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10.5"
        letterSpacing="1.2"
        fill={hot ? 'var(--paper)' : 'var(--ink)'}
      >
        {label}
      </text>
      <text
        x={x + 59}
        y={115}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="1"
        fill={hot ? 'var(--muted-light)' : 'var(--muted)'}
      >
        {sub}
      </text>
    </g>
  )
  const link = (x1, x2, y = 102) => (
    <g key={`${x1}-${x2}`} stroke="var(--accent)" strokeWidth="1.4">
      <line x1={x1} y1={y} x2={x2 - 7} y2={y} />
      <path d={`M ${x2 - 7} ${y - 4} L ${x2} ${y} L ${x2 - 7} ${y + 4} Z`} fill="var(--accent)" stroke="none" />
    </g>
  )
  return (
    <svg
      viewBox="0 0 1040 200"
      role="img"
      aria-label="Simplified signal path through ENIAC: input cards, programming master, accumulators, multiplier, divider, function tables, output cards."
    >
      {box(0, 'INPUT', 'PUNCHED CARDS')}
      {link(122, 168)}
      {box(172, 'PROGRAMMER', 'PLUGS + SWITCHES', true)}
      {link(294, 340)}
      {box(344, 'ACCUMULATORS', '×20 UNITS')}
      {link(466, 512)}
      {box(516, 'MULTIPLIER', 'PRODUCT UNIT')}
      {link(638, 684)}
      {box(688, 'DIVIDER / √', 'ROOT UNIT')}
      {link(810, 856)}
      {box(860, 'OUTPUT', 'PUNCHED CARDS')}
      <text x="0" y="34" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="var(--muted)">
        FUNCTION TABLES FEED EVERY STAGE — SETTINGS WERE WIRED BY HAND
      </text>
      <text x="0" y="172" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="var(--accent)">
        SIGNAL PATH, SIMPLIFIED
      </text>
    </svg>
  )
}

export default function EniacStory() {
  const story = storyBySlug('eniac')

  return (
    <StoryShell story={story}>
      {/* -------- monumental opening -------- */}
      <header className="page art-head">
        <div className="art-head__kicker">
          <Eyebrow>ARCHIVE / 1946 — THE GIANT THAT STARTED THE DIGITAL AGE</Eyebrow>
        </div>
        <h1 className="eniac-title">ENIAC</h1>
        <div className="eniac-sub">
          <span>ELECTRONIC NUMERICAL INTEGRATOR AND COMPUTER</span>
          <span>
            ANNOUNCED <b>FEBRUARY 1946</b>
          </span>
          <span>MOORE SCHOOL, PHILADELPHIA</span>
        </div>
        <p className="dek">
          Before smartphones, laptops and AI, there was{' '}
          <span className="accent">a 30-ton machine that filled a room.</span>
        </p>
      </header>

      <div className="page">
        <Reveal>
          <Fig
            src={heroEniac}
            alt="The ENIAC wall of panels, cables and switches, with two figures working at the machine."
            fig="FIG. 01 — THE MACHINE, FULL HEIGHT"
            note="ARCHIVE / 1946"
            eager
          />
        </Reveal>
      </div>

      {/* -------- the numbers -------- */}
      <section className="page chapter-band" aria-label="The numbers" style={{ paddingBottom: 'var(--sp-5)' }}>
        <h2 className="chapter">CH. 01 — THE NUMBERS / SCALE AS EVIDENCE</h2>
        <div style={{ marginTop: 'clamp(2rem,4vw,3.4rem)' }}>
          {STATS.map((s, i) => (
            <Reveal key={s.unit} delay={i * 40}>
              <div className={`stat-landmark ${s.flip ? 'stat-landmark--flip' : ''}`}>
                <p className="stat-landmark__val">
                  {s.prefix && <span className="u">{s.prefix}</span>}
                  <CountUp to={s.v} /> <span className="u accent">{s.unit}</span>
                </p>
                <p className="stat-landmark__note">
                  DATA POINT {String(i + 1).padStart(2, '0')} / 05
                  <br />
                  {s.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------- why it was built -------- */}
      <section className="page" aria-label="Why it was built" style={{ paddingBlock: 'var(--sp-5)' }}>
        <div className="duo">
          <Reveal>
            <h2 className="chapter" style={{ marginBottom: '2rem' }}>
              CH. 02 — WHY WAS IT BUILT?
            </h2>
            <p className="pull">
              War needed <em>speed.</em>
            </p>
            <div className="prose" style={{ marginTop: '1.8rem' }}>
              <p>
                During the Second World War, the U.S. Army needed thousands of complex
                artillery-trajectory calculations. Human computers — working by hand — were
                simply too slow.
              </p>
              <p>
                So engineers built a machine that could calculate electronically. It was
                designed for one urgent job: out-compute the war.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Fig
              src={punchCards}
              alt="A fanned stack of punched data cards on a laboratory desk beside a pencil."
              fig="FIG. 02 — DATA MEANT PAPER, HANDLED BY HAND"
              note="PUNCHED CARDS"
            />
          </Reveal>
        </div>
      </section>

      {/* -------- no keyboard -------- */}
      <section className="ink-section" aria-label="Interface" style={{ padding: 'var(--sp-6) 0' }}>
        <div className="page">
          <Reveal>
            <h2 className="chapter" style={{ marginBottom: '2rem' }}>
              CH. 03 — THE INTERFACE
            </h2>
            <p className="notype">
              NO <span className="strike">KEYBOARD.</span>
            </p>
            <p className="notype" style={{ marginTop: '0.35em' }}>
              NO <span className="strike">MOUSE.</span>
            </p>
            <p className="notype" style={{ marginTop: '0.35em' }}>
              NO <span className="strike">SCREEN.</span>
            </p>
            <p className="lede" style={{ color: 'var(--muted-light)', marginTop: '2.2rem' }}>
              Programming meant connecting cables, switches and panels by hand. One
              calculation could take <b style={{ color: 'var(--paper)' }}>days to set up</b> —
              the program was the wiring.
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------- schematic -------- */}
      <section className="page chapter-band" aria-label="Signal path" style={{ paddingBottom: 'var(--sp-5)' }}>
        <h2 className="chapter">CH. 04 — INSIDE THE GIANT</h2>
        <Reveal className="schematic" style={{ marginTop: 'clamp(2rem,4vw,3rem)', overflowX: 'auto' }}>
          <div style={{ minWidth: 760 }}>
            <Schematic />
          </div>
          <div className="schematic__cap">
            <span>
              <b>FIG. 03</b> — ENIAC, AS A FLOW OF SIGNALS
            </span>
            <span>SOURCE: GENERAL ARCHITECTURE, SIMPLIFIED</span>
          </div>
        </Reveal>
      </section>

      {/* -------- the ENIAC six -------- */}
      <section className="page chapter-band" aria-label="The ENIAC Six" style={{ paddingBottom: 'var(--sp-6)' }}>
        <h2 className="chapter">CH. 05 — THE ENIAC SIX</h2>
        <div style={{ display: 'grid', gap: 'clamp(2rem,5vw,4rem)', marginTop: 'clamp(2rem,4vw,3rem)' }}>
          <Reveal>
            <p className="pull" style={{ maxWidth: '18em' }}>
              Six women turned the hardware into <em>a programmable machine.</em>
            </p>
            <p className="lede" style={{ marginTop: '1.6rem' }}>
              ENIAC shipped with no manual and no programming language. Six women
              mathematicians — recruited from the wartime corps of human “computers” —
              studied its circuits and invented the craft of programming it, wiring the first
              ballistics runs. For decades their work went largely uncredited. History has
              since corrected the record.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Fig
              src={eniacSix}
              alt="Two women programmers routing patch cables on an early computer panel while consulting a wiring diagram."
              fig="FIG. 04 — PROGRAMMING MEANT WIRING"
              note="THE FIRST PROGRAMMERS"
            />
          </Reveal>
          <div className="six-grid">
            {SIX.map((name, i) => (
              <Reveal key={name} delay={i * 60} className="six-cell">
                <span className="no">PROGRAMMER {String(i + 1).padStart(2, '0')} / 06</span>
                <h3 className="nm">{name}</h3>
                <span className="rl">MATHEMATICIAN — ENIAC PROGRAMMING TEAM</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------- legacy -------- */}
      <section className="page" aria-label="Legacy" style={{ paddingBlock: 'var(--sp-5)' }}>
        <h2 className="chapter">CH. 06 — WHAT CAME NEXT</h2>
        <Reveal>
          <p className="lede" style={{ marginTop: '2rem' }}>
            ENIAC helped prove that large-scale electronic computing was possible. Its
            descendants are everything that followed:
          </p>
          <ul className="chain" style={{ marginTop: '2rem' }}>
            <li>STORED-PROGRAM COMPUTING</li>
            <li className="lk" aria-hidden="true">→</li>
            <li>MODERN COMPUTER ARCHITECTURE</li>
            <li className="lk" aria-hidden="true">→</li>
            <li>THE COMPUTER INDUSTRY</li>
            <li className="lk" aria-hidden="true">→</li>
            <li className="hot">TODAY’S DIGITAL WORLD</li>
          </ul>
        </Reveal>
      </section>

      {/* -------- 1955 -------- */}
      <section className="off" aria-label="1955">
        <div className="page">
          <Reveal>
            <p className="yr">POWERED DOWN — OCTOBER 2, 1955</p>
            <p className="display">
              ENIAC was switched off.
              <br />
              Its idea <em style={{ color: 'var(--accent)' }}>never was.</em>
            </p>
            <p className="coda">
              Every laptop, smartphone and AI system carries a piece of that revolution.{' '}
              <b>One machine. One room. The start of everything since.</b>
            </p>
            <div style={{ marginTop: '2.6rem', display: 'flex', justifyContent: 'center' }}>
              <PunchStrip pattern="s010s110s01s0" />
            </div>
          </Reveal>
        </div>
      </section>
    </StoryShell>
  )
}
