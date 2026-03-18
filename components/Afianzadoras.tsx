'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const AFIANZADORAS = [
  { nombre: 'ACE Fianzas Monterrey',          logo: '/logos/afianzadoras/af_monterrey.png' },
  { nombre: 'Afianzadora Insurgentes',         logo: '/logos/afianzadoras/af_insurgentes.png' },
  { nombre: 'Afianzadora Aserta',              logo: '/logos/afianzadoras/af_asserta.png' },
  { nombre: 'Afianzadora Sofimex',             logo: '/logos/afianzadoras/af_sofimex.png' },
  { nombre: 'Fianzas Dorama',                  logo: '/logos/afianzadoras/af_dorama.png' },
  { nombre: 'Afianzadora Fiducia',             logo: '/logos/afianzadoras/af_fiducia.png' },
  { nombre: 'Liberty Fianzas',                 logo: '/logos/afianzadoras/af_liberty.png' },
  { nombre: 'Fianzas Atlas',                   logo: '/logos/afianzadoras/af_Atlas.png' },
  { nombre: 'Zurich Fianzas México',           logo: '/logos/afianzadoras/af_Zurich.png' },
  { nombre: 'Fianzas Guadiana Inbursa',        logo: '/logos/afianzadoras/af_Inbursa.png' },
]

export default function Afianzadoras() {
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
    <section id="afianzadoras">
      <div className="section-container">
        <div ref={overlineRef} className="overline-wrap">
          <div className="gold-line" />
          <span className="overline-text">Nuestro Respaldo</span>
        </div>

        <h2 ref={h2Ref} className="section-h2 clip-hidden">
          Respaldados por las mejores afianzadoras
        </h2>

        <p className="af-intro">
          Contamos con relación comercial y apoyo de las afianzadoras líderes del sector:
        </p>

        <div ref={gridRef} className="af-grid logo-grid">
          {AFIANZADORAS.map(({ nombre, logo }) => (
            <div key={nombre} className="af-item stagger-child" title={nombre}>
              <Image
                src={logo}
                alt={nombre}
                width={160}
                height={80}
                className="af-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
