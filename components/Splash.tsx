'use client'

import { useEffect, useRef } from 'react'

function Isotipo({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 64 64"
      fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="4,4 4,60 30,60" stroke="white" strokeWidth="4.5" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
      <line x1="30" y1="4" x2="30" y2="60" stroke="white" strokeWidth="4.5" strokeLinecap="square" />
      <polyline points="30,4 47,36 64,4" stroke="white" strokeWidth="4.5" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
      <line x1="64" y1="4" x2="64" y2="60" stroke="white" strokeWidth="4.5" strokeLinecap="square" />
    </svg>
  )
}

// Tiempos: 2s fase 1, crossfade 600ms, 4s fase 2, fade out 600ms
const PHASE1 = 2000
const CROSSFADE = 600
const PHASE2 = 4000
const FADE_OUT = 600

export default function Splash() {
  const splashRef = useRef<HTMLDivElement>(null)
  const phase1Ref = useRef<HTMLDivElement>(null)
  const phase2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const splash = splashRef.current!
    const p1 = phase1Ref.current!
    const p2 = phase2Ref.current!
    const site = document.getElementById('site') as HTMLElement

    // Fase 1 → 2: crossfade interno
    const t1 = setTimeout(() => {
      p1.style.transition = `opacity ${CROSSFADE}ms ease`
      p1.style.opacity = '0'

      p2.style.display = 'flex'
      void p2.offsetWidth
      p2.style.transition = `opacity ${CROSSFADE}ms ease`
      p2.style.opacity = '1'

      // Activa animaciones del logo
      setTimeout(() => {
        p2.querySelectorAll<HTMLElement>('[data-anim]').forEach(el => el.classList.add('go'))
      }, 100)
    }, PHASE1)

    // Fase 2 → sitio: fade out del splash completo
    const t2 = setTimeout(() => {
      splash.style.transition = `opacity ${FADE_OUT}ms ease`
      splash.style.opacity = '0'
      setTimeout(() => {
        splash.style.display = 'none'
        site.style.transition = `opacity ${FADE_OUT}ms ease`
        site.style.opacity = '1'
      }, FADE_OUT)
    }, PHASE1 + CROSSFADE + PHASE2)

    function skip() {
      clearTimeout(t1)
      clearTimeout(t2)
      splash.style.display = 'none'
      site.style.opacity = '1'
    }
    splash.addEventListener('click', skip)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      splash.removeEventListener('click', skip)
    }
  }, [])

  return (
    <div ref={splashRef} id="splash" className="splash" style={{ background: '#1b4254' }}>

      {/* ── Fase 1: "Nos estamos renovando" ── */}
      <div ref={phase1Ref} className="sp-phase sp-phase-1">
        <p className="sp-renovando">
          <strong>Nos estamos renovando</strong>
          <span className="sp-renovando-sub">una nueva imagen, el mismo compromiso</span>
        </p>
      </div>

      {/* ── Fase 2: Logo LM ── */}
      <div
        ref={phase2Ref}
        className="sp-phase sp-phase-2"
        style={{ display: 'none', opacity: 0 }}
      >
        <div data-anim className="s2-logo">
          <Isotipo size={96} />
        </div>
        <p data-anim className="s2-name">LOMELI MORFIN</p>
        <div data-anim className="s2-divider" />
        <p data-anim className="s2-sub">Consultores en Fianzas</p>
      </div>

      {/* Barra de progreso — cubre los 6s totales */}
      <div className="sp-bar" />
    </div>
  )
}
