'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function ContactoCTA() {
  const lineRef = useRef<HTMLDivElement>(null)
  const ref     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const once = (el: Element | null, fn: (el: Element) => void, threshold = 0.25) => {
      if (!el) return
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { fn(e.target); io.unobserve(e.target) }
      }, { threshold })
      io.observe(el)
      return io
    }

    const o1 = once(lineRef.current, el => el.classList.add('visible'), 0.2)
    const o2 = once(ref.current, el => {
      el.querySelectorAll<HTMLElement>('.stagger-child').forEach(c => c.classList.add('visible'))
    }, 0.25)

    return () => { o1?.disconnect(); o2?.disconnect() }
  }, [])

  return (
    <section id="contacto-cta">
      <div ref={lineRef} className="cta-gold-line" />
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
