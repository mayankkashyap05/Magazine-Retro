import { ISSUE, STORIES } from '../data/magazine.js'

import heroEniac from '../assets/img/hero-eniac.jpg'
import eniacTubes from '../assets/img/eniac-tubes.jpg'
import eniacSix from '../assets/img/eniac-six.jpg'
import punchCards from '../assets/img/punch-cards.jpg'
import bcaStudent from '../assets/img/bca-student.jpg'
import cyberHand from '../assets/img/cyber-hand.jpg'
import aiYoung from '../assets/img/ai-young.jpg'
import gamingCrt from '../assets/img/gaming-crt.jpg'

const MILESTONES = [
  { era: 'early', year: 'c. 3000 BC', title: 'ABACUS', note: 'Counting becomes a machine — the first revolution in calculation.', sig: true },
  { era: 'early', year: '1642', title: 'PASCAL’S CALCULATOR', note: 'Blaise Pascal builds one of the first mechanical calculators to help with his father’s tax arithmetic.' },
  { era: 'early', year: '1833', title: 'ANALYTICAL ENGINE', note: 'Charles Babbage designs a general-purpose machine with memory, a “mill” and punched-card input — a computer in everything but electronics.' },
  { era: 'early', year: '1843', title: 'ADA LOVELACE', note: 'Her Notes contain what is widely regarded as the first published computer program — an algorithm written for a machine that did not yet exist.', sig: true },
  { era: 'early', year: '1946', title: 'ENIAC', note: 'The age of electronic computing begins in a Philadelphia room full of glowing tubes.', sig: true },
  { era: 'mid', year: '1947', title: 'TRANSISTORS', note: 'Bell Labs replaces the vacuum tube: smaller, cooler, far more reliable.' },
  { era: 'mid', year: '1958', title: 'INTEGRATED CIRCUITS', note: 'Whole circuits etched onto single chips. Computing begins to shrink.' },
  { era: 'mid', year: '1971', title: 'MICROPROCESSOR', note: 'The Intel 4004 puts an entire processor on one chip. Computing becomes smaller, faster, personal.', sig: true },
  { era: 'mid', year: '1977–81', title: 'PERSONAL COMPUTER', note: 'Machines arrive on desks and in homes. Computing becomes ours.' },
  { era: 'late', year: '1990s', title: 'INTERNET', note: 'The web opens to everyone. Computers become globally connected.' },
  { era: 'late', year: '2000s', title: 'BIG DATA', note: 'The world begins generating information at unprecedented scale.' },
  { era: 'late', year: '2010s', title: 'MACHINE LEARNING', note: 'Instead of following hand-written rules, computers learn patterns from data.' },
  { era: 'late', year: '2012', title: 'DEEP LEARNING', note: 'Neural networks reach critical scale — a deep network sweeps the major image-recognition benchmark, and the field ignites.' },
  { era: 'late', year: '2022—', title: 'GENERATIVE AI', note: 'Machines generate text, images, code and audio. The journey turns from calculating to creating.', sig: true },
]

function PunchStrip({ pattern }) {
  return (
    <div className="punch-strip" aria-hidden="true">
      {pattern.split('').map((c, i) => (
        <i key={i} className={c === '1' ? 'on' : c === 's' ? 'sig' : ''} />
      ))}
    </div>
  )
}

function Schematic() {
  const box = (x, label, sub, hot = false) => (
    <g key={label}>
      <rect x={x} y={70} width={118} height={64} fill={hot ? 'var(--ink)' : 'none'} stroke={hot ? 'var(--ink)' : 'var(--ink)'} strokeWidth="1" />
      <text x={x + 59} y={97} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="1.2" fill={hot ? 'var(--paper)' : 'var(--ink)'}>{label}</text>
      <text x={x + 59} y={115} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1" fill={hot ? 'var(--muted-light)' : 'var(--muted)'}>{sub}</text>
    </g>
  )
  const link = (x1, x2, y = 102) => (
    <g key={`${x1}-${x2}`} stroke="var(--accent)" strokeWidth="1.4">
      <line x1={x1} y1={y} x2={x2 - 7} y2={y} />
      <path d={`M ${x2 - 7} ${y - 4} L ${x2} ${y} L ${x2 - 7} ${y + 4} Z`} fill="var(--accent)" stroke="none" />
    </g>
  )
  return (
    <svg viewBox="0 0 1040 200" role="img" aria-label="ENIAC signal path">
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
      <text x="0" y="34" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="var(--muted)">FUNCTION TABLES FEED EVERY STAGE — SETTINGS WERE WIRED BY HAND</text>
      <text x="0" y="172" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="var(--accent)">SIGNAL PATH, SIMPLIFIED</text>
    </svg>
  )
}

function LoopSvg() {
  const node = (x, label, hot = false) => (
    <g key={label}>
      <rect x={x} y={40} width={150} height={56} fill={hot ? 'var(--ink)' : 'none'} stroke="var(--ink)" strokeWidth="1" />
      <text x={x + 75} y={74} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="3" fill={hot ? 'var(--paper)' : 'var(--ink)'}>{label}</text>
    </g>
  )
  const arrow = (x1, x2, y = 68) => (
    <g key={`${x1}${x2}`} stroke="var(--ink)" strokeWidth="1.4">
      <line x1={x1} y1={y} x2={x2 - 8} y2={y} />
      <path d={`M ${x2 - 8} ${y - 4} L ${x2} ${y} L ${x2 - 8} ${y + 4} Z`} fill="var(--ink)" stroke="none" />
    </g>
  )
  return (
    <svg viewBox="0 0 900 210" role="img" aria-label="Dopamine loop">
      {node(20, 'PLAY')}
      {arrow(175, 235)}
      {node(240, 'REWARD')}
      {arrow(395, 455)}
      {node(460, 'DOPAMINE', true)}
      {arrow(615, 675)}
      {node(680, 'REPEAT')}
      <path d="M 755 96 v 40 H 95 v -40" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="5 5" />
      <path d="M 95 136 l -5 10 h 10 Z" fill="var(--accent)" />
      <text x="450" y="168" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2.4" fill="var(--accent)">THE LOOP CLOSES ITSELF</text>
      <text x="450" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2.4" fill="var(--muted)">FIG. 02 — THE DOPAMINE LOOP, SIMPLIFIED</text>
    </svg>
  )
}

function DuelSvg() {
  return (
    <svg viewBox="0 0 260 120" role="img" aria-label="Brain vs Game">
      <g stroke="var(--ink)" strokeWidth="1.4">
        <line x1="10" y1="44" x2="238" y2="44" />
        <path d="M 238 44 l -10 -5 v 10 Z" fill="var(--ink)" stroke="none" />
      </g>
      <g stroke="var(--accent)" strokeWidth="1.4">
        <line x1="250" y1="76" x2="22" y2="76" />
        <path d="M 22 76 l 10 -5 v 10 Z" fill="var(--accent)" stroke="none" />
      </g>
      <text x="130" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2.4" fill="var(--muted)">PLAYER → CONTROLS → GAME?</text>
      <text x="130" y="100" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2.4" fill="var(--accent)">GAME → DESIGN → BRAIN?</text>
    </svg>
  )
}

