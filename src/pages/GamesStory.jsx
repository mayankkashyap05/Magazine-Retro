import StoryShell from '../components/StoryShell.jsx'
import { storyBySlug } from '../data/magazine.js'
import { Reveal, Eyebrow, Fig, Ticker } from '../components/primitives.jsx'

import gamingCrt from '../assets/img/gaming-crt.jpg'

const GOOD = [
  { b: 'FASTER REACTIONS', s: 'Quick decisions under pressure.' },
  { b: 'PROBLEM SOLVING', s: 'Strategy, logic and planning under constraints.' },
  { b: 'TEAMWORK', s: 'Communication and coordination toward a shared goal.' },
  { b: 'CREATIVITY', s: 'Building, designing and experimenting inside worlds.' },
]

const DARK = [
  { b: 'ATTENTION PROBLEMS', s: 'Constant stimulation can make slower activities feel harder to tolerate.' },
  { b: 'MOOD & ANGER', s: 'Excessive or highly competitive play can wear down emotional control.' },
  { b: 'SLEEP LOSS', s: 'Late-night screen time quietly dismantles healthy sleep.' },
]

function DuelSvg() {
  return (
    <svg viewBox="0 0 260 120" role="img" aria-label="Two arrows in opposite directions between the words brain and game — who controls whom.">
      <g stroke="var(--ink)" strokeWidth="1.4">
        <line x1="10" y1="44" x2="238" y2="44" />
        <path d="M 238 44 l -10 -5 v 10 Z" fill="var(--ink)" stroke="none" />
      </g>
      <g stroke="var(--accent)" strokeWidth="1.4">
        <line x1="250" y1="76" x2="22" y2="76" />
        <path d="M 22 76 l 10 -5 v 10 Z" fill="var(--accent)" stroke="none" />
      </g>
      <text x="130" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2.4" fill="var(--muted)">
        PLAYER → CONTROLS → GAME?
      </text>
      <text x="130" y="100" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2.4" fill="var(--accent)">
        GAME → DESIGN → BRAIN?
      </text>
    </svg>
  )
}

function LoopSvg() {
  const node = (x, label, hot = false) => (
    <g key={label}>
      <rect
        x={x}
        y={40}
        width={150}
        height={56}
        fill={hot ? 'var(--ink)' : 'none'}
        stroke="var(--ink)"
        strokeWidth="1"
      />
      <text
        x={x + 75}
        y={74}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="13"
        letterSpacing="3"
        fill={hot ? 'var(--paper)' : 'var(--ink)'}
      >
        {label}
      </text>
    </g>
  )
  const arrow = (x1, x2, y = 68) => (
    <g key={`${x1}${x2}`} stroke="var(--ink)" strokeWidth="1.4">
      <line x1={x1} y1={y} x2={x2 - 8} y2={y} />
      <path d={`M ${x2 - 8} ${y - 4} L ${x2} ${y} L ${x2 - 8} ${y + 4} Z`} fill="var(--ink)" stroke="none" />
    </g>
  )
  return (
    <svg
      viewBox="0 0 900 210"
      role="img"
      aria-label="The dopamine loop: play leads to reward, reward releases dopamine, dopamine drives repeat — and repeat returns to play."
    >
      {node(20, 'PLAY')}
      {arrow(175, 235)}
      {node(240, 'REWARD')}
      {arrow(395, 455)}
      {node(460, 'DOPAMINE', true)}
      {arrow(615, 675)}
      {node(680, 'REPEAT')}
      {/* return loop */}
      <path
        d="M 755 96 v 40 H 95 v -40"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.4"
        strokeDasharray="5 5"
      />
      <path d="M 95 136 l -5 10 h 10 Z" fill="var(--accent)" />
      <text x="450" y="168" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2.4" fill="var(--accent)">
        THE LOOP CLOSES ITSELF
      </text>
      <text x="450" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2.4" fill="var(--muted)">
        FIG. 02 — THE DOPAMINE LOOP, SIMPLIFIED
      </text>
    </svg>
  )
}

