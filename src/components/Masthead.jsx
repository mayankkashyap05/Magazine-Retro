import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ISSUE, STORIES } from '../data/magazine.js'

export function Wordmark({ sub = false }) {
  return (
    <Link to="/" className="wm-link" aria-label="ENIAC — home">
      <span className="wm">
        ENIAC<span className="wm__punch" aria-hidden="true" />
      </span>
      {sub && <span className="wm-sub">Digital Magazine</span>}
    </Link>
  )
}

export default function Masthead() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const closeRef = useRef(null)
  const btnRef = useRef(null)

  /* close on navigation */
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  /* esc + scroll lock while open */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      btnRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="masthead">
        <div className="masthead__strip" aria-hidden="true">
          <span>
            VOL. {ISSUE.vol} / ISSUE {ISSUE.no} — <b>{ISSUE.name}</b>
          </span>
          <span>{ISSUE.tagline.toUpperCase()}</span>
          <span>{ISSUE.date}</span>
        </div>
        <div className="masthead__bar">
          <Wordmark sub />
          <nav className="nav" aria-label="Stories">
            <NavLink to="/" end>
              HOME
            </NavLink>
            {STORIES.map((s) => (
              <NavLink key={s.slug} to={`/${s.slug}`}>
                <sup>{s.no}</sup>
                {s.nav}
              </NavLink>
            ))}
          </nav>
          <button
            ref={btnRef}
            className="menu-btn"
            aria-expanded={open}
            aria-controls="issue-index"
            aria-label={open ? 'Close issue index' : 'Open issue index'}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      {open && (
        <div className="overlay" id="issue-index" role="dialog" aria-modal="true" aria-label="Issue index">
          <div className="overlay__top">
            <span>
              ISSUE {ISSUE.no} — {ISSUE.date}
            </span>
            <button ref={closeRef} className="overlay__close" onClick={() => setOpen(false)}>
              CLOSE ×
            </button>
          </div>
          <ul className="overlay__list">
            <li>
              <Link to="/" style={{ '--i': 0 }}>
                <span className="overlay__no">––</span>
                <span className="overlay__title">Front Page</span>
              </Link>
            </li>
            {STORIES.map((s, i) => (
              <li key={s.slug}>
                <Link to={`/${s.slug}`} style={{ '--i': i + 1 }}>
                  <span className="overlay__no">STORY {s.no}</span>
                  <span className="overlay__title">{s.short}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="overlay__foot">
            <span>ENIAC / DIGITAL MAGAZINE</span>
            <span>DOC. NO. EN-{ISSUE.no}-2026</span>
          </div>
        </div>
      )}
    </>
  )
}