export default function PrintEdition() {
  return (
    <div className="print-root">

      {/* ============ COVER ============ */}
      <section className="print-page" data-section="cover" id="sec-cover">
        <div className="cover">
          <div className="cover__top">
            <span>VOL. {ISSUE.vol} / ISSUE {ISSUE.no} — <b>{ISSUE.name}</b></span>
            <span>{ISSUE.tagline.toUpperCase()}</span>
            <span>{ISSUE.date}</span>
          </div>

          <div className="cover__main">
            <PunchStrip pattern="01s0110s01011s01001s1010110s0" />
            <h1 className="cover__wordmark" style={{ marginTop: '8mm' }}>
              ENIAC<span className="dot" aria-hidden="true" />
            </h1>
            <p className="cover__tagline">
              The machines that changed <span className="accent">how we think.</span>
            </p>
            <p className="cover__deck">
              ENIAC takes its name from the 30-ton machine that helped begin the electronic computing age. From that room-sized giant to the intelligence in your pocket, we report on one continuous story — the machines we make, and what they make of us.
            </p>

            <figure className="cover__figure">
              <img src={heroEniac} alt="ENIAC room archival" />
              <figcaption>
                <span><b style={{ color: 'var(--accent)' }}>FIG. 01</b> — THE ENIAC ROOM, MOORE SCHOOL 1946</span>
                <span>ARCHIVE</span>
              </figcaption>
            </figure>
          </div>

          <div className="cover__bottom">
            <div className="cover__issue-box">
              <span><b>ISSUE {ISSUE.no}</b> / {ISSUE.date}</span>
              <span>DOC. NO. EN-{ISSUE.no}-2026</span>
              <span>TECHNOLOGY. PEOPLE. IDEAS.</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div>THE MACHINE AGE → THE AI AGE</div>
              <div style={{ marginTop: '2mm', color: 'var(--accent)' }}>■ EST. LINEAGE 1946</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INSIDE COVER / PUBLICATION INFO ============ */}
      <section className="print-page" data-section="inside" id="sec-inside">
        <div className="inside-cover">
          <div className="inside-cover__left">
            <PunchStrip pattern="0100s10100101s01011s010010" />
            <p className="display" style={{ marginTop: '8mm' }}>ENIAC<span style={{ color: 'var(--accent)' }}>.</span></p>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '12pt', color: 'var(--muted)', marginTop: '2mm' }}>Technology. People. Ideas.</p>

            <div style={{ marginTop: '12mm', fontSize: '10pt', lineHeight: '1.7', maxWidth: '24em' }}>
              <p><b>ENIAC</b> is a digital magazine about computing, artificial intelligence, cybersecurity, digital life and the human relationship with technology.</p>
              <p style={{ marginTop: '4mm' }}>This is Issue {ISSUE.no} — {ISSUE.name}, published {ISSUE.date}. It contains six stories following one thread: from the first counting machines to the intelligence now in our pockets.</p>
              <p style={{ marginTop: '4mm' }}><i>The machine changes. The human question remains.</i></p>
            </div>

            <div style={{ marginTop: '12mm' }}>
              <PunchStrip pattern="0s10s11s0" />
            </div>
          </div>

          <div className="inside-cover__meta">
            <div style={{ borderTop: '1px solid var(--line-strong)', paddingTop: '4mm' }}>
              <div>PUBLICATION</div>
              <div><b>ENIAC — TECHNOLOGY. PEOPLE. IDEAS.</b></div>
              <div style={{ marginTop: '4mm' }}>ISSUE {ISSUE.no} / VOL. {ISSUE.vol}</div>
              <div>{ISSUE.date}</div>
              <div>DOC. NO. EN-{ISSUE.no}-2026</div>
            </div>

            <div style={{ marginTop: '8mm', borderTop: '1px solid var(--line)', paddingTop: '4mm' }}>
              <div>TYPEFACES</div>
              <div><b>FRAUNCES</b> — DISPLAY</div>
              <div><b>ARCHIVO</b> — BODY</div>
              <div><b>IBM PLEX MONO</b> — TECHNICAL</div>
            </div>

            <div style={{ marginTop: '8mm', borderTop: '1px solid var(--line)', paddingTop: '4mm' }}>
              <div>EDITION</div>
              <div><b>DIGITAL EDITION → PRINT EDITION</b></div>
              <div>A4 PORTRAIT / 210 × 297 MM</div>
              <div>PRINT-READY PDF</div>
            </div>

            <div style={{ marginTop: '8mm', borderTop: '1px solid var(--line)', paddingTop: '4mm' }}>
              <div>REPOSITORY</div>
              <div style={{ wordBreak: 'break-all' }}>GITHUB.COM/MAYANKKASHYAP05/ENIAC</div>
              <div style={{ marginTop: '2mm' }}>SOURCE + DEVELOPMENT RECORD</div>
            </div>

            <div style={{ marginTop: '8mm', borderTop: '1px solid var(--line-strong)', paddingTop: '4mm' }}>
              <div>FROM THE EDITOR</div>
              <div style={{ textTransform: 'none', letterSpacing: '0.02em', color: 'var(--ink-soft)', fontFamily: 'var(--font-body)', fontSize: '8.5pt', lineHeight: '1.6', marginTop: '2mm' }}>
                Every tool we have ever built was a bet on human curiosity. The abacus. The press. The vacuum tube. The neural network. This issue travels from a machine that weighed thirty tons to the artificial intelligence in your pocket — and asks the only question that matters: what are we for, now that machines can think?
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTENTS ============ */}
      <section className="print-page" data-section="contents" id="sec-contents">
        <div className="contents">
          <div className="contents__header">
            <h2 className="contents__title">Contents</h2>
            <div className="contents__meta">
              ISSUE {ISSUE.no} / {ISSUE.date}<br />
              {STORIES.length} STORIES / ONE THREAD
            </div>
          </div>

          <ul className="contents__list">
            <li className="contents__item contents__item--editorial" data-toc="editorial">
              <span className="contents__no">00</span>
              <span className="contents__item-title">Editorial — The Machine Changes. The Human Question Remains.</span>
              <span className="contents__page" data-page-for="editorial">—</span>
              <span className="contents__dek">From the editors: why ENIAC, why now, and the thread that connects 5,000 years of innovation.</span>
            </li>
            {STORIES.map((s) => (
              <li key={s.slug} className="contents__item" data-toc={s.slug}>
                <span className="contents__no">{s.no}</span>
                <span className="contents__item-title">{s.title}</span>
                <span className="contents__page" data-page-for={s.slug}>—</span>
                <span className="contents__cat">{s.cat}</span>
                <span className="contents__dek">{s.dek}</span>
              </li>
            ))}
            <li className="contents__item" data-toc="colophon">
              <span className="contents__no">—</span>
              <span className="contents__item-title">Colophon & Publication Details</span>
              <span className="contents__page" data-page-for="colophon">—</span>
              <span className="contents__cat">META</span>
              <span className="contents__dek">Typefaces, edition notes, source record and closing.</span>
            </li>
          </ul>

          <div style={{ marginTop: '10mm', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '6.5pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', borderTop: '1px solid var(--line-strong)', paddingTop: '4mm' }}>
            <span>■ ENIAC / DIGITAL MAGAZINE</span>
            <span>DOC. NO. EN-{ISSUE.no}-2026</span>
            <span>THE MACHINE AGE → THE AI AGE</span>
          </div>
        </div>
      </section>

      {/* ============ EDITORIAL ============ */}
      <section className="story-section" data-section="editorial" id="sec-editorial">
        <div className="story-opener">
          <div>
            <div className="story-opener__top">
              <span><span className="story-opener__no">SEC. 00</span> — EDITORIAL</span>
              <span>FIELD NOTE 001</span>
              <span>SYSTEM / HUMAN</span>
            </div>
            <h2 className="story-opener__title">The machine changes. The human question remains.</h2>
            <p className="story-opener__dek">Every tool we have ever built was a bet on human curiosity. From the abacus to the neural network.</p>
          </div>

          <div className="editorial__body" style={{ marginTop: '8mm' }}>
            <p className="editorial__dropcap">Every tool we have ever built was a bet on human curiosity. The abacus. The press. The vacuum tube. The neural network.</p>
            <p>This issue travels from a machine that weighed thirty tons to the artificial intelligence in your pocket — and asks the only question that matters: what are we for, now that machines can think?</p>
            <p>The ENIAC room in 1946 was a wall of black panels, cables and switches, with two figures working at the machine. It weighed 30 tons, contained 17,468 vacuum tubes, drew 150 kilowatts, and could do 5,000 additions per second. Extraordinary for its era. Primitive by ours. Yet its idea never switched off.</p>
            <p>We began with counting. We arrived at creating. Fourteen milestones, five thousand years, one direction of travel. The timeline in this issue gives the early milestones room to breathe and lets the recent ones accelerate — because that is what happened.</p>
            <p>ENIAC shipped with no manual and no programming language. Six women mathematicians — Kay McNulty, Betty Jennings, Betty Holberton, Marlyn Wescoff, Fran Bilas, Ruth Lichterman — recruited from the wartime corps of human “computers,” studied its circuits and invented the craft of programming it. For decades their work went largely uncredited. History has since corrected the record.</p>
            <p>From that giant, we follow three runways that open from a single degree: the Bachelor of Computer Applications. A degree gives you knowledge. BCA gives you the runway to build with it — career, higher studies, creator. You learn to code, build, solve, think. Logic, patience, teamwork, adaptability.</p>
            <p>In the physical world we don’t open the door to strangers. Online, we sometimes do it with one click. Cybersecurity is not just clever code; it is human emotion — fear, greed, curiosity — exploited at scale. Five golden rules close that door: stop, think, click; protect your OTP; question “free”; use two locks; update.</p>
            <p>Our parents grew up with Google. We are growing up with AI. Super-tutor, super-creator, accelerator, new careers — every superpower has a price. Dependence, comparison, deception. Are we using AI, or is AI using us? Five skills cannot be downloaded: critical thinking, creativity, communication, empathy, leadership.</p>
            <p>You think you control the game. But every reward, sound and victory is designed to keep your brain engaged. Play → Reward → Dopamine → Repeat. The loop closes itself. The game is not the enemy. Losing control is.</p>
            <p><i>The machine is the subject. Human curiosity is the story.</i></p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '6mm' }}>— THE EDITORS, ISSUE {ISSUE.no}</p>
          </div>

          <div className="story-opener__meta">
            <span><span className="sq" style={{ width: '2mm', height: '2mm', background: 'var(--accent)', display: 'inline-block', marginRight: '2mm' }} /> ENIAC / EDITORIAL</span>
            <span>END OF EDITORIAL</span>
          </div>
        </div>
      </section>

      {/* ============ STORY 01 — TIMELINE ============ */}
      <section className="story-section" data-section="timeline" id="sec-timeline">
        <div className="story-opener">
          <div>
            <div className="story-opener__top">
              <span><span className="story-opener__no">STORY 01</span> / TECHNOLOGY</span>
              <span>8 MIN</span>
              <span>DOC. EN-01</span>
            </div>
            <h2 className="story-opener__title">From Computer to Artificial Intelligence.</h2>
            <p className="story-opener__dek">A journey from counting to creating — fourteen milestones, one direction of travel.</p>
            <div style={{ marginTop: '8mm', maxWidth: '32em', fontSize: '10pt', lineHeight: '1.65' }}>
              <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>STORY 01 / THE HISTORICAL SPINE</span></p>
              <p style={{ marginTop: '3mm' }}>We began with the abacus. We arrived at artificial intelligence. For thousands of years, humans have built tools to make thinking faster, easier and more powerful. Early milestones get the room to themselves; the recent ones arrive faster, because that is what happened.</p>
            </div>
          </div>
          <div className="story-opener__meta">
            <span>STORY 01 — FROM COMPUTER TO AI</span>
            <span>5,000 YEARS IN ONE LINE</span>
          </div>
        </div>

        <div className="story-body">
          <h2 className="chapter">CH. 01 — THE JOURNEY / 5,000 YEARS</h2>

          <div style={{ marginTop: '6mm' }}>
            {MILESTONES.map((m, i) => (
              <div key={m.title} className="print-fig" style={{ borderLeft: m.sig ? '2px solid var(--accent)' : '1px solid var(--line)', paddingLeft: '6mm', marginBottom: '6mm' }}>
                <div style={{ display: 'flex', gap: '4mm', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--accent)', letterSpacing: '0.2em' }}>{m.year}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '6pt', color: 'var(--muted)', letterSpacing: '0.18em' }}>{m.era.toUpperCase()} ERA / {String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '18pt', lineHeight: '0.95', letterSpacing: '-0.02em', margin: '2mm 0' }}>{m.title}</h3>
                <p style={{ fontSize: '10pt', color: 'var(--ink-soft)', maxWidth: '32em', margin: 0 }}>{m.note}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '10mm', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)' }}>▲ NOTE THE DENSITY — ACCELERATION IS THE POINT</p>
            <p className="display" style={{ fontSize: '28pt', marginTop: '6mm' }}>COMPUTER <span style={{ color: 'var(--accent)', fontWeight: '340' }}>+</span> HUMAN</p>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '12pt', maxWidth: '24em', margin: '6mm auto 0' }}>The computer was built to <b style={{ fontStyle: 'normal', fontWeight: '600' }}>calculate</b>. AI is being built to help us <b style={{ fontStyle: 'normal', fontWeight: '600' }}>decide, create and solve</b>. The future isn’t computer versus human — it’s computer plus human.</p>
          </div>

          <h2 className="chapter" style={{ marginTop: '12mm' }}>CH. 02 — THREE LEVELS OF AI</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '8mm', alignItems: 'center', marginTop: '6mm' }}>
            <div>
              <svg viewBox="0 0 420 420" role="img" aria-label="Nested AI levels">
                <circle cx="210" cy="210" r="196" fill="none" stroke="var(--ink)" strokeWidth="1" />
                <circle cx="210" cy="210" r="132" fill="none" stroke="var(--ink)" strokeWidth="1" />
                <circle cx="210" cy="210" r="70" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <text x="210" y="46" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2" fill="var(--ink)">MACHINE LEARNING</text>
                <text x="210" y="108" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--ink)">DEEP LEARNING</text>
                <text x="210" y="206" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--accent)">GENERATIVE</text>
                <text x="210" y="222" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--accent)">AI</text>
                <text x="210" y="392" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="var(--muted)">FIG. 02 — EACH LEVEL LEARNS MORE DEEPLY</text>
              </svg>
            </div>
            <div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <li style={{ borderTop: '1px solid var(--line-strong)', padding: '4mm 0' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5pt', color: 'var(--accent)', letterSpacing: '0.2em' }}>LEVEL 01</span><br />
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: '580', fontSize: '14pt' }}>Machine Learning</span><br />
                  <span style={{ color: 'var(--muted)', fontSize: '9pt' }}>Learning from data instead of following hand-written rules.</span>
                </li>
                <li style={{ borderTop: '1px solid var(--line-strong)', padding: '4mm 0' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5pt', color: 'var(--accent)', letterSpacing: '0.2em' }}>LEVEL 02</span><br />
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: '580', fontSize: '14pt' }}>Deep Learning</span><br />
                  <span style={{ color: 'var(--muted)', fontSize: '9pt' }}>Learning through layered neural networks — pattern recognition at scale.</span>
                </li>
                <li style={{ borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)', padding: '4mm 0' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5pt', color: 'var(--accent)', letterSpacing: '0.2em' }}>LEVEL 03</span><br />
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: '580', fontSize: '14pt' }}>Generative AI</span><br />
                  <span style={{ color: 'var(--muted)', fontSize: '9pt' }}>Creating new text, images, code and audio from learned patterns.</span>
                </li>
              </ul>
              <div style={{ marginTop: '6mm' }}>
                <PunchStrip pattern="10s0110s0101s10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STORY 02 — ENIAC ============ */}
      <section className="story-section" data-section="eniac" id="sec-eniac">
        <div className="story-opener">
          <div>
            <div className="story-opener__top">
              <span><span className="story-opener__no">STORY 02</span> / ARCHIVE 1946</span>
              <span>9 MIN</span>
              <span>DOC. EN-02</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '72pt', lineHeight: '0.8', letterSpacing: '-0.04em', margin: 0 }}>ENIAC</h1>
            <div style={{ display: 'flex', gap: '6mm', marginTop: '4mm', fontFamily: 'var(--font-mono)', fontSize: '6.5pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', flexWrap: 'wrap' }}>
              <span>ELECTRONIC NUMERICAL INTEGRATOR AND COMPUTER</span>
              <span>ANNOUNCED <b style={{ color: 'var(--accent)', fontWeight: '400' }}>FEBRUARY 1946</b></span>
              <span>MOORE SCHOOL, PHILADELPHIA</span>
            </div>
            <p className="story-opener__dek">Before smartphones, laptops and AI, there was <span style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: '600' }}>a 30-ton machine that filled a room.</span></p>
          </div>
          <div className="story-opener__meta">
            <span>THE GIANT THAT STARTED THE DIGITAL AGE</span>
            <span>SCALE AS EVIDENCE</span>
          </div>
        </div>

        <div className="story-body">
          <figure className="print-fig">
            <div className="print-fig__frame">
              <img src={heroEniac} alt="ENIAC full height" />
            </div>
            <figcaption><span><b>FIG. 01</b> — THE MACHINE, FULL HEIGHT</span><span>ARCHIVE / 1946</span></figcaption>
          </figure>

          <h2 className="chapter">CH. 01 — THE NUMBERS / SCALE AS EVIDENCE</h2>
          {[
            { v: '30', unit: 'TONS', note: 'Total weight — a machine the size of a large room.' },
            { v: '17,468', unit: 'VACUUM TUBES', note: 'The glowing heart of the machine.' },
            { v: '≈1,800', unit: 'SQ. FT.', note: 'It occupied an entire hall.' },
            { v: '150', unit: 'KW', note: 'Its enormous power draw.' },
            { v: '5,000', unit: 'ADDITIONS / SEC', note: 'Extraordinary speed for its era.' },
          ].map((s, i) => (
            <div key={s.unit} style={{ borderTop: '1px solid var(--line-strong)', padding: '6mm 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4mm', alignItems: 'end', breakInside: 'avoid' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '28pt', lineHeight: '0.9', margin: 0 }}>{s.v} <span style={{ fontSize: '0.4em', color: 'var(--accent)' }}>{s.unit}</span></p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', margin: 0, paddingBottom: '2mm' }}>DATA POINT {String(i + 1).padStart(2, '0')} / 05<br />{s.note}</p>
            </div>
          ))}

          <h2 className="chapter">CH. 02 — WHY WAS IT BUILT?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8mm', alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '20pt', lineHeight: '1.05', margin: 0 }}>War needed <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>speed.</em></p>
              <div style={{ marginTop: '4mm', fontSize: '10pt', lineHeight: '1.65' }}>
                <p>During the Second World War, the U.S. Army needed thousands of complex artillery-trajectory calculations. Human computers — working by hand — were simply too slow.</p>
                <p style={{ marginTop: '3mm' }}>So engineers built a machine that could calculate electronically. It was designed for one urgent job: out-compute the war.</p>
              </div>
            </div>
            <figure className="print-fig">
              <div className="print-fig__frame">
                <img src={punchCards} alt="Punched cards" />
              </div>
              <figcaption><span><b>FIG. 02</b> — DATA MEANT PAPER</span><span>PUNCHED CARDS</span></figcaption>
            </figure>
          </div>

          <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '10mm 8mm', margin: '10mm -5mm', breakInside: 'avoid' }}>
            <h2 className="chapter" style={{ color: 'var(--muted-light)', marginTop: 0 }}>CH. 03 — THE INTERFACE</h2>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '28pt', lineHeight: '1', margin: '4mm 0' }}>NO <span style={{ color: 'var(--muted-light)', textDecoration: 'line-through', textDecorationColor: 'var(--accent)', textDecorationThickness: '2px' }}>KEYBOARD.</span></p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '28pt', lineHeight: '1', margin: '2mm 0' }}>NO <span style={{ color: 'var(--muted-light)', textDecoration: 'line-through', textDecorationColor: 'var(--accent)', textDecorationThickness: '2px' }}>MOUSE.</span></p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '28pt', lineHeight: '1', margin: '2mm 0' }}>NO <span style={{ color: 'var(--muted-light)', textDecoration: 'line-through', textDecorationColor: 'var(--accent)', textDecorationThickness: '2px' }}>SCREEN.</span></p>
            <p style={{ fontSize: '10pt', color: 'var(--muted-light)', marginTop: '6mm', maxWidth: '28em' }}>Programming meant connecting cables, switches and panels by hand. One calculation could take <b style={{ color: 'var(--paper)' }}>days to set up</b> — the program was the wiring.</p>
          </div>

          <h2 className="chapter">CH. 04 — INSIDE THE GIANT</h2>
          <div style={{ border: '1px solid var(--line-strong)', padding: '5mm', background: 'var(--paper-card)', marginTop: '4mm', breakInside: 'avoid' }}>
            <Schematic />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '6pt', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '3mm' }}>
              <span><b style={{ color: 'var(--accent)', fontWeight: '400' }}>FIG. 03</b> — ENIAC, AS A FLOW OF SIGNALS</span>
              <span>SOURCE: GENERAL ARCHITECTURE, SIMPLIFIED</span>
            </div>
          </div>

          <h2 className="chapter">CH. 05 — THE ENIAC SIX</h2>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '20pt', lineHeight: '1.1', maxWidth: '18em', marginTop: '4mm' }}>Six women turned the hardware into <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>a programmable machine.</em></p>
          <p style={{ fontSize: '10pt', maxWidth: '32em', marginTop: '4mm' }}>ENIAC shipped with no manual and no programming language. Six women mathematicians — recruited from the wartime corps of human “computers” — studied its circuits and invented the craft of programming it, wiring the first ballistics runs. For decades their work went largely uncredited. History has since corrected the record.</p>

          <figure className="print-fig" style={{ marginTop: '6mm' }}>
            <div className="print-fig__frame">
              <img src={eniacSix} alt="ENIAC six programming" />
            </div>
            <figcaption><span><b>FIG. 04</b> — PROGRAMMING MEANT WIRING</span><span>THE FIRST PROGRAMMERS</span></figcaption>
          </figure>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', borderTop: '1px solid var(--line-strong)', marginTop: '6mm' }}>
            {['Kay McNulty', 'Betty Jennings', 'Betty Holberton', 'Marlyn Wescoff', 'Fran Bilas', 'Ruth Lichterman'].map((name, i) => (
              <div key={name} style={{ borderBottom: '1px solid var(--line-strong)', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--line)' : '0', padding: '4mm 3mm' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '6pt', color: 'var(--accent)', letterSpacing: '0.2em' }}>PROGRAMMER {String(i + 1).padStart(2, '0')} / 06</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: '580', fontSize: '12pt', lineHeight: '1.05', marginTop: '1mm' }}>{name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5.5pt', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '1mm' }}>MATHEMATICIAN — ENIAC PROGRAMMING TEAM</div>
              </div>
            ))}
          </div>

          <h2 className="chapter">CH. 06 — WHAT CAME NEXT</h2>
          <p style={{ fontSize: '10pt', maxWidth: '32em', marginTop: '4mm' }}>ENIAC helped prove that large-scale electronic computing was possible. Its descendants are everything that followed:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2mm', marginTop: '4mm', fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            <span style={{ border: '1px solid var(--line-strong)', padding: '2mm 3mm' }}>STORED-PROGRAM COMPUTING</span>
            <span style={{ color: 'var(--accent)', padding: '2mm 1mm' }}>→</span>
            <span style={{ border: '1px solid var(--line-strong)', padding: '2mm 3mm' }}>MODERN COMPUTER ARCHITECTURE</span>
            <span style={{ color: 'var(--accent)', padding: '2mm 1mm' }}>→</span>
            <span style={{ border: '1px solid var(--line-strong)', padding: '2mm 3mm' }}>THE COMPUTER INDUSTRY</span>
            <span style={{ color: 'var(--accent)', padding: '2mm 1mm' }}>→</span>
            <span style={{ background: 'var(--ink)', color: 'var(--paper)', border: '1px solid var(--ink)', padding: '2mm 3mm' }}>TODAY’S DIGITAL WORLD</span>
          </div>

          <div style={{ background: 'var(--ink)', color: 'var(--paper)', textAlign: 'center', padding: '14mm 6mm', margin: '10mm -5mm 0', breakInside: 'avoid' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.3em', color: 'var(--muted-light)' }}>POWERED DOWN — OCTOBER 2, 1955</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '22pt', lineHeight: '1.1', marginTop: '4mm' }}>ENIAC was switched off.<br />Its idea <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>never was.</em></p>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '10pt', color: 'var(--muted-light)', maxWidth: '26em', margin: '6mm auto 0' }}>Every laptop, smartphone and AI system carries a piece of that revolution. <b style={{ color: 'var(--paper)', fontStyle: 'normal' }}>One machine. One room. The start of everything since.</b></p>
            <div style={{ marginTop: '6mm', display: 'flex', justifyContent: 'center' }}>
              <PunchStrip pattern="s010s110s01s0" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ STORY 03 — BCA ============ */}
      <section className="story-section" data-section="bca" id="sec-bca">
        <div className="story-opener">
          <div>
            <div className="story-opener__top">
              <span><span className="story-opener__no">STORY 03</span> / PEOPLE / EDUCATION</span>
              <span>6 MIN</span>
              <span>DOC. EN-03</span>
            </div>
            <h2 className="story-opener__title">BCA is not just a degree.</h2>
            <p className="story-opener__dek">It’s <span style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: '600' }}>a launchpad.</span></p>
            <div style={{ marginTop: '8mm', maxWidth: '32em', fontSize: '10pt', lineHeight: '1.65' }}>
              <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>STORY 03 / FLIGHT PLAN</span></p>
              <p style={{ marginTop: '3mm' }}>A degree gives you knowledge. The Bachelor of Computer Applications gives you the opportunity to build with it. You don’t just study technology — you create it.</p>
            </div>
          </div>
          <div className="story-opener__meta">
            <span>ONE DEGREE. MANY RUNWAYS.</span>
            <span>THE NEXT GENERATION</span>
          </div>
        </div>

        <div className="story-body">
          <h2 className="chapter">CH. 01 — YOU LEARN TO…</h2>
          <div style={{ marginTop: '6mm', display: 'grid', gap: '6mm' }}>
            {[
              { w: 'CODE', d: 'TURN IDEAS INTO SOFTWARE' },
              { w: 'BUILD', d: 'WEBSITES, APPS, DIGITAL PRODUCTS' },
              { w: 'SOLVE', d: 'BREAK COMPLEX PROBLEMS INTO SMALLER ONES' },
              { w: 'THINK', d: 'LOGIC AND ANALYSIS, AS A HABIT' },
            ].map((v, i) => (
              <div key={v.w} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8mm', alignItems: 'baseline', marginLeft: `${i * 8}%` }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: '640', fontSize: '28pt', lineHeight: '0.86', letterSpacing: '-0.03em' }}>{v.w}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>// {v.d}</span>
              </div>
            ))}
          </div>

          <figure className="print-fig" style={{ marginTop: '8mm' }}>
            <div className="print-fig__frame">
              <img src={bcaStudent} alt="BCA student" />
            </div>
            <figcaption><span><b>FIG. 01</b> — A BCA STUDENT, MID-FLIGHT</span><span>SUBJECT / CREATOR</span></figcaption>
          </figure>

          <h2 className="chapter">CH. 02 — ONE DEGREE. MANY RUNWAYS.</h2>
          <div style={{ borderTop: '1px solid var(--line-strong)', marginTop: '4mm' }}>
            {[
              { no: '01', name: 'THE CAREER RUNWAY', sub: 'DESTINATIONS: 07', dests: ['Software Developer', 'Web Developer', 'App Developer', 'Data Analyst', 'Cybersecurity Analyst', 'UI/UX Designer', 'Cloud Engineer'] },
              { no: '02', name: 'THE HIGHER STUDIES RUNWAY', sub: 'DESTINATIONS: 04', dests: ['MCA', 'M.Sc. IT', 'MBA / IT Management', 'MS & International Studies'] },
              { no: '03', name: 'THE CREATOR RUNWAY', sub: 'DESTINATIONS: 05', dests: ['Freelancing', 'Startups', 'Apps & Products', 'Digital Agencies', 'Entrepreneurship'] },
            ].map((r) => (
              <div key={r.no} style={{ display: 'grid', gridTemplateColumns: '12mm 50mm 1fr', gap: '4mm', padding: '5mm 0', borderBottom: '1px solid var(--line-strong)', alignItems: 'center', breakInside: 'avoid' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--accent)', letterSpacing: '0.2em' }}>RWY {r.no}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '11pt', lineHeight: '1' }}>{r.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '6pt', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '1mm' }}>{r.sub}</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2mm' }}>
                  {r.dests.map((d) => (
                    <span key={d} style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5pt', letterSpacing: '0.14em', textTransform: 'uppercase', border: '1px solid var(--line)', padding: '1.5mm 2.5mm' }}>{d}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '10pt', marginTop: '6mm', maxWidth: '32em' }}>A BCA student isn’t someone choosing one future. You are someone standing at the beginning of <b>many possible futures</b> — the degree is the tarmac.</p>

          <h2 className="chapter">CH. 03 — FIELD NOTES / WHAT THE DEGREE ALSO TEACHES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', marginTop: '4mm' }}>
            {[
              { t: 'LOGIC', d: 'How to break problems down until they can be solved.' },
              { t: 'PATIENCE', d: 'Because code rarely works perfectly the first time.' },
              { t: 'TEAMWORK', d: 'Because great software is almost never built alone.' },
              { t: 'ADAPTABILITY', d: 'Because the technology itself never stops changing.' },
            ].map((n) => (
              <div key={n.t} style={{ background: 'var(--paper)', padding: '4mm 4mm' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '11pt' }}>※ {n.t}</span><br />
                <span style={{ color: 'var(--muted)', fontSize: '9pt' }}>{n.d}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '10mm 8mm', margin: '10mm -5mm', breakInside: 'avoid' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.26em', color: 'var(--accent)' }}>THE REAL ADVANTAGE</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '18pt', lineHeight: '1.15', marginTop: '4mm', maxWidth: '22em' }}>AI. Data science. Cloud. Cybersecurity. Automation. The technology keeps changing — <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>strong fundamentals keep you ready.</em></p>
          </div>

          <div style={{ textAlign: 'center', padding: '12mm 0', breakInside: 'avoid' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '18pt', lineHeight: '1.1' }}>BCA IS NOT THE DESTINATION.</p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '18pt', lineHeight: '1.1', marginTop: '2mm' }}>IT’S YOUR <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>TAKE-OFF POINT.</em></p>
            <div style={{ margin: '8mm auto 0', maxWidth: '120mm', borderTop: '2px dashed var(--line-strong)', paddingTop: '3mm' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.2em', color: 'var(--muted)' }}>CLEAR FOR TAKE-OFF — RWY 03</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STORY 04 — CYBER ============ */}
      <section className="story-section" data-section="cyber" id="sec-cyber" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="story-opener story-opener--dark">
          <div>
            <div className="story-opener__top">
              <span><span className="story-opener__no">STORY 04</span> / CYBERSECURITY — THREAT BRIEF 001</span>
              <span>7 MIN</span>
              <span>DOC. EN-04</span>
            </div>
            <h2 className="story-opener__title" style={{ color: 'var(--paper)' }}>Your one click can cost you <span style={{ color: 'var(--accent)' }}>everything.</span></h2>
            <p className="story-opener__dek">In the physical world, we don’t open our door to strangers. Online? <span style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: '600' }}>We sometimes do it with one click.</span></p>
          </div>
          <div className="story-opener__meta">
            <span>THREAT SURFACE: HUMAN</span>
            <span>ONE CLICK. ONE MISTAKE. ONE HUGE LOSS.</span>
          </div>
        </div>

        <div className="story-body story-body--dark">
          <figure className="print-fig">
            <div className="print-fig__frame" style={{ background: 'var(--ink-soft)' }}>
              <img src={cyberHand} alt="Cyber hand" style={{ filter: 'grayscale(0.6) contrast(1.2)' }} />
            </div>
            <figcaption style={{ color: 'var(--muted-light)', borderTopColor: 'rgba(244,239,228,0.18)' }}><span><b>FIG. 01</b> — ONE MILLIMETRE FROM A DECISION</span><span>THREAT SURFACE: HUMAN</span></figcaption>
          </figure>

          <div style={{ padding: '8mm 0', textAlign: 'left' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: '660', fontSize: '28pt', lineHeight: '0.92', margin: 0 }}>ONE CLICK<span style={{ color: 'var(--accent)' }}>.</span></p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: '660', fontSize: '28pt', lineHeight: '0.92', margin: '2mm 0 0' }}>ONE MISTAKE<span style={{ color: 'var(--accent)' }}>.</span></p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: '660', fontSize: '28pt', lineHeight: '0.92', margin: '2mm 0 0' }}>ONE HUGE LOSS<span style={{ color: 'var(--accent)' }}>.</span></p>
          </div>

          <h2 className="chapter" style={{ color: 'var(--muted-light)' }}>CH. 01 — INTERCEPTED / THE BAIT CHANGES, THE GOAL DOESN’T</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3mm', marginTop: '6mm' }}>
            {[
              { id: 'INTERCEPT 01', type: 'FAKE JOB OFFER', msg: '“Earn ₹5,000 a day from home. No skills needed.”' },
              { id: 'INTERCEPT 02', type: 'PHISHING MESSAGE', msg: '“Your bank account will be blocked. Update KYC now.”' },
              { id: 'INTERCEPT 03', type: 'FAKE GIVEAWAY', msg: '“Congratulations! You’ve won an iPhone. Claim now.”' },
            ].map((m) => (
              <div key={m.id} style={{ border: '1px solid rgba(244,239,228,0.18)', padding: '4mm 3mm', background: 'rgba(244,239,228,0.03)', display: 'grid', gap: '3mm', breakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '5.5pt', letterSpacing: '0.22em', color: 'var(--accent)' }}><span>{m.id}</span><span>{m.type}</span></div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9pt', lineHeight: '1.5' }}>{m.msg}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5.5pt', letterSpacing: '0.26em', color: 'var(--muted-light)', borderTop: '1px dashed rgba(244,239,228,0.18)', paddingTop: '3mm' }}>VERDICT: <b style={{ color: 'var(--paper)', fontWeight: '400' }}>BAIT</b> / SOCIAL ENGINEERING</div>
              </div>
            ))}
          </div>

          <h2 className="chapter" style={{ color: 'var(--muted-light)', marginTop: '10mm' }}>CH. 02 — HACKERS TARGET HUMAN EMOTIONS</h2>
          <div style={{ marginTop: '6mm' }}>
            {[
              { w: 'FEAR', ex: '“Your account will be closed!”' },
              { w: 'GREED', ex: '“You’ve won a lottery!”' },
              { w: 'CURIOSITY', ex: '“Is this you in this video?”' },
            ].map((e) => (
              <div key={e.w} style={{ borderTop: '1px solid rgba(244,239,228,0.18)', padding: '5mm 0', display: 'grid', gridTemplateColumns: '1fr auto', gap: '4mm', alignItems: 'center', breakInside: 'avoid' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '620', fontSize: '24pt', lineHeight: '0.9', margin: 0 }}>{e.w}<span style={{ color: 'var(--accent)' }}>.</span></h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--muted-light)', margin: 0 }}><span style={{ color: 'var(--accent)' }}>&gt; </span>{e.ex}</p>
              </div>
            ))}
            <div style={{ borderBottom: '1px solid rgba(244,239,228,0.18)' }} />
          </div>
          <p style={{ fontSize: '10pt', color: 'var(--muted-light)', marginTop: '6mm' }}>The exploit is rarely clever code. It is <b style={{ color: 'var(--paper)' }}>you, feeling something</b> — and clicking anyway.</p>

          <h2 className="chapter" style={{ color: 'var(--muted-light)', marginTop: '10mm' }}>CH. 03 — YOUR 5 GOLDEN RULES</h2>
          <div style={{ marginTop: '6mm' }}>
            {[
              { t: 'STOP. THINK. CLICK.', d: 'Check the real website before opening any link. Urgency is a red flag, not a reason.' },
              { t: 'PROTECT YOUR OTP.', d: 'Your OTP is a digital key. No bank, no service, no friend ever needs it. Never share it.' },
              { t: 'QUESTION “FREE”.', d: 'Free downloads, cracked software and too-good offers can hide malware. If it looks free, look twice.' },
              { t: 'USE TWO LOCKS.', d: 'Enable two-factor authentication (2FA) wherever possible. One password is a door; two is a gate.' },
              { t: 'UPDATE.', d: 'Software updates are not nagging — they are patches. They close the holes attackers already know about.' },
            ].map((r, i) => (
              <div key={r.t} style={{ borderTop: '1px solid rgba(244,239,228,0.18)', padding: '5mm 0', display: 'grid', gridTemplateColumns: '12mm 1fr 1.2fr', gap: '4mm', alignItems: 'baseline', breakInside: 'avoid' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--accent)', letterSpacing: '0.2em' }}>RULE {String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '580', fontSize: '12pt', lineHeight: '1', margin: 0 }}>{r.t}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.08em', lineHeight: '1.8', color: 'var(--muted-light)', margin: 0 }}>{r.d}</p>
              </div>
            ))}
            <div style={{ borderBottom: '1px solid rgba(244,239,228,0.18)' }} />
          </div>

          <h2 className="chapter" style={{ color: 'var(--muted-light)', marginTop: '10mm' }}>CH. 04 — REMEMBER</h2>
          <div style={{ marginTop: '6mm' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '14pt', lineHeight: '1.3', margin: '0 0 3mm' }}>Passwords can be changed.</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '14pt', lineHeight: '1.3', margin: '0 0 3mm' }}>Money can sometimes be recovered.</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '14pt', lineHeight: '1.3', margin: 0 }}>But <span style={{ background: 'var(--accent)', color: 'var(--accent)', padding: '0 1mm' }}>privacy</span> may never be restored.</p>
          </div>

          <div style={{ borderTop: '1px solid rgba(244,239,228,0.18)', marginTop: '12mm', padding: '12mm 0', textAlign: 'center', breakInside: 'avoid' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.2em', color: 'var(--muted-light)' }}>BE SMART. NOT JUST DIGITAL.</p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: '660', fontSize: '32pt', lineHeight: '0.92', marginTop: '6mm' }}>STOP<span style={{ color: 'var(--accent)' }}>.</span><br />THINK<span style={{ color: 'var(--accent)' }}>.</span><br />CLICK<span style={{ color: 'var(--accent)' }}>.</span></p>
          </div>
        </div>
      </section>

      {/* ============ STORY 05 — AI ============ */}
      <section className="story-section" data-section="ai" id="sec-ai">
        <div className="story-opener">
          <div>
            <div className="story-opener__top">
              <span><span className="story-opener__no">STORY 05</span> / AI / GENERATION</span>
              <span>7 MIN</span>
              <span>DOC. EN-05</span>
            </div>
            <h2 className="story-opener__title">Young generation <em>&</em> AI.</h2>
            <p className="story-opener__dek">Boon, bane or both? <span style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: '600' }}>Our parents grew up with Google. We are growing up with AI.</span></p>
            <div style={{ marginTop: '8mm', maxWidth: '32em', fontSize: '10pt', lineHeight: '1.65' }}>
              <p><span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>STORY 05 / SYSTEM & HUMAN</span></p>
              <p style={{ marginTop: '3mm' }}>We don’t just search anymore — we ask. And AI answers. This is the first generation that has grown up with a machine that talks back. The question is what that does to us.</p>
            </div>
          </div>
          <div className="story-opener__meta">
            <span>BOON, BANE OR BOTH?</span>
            <span>THE GENERATION QUESTION</span>
          </div>
        </div>

        <div className="story-body">
          <figure className="print-fig">
            <div className="print-fig__frame">
              <img src={aiYoung} alt="AI young" />
            </div>
            <figcaption><span><b>FIG. 01</b> — THE GENERATION THAT ASKS</span><span>SUBJECT / HUMAN</span></figcaption>
          </figure>

          <h2 className="chapter">CH. 01 — AI = A NEW SUPERPOWER</h2>
          <div style={{ borderTop: '1px solid var(--line-strong)', marginTop: '4mm' }}>
            {[
              { t: 'SUPER-TUTOR', d: 'Learn concepts, ask questions and study at your own pace — a patient teacher that never sleeps.' },
              { t: 'SUPER-CREATOR', d: 'Write. Design. Code. Create. Present. AI drafts, you direct.' },
              { t: 'SUPER-ACCELERATOR', d: 'Turn an idea into a first draft in minutes instead of days.' },
              { t: 'NEW CAREERS', d: 'Whole new roles, industries and opportunities are being created around it.' },
            ].map((p, i) => (
              <div key={p.t} style={{ borderBottom: '1px solid var(--line-strong)', padding: '5mm 0', display: 'grid', gridTemplateColumns: '50mm 1fr', gap: '6mm', alignItems: 'baseline', breakInside: 'avoid', paddingLeft: i % 2 === 1 ? '8mm' : '0' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '620', fontSize: '13pt', lineHeight: '1', margin: 0 }}><span style={{ color: 'var(--accent)', fontWeight: '400' }}>+</span> {p.t}</h3>
                <p style={{ fontSize: '9pt', color: 'var(--muted)', margin: 0, maxWidth: '32em' }}>{p.d}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '10mm 8mm', margin: '10mm -5mm', breakInside: 'avoid' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.26em', color: 'var(--accent)' }}>BUT EVERY SUPERPOWER HAS A PRICE</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '18pt', lineHeight: '1.15', marginTop: '4mm', maxWidth: '22em' }}>The biggest risk? <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Stopping ourselves from thinking.</em></p>
            <p style={{ fontSize: '10pt', color: 'var(--muted-light)', marginTop: '4mm', maxWidth: '28em' }}>If AI does every assignment, writes every line of code and answers every question — what happens to our own ability to think?</p>
          </div>

          <h2 className="chapter">CH. 02 — BOON / BANE, SIDE BY SIDE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '1px solid var(--line-strong)', marginTop: '4mm' }}>
            <div style={{ padding: '6mm', borderRight: '1px solid var(--line-strong)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5pt', letterSpacing: '0.26em', color: 'var(--accent)' }}>BOON — AI AS SUPERPOWER</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '13pt', lineHeight: '1', margin: '3mm 0' }}>Use it. Don’t depend on it.</h3>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {[
                  { b: 'Ask AI to explain.', s: 'Then understand it yourself. Understanding is yours or it isn’t.' },
                  { b: 'Ask AI for ideas.', s: 'Then create your own. The draft is a starting line, not the finish.' },
                  { b: 'Let AI accelerate you.', s: 'Don’t let it replace your ability to think. Speed without thought is just faster mistakes.' },
                ].map((x, i) => (
                  <li key={x.b} style={{ borderTop: '1px solid var(--line)', padding: '3mm 0', fontSize: '9pt' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '6pt', color: 'var(--accent)', marginRight: '2mm' }}>0{i + 1}</span><b>{x.b}</b><br />
                    <span style={{ color: 'var(--muted)', fontSize: '8.5pt' }}>{x.s}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ padding: '6mm', background: 'var(--ink)', color: 'var(--paper)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5pt', letterSpacing: '0.26em', color: 'var(--accent)' }}>BANE — AI AS DEPENDENCY</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '13pt', lineHeight: '1', margin: '3mm 0' }}>Three digital dangers.</h3>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {[
                  { b: 'DEPENDENCE', s: 'Using AI to avoid learning — outsourcing the thinking that builds you.' },
                  { b: 'COMPARISON', s: 'AI-generated perfection can distort how we see ourselves and our lives.' },
                  { b: 'DECEPTION', s: 'Deepfakes, voice cloning and AI-powered scams are getting harder to detect.' },
                ].map((x, i) => (
                  <li key={x.b} style={{ borderTop: '1px solid rgba(244,239,228,0.18)', padding: '3mm 0', fontSize: '9pt' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '6pt', color: 'var(--accent)', marginRight: '2mm' }}>0{i + 1}</span><b>{x.b}</b><br />
                    <span style={{ color: 'var(--muted-light)', fontSize: '8.5pt' }}>{x.s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '12mm 0', breakInside: 'avoid' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: '640', fontSize: '20pt', lineHeight: '1', margin: 0 }}>ARE WE USING AI —<br /><span style={{ fontWeight: '340', fontStyle: 'italic', color: 'var(--muted)' }}>or is AI using us?</span></p>
          </div>

          <h2 className="chapter">CH. 03 — KEEP YOUR HUMAN EDGE</h2>
          <p style={{ fontSize: '10pt', marginTop: '4mm' }}>Five skills technology cannot simply download:</p>
          <ul style={{ listStyle: 'none', margin: '4mm 0 0', padding: 0, borderTop: '1px solid var(--line-strong)' }}>
            {['CRITICAL THINKING', 'CREATIVITY', 'COMMUNICATION', 'EMPATHY', 'LEADERSHIP'].map((w) => (
              <li key={w} style={{ borderBottom: '1px solid var(--line-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '4mm 0', breakInside: 'avoid' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '16pt', lineHeight: '1' }}>{w}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5pt', letterSpacing: '0.2em', color: 'var(--accent)' }}>CANNOT BE DOWNLOADED ⏚</span>
              </li>
            ))}
          </ul>

          <div style={{ textAlign: 'center', padding: '12mm 0', breakInside: 'avoid' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '16pt', lineHeight: '1.15', maxWidth: '18em', margin: '0 auto' }}>The future belongs to people who know how to <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>work with AI.</em></p>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '12pt', marginTop: '4mm' }}>Not people who blindly work <b style={{ fontStyle: 'normal', fontWeight: '600' }}>for</b> it.</p>
          </div>
        </div>
      </section>

      {/* ============ STORY 06 — GAMES ============ */}
      <section className="story-section" data-section="games" id="sec-games">
        <div className="story-opener">
          <div>
            <div className="story-opener__top">
              <span><span className="story-opener__no">STORY 06</span> / HUMAN × MACHINE — ATTENTION STUDY</span>
              <span>7 MIN</span>
              <span>DOC. EN-06</span>
            </div>
            <h2 className="story-opener__title">Who is controlling whom?</h2>
            <p className="story-opener__dek">You think <span style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: '600' }}>you control the game.</span> But every reward, sound, level and victory is designed to keep your brain engaged.</p>
          </div>
          <div className="story-opener__meta">
            <span>THE DOPAMINE LOOP</span>
            <span>PLAY → REWARD → READ</span>
          </div>
        </div>

        <div className="story-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8mm', alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: '4mm', justifyItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4mm' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '660', fontSize: '28pt', lineHeight: '0.9', margin: 0 }}>BRAIN</h2>
                <div style={{ width: '40mm' }}><DuelSvg /></div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '660', fontSize: '28pt', lineHeight: '0.9', margin: 0 }}>GAME</h2>
              </div>
            </div>
            <figure className="print-fig">
              <div className="print-fig__frame">
                <img src={gamingCrt} alt="Gaming CRT" />
              </div>
              <figcaption><span><b>FIG. 01</b> — THE ROOM AFTER MIDNIGHT</span><span>SESSION STILL RUNNING</span></figcaption>
            </figure>
          </div>

          <h2 className="chapter">CH. 01 — THE DOPAMINE LOOP</h2>
          <div style={{ border: '1px solid var(--line-strong)', background: 'var(--paper-card)', padding: '5mm', marginTop: '4mm', breakInside: 'avoid' }}>
            <LoopSvg />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '6pt', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '3mm', borderTop: '1px solid var(--line)', paddingTop: '3mm' }}>
              <span><b style={{ color: 'var(--accent)', fontWeight: '400' }}>PLAY → REWARD → DOPAMINE → REPEAT</b></span>
              <span>YOUR BRAIN REMEMBERS THE WIN — AND ASKS FOR MORE</span>
            </div>
          </div>

          <div style={{ marginTop: '6mm', borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)', padding: '3mm 0', overflow: 'hidden', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)', fontSize: '8pt', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span>PLAY</span><span style={{ color: 'var(--accent)', margin: '0 4mm' }}>■</span>
            <span>REWARD</span><span style={{ color: 'var(--accent)', margin: '0 4mm' }}>■</span>
            <span>DOPAMINE</span><span style={{ color: 'var(--accent)', margin: '0 4mm' }}>■</span>
            <span>REPEAT</span><span style={{ color: 'var(--accent)', margin: '0 4mm' }}>■</span>
            <span>PLAY</span><span style={{ color: 'var(--accent)', margin: '0 4mm' }}>■</span>
            <span>REWARD</span><span style={{ color: 'var(--accent)', margin: '0 4mm' }}>■</span>
            <span>DOPAMINE</span><span style={{ color: 'var(--accent)', margin: '0 4mm' }}>■</span>
            <span>REPEAT</span>
          </div>

          <h2 className="chapter">CH. 02 — THE SAME CONTROLLER, TWO DIRECTIONS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '1px solid var(--line-strong)', marginTop: '4mm' }}>
            <div style={{ padding: '6mm', borderRight: '1px solid var(--line-strong)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5pt', letterSpacing: '0.26em', color: 'var(--accent)' }}>THE GOOD — GAMES ARE NOT AUTOMATICALLY BAD</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '12pt', margin: '3mm 0' }}>What the right games build</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {[
                  { b: 'FASTER REACTIONS', s: 'Quick decisions under pressure.' },
                  { b: 'PROBLEM SOLVING', s: 'Strategy, logic and planning under constraints.' },
                  { b: 'TEAMWORK', s: 'Communication and coordination toward a shared goal.' },
                  { b: 'CREATIVITY', s: 'Building, designing and experimenting inside worlds.' },
                ].map((g) => (
                  <li key={g.b} style={{ borderTop: '1px solid var(--line)', padding: '3mm 0', fontSize: '9pt' }}>
                    <b style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.14em', display: 'block' }}><span style={{ color: 'var(--accent)' }}>+ </span>{g.b}</b>
                    <span style={{ color: 'var(--muted)' }}>{g.s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: '6mm', background: 'var(--ink)', color: 'var(--paper)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5pt', letterSpacing: '0.26em', color: 'var(--accent)' }}>THE DARK SIDE — WHEN GAMING TAKES CONTROL</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '12pt', margin: '3mm 0' }}>What excess takes</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {[
                  { b: 'ATTENTION PROBLEMS', s: 'Constant stimulation can make slower activities feel harder to tolerate.' },
                  { b: 'MOOD & ANGER', s: 'Excessive or highly competitive play can wear down emotional control.' },
                  { b: 'SLEEP LOSS', s: 'Late-night screen time quietly dismantles healthy sleep.' },
                ].map((d) => (
                  <li key={d.b} style={{ borderTop: '1px solid rgba(244,239,228,0.18)', padding: '3mm 0', fontSize: '9pt' }}>
                    <b style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.14em', display: 'block' }}><span style={{ color: 'var(--accent)' }}>− </span>{d.b}</b>
                    <span style={{ color: 'var(--muted-light)' }}>{d.s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="chapter">CH. 03 — THE GAMER’S GOLDEN RULES</h2>
          <div style={{ marginTop: '4mm' }}>
            <div style={{ borderTop: '1px solid var(--line-strong)', padding: '5mm 0', display: 'grid', gridTemplateColumns: '12mm 1fr 1.2fr', gap: '4mm', alignItems: 'baseline', breakInside: 'avoid' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--accent)', letterSpacing: '0.2em' }}>RULE 01</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '580', fontSize: '12pt', lineHeight: '1', margin: 0 }}>THE 60–10 RULE</h3>
              <div>
                <div style={{ display: 'flex', gap: '1mm', marginBottom: '2mm' }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <i key={i} style={{ height: '3mm', flex: 1, background: 'var(--ink)', display: 'block' }} />
                  ))}
                  {Array.from({ length: 2 }).map((_, i) => (
                    <i key={`r${i}`} style={{ height: '3mm', flex: 1, background: 'var(--accent)', display: 'block' }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '5.5pt', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  <span>0 MIN</span><span>60 MIN PLAY</span><span>+10 MIN REST</span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', marginTop: '3mm', color: 'var(--muted)' }}>Play for about an hour, then give your brain a real ten-minute break.</p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--line-strong)', padding: '5mm 0', display: 'grid', gridTemplateColumns: '12mm 1fr 1.2fr', gap: '4mm', alignItems: 'baseline', breakInside: 'avoid' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--accent)', letterSpacing: '0.2em' }}>RULE 02</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '580', fontSize: '12pt', lineHeight: '1', margin: 0 }}>NO GAMES BEFORE BED</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--muted)', margin: 0 }}>Give your brain time to wind down. Sleep is where the day gets saved.</p>
            </div>
            <div style={{ borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)', padding: '5mm 0', display: 'grid', gridTemplateColumns: '12mm 1fr 1.2fr', gap: '4mm', alignItems: 'baseline', breakInside: 'avoid' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--accent)', letterSpacing: '0.2em' }}>RULE 03</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '580', fontSize: '12pt', lineHeight: '1', margin: 0 }}>CHOOSE YOUR GAMES</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', color: 'var(--muted)', margin: 0 }}>Strategy, puzzle and creative games challenge your brain differently from purely repetitive play. Pick like a curator, not a slot machine.</p>
            </div>
          </div>

          <div style={{ background: 'var(--ink)', color: 'var(--paper)', textAlign: 'center', padding: '14mm 6mm', margin: '10mm -5mm 0', breakInside: 'avoid' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '18pt', lineHeight: '1.1', margin: 0 }}>THE GAME IS NOT THE ENEMY.</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '18pt', lineHeight: '1.1', margin: '2mm 0 0' }}><em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>LOSING CONTROL</em> IS.</p>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '11pt', margin: '8mm auto 0', color: 'var(--muted-light)', maxWidth: '24em' }}>Ask yourself: <b style={{ color: 'var(--paper)', fontStyle: 'normal' }}>am I playing the game</b> — or is the game playing me?</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5pt', letterSpacing: '0.2em', color: 'var(--muted-light)', marginTop: '6mm' }}>YOUR BRAIN IS THE MOST POWERFUL GAMING SYSTEM YOU OWN. PROTECT IT.</p>
          </div>
        </div>
      </section>

      {/* ============ COLOPHON ============ */}
      <section className="print-page" data-section="colophon" id="sec-colophon">
        <div className="colophon">
          <div>
            <PunchStrip pattern="0100s10100101s01011s010010" />
            <h2 className="colophon__title" style={{ marginTop: '8mm' }}>Colophon<span style={{ color: 'var(--accent)' }}>.</span></h2>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '12pt', color: 'var(--muted)', marginTop: '3mm' }}>Technology. People. Ideas.</p>

            <div className="colophon__grid">
              <div>
                <div className="colophon__mono">
                  <div>PUBLICATION</div>
                  <div><b>ENIAC — TECHNOLOGY. PEOPLE. IDEAS.</b></div>
                  <div style={{ marginTop: '3mm' }}>ISSUE {ISSUE.no} / VOL. {ISSUE.vol}</div>
                  <div>{ISSUE.date}</div>
                  <div>{ISSUE.name}</div>
                  <div>DOC. NO. EN-{ISSUE.no}-2026</div>
                  <div style={{ marginTop: '3mm' }}>A4 PORTRAIT / 210 × 297 MM</div>
                  <div>DIGITAL EDITION → PRINT EDITION</div>
                </div>

                <div className="colophon__mono" style={{ marginTop: '8mm', borderTop: '1px solid var(--line)', paddingTop: '4mm' }}>
                  <div>TYPEFACES</div>
                  <div><b>FRAUNCES VARIABLE</b> — EXPRESSIVE DISPLAY, EDITORIAL HEADLINES. DESIGNED BY UNDERWARE, PHAEDRA CHARLES & FLAVIA ZIMBELLI. VARIABLE OPsz, WONK, SOFT.</div>
                  <div style={{ marginTop: '2mm' }}><b>ARCHIVO VARIABLE</b> — BODY COPY, SUPPORTING TEXT. DESIGNED BY OMNITYPE. HIGHLY LEGIBLE GROTESK WITH VARIABLE WEIGHT.</div>
                  <div style={{ marginTop: '2mm' }}><b>IBM PLEX MONO</b> — METADATA, FIGURE LABELS, TECHNICAL ANNOTATIONS. DESIGNED BY MIKE ABBINK, IBM. MONOSPACED TECHNICAL.</div>
                </div>
              </div>

              <div>
                <div className="colophon__mono">
                  <div>CONTENT</div>
                  <div><b>7 SECTIONS</b> — COVER, PUBLICATION INFO, CONTENTS, EDITORIAL, 6 STORIES, COLOPHON.</div>
                  <div style={{ marginTop: '2mm' }}><b>STORY 01</b> — FROM COMPUTER TO AI / 14 MILESTONES / 5,000 YEARS</div>
                  <div><b>STORY 02</b> — ENIAC AND THE HISTORY OF THE EARLY COMPUTER</div>
                  <div><b>STORY 03</b> — BCA AND COMPUTING EDUCATION</div>
                  <div><b>STORY 04</b> — CYBERSECURITY</div>
                  <div><b>STORY 05</b> — YOUNG GENERATION AND AI</div>
                  <div><b>STORY 06</b> — HUMAN BRAIN AND COMPUTER GAMES</div>
                </div>

                <div className="colophon__mono" style={{ marginTop: '8mm', borderTop: '1px solid var(--line)', paddingTop: '4mm' }}>
                  <div>PRODUCTION</div>
                  <div><b>RENDERING ENGINE</b> — CHROMIUM VIA PLAYWRIGHT</div>
                  <div><b>LAYOUT</b> — DEDICATED PRINT STYLESHEET, CSS PAGED MEDIA, INTENTIONAL PAGE BREAKS</div>
                  <div><b>IMAGES</b> — HIGHEST-QUALITY EXISTING ASSETS, PRESERVED ASPECT RATIOS, NO UPSCALING</div>
                  <div><b>DIAGRAMS</b> — INLINE SVG PRESERVED AS VECTOR</div>
                  <div><b>TEXT</b> — SELECTABLE, SEARCHABLE, UNICODE-CORRECT</div>
                  <div><b>FONTS</b> — SUBSET-EMBEDDED WHERE SUPPORTED, VERIFIED VIA PDF FONT TABLE</div>
                  <div style={{ marginTop: '2mm' }}><b>EXPORT COMMAND</b> — NPM RUN EXPORT:PDF</div>
                </div>

                <div className="colophon__mono" style={{ marginTop: '8mm', borderTop: '1px solid var(--line)', paddingTop: '4mm' }}>
                  <div>SOURCE</div>
                  <div style={{ wordBreak: 'break-all' }}><b>GITHUB.COM/MAYANKKASHYAP05/ENIAC</b></div>
                  <div style={{ marginTop: '2mm' }}>REPOSITORY CONTAINS WEB EDITION SOURCE, ASSETS, AND PRINT EXPORT WORKFLOW.</div>
                  <div style={{ marginTop: '2mm' }}>THIS PDF WAS GENERATED FROM LOCAL PROJECT ASSETS AND FONTS — NO EXTERNAL FONT OR IMAGE SERVERS REQUIRED DURING EXPORT.</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '10mm', borderTop: '1px solid var(--line-strong)', paddingTop: '6mm', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6mm', fontSize: '9pt', lineHeight: '1.6' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '16pt', lineHeight: '1.1', margin: 0 }}>We built machines to think <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>faster.</em></p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: '340', fontStyle: 'italic', fontSize: '16pt', lineHeight: '1.1', marginTop: '2mm' }}>Now we must learn how to think <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>better.</em></p>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7pt', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', lineHeight: '2' }}>
                <div>THE MACHINE CHANGES.</div>
                <div>THE HUMAN QUESTION REMAINS.</div>
                <div style={{ marginTop: '3mm', color: 'var(--accent)' }}>■ ENIAC / END OF ISSUE {ISSUE.no}</div>
                <div style={{ marginTop: '3mm' }}>PRINT EDITION GENERATED {new Date().toISOString().slice(0, 10)}</div>
              </div>
            </div>
          </div>

          <div className="colophon__bottom">
            <span><span style={{ display: 'inline-block', width: '2mm', height: '2mm', background: 'var(--accent)', marginRight: '2mm' }} /> ENIAC / DIGITAL MAGAZINE</span>
            <span>THE MACHINE AGE → THE AI AGE</span>
            <span>END OF ISSUE {ISSUE.no} ⏚</span>
          </div>
        </div>
      </section>

      {/* Folio — fixed, appears on each page via print CSS */}
      <div className="print-folio" id="print-folio" aria-hidden="true">
        <span>ENIAC / ISSUE {ISSUE.no}</span>
        <span><span className="folio-accent">■</span> DOC. EN-{ISSUE.no}-2026</span>
        <span>PAGE <span id="folio-current">—</span> / <span id="folio-total">—</span></span>
      </div>

    </div>
  )
}
