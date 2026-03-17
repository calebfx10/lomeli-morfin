'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function NavIsotipo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="nav-isotipo"
    >
      <polyline points="4,4 4,60 30,60" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
      <line x1="30" y1="4" x2="30" y2="60" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" />
      <polyline points="30,4 47,36 64,4" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
      <line x1="64" y1="4" x2="64" y2="60" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" />
    </svg>
  )
}

const NAV_ITEMS = [
  { num: '01', label: 'Nosotros',          href: '/nosotros' },
  { num: '02', label: 'Servicios',         href: '/servicios' },
  { num: '03', label: 'Clientes y Alianzas', href: '/clientes' },
  { num: '04', label: 'Cobertura',         href: '/cobertura' },
  { num: '05', label: 'Contacto',          href: '/contacto' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () =>
      navRef.current?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function closeMenu() { setMenuOpen(false) }

  return (
    <nav ref={navRef} id="navbar">
      <Link href="/" className="nav-logo" onClick={closeMenu}>
        <NavIsotipo />
        <span className="nav-logo-text">Lomeli Morfin</span>
      </Link>

      {/* Desktop nav */}
      <ul className="nav-list">
        {NAV_ITEMS.map(({ num, label, href }) => (
          <li key={num}>
            <Link href={href} className="nav-item nav-link">
              <span className="nav-num">({num})</span>
              {label}/
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/contacto" className="btn-cta">
        Solicitar cotización
      </Link>

      {/* Hamburger button — visible only on mobile */}
      <button
        className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          <ul className="nav-mobile-list">
            {NAV_ITEMS.map(({ num, label, href }) => (
              <li key={num}>
                <Link href={href} className="nav-mobile-link" onClick={closeMenu}>
                  <span className="nav-num">({num})</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contacto" className="btn-cta nav-mobile-cta" onClick={closeMenu}>
            Solicitar cotización
          </Link>
        </div>
      )}
    </nav>
  )
}
