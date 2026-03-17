'use client'

import { useEffect, useRef, useState } from 'react'

const SERVICIOS = [
  {
    id: 'fidelidad',
    num: '01',
    titulo: 'Fianzas de Fidelidad',
    placeholder: 'placeholder-srv-1',
    desc: 'Garantiza el resarcimiento del daño patrimonial que cause un empleado por la comisión de un delito (Robo, Fraude, Abuso de Confianza o Peculado) en contra de bienes de la empresa.',
    subtipos: null,
  },
  {
    id: 'judiciales',
    num: '02',
    titulo: 'Fianzas Judiciales',
    placeholder: 'placeholder-srv-2',
    desc: 'Fianzas para procesos judiciales en sus distintas modalidades, garantizando el cumplimiento de obligaciones ante las autoridades competentes.',
    subtipos: [
      {
        categoria: 'Penales',
        items: ['Libertad Provisional', 'Libertad Preparatoria', 'Condena Condicional'],
      },
      {
        categoria: 'No Penales',
        items: ['Civiles', 'Mercantiles', 'Amparo', 'Laborales'],
      },
    ],
  },
  {
    id: 'administrativas',
    num: '03',
    titulo: 'Fianzas Administrativas',
    placeholder: 'placeholder-srv-3',
    desc: 'Fianzas para el cumplimiento de contratos y obligaciones ante dependencias gubernamentales y entidades privadas.',
    subtipos: [
      {
        categoria: 'Tipos',
        items: [
          'Concurso y Licitación',
          'Anticipo',
          'Cumplimiento',
          'Buena Calidad',
          'Penas Convencionales',
          'Obligaciones Laborales',
          'Inconformidad Fiscal',
          'Convenio de Pagos',
          'Arrendamiento',
        ],
      },
    ],
  },
  {
    id: 'credito',
    num: '04',
    titulo: 'Fianzas de Crédito',
    placeholder: 'placeholder-srv-4',
    desc: 'Garantizan el pago de créditos y el cumplimiento de contratos de suministro y distribución mercantil.',
    subtipos: [
      {
        categoria: 'Tipos',
        items: [
          'Suministro PEMEX',
          'Suministro ASA',
          'Compra-Venta',
          'Distribución Mercantil',
        ],
      },
    ],
  },
]

type Servicio = (typeof SERVICIOS)[number]

function Modal({ servicio, onClose }: { servicio: Servicio; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>

        <div className={`modal-hero ${servicio.placeholder}`}>
          <div className="modal-hero-overlay">
            <span className="modal-num">({servicio.num})</span>
            <h3 className="modal-titulo">{servicio.titulo}</h3>
          </div>
        </div>

        <div className="modal-body">
          <p className="modal-desc">{servicio.desc}</p>

          {servicio.subtipos && (
            <div className="modal-subtipos">
              {servicio.subtipos.map(({ categoria, items }) => (
                <div key={categoria} className="modal-categoria">
                  {servicio.subtipos!.length > 1 && (
                    <p className="modal-cat-label">{categoria}</p>
                  )}
                  <ul className="modal-items">
                    {items.map((item) => (
                      <li key={item} className="modal-item">
                        <span className="modal-item-dot" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <a href="#contacto" className="btn-primary" onClick={onClose}>
            Solicitar cotización
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Servicios() {
  const overlineRef = useRef<HTMLDivElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Servicio | null>(null)

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
    <>
      <section id="servicios">
        <div className="section-container">
          <div ref={overlineRef} className="overline-wrap">
            <div className="gold-line" />
            <span className="overline-text">Nuestros Servicios</span>
          </div>

          <h2 ref={h2Ref} className="section-h2 clip-hidden">Soluciones para cada necesidad</h2>

          <div ref={gridRef} className="servicios-grid">
            {SERVICIOS.map((srv) => (
              <button
                key={srv.id}
                className="service-card stagger-child"
                onClick={() => setActive(srv)}
                aria-label={`Ver detalles de ${srv.titulo}`}
              >
                <div className={`service-card-bg ${srv.placeholder}`} />
                <div className="overlay" />
                <div className="service-card-content">
                  <span className="service-num">({srv.num})</span>
                  <p className="service-titulo label">{srv.titulo}</p>
                  <span className="service-cta">Ver detalles →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && <Modal servicio={active} onClose={() => setActive(null)} />}
    </>
  )
}