export default function GamesStory() {
  const story = storyBySlug('games')

  return (
    <StoryShell story={story}>
      {/* -------- opening -------- */}
      <header className="page art-head">
        <div className="art-head__kicker">
          <Eyebrow>HUMAN × MACHINE — ATTENTION STUDY</Eyebrow>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(2.6rem, 7.8vw, 7.2rem)', maxWidth: '12em' }}>
          Who is controlling whom?
        </h1>
        <p className="dek">
          You think <span className="accent">you control the game.</span> But every reward,
          sound, level and victory is designed to keep your brain engaged.
        </p>
      </header>

      <div className="page">
        <div className="duo">
          <Reveal>
            <div className="duel">
              <h2 className="w" aria-label="Brain">
                BRAIN
              </h2>
              <DuelSvg />
              <h2 className="w" aria-label="Game">
                GAME
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Fig
              src={gamingCrt}
              alt="A CRT monitor glowing in a dark, empty room at night, its light falling on an empty chair."
              fig="FIG. 01 — THE ROOM AFTER MIDNIGHT"
              note="SESSION STILL RUNNING"
              eager
            />
          </Reveal>
        </div>
      </div>

      {/* -------- dopamine loop -------- */}
      <section className="page chapter-band" aria-label="The dopamine loop">
        <h2 className="chapter">CH. 01 — THE DOPAMINE LOOP</h2>
        <Reveal as="figure" className="loop-fig" style={{ marginTop: 'clamp(2rem,4vw,3rem)', overflowX: 'auto' }}>
          <div style={{ minWidth: 680 }}>
            <LoopSvg />
          </div>
          <figcaption>
            <span>
              <b>PLAY → REWARD → DOPAMINE → REPEAT</b>
            </span>
            <span>YOUR BRAIN REMEMBERS THE WIN — AND ASKS FOR MORE</span>
          </figcaption>
        </Reveal>
      </section>

      <section aria-label="The loop as ticker" style={{ marginTop: 'var(--sp-5)' }}>
        <Ticker label="Play, reward, dopamine, repeat" items={['PLAY', 'REWARD', 'DOPAMINE', 'REPEAT']} />
      </section>

      {/* -------- good vs dark -------- */}
      <section className="page chapter-band" aria-label="The good and the dark side">
        <h2 className="chapter">CH. 02 — THE SAME CONTROLLER, TWO DIRECTIONS</h2>
        <div className="duality" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          <Reveal className="side good">
            <span className="tag">THE GOOD — GAMES ARE NOT AUTOMATICALLY BAD</span>
            <h3>What the right games build</h3>
            <ul>
              {GOOD.map((g) => (
                <li key={g.b}>
                  <b>{g.b}</b>
                  <span>{g.s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="side dark" delay={100}>
            <span className="tag">THE DARK SIDE — WHEN GAMING TAKES CONTROL</span>
            <h3>What excess takes</h3>
            <ul>
              {DARK.map((d) => (
                <li key={d.b}>
                  <b>{d.b}</b>
                  <span>{d.s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* -------- golden rules -------- */}
      <section className="page chapter-band" aria-label="The gamer's golden rules" style={{ paddingBottom: 'var(--sp-5)' }}>
        <h2 className="chapter">CH. 03 — THE GAMER’S GOLDEN RULES</h2>
        <div className="crules" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          <Reveal className="crule">
            <span className="no">RULE 01</span>
            <h3 className="t">THE 60–10 RULE</h3>
            <div>
              <div className="sessionbar" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                  <i key={i} />
                ))}
                {Array.from({ length: 2 }).map((_, i) => (
                  <i key={`r${i}`} className="rest" />
                ))}
              </div>
              <div className="sessionbar-lab" aria-hidden="true">
                <span>0 MIN</span>
                <span>60 MIN PLAY</span>
                <span>+10 MIN REST</span>
              </div>
              <p className="d" style={{ marginTop: '1rem' }}>
                Play for about an hour, then give your brain a real ten-minute break.
              </p>
            </div>
          </Reveal>
          <Reveal className="crule" delay={60}>
            <span className="no">RULE 02</span>
            <h3 className="t">NO GAMES BEFORE BED</h3>
            <p className="d">Give your brain time to wind down. Sleep is where the day gets saved.</p>
          </Reveal>
          <Reveal className="crule" delay={120}>
            <span className="no">RULE 03</span>
            <h3 className="t">CHOOSE YOUR GAMES</h3>
            <p className="d">
              Strategy, puzzle and creative games challenge your brain differently from purely
              repetitive play. Pick like a curator, not a slot machine.
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------- finale -------- */}
      <section className="ink-section" aria-label="The real enemy" style={{ padding: 'var(--sp-7) 0', textAlign: 'center' }}>
        <div className="page">
          <Reveal>
            <p className="display" style={{ fontSize: 'clamp(2.1rem, 5.8vw, 5.2rem)' }}>
              THE GAME IS NOT THE ENEMY.
            </p>
            <p className="display" style={{ fontSize: 'clamp(2.1rem, 5.8vw, 5.2rem)', marginTop: '0.3em' }}>
              <em style={{ color: 'var(--accent)' }}>LOSING CONTROL</em> IS.
            </p>
            <p className="ask" style={{ margin: '2.6rem auto 0', color: 'var(--muted-light)' }}>
              Ask yourself: <b style={{ color: 'var(--paper)' }}>am I playing the game</b> —
              or is the game playing me?
            </p>
            <p className="mono" style={{ marginTop: '2.2rem', color: 'var(--muted-light)' }}>
              YOUR BRAIN IS THE MOST POWERFUL GAMING SYSTEM YOU OWN. PROTECT IT.
            </p>
          </Reveal>
        </div>
      </section>
    </StoryShell>
  )
}
