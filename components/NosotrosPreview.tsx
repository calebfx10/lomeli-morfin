'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const VALORES_PREVIEW = ['Innovación', 'Calidad', 'Puntualidad', 'Honestidad', 'Confianza', 'Comunicación']

export default function NosotrosPreview() {
  const overlineRef = useRef<HTMLDivElement>(null)
  const h2Ref       = useRef<HTMLHeadingElement>(null)
  const bodyRef     = useRef<HTMLParagraphElement>(null)
  const tagsRef     = useRef<HTMLDivElement>(null)

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
    const o3 = once(bodyRef.current, el => el.classList.add('visible'), 0.3)
    const o4 = once(tagsRef.current, el => {
      el.querySelectorAll<HTMLElement>('.stagger-child').forEach(c => c.classList.add('visible'))
    }, 0.2)

    return () => { o1?.disconnect(); o2?.disconnect(); o3?.disconnect(); o4?.disconnect() }
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
            <h2 ref={h2Ref} className="section-h2 clip-hidden">
              Más de 40 años respaldando tu patrimonio
            </h2>
            <p ref={bodyRef} className="preview-body stagger-child" style={{ '--delay': '0.1s' } as React.CSSProperties}>
              Organización especializada en Asesoría, Consultoría e Intermediación de Fianzas,
              con Cédula de Autorización de la CNSF (SHCP) desde 1981. Presencia en 14 estados
              de México y Argentina.
            </p>
            <Link href="/nosotros" className="btn-primary btn-dark">
              Conocer más →
            </Link>
          </div>

          <div ref={tagsRef} className="preview-valores">
            {VALORES_PREVIEW.map((v, i) => (
              <span
                key={v}
                className="valor-tag stagger-child"
                style={{ '--delay': `${i * 0.07}s` } as React.CSSProperties}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
