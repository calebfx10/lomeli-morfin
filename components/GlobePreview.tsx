'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Globe, { GlobeMethods } from 'react-globe.gl'
import { MeshPhongMaterial } from 'three'

// Países con presencia — resaltados en dorado
const ACTIVE_ISO = new Set(['MEX', 'ARG', 'COL', 'ESP'])

const MARKERS = [
  { lat: 23.6,  lng: -102.5, label: 'México',    sub: '14 estados',  size: 0.6  },
  { lat: -38.4, lng:  -63.6, label: 'Argentina', sub: 'Buenos Aires', size: 0.4 },
  { lat:   4.6, lng:  -74.1, label: 'Colombia',  sub: 'Bogotá',       size: 0.4 },
  { lat:  40.4, lng:   -3.7, label: 'España',    sub: 'Madrid',       size: 0.4 },
]

const GLOBE_MATERIAL = new MeshPhongMaterial({ color: '#0a1a24' })

export default function GlobePreview() {
  const globeRef   = useRef<GlobeMethods | undefined>(undefined)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const [size, setSize]       = useState(500)
  const [countries, setCountries] = useState<object[]>([])

  // Cargar GeoJSON
  useEffect(() => {
    fetch('/world-countries.geojson')
      .then(r => r.json())
      .then(d => setCountries(d.features))
  }, [])

  // Tamaño responsive
  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return
      setSize(Math.min(wrapRef.current.offsetWidth, 600))
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  // Cámara y rotación — esperar a que el globo esté listo
  const onReady = useCallback(() => {
    const g = globeRef.current
    if (!g) return
    g.pointOfView({ lat: 8, lng: -70, altitude: 2.2 }, 0)
    const controls = g.controls()
    controls.autoRotate      = true
    controls.autoRotateSpeed = 0.35
    controls.enableZoom      = false
    controls.enablePan       = false
  }, [])

  return (
    <div ref={wrapRef} className="globe-preview-wrap">
      <Globe
        ref={globeRef}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#2b5a72"
        atmosphereAltitude={0.15}
        globeImageUrl=""
        globeMaterial={GLOBE_MATERIAL}
        onGlobeReady={onReady}
        // Polígonos de países
        polygonsData={countries}
        polygonCapColor={(d: object) => {
          const iso = (d as { properties: { ISO_A3: string } }).properties.ISO_A3
          return ACTIVE_ISO.has(iso) ? 'rgba(200,160,32,0.85)' : 'rgba(27,66,84,0.9)'
        }}
        polygonSideColor={() => 'rgba(10,26,36,0.6)'}
        polygonStrokeColor={() => 'rgba(43,90,114,0.4)'}
        polygonAltitude={(d: object) => {
          const iso = (d as { properties: { ISO_A3: string } }).properties.ISO_A3
          return ACTIVE_ISO.has(iso) ? 0.015 : 0.005
        }}
        polygonLabel={(d: object) => {
          const p = (d as { properties: { ADMIN: string; ISO_A3: string } }).properties
          if (!ACTIVE_ISO.has(p.ISO_A3)) return ''
          const info: Record<string, string> = {
            MEX: '14 estados', ARG: 'Buenos Aires', COL: 'Bogotá', ESP: 'Madrid',
          }
          return `<div style="font-family:Montserrat,sans-serif;font-size:12px;font-weight:500;background:rgba(15,37,53,0.92);color:#fff;padding:6px 10px;border-radius:3px;border-left:2px solid #c8a020"><b>${p.ADMIN}</b><br/><span style="color:rgba(255,255,255,0.65);font-size:11px">${info[p.ISO_A3] ?? ''}</span></div>`
        }}
        // Marcadores de puntos sobre los países activos
        pointsData={MARKERS}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => '#ffffff'}
        pointAltitude={0.02}
        pointRadius="size"
      />
    </div>
  )
}
