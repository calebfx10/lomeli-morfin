'use client'

import { useEffect, useRef } from 'react'

const VALORES = [
  {
    titulo: 'Innovación',
    desc: 'A la vanguardia en estrategias organizacionales',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    titulo: 'Calidad',
    desc: 'Satisfacer las más altas exigencias del sector',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    titulo: 'Puntualidad',
    desc: 'La entrega oportuna como base fundamental',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    titulo: 'Honestidad',
    desc: 'Cumplimiento del reglamento interno',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M12 2l8 4v6c0 5-3.5 9.3-8 11-4.5-1.7-8-6-8-11V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    titulo: 'Confianza',
    desc: 'Seguridad y certeza en cada integrante del equipo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    titulo: 'Comunicación',
    desc: 'Base que promueve el conocimiento organizacional',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

export default function Nosotros() {
  const overlineRef = useRef<HTMLDivElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const valoresRef = useRef<HTMLDivElement>(null)

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

    const staggerObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>('.stagger-child').forEach((el) =>
            el.classList.add('visible')
          )
          staggerObs.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (valoresRef.current) staggerObs.observe(valoresRef.current)

    return () => { obs.disconnect(); h2Obs.disconnect(); staggerObs.disconnect() }
  }, [])

  return (
    <section id="nosotros">
      <div className="nosotros-container">
        {/* Overline */}
        <div ref={overlineRef} className="overline-wrap">
          <div className="gold-line" />
          <span className="overline-text">Quiénes Somos</span>
        </div>

        {/* Grid 2 col: texto + foto */}
        <div className="nosotros-grid">
          {/* Columna texto */}
          <div>
            <h2 ref={h2Ref} className="nosotros-h2 clip-hidden">
              Más de 40 años respaldando tu patrimonio
            </h2>

            <p className="nosotros-body">
              LOMELI MORFIN CONSULTORES es una organización especializada en Asesoría,
              Consultoría e Intermediación de todo tipo de Fianzas (Administrativas,
              Judiciales, Fidelidad y de Crédito), contamos con la Cédula de Autorización
              por parte de la Comisión Nacional de Seguros y Fianzas (SHCP) desde el año
              de 1981, lo que nos permite contar con una amplia experiencia profesional en
              el Sector Afianzador para brindar a nuestros Clientes un servicio de calidad
              y excelencia de acuerdo a sus necesidades.
            </p>

            {/* Misión */}
            <div className="mision-block">
              <p className="mision-label">Misión</p>
              <p className="mision-text">
                Lograr a partir del compromiso de todo nuestro Equipo, la atracción y
                confianza de cada uno de nuestros Clientes, que les permita tener una
                ventaja competitiva frente a otros creando una total satisfacción.
              </p>
            </div>

            {/* Visión */}
            <div className="mision-block">
              <p className="mision-label">Visión</p>
              <p className="mision-text">
                Posicionarnos como <strong>LA ORGANIZACIÓN DE TRÁMITE DE FIANZAS</strong> más
                importante a nivel nacional e internacional, ofreciendo una opción de
                excelencia en servicios de consultoría y asesoría para las Empresas.
              </p>
            </div>
          </div>

          {/* Columna foto */}
          <div className="nosotros-photo" />
        </div>

        {/* 6 Valores */}
        <div ref={valoresRef} className="valores-grid">
          {VALORES.map(({ titulo, desc, icon }) => (
            <div key={titulo} className="valor-item stagger-child">
              <div className="valor-icon">{icon}</div>
              <p className="valor-title">{titulo}</p>
              <p className="valor-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
