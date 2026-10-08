import StoryShell from '../components/StoryShell.jsx'
import { storyBySlug } from '../data/magazine.js'
import { Reveal, Eyebrow, Fig } from '../components/primitives.jsx'

import cyberHand from '../assets/img/cyber-hand.jpg'

const INTERCEPTS = [
  {
    id: 'INTERCEPT 01',
    type: 'FAKE JOB OFFER',
    msg: '“Earn ₹5,000 a day from home. No skills needed.”',
  },
  {
    id: 'INTERCEPT 02',
    type: 'PHISHING MESSAGE',
    msg: '“Your bank account will be blocked. Update KYC now.”',
  },
  {
    id: 'INTERCEPT 03',
    type: 'FAKE GIVEAWAY',
    msg: '“Congratulations! You’ve won an iPhone. Claim now.”',
  },
]

const EMOTIONS = [
  { w: 'FEAR', ex: '“Your account will be closed!”' },
  { w: 'GREED', ex: '“You’ve won a lottery!”' },
  { w: 'CURIOSITY', ex: '“Is this you in this video?”' },
]

const RULES = [
  {
    t: 'STOP. THINK. CLICK.',
    d: 'Check the real website before opening any link. Urgency is a red flag, not a reason.',
  },
  {
    t: 'PROTECT YOUR OTP.',
    d: 'Your OTP is a digital key. No bank, no service, no friend ever needs it. Never share it.',
  },
  {
    t: 'QUESTION “FREE”.',
    d: 'Free downloads, cracked software and too-good offers can hide malware. If it looks free, look twice.',
  },
  {
    t: 'USE TWO LOCKS.',
    d: 'Enable two-factor authentication (2FA) wherever possible. One password is a door; two is a gate.',
  },
  {
    t: 'UPDATE.',
    d: 'Software updates are not nagging — they are patches. They close the holes attackers already know about.',
  },
]

export default function CyberStory() {
  const story = storyBySlug('cyber')

  return (
    <StoryShell story={story} theme="cyber">
      {/* -------- opening -------- */}
      <header className="page art-head">
        <div className="art-head__kicker">
          <Eyebrow>CYBERSECURITY — THREAT BRIEF 001</Eyebrow>
        </div>
        <h1 className="cyber-title">
          Your one click can cost you <span className="accent">everything.</span>
        </h1>
        <p className="dek">
          In the physical world, we don’t open our door to strangers. Online?{' '}
          <span className="accent">We sometimes do it with one click.</span>
        </p>
        <div style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          <Fig
            src={cyberHand}
            alt="A fingertip hovering a millimetre above a keyboard key in a harsh beam of light, everything else in darkness."
            fig="FIG. 01 — ONE MILLIMETRE FROM A DECISION"
            note="THREAT SURFACE: HUMAN"
          />
        </div>
      </header>

      {/* -------- one click -------- */}
      <section className="page" aria-label="One click" style={{ paddingBlock: 'var(--sp-5)' }}>
        <Reveal>
          <p className="stopword">
            ONE CLICK<span className="dot">.</span>
          </p>
          <p className="stopword" style={{ marginTop: '0.2em' }}>
            ONE MISTAKE<span className="dot">.</span>
          </p>
          <p className="stopword" style={{ marginTop: '0.2em' }}>
            ONE HUGE LOSS<span className="dot">.</span>
          </p>
        </Reveal>
      </section>

      {/* -------- intercepts -------- */}
      <section className="page" aria-label="Intercepted bait">
        <h2 className="chapter">CH. 01 — INTERCEPTED / THE BAIT CHANGES, THE GOAL DOESN’T</h2>
        <div className="intercepts" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          {INTERCEPTS.map((m, i) => (
            <Reveal key={m.id} delay={i * 90} className="intercept">
              <span className="tag">
                <span>{m.id}</span>
                <span>{m.type}</span>
              </span>
              <span className="msg">{m.msg}</span>
              <span className="verdict">
                VERDICT: <b>BAIT</b> / SOCIAL ENGINEERING
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------- emotions -------- */}
      <section className="page chapter-band" aria-label="The emotions hackers target">
        <h2 className="chapter">CH. 02 — HACKERS TARGET HUMAN EMOTIONS</h2>
        <div className="emotions" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          {EMOTIONS.map((e, i) => (
            <Reveal key={e.w} delay={i * 70} className="emotion">
              <h3 className="w">{e.w}</h3>
              <p className="ex">{e.ex}</p>
            </Reveal>
          ))}
        </div>
        <p className="lede" style={{ marginTop: '2rem', color: 'var(--muted-light)' }}>
          The exploit is rarely clever code. It is <b style={{ color: 'var(--paper)' }}>you,
          feeling something</b> — and clicking anyway.
        </p>
      </section>

      {/* -------- five rules -------- */}
      <section className="page chapter-band" aria-label="Five golden rules">
        <h2 className="chapter">CH. 03 — YOUR 5 GOLDEN RULES</h2>
        <div className="crules" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          {RULES.map((r, i) => (
            <Reveal key={r.t} delay={i * 50} className="crule">
              <span className="no">RULE {String(i + 1).padStart(2, '0')}</span>
              <h3 className="t">{r.t}</h3>
              <p className="d">{r.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------- remember -------- */}
      <section className="page chapter-band trinity" aria-label="Remember" style={{ paddingBottom: 'var(--sp-6)' }}>
        <h2 className="chapter">CH. 04 — REMEMBER</h2>
        <div style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
          <Reveal>
            <p>Passwords can be changed.</p>
            <p>Money can sometimes be recovered.</p>
            <p>
              But <span className="redact">privacy</span> may never be restored.
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------- finale -------- */}
      <section
        aria-label="Stop think click"
        style={{ borderTop: '1px solid var(--line-paper)', padding: 'var(--sp-6) 0 var(--sp-7)', textAlign: 'center' }}
      >
        <div className="page">
          <Reveal>
            <p className="mono" style={{ color: 'var(--muted-light)' }}>
              BE SMART. NOT JUST DIGITAL.
            </p>
            <p className="stopword" style={{ marginTop: '1.2rem' }}>
              STOP<span className="dot">.</span>
              <br />
              THINK<span className="dot">.</span>
              <br />
              CLICK<span className="dot">.</span>
              <span className="blink" aria-hidden="true" />
            </p>
          </Reveal>
        </div>
      </section>
    </StoryShell>
  )
}
