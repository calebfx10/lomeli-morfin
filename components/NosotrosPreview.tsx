'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const VALORES_PREVIEW = ['Innovación', 'Calidad', 'Puntualidad', 'Honestidad', 'Confianza', 'Comunicación']

export default function NosotrosPreview() {
  const overlineRef = useRef<HTMLDivElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)

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

    return () => { obs.disconnect(); h2Obs.disconnect() }
  }, [])

  return (
    <section id="nosotros-preview" className="preview-section">
      <div className="section-container">
        <div ref={overlineRef} className="overline-wrap">
          <div className="gold-line" />
          <span className="overline-text">Sobre Nosotros</span>
        </div>

        <div className="preview-grid">
          <div className="preview-text">
            <h2 ref={h2Ref} className="section-h2">
              Más de 40 años respaldando tu patrimonio
            </h2>
            <p className="preview-body">
              Organización especializada en Asesoría, Consultoría e Intermediación de Fianzas,
              con Cédula de Autorización de la CNSY F (SHCP) desde 1981. Presencia en 14 estados
              de México y Argentina.
            </p>
            <Link href="/nosotros" className="btn-primary btn-dark">
              Conocer más →
            </Link>
          </div>

          <div className="preview-valores">
            {VALORES_PREVIEW.map((v) => (
              <span key={v} className="valor-tag">{v}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
