import StoryShell from '../components/StoryShell.jsx'
import { storyBySlug } from '../data/magazine.js'
import { Reveal, Eyebrow, Fig } from '../components/primitives.jsx'

import aiYoung from '../assets/img/ai-young.jpg'

const POWERS = [
  { t: 'SUPER-TUTOR', d: 'Learn concepts, ask questions and study at your own pace — a patient teacher that never sleeps.' },
  { t: 'SUPER-CREATOR', d: 'Write. Design. Code. Create. Present. AI drafts, you direct.' },
  { t: 'SUPER-ACCELERATOR', d: 'Turn an idea into a first draft in minutes instead of days.' },
  { t: 'NEW CAREERS', d: 'Whole new roles, industries and opportunities are being created around it.' },
]

const BOON = [
  { b: 'Ask AI to explain.', s: 'Then understand it yourself. Understanding is yours or it isn’t.' },
  { b: 'Ask AI for ideas.', s: 'Then create your own. The draft is a starting line, not the finish.' },
  { b: 'Let AI accelerate you.', s: 'Don’t let it replace your ability to think. Speed without thought is just faster mistakes.' },
]

const BANE = [
  { b: 'DEPENDENCE', s: 'Using AI to avoid learning — outsourcing the thinking that builds you.' },
  { b: 'COMPARISON', s: 'AI-generated perfection can distort how we see ourselves and our lives.' },
  { b: 'DECEPTION', s: 'Deepfakes, voice cloning and AI-powered scams are getting harder to detect.' },
]

const EDGE = ['CRITICAL THINKING', 'CREATIVITY', 'COMMUNICATION', 'EMPATHY', 'LEADERSHIP']

export default function AiStory() {
  const story = storyBySlug('ai')

  return (
    <StoryShell story={story}>
      {/* -------- opening -------- */}
      <header className="page art-head">
        <div className="art-head__kicker">
          <Eyebrow>AI — THE GENERATION QUESTION</Eyebrow>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(2.6rem, 7.6vw, 7rem)', maxWidth: '12em' }}>
          Young generation <em>&amp;</em> AI.
        </h1>
        <p className="dek">
          Boon, bane or both? <span className="accent">Our parents grew up with Google. We are
          growing up with AI.</span>
        </p>
        <div className="art-intro">
          <p>
            <span className="mono mono-tag">STORY 05 / SYSTEM &amp; HUMAN</span>
          </p>
          <p>
            We don’t just search anymore — we ask. And AI answers. This is the first
            generation that has grown up with a machine that talks back. The question is what
            that does to us.
          </p>
        </div>
        <Reveal>
          <Fig
            src={aiYoung}
            alt="A thoughtful young person resting their chin on their hand beside an open laptop in a dim study room."
            fig="FIG. 01 — THE GENERATION THAT ASKS"
            note="SUBJECT / HUMAN"
          />
        </Reveal>
      </header>

      {/* -------- superpower -------- */}
      <section className="page chapter-band" aria-label="AI as a new superpower">
        <h2 className="chapter">CH. 01 — AI = A NEW SUPERPOWER</h2>
        <div className="powers" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          {POWERS.map((p, i) => (
            <Reveal key={p.t} delay={i * 60} className="power">
              <h3 className="t">{p.t}</h3>
              <p className="d">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------- the price -------- */}
      <section className="ink-section" aria-label="The price" style={{ padding: 'var(--sp-6) 0' }}>
        <div className="page">
          <Reveal>
            <p className="mono" style={{ color: 'var(--accent)' }}>
              BUT EVERY SUPERPOWER HAS A PRICE
            </p>
            <p className="pull" style={{ marginTop: '1.4rem' }}>
              The biggest risk? <em>Stopping ourselves from thinking.</em>
            </p>
            <p className="lede" style={{ color: 'var(--muted-light)', marginTop: '1.6rem' }}>
              If AI does every assignment, writes every line of code and answers every
              question — what happens to our own ability to think?
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------- boon vs bane -------- */}
      <section className="page chapter-band" aria-label="Boon versus bane">
        <h2 className="chapter">CH. 02 — BOON / BANE, SIDE BY SIDE</h2>
        <div className="manifesto" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          <Reveal className="col">
            <span className="tag">BOON — AI AS SUPERPOWER</span>
            <h3>Use it. Don’t depend on it.</h3>
            <ol>
              {BOON.map((x) => (
                <li key={x.b}>
                  <b>{x.b}</b>
                  <span>{x.s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="col bane" delay={100}>
            <span className="tag">BANE — AI AS DEPENDENCY</span>
            <h3>Three digital dangers.</h3>
            <ol>
              {BANE.map((x) => (
                <li key={x.b}>
                  <b>{x.b}</b>
                  <span>{x.s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* -------- the question -------- */}
      <section className="page" aria-label="The question" style={{ paddingBlock: 'var(--sp-6)', textAlign: 'center' }}>
        <Reveal>
          <p className="bigq">
            ARE WE USING AI —
            <br />
            <span className="light">or is AI using us?</span>
          </p>
        </Reveal>
      </section>

      {/* -------- human edge -------- */}
      <section className="page" aria-label="Keep your human edge">
        <h2 className="chapter">CH. 03 — KEEP YOUR HUMAN EDGE</h2>
        <p className="lede" style={{ marginTop: '1.6rem' }}>
          Five skills technology cannot simply download:
        </p>
        <ul className="edge-list" style={{ marginTop: '1.6rem' }}>
          {EDGE.map((w, i) => (
            <Reveal key={w} delay={i * 50} as="li">
              <span className="w">{w}</span>
              <span className="mark">CANNOT BE DOWNLOADED ⏚</span>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* -------- future -------- */}
      <section className="page" aria-label="The future belongs to" style={{ paddingBlock: 'var(--sp-6)', textAlign: 'center' }}>
        <Reveal>
          <p className="display" style={{ fontSize: 'clamp(1.9rem, 5vw, 4.4rem)', maxWidth: '18em', margin: '0 auto' }}>
            The future belongs to people who know how to <em style={{ color: 'var(--accent)' }}>work with AI.</em>
          </p>
          <p className="ask" style={{ margin: '1.6rem auto 0' }}>
            Not people who blindly work <b>for</b> it.
          </p>
        </Reveal>
      </section>
    </StoryShell>
  )
}
