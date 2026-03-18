'use client'

import { useEffect, useRef } from 'react'

export default function OficinaSection() {
  const circleRef   = useRef<HTMLDivElement>(null)
  const overlineRef = useRef<HTMLDivElement>(null)
  const h2Ref       = useRef<HTMLHeadingElement>(null)
  const sepRef      = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const once = (el: Element | null, fn: (el: Element) => void, threshold = 0.15) => {
      if (!el) return
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { fn(e.target); io.unobserve(e.target) }
      }, { threshold })
      io.observe(el)
      return io
    }

    const o1 = once(circleRef.current, el => {
      el.classList.remove('video-before')
      el.classList.add('video-reveal')
    }, 0.1)
    const o2 = once(overlineRef.current, el => el.classList.add('visible'))
    const o3 = once(h2Ref.current, el => el.classList.add('reveal-title'), 0.2)
    const o4 = once(sepRef.current, el => el.classList.add('visible'), 0.2)
    const o5 = once(contentRef.current, el => {
      el.querySelectorAll<HTMLElement>('.stagger-child').forEach(c => c.classList.add('visible'))
    }, 0.2)

    return () => {
      o1?.disconnect(); o2?.disconnect(); o3?.disconnect()
      o4?.disconnect(); o5?.disconnect()
    }
  }, [])

  return (
    <section id="oficina">
      <div className="oficina-inner">

        {/* Círculo de video */}
        <div className="oficina-circle-wrap">
          <div ref={circleRef} className="oficina-circle video-before">
            <video
              className="oficina-video"
              src="/videos/video_optimizado.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

        {/* Contenido */}
        <div className="oficina-content">

          <div ref={overlineRef} className="overline-wrap">
            <div className="gold-line" />
            <span className="overline-text">Nuestras Instalaciones</span>
          </div>

          <h2 ref={h2Ref} className="oficina-h2 clip-hidden">
            Excelentes oficinas en el corazón de la Ciudad de México
          </h2>

          <div ref={sepRef} className="oficina-sep" />

          <div ref={contentRef}>
            <div className="oficina-address stagger-child">
              <svg
                className="oficina-pin"
                viewBox="0 0 16 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                aria-hidden="true"
              >
                <path d="M8 1C5.24 1 3 3.24 3 6c0 4.25 5 13 5 13s5-8.75 5-13c0-2.76-2.24-5-5-5z" />
                <circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <span className="oficina-address-text">
                Río Nazas 181<br />
                Cuauhtémoc, 06500<br />
                Ciudad de México, CDMX
              </span>
            </div>

            <a
              href="https://maps.google.com/?q=Río+Nazas+181+Cuauhtémoc+Ciudad+de+México"
              target="_blank"
              rel="noopener noreferrer"
              className="oficina-cta stagger-child"
            >
              Cómo llegar
              <svg
                className="oficina-cta-arrow"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                aria-hidden="true"
              >
                <path d="M1 7h12M8 2l5 5-5 5" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
