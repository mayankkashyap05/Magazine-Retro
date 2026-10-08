import { useInView, useCountUp, prefersReducedMotion } from '../lib/hooks.jsx'
import { Link } from 'react-router-dom'

/* Scroll-reveal wrapper (CSS handles the transition) */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const [ref, inView] = useInView()
  const merged = { ...style }
  if (delay) merged['--d'] = `${delay}ms`
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={Object.keys(merged).length ? merged : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Big number that counts up when visible */
export function CountUp({ to, duration = 1600, format = true }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const val = useCountUp(to, { duration, started: inView })
  return <span ref={ref}>{format ? val.toLocaleString('en-US') : val}</span>
}

/* Mono eyebrow label with signal square */
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`eyebrow ${className}`}>
      <span className="sq" aria-hidden="true" />
      {children}
    </p>
  )
}

/* Editorial figure with crop marks + figcaption */
export function Fig({
  src,
  alt,
  fig,
  note,
  ratio,
  eager = false,
  className = '',
  frameClass = '',
}) {
  return (
    <figure className={`figure crops ${className}`}>
      <span className="crop-b" aria-hidden="true" />
      <div
        className={`figure__frame ${frameClass}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          {...(eager ? { fetchpriority: 'high' } : {})}
        />
      </div>
      {(fig || note) && (
        <figcaption>
          <span>{fig}</span>
          <span>{note}</span>
        </figcaption>
      )}
    </figure>
  )
}

/* Technical text link */
export function TLink({ to, children, accent = false, className = '' }) {
  return (
    <Link to={to} className={`tlink ${accent ? 'tlink--accent' : ''} ${className}`}>
      {children}
      <span className="arr" aria-hidden="true">
        →
      </span>
    </Link>
  )
}

/* Punched-card decorative strip. `pattern` = string of 0/1/s */
export function PunchStrip({ pattern, className = '' }) {
  return (
    <div className={`punch-strip ${className}`} aria-hidden="true">
      {pattern.split('').map((c, i) => (
        <i key={i} className={c === '1' ? 'on' : c === 's' ? 'sig' : ''} />
      ))}
    </div>
  )
}

/* Marquee ticker */
export function Ticker({ items, label }) {
  const row = (hidden) => (
    <span aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <span className="ticker__item" key={i}>
          {it}
        </span>
      ))}
    </span>
  )
  return (
    <div className="ticker" aria-label={label}>
      <div className="ticker__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

/* Corner registration marks for a positioned parent */
export function RegMarks({ color = 'var(--muted)' }) {
  const common = { color }
  return (
    <>
      <span className="reg" style={{ top: 12, left: 12, ...common }} aria-hidden="true" />
      <span className="reg" style={{ top: 12, right: 12, ...common }} aria-hidden="true" />
      <span className="reg" style={{ bottom: 12, left: 12, ...common }} aria-hidden="true" />
      <span className="reg" style={{ bottom: 12, right: 12, ...common }} aria-hidden="true" />
    </>
  )
}

/* Thin reading-progress hairline */
export function ProgressHair({ value }) {
  return <div className="progress" style={{ width: `${value * 100}%` }} aria-hidden="true" />
}

export { prefersReducedMotion }
