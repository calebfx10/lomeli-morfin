'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { id: 'c-years',   target: 40, suffix: '+', label: 'Años de experiencia' },
  { id: 'c-states',  target: 14, suffix: '',  label: 'Estados' },
  { id: 'c-firms',   target: 10, suffix: '',  label: 'Afianzadoras' },
  { id: 'c-clients', target: 12, suffix: '+', label: 'Clientes destacados' },
]

function animateCounter(el: HTMLElement, target: number, suffix = '', duration = 1500) {
  const start = performance.now()
  ;(function step(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
    el.textContent = Math.floor(eased * target) + suffix
    if (progress < 1) requestAnimationFrame(step)
  })(performance.now())
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          sectionRef.current
            ?.querySelectorAll<HTMLElement>('.stagger-child')
            .forEach((el) => el.classList.add('visible'))
          STATS.forEach(({ id, target, suffix }) => {
            const el = document.getElementById(id)
            if (el) animateCounter(el, target, suffix)
          })
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" ref={sectionRef}>
      <div className="stats-grid">
        {STATS.map(({ id, target, suffix, label }) => (
          <div key={id} className="stat-item stagger-child">
            <div id={id} className="stat-number">
              {target}{suffix}
            </div>
            <p className="stat-label">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
