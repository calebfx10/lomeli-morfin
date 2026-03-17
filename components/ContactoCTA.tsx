'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function ContactoCTA() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>('.stagger-child').forEach(el =>
            el.classList.add('visible')
          )
          obs.unobserve(entry.target)
        }
      },
      { threshold: 0.25 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contacto-cta">
      <div ref={ref} className="cta-inner">
        <p className="cta-overline stagger-child">¿Listo para comenzar?</p>
        <h2 className="cta-h2 stagger-child">
          ¿Listo para tramitar<br />tu fianza?
        </h2>
        <p className="cta-sub stagger-child">
          Contáctanos y uno de nuestros especialistas te atenderá a la brevedad.
        </p>
        <div className="cta-actions stagger-child">
          <Link href="/contacto" className="btn-cta-gold">
            Solicitar cotización
          </Link>
          <Link href="tel:+525555550000" className="btn-cta-outline">
            Llamar ahora
          </Link>
        </div>
      </div>
    </section>
  )
}
