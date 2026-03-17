'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const CoberturaMapWorld = dynamic(() => import('./CoberturaMapWorld'), { ssr: false })

const PAISES = [
  { label: 'México',    sub: '14 estados' },
  { label: 'Argentina', sub: 'Buenos Aires' },
  { label: 'Colombia',  sub: 'Bogotá' },
  { label: 'España',    sub: 'Madrid' },
]

export default function CoberturaPreview() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="cob-preview">
      <div className="cob-preview-inner">

        {/* Encabezado centrado */}
        <div className="cob-preview-header">
          <h2 className="cob-preview-h2">Presencia nacional e internacional</h2>
          <div className="cob-preview-paises">
            {PAISES.map(({ label, sub }) => (
              <div key={label} className="cob-preview-pais">
                <span className="cob-preview-pais-dot" />
                <span className="cob-preview-pais-name">{label}</span>
                <span className="cob-preview-pais-sep">·</span>
                <span className="cob-preview-pais-sub">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa grande centrado */}
        <div className="cob-preview-map">
          <CoberturaMapWorld hoveredId={hovered} onHover={setHovered} />
        </div>

        {/* Link al pie */}
        <div className="cob-preview-footer">
          <Link href="/cobertura" className="btn-primary">
            Ver cobertura completa
          </Link>
        </div>

      </div>
    </section>
  )
}
