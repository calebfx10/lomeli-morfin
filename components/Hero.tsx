'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const overlineRef  = useRef<HTMLDivElement>(null)
  const scrollRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => overlineRef.current?.classList.add('visible'), 300)

    const scrollHandler = () => {
      if (scrollRef.current) {
        scrollRef.current.style.opacity = window.scrollY > 80 ? '0' : '1'
      }
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })

    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', scrollHandler)
    }
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

      {/* Scroll indicator */}
      <div ref={scrollRef} className="hero-scroll-indicator">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
