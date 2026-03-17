'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const overlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => overlineRef.current?.classList.add('visible'), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero">
      <div className="hero-bg" />

      <div className="hero-content">
        <div className="hero-inner">
          <div ref={overlineRef} className="overline-wrap">
            <div className="gold-line" />
            <span className="overline-text">Desde 1981 · Consultores en Fianzas</span>
          </div>

          <h1 className="hero-h1">
            Solidez y confianza<br />en cada fianza
          </h1>

          <p className="hero-p">
            Especialistas en asesoría, consultoría e intermediación de fianzas
            con más de 40 años de experiencia en el sector afianzador.
          </p>

          <div className="hero-btns">
            <a href="#servicios" className="btn-primary">
              Conoce nuestros servicios
            </a>
            <a href="#contacto" className="btn-outline">
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
