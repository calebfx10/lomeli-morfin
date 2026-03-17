'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const CoberturaMapMx    = dynamic(() => import('./CoberturaMapMx'),    { ssr: false })
const CoberturaMapWorld = dynamic(() => import('./CoberturaMapWorld'), { ssr: false })

const ESTADOS_NOMBRES = [
  'Monterrey', 'Guadalajara', 'CDMX', 'Puebla', 'Villahermosa',
  'Baja California', 'Veracruz', 'Chiapas', 'Estado de México',
  'Mérida', 'Colima', 'Nayarit', 'Morelos', 'Michoacán',
]

const COB_STATS = [
  { id: 'cob-c-states', target: 14, suffix: '',  label: 'Estados en México' },
  { id: 'cob-c-paises', target: 4,  suffix: '',  label: 'Países' },
  { id: 'cob-c-years',  target: 40, suffix: '+', label: 'Años de experiencia' },
]

function animateCounter(el: HTMLElement, target: number, suffix = '', duration = 1500) {
  const start = performance.now()
  ;(function step(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.floor(eased * target) + suffix
    if (progress < 1) requestAnimationFrame(step)
  })(performance.now())
}

const PAISES = [
  { label: 'México',    sub: '14 estados',   color: '#1b4254' },
  { label: 'Argentina', sub: 'Buenos Aires',  color: '#2b5a72' },
  { label: 'Colombia',  sub: 'Bogotá',        color: '#2b5a72' },
  { label: 'España',    sub: 'Madrid',        color: '#2b5a72' },
]

export default function Cobertura() {
  const overlineRef = useRef<HTMLDivElement>(null)
  const h2Ref       = useRef<HTMLHeadingElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const listRef     = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const [listVisible,  setListVisible]  = useState(false)
  const [hoveredMx,    setHoveredMx]    = useState<string | null>(null)
  const [hoveredWorld, setHoveredWorld] = useState<string | null>(null)

  useEffect(() => {
    const obs = (el: Element | null, onVisible: (el: Element) => void, threshold = 0.2) => {
      if (!el) return
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { onVisible(entry.target); io.unobserve(entry.target) }
      }, { threshold })
      io.observe(el)
      return io
    }

    const o1 = obs(overlineRef.current, el => el.classList.add('visible'))
    const oh = obs(h2Ref.current, el => el.classList.add('reveal-title'), 0.3)
    const o2 = obs(statsRef.current, () => {
      setStatsVisible(true)
      COB_STATS.forEach(({ id, target, suffix }) => {
        const el = document.getElementById(id)
        if (el) animateCounter(el, target, suffix)
      })
    }, 0.15)
    const o3 = obs(listRef.current, el => {
      setListVisible(true)
      el.querySelectorAll<HTMLElement>('.stagger-child').forEach(c => c.classList.add('visible'))
    }, 0.1)

    return () => { o1?.disconnect(); oh?.disconnect(); o2?.disconnect(); o3?.disconnect() }
  }, [])

  return (
    <section id="cobertura">

      {/* ── Encabezado ── */}
      <div className="cob-header">
        <div className="cob-header-inner">
          <div ref={overlineRef} className="overline-wrap">
            <div className="gold-line" />
            <span className="overline-text">Cobertura Nacional e Internacional</span>
          </div>
          <h2 ref={h2Ref} className="section-h2 cob-h2 clip-hidden">Presencia nacional<br />e internacional</h2>
        </div>

        {/* Stats en la cabecera */}
        <div ref={statsRef} className="cob-stats-strip">
          {COB_STATS.map(({ id, target, suffix, label }) => (
            <div key={id} className={`cob-stat-item${statsVisible ? ' visible' : ''}`}>
              <span id={id} className="cob-stat-num">{target}{suffix}</span>
              <span className="cob-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mapas ── */}
      <div className="cob-maps-row">

        <div className="cob-map-card">
          <div className="cob-map-card-header">
            <span className="cob-map-card-tag">Nacional</span>
            <p className="cob-map-card-title">México — 14 estados activos</p>
          </div>
          <div className="cob-map-card-body">
            <CoberturaMapMx hoveredId={hoveredMx} onHover={setHoveredMx} />
          </div>
        </div>

        <div className="cob-map-card cob-map-card-dark">
          <div className="cob-map-card-header">
            <span className="cob-map-card-tag">Internacional</span>
            <p className="cob-map-card-title">México · Argentina · Colombia · España</p>
          </div>
          <div className="cob-map-card-body cob-map-card-body-dark">
            <CoberturaMapWorld hoveredId={hoveredWorld} onHover={setHoveredWorld} />
          </div>
        </div>

      </div>

      {/* ── Info inferior ── */}
      <div ref={listRef} className="cob-info-strip">
        <div className="cob-info-strip-inner">

          {/* Países */}
          <div className="cob-paises">
            <p className="cob-info-label">Países con presencia</p>
            <div className="cob-paises-grid">
              {PAISES.map(({ label, sub, color }, i) => (
                <div
                  key={label}
                  className={`cob-pais stagger-child${listVisible ? ' visible' : ''}`}
                  style={{ '--delay': `${i * 0.08}s` } as React.CSSProperties}
                >
                  <span className="cob-pais-dot" style={{ background: color }} />
                  <div>
                    <p className="cob-pais-name">{label}</p>
                    <p className="cob-pais-sub">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divisor */}
          <div className="cob-info-divider" />

          {/* Estados */}
          <div className="cob-estados-wrap">
            <p className="cob-info-label">Estados con presencia en México</p>
            <ul className="cob-estados-list">
              {ESTADOS_NOMBRES.map((e, i) => (
                <li
                  key={e}
                  className={`stagger-child${listVisible ? ' visible' : ''}`}
                  style={{ '--delay': `${0.32 + i * 0.04}s` } as React.CSSProperties}
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    </section>
  )
}
