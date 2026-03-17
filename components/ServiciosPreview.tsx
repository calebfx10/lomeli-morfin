'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const SERVICIOS_PREVIEW = [
  { num: '01', titulo: 'Fianzas de Fidelidad',     desc: 'Protección ante daño patrimonial por actos de empleados.' },
  { num: '02', titulo: 'Fianzas Judiciales',        desc: 'Penales y no penales: civiles, mercantiles, amparo, laborales.' },
  { num: '03', titulo: 'Fianzas Administrativas',   desc: 'Licitación, anticipo, cumplimiento, arrendamiento y más.' },
  { num: '04', titulo: 'Fianzas de Crédito',        desc: 'Suministro PEMEX, ASA, compra-venta y distribución mercantil.' },
]

export default function ServiciosPreview() {
  const overlineRef = useRef<HTMLDivElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    if (overlineRef.current) obs.observe(overlineRef.current)

    const h2Obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { entry.target.classList.add('reveal-title'); h2Obs.unobserve(entry.target) }
      },
      { threshold: 0.3 }
    )
    if (h2Ref.current) h2Obs.observe(h2Ref.current)

    const gridObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>('.stagger-child').forEach((el) =>
            el.classList.add('visible')
          )
          gridObs.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (gridRef.current) gridObs.observe(gridRef.current)

    return () => { obs.disconnect(); h2Obs.disconnect(); gridObs.disconnect() }
  }, [])

  return (
    <section id="servicios-preview" className="preview-section dark section-dark">
      <div className="section-container">
        <div ref={overlineRef} className="overline-wrap">
          <div className="gold-line" />
          <span className="overline-text">Nuestros Servicios</span>
        </div>

        <div className="preview-header">
          <h2 ref={h2Ref} className="section-h2 clip-hidden">Soluciones para cada necesidad</h2>
          <Link href="/servicios" className="btn-outline-dark">
            Ver todos →
          </Link>
        </div>

        <div ref={gridRef} className="servicios-preview-grid">
          {SERVICIOS_PREVIEW.map(({ num, titulo, desc }) => (
            <Link key={num} href="/servicios" className="srv-preview-card stagger-child">
              <span className="service-num">({num})</span>
              <p className="srv-preview-titulo">{titulo}</p>
              <p className="srv-preview-desc">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
