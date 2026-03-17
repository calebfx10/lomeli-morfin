'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const CoberturaMapWorld = dynamic(() => import('./CoberturaMapWorld'), { ssr: false })

const PAISES = [
  { label: 'México',    sub: '14 estados' },
  { label: 'Argentina', sub: 'Buenos Aires' },
  { label: 'Colombia',  sub: 'Bogotá' },
  { label: 'España',    sub: 'Madrid' },
]

export default function CoberturaPreview() {
  const [hovered, setHovered] = useState<string | null>(null)
  const overlineRef = useRef<HTMLDivElement>(null)
  const h2Ref       = useRef<HTMLHeadingElement>(null)
  const paisesRef   = useRef<HTMLDivElement>(null)
  const mapRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const once = (el: Element | null, fn: (el: Element) => void, threshold = 0.2) => {
      if (!el) return
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { fn(e.target); io.unobserve(e.target) }
      }, { threshold })
      io.observe(el)
      return io
    }

    const o1 = once(overlineRef.current, el => el.classList.add('visible'))
    const o2 = once(h2Ref.current, el => el.classList.add('reveal-title'), 0.3)
    const o3 = once(paisesRef.current, el => {
      el.querySelectorAll<HTMLElement>('.stagger-child').forEach(c => c.classList.add('visible'))
    }, 0.2)
    const o4 = once(mapRef.current, el => el.classList.add('visible'), 0.15)

    return () => { o1?.disconnect(); o2?.disconnect(); o3?.disconnect(); o4?.disconnect() }
  }, [])

  return (
    <section className="cob-preview">
      <div className="cob-preview-inner">

        {/* Encabezado centrado */}
        <div className="cob-preview-header">
          <div ref={overlineRef} className="overline-wrap" style={{ justifyContent: 'center', marginBottom: 24 }}>
            <div className="gold-line" />
            <span className="overline-text">Cobertura</span>
          </div>

          <h2 ref={h2Ref} className="cob-preview-h2">Presencia nacional e internacional</h2>

          <div ref={paisesRef} className="cob-preview-paises">
            {PAISES.map(({ label, sub }, i) => (
              <div
                key={label}
                className="cob-preview-pais stagger-child"
                style={{ '--delay': `${i * 0.08}s` } as React.CSSProperties}
              >
                <span className="cob-preview-pais-dot" />
                <span className="cob-preview-pais-name">{label}</span>
                <span className="cob-preview-pais-sep">·</span>
                <span className="cob-preview-pais-sub">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa grande centrado */}
        <div ref={mapRef} className="cob-preview-map cob-preview-map-anim">
          <CoberturaMapWorld hoveredId={hovered} onHover={setHovered} />
        </div>

        {/* Link al pie */}
        <div className="cob-preview-footer">
          <Link href="/cobertura" className="btn-primary">
            Ver cobertura completa
          </Link>
        </div>

      </div>
    </section>
  )
}
