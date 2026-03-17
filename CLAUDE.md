# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server (requires build first)
npm run lint      # Run ESLint
```

---

# LOMELI MORFIN — Sitio Web Corporativo
## Instrucciones completas para Claude Code

---

## 1. VISIÓN GENERAL DEL PROYECTO

- **Empresa:** LOMELI MORFIN CONSULTORES EN FIANZAS
- **Giro:** Asesoría, Consultoría e Intermediación de Fianzas
  (Administrativas, Judiciales, Fidelidad y de Crédito)
- **Autorización:** Cédula de la Comisión Nacional de Seguros y Fianzas (SHCP) desde 1981
- **Presencia:** México (14 estados) y Argentina
- **Tipo de sitio:** Single-page corporativo con scroll por secciones
- **Stack:** Next.js 15 · React 19 · TypeScript 5 · Tailwind CSS v4 — App Router en `/app`
- **Referencia visual:** verholy.com/en — estructura editorial, animaciones
  sutiles y de alto impacto, mucho whitespace, sensación premium
- **Personalidad de marca:** Sobria, confiable, moderna, corporativa con calidez

---

## 2. ESTRUCTURA DE ARCHIVOS

```
lomeli-morfin/
├── CLAUDE.md
├── app/
│   ├── layout.tsx         ← root layout, Montserrat font, globals.css
│   ├── page.tsx           ← home (importa secciones como componentes)
│   └── globals.css        ← @theme con paleta + animaciones + clases especiales
├── components/
│   ├── Splash.tsx         ← splash-1 y splash-2
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── Nosotros.tsx
│   ├── Servicios.tsx
│   ├── Afianzadoras.tsx
│   ├── Clientes.tsx
│   ├── Cobertura.tsx
│   ├── Contacto.tsx
│   └── Footer.tsx
├── public/
│   ├── logos/
│   │   ├── lm/
│   │   │   ├── lm_logo-color.svg
│   │   │   ├── lm_logo-white.svg
│   │   │   ├── lm_isotipo-color.svg
│   │   │   ├── lm_isotipo-white.svg
│   │   │   └── lm_favicon.svg
│   │   ├── afianzadoras/      ← prefijo af_
│   │   └── clientes/          ← prefijo cl_
│   ├── images/
│   │   ├── hero/              ← prefijo hero_
│   │   ├── nosotros/          ← prefijo nos_
│   │   ├── servicios/         ← prefijo srv_
│   │   └── og/                ← prefijo og_
│   └── icons/                 ← prefijo ico_
└── _reference/                ← NO incluir en build
    ├── Manual_básico_LM.pdf
    └── concentrado_contenidos.docx
```

### Convención de naming de assets
- Todo en minúsculas, sin espacios, sin acentos
- Prefijo + guión bajo + nombre: `af_ace.png`, `cl_abengoa.png`
- Palabras separadas con guión medio: `cl_alfa-proveedores.png`
- Prefijos: `lm_` `af_` `cl_` `hero_` `nos_` `srv_` `ico_` `og_`
- Logos: SVG preferido, PNG con fondo transparente
- Fotos: JPG o WebP — NUNCA PNG para fotografías

---

## 3. PALETA DE COLORES

```css
:root {
  --color-primary:       #1b4254;  /* Azul marino verdoso principal */
  --color-primary-dark:  #0f2535;  /* Overlays, footer, navbar sobre hero */
  --color-primary-mid:   #2b5a72;  /* Hover de elementos azules */
  --color-gold:          #c8a020;  /* Dorado institucional — acentos, overlines, CTA */
  --color-gold-dark:     #a08010;  /* Hover del dorado */
  --color-bg:            #f5f0e8;  /* Fondo crema general — NUNCA blanco puro */
  --color-bg-alt:        #e8e0d0;  /* Secciones alternas (afianzadoras, etc.) */
  --color-white:         #ffffff;
  --color-text:          #0f2535;
  --color-text-muted:    #5a6a7a;
  --color-splash-dark:   #0a0a0a;  /* Fondo splash 2 logo */
}
```

---

## 4. TIPOGRAFÍA

### Fuente oficial vs. implementación web
- Manual de marca: **Gotham Book** (weight 400) y **Gotham Light** (weight 300)
- Web (Google Fonts gratuita): **Montserrat** — misma geometría de palo seco

### Import en `app/layout.tsx`
```tsx
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-main',
})
```

### Variables
```css
--font-main: 'Montserrat', sans-serif;
```

### Jerarquía de estilos
| Elemento           | Weight | Tamaño                     | Extras                         |
|--------------------|--------|----------------------------|--------------------------------|
| H1 hero            | 600    | clamp(36px, 5vw, 60px)    | UPPERCASE, letter-spacing .05em |
| H2 sección         | 600    | clamp(28px, 3.5vw, 42px)  | letter-spacing .03em           |
| Overline / chapter | 500    | 11px                       | UPPERCASE, letter-spacing .2em, color dorado |
| Nav items          | 400    | 13px                       | letter-spacing .06em           |
| Body / párrafos    | 300    | 16px                       | line-height 1.75               |
| Botones            | 500    | 11–12px                    | UPPERCASE, letter-spacing .12em |
| Descriptor logo    | 300    | 12px                       | letter-spacing .18em           |

### Regla absoluta
**NUNCA usar font-weight 700 ni 800.** El peso máximo es 600.
La ligereza tipográfica es parte del ADN de la marca.

---

## 5. LOGO — CONSTRUCCIÓN SVG

El isotipo es la L y la M fusionadas en 4 trazos geométricos puros.

```svg
<!-- lm_isotipo-white.svg -->
<svg width="64" height="64" viewBox="0 0 64 64"
     fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- L: vertical + base -->
  <polyline points="4,4 4,60 30,60"
    stroke="white" stroke-width="4.5"
    stroke-linecap="square" stroke-linejoin="miter" fill="none"/>
  <!-- Unión L-M: trazo vertical central -->
  <line x1="30" y1="4" x2="30" y2="60"
    stroke="white" stroke-width="4.5" stroke-linecap="square"/>
  <!-- M: V central -->
  <polyline points="30,4 47,36 64,4"
    stroke="white" stroke-width="4.5"
    stroke-linecap="square" stroke-linejoin="miter" fill="none"/>
  <!-- M: trazo vertical derecho -->
  <line x1="64" y1="4" x2="64" y2="60"
    stroke="white" stroke-width="4.5" stroke-linecap="square"/>
</svg>
```

**CRÍTICO:** `stroke-linecap: square` — NUNCA round. El logo tiene esquinas rectas.

Variantes requeridas:
- `lm_isotipo-white.svg` → stroke white (splash 2, hero, footer)
- `lm_isotipo-color.svg` → stroke #1b4254 (navbar en scroll)
- `lm_logo-white.svg` → isotipo + "LOMELI MORFIN" en blanco, Montserrat 300, letter-spacing .28em
- `lm_logo-color.svg` → igual en color azul marino

---

## 6. REGLAS DE DISEÑO

- **Botones:** `border-radius: 2px` SIEMPRE — nunca más de 3px
- **Cards:** `border-radius: 6px`
- **NUNCA** usar `box-shadow` decorativas en botones ni cards
- **NUNCA** usar blanco puro `#ffffff` como fondo de página — usar `#f5f0e8`
- **Imágenes:** `object-fit: cover`, sin bordes, sin sombras
- **Secciones:** `padding: 110px 0` desktop — `60px 0` mobile
- **Contenedor:** `max-width: 1440px`, `margin: 0 auto`, `padding: 0 6vw`
- **Separadores:** línea `1px solid #c8a020` o whitespace generoso — NUNCA `<hr>` gris
- **Fondos alternos:** secciones impares en `#f5f0e8`, pares en `#e8e0d0`
- **NUNCA** usar parallax (las fotos son corporativas, no de paisaje)
- **NUNCA** animaciones en loop
- **NUNCA** cursor personalizado

---

## 7. TAILWIND CSS v4 — REGLAS DE USO

### Variables de paleta en `globals.css`
Definir en `@theme` — Tailwind v4 es CSS-first, NO usar `tailwind.config.js`:

```css
@theme {
  --color-primary:      #1b4254;
  --color-primary-dark: #0f2535;
  --color-primary-mid:  #2b5a72;
  --color-gold:         #c8a020;
  --color-gold-dark:    #a08010;
  --color-bg:           #f5f0e8;
  --color-bg-alt:       #e8e0d0;
  --font-main: 'Montserrat', sans-serif;
}
```

Usar como clases: `bg-primary`, `text-gold`, `bg-bg`, `font-main`.

### Lo que va en Tailwind (clases utilitarias)
- Layout: `flex`, `grid`, `grid-cols-*`, `gap-*`, `max-w-[1440px]`, `mx-auto`
- Espaciado: `px-[6vw]`, `py-[110px]`, responsive `md:py-[60px]`
- Tipografía: `text-*`, `font-*`, `tracking-*`, `leading-*`
- Responsive: `sm:`, `md:`, `lg:`, `xl:`
- Colores de paleta: `bg-primary`, `text-gold`, etc.
- Hover simple: `hover:bg-primary-mid`, `hover:text-gold`

### Lo que va en `globals.css` como CSS puro (NO Tailwind)
- Las 4 animaciones: `@keyframes clipReveal`, `fadeUp`, `lineWipe`, `barFull`
- Clases `.reveal-title`, `.overline-wrap`, `.stagger-child`, `.stagger-child.visible`
- Splash screens y sus animaciones internas
- `filter: grayscale` en logos
- `::after` del nav item (underline dorado)
- `clip-path` en general

### Restricciones de Tailwind que NO cambian por el ADN de la marca
```
✗ NUNCA rounded-xl ni rounded-2xl en botones — máximo rounded-sm (2px)
✗ NUNCA shadow-* decorativas en cards o botones
✗ NUNCA font-bold ni font-extrabold — máximo font-semibold (600)
✗ NUNCA bg-white como fondo de página — usar bg-bg
✗ NUNCA instalar plugins de Tailwind sin consultar primero
```

---

## 8. SPLASH SCREENS — SECUENCIA DE ENTRADA

El sitio tiene DOS splashes en secuencia. El usuario puede hacer clic para saltarlos.

Implementar como componente `components/Splash.tsx` con `'use client'`. Toda la lógica de secuencia va en `useEffect`.

### Estructura JSX (orden obligatorio)
```tsx
// En app/page.tsx — renderizar antes que el resto del sitio
<Splash />
<main id="site" style={{ opacity: 0 }}>
  <Navbar />
  {/* secciones */}
</main>
```

---

### SPLASH 1 — "Nos estamos renovando" (TEMPORAL)
**Propósito:** Comunicar el relanzamiento de marca al primer acceso.
**Se elimina cuando:** el relanzamiento ya esté posicionado.
**Cómo eliminar:** comentar/borrar el bloque splash-1 en `Splash.tsx` y ajustar los timers.

- **Fondo:** `#1b4254` (azul marino principal)
- **Duración:** 3.5 segundos, luego fade out
- **Contenido y secuencia de animación:**
  1. `0.2s` — eyebrow: "Lomeli Morfin · 2025" (fadeIn, muted, pequeño)
  2. `0.6s` — tag pill: "Nueva era" (fadeUp, borde dorado `#c8a020`)
  3. `1.0s` — headline: `<strong>Nos estamos renovando</strong>` + "una nueva imagen, el mismo compromiso" (fadeUp, strong en 600, resto en 300)
  4. `1.5s` — subtext: "Más de 40 años de experiencia en el sector afianzador" (fadeUp, muted)
  5. `0.3s–3.5s` — barra de progreso dorada recorre el `bottom`

---

### SPLASH 2 — Logo LM (PERMANENTE)
**Propósito:** Identidad de entrada, siempre presente.

- **Fondo:** `#0a0a0a`
- **Duración:** 3 segundos, luego fade out → aparece el sitio
- **Contenido y secuencia de animación:**
  1. `0.2s` — isotipo LM SVG inline, 64–72px (scaleIn: scale .88→1 + opacity)
  2. `0.8s` — "LOMELI MORFIN" Montserrat 300, letter-spacing .28em (fadeUp)
  3. `1.2s` — línea divisora: `width 0 → 130px`, 1px, rgba(255,255,255,.2)
  4. `1.5s` — "Consultores en Fianzas", 12px, muted (fadeUp)
  5. `0.2s–3.0s` — barra de progreso dorada en el `bottom`

---

### Lógica de secuencia (`components/Splash.tsx`)
```tsx
'use client'
import { useEffect, useRef } from 'react'

const SPLASH1_DURATION = 3500
const SPLASH2_DURATION = 3000
const FADE = 700

export default function Splash() {
  const splash1Ref = useRef<HTMLDivElement>(null)
  const splash2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const site = document.getElementById('site') as HTMLElement
    const s1 = splash1Ref.current!
    const s2 = splash2Ref.current!

    function fadeTo(elOut: HTMLElement, elIn: HTMLElement | null, cb?: () => void) {
      elOut.style.transition = `opacity ${FADE}ms ease`
      elOut.style.opacity = '0'
      setTimeout(() => {
        elOut.style.display = 'none'
        if (elIn) {
          elIn.style.display = 'flex'
          void elIn.offsetWidth
          elIn.style.transition = `opacity ${FADE}ms ease`
          elIn.style.opacity = '1'
          elIn.querySelectorAll<HTMLElement>('[data-anim]').forEach(el => el.classList.add('go'))
        }
        cb?.()
      }, FADE)
    }

    const t1 = setTimeout(() => fadeTo(s1, s2), SPLASH1_DURATION)
    const t2 = setTimeout(() => {
      fadeTo(s2, null, () => {
        site.style.transition = `opacity ${FADE}ms ease`
        site.style.opacity = '1'
      })
    }, SPLASH1_DURATION + SPLASH2_DURATION)

    function skipAll() {
      ;[s1, s2].forEach(el => (el.style.display = 'none'))
      site.style.opacity = '1'
    }
    s1.addEventListener('click', skipAll)
    s2.addEventListener('click', skipAll)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      s1.removeEventListener('click', skipAll)
      s2.removeEventListener('click', skipAll)
    }
  }, [])

  return (
    <>
      <div ref={splash1Ref} id="splash-1" className="splash">{/* contenido splash 1 */}</div>
      <div ref={splash2Ref} id="splash-2" className="splash" style={{ display: 'none', opacity: 0 }}>{/* contenido splash 2 */}</div>
    </>
  )
}
```

---

## 9. NAVBAR

- **Posición:** `position: fixed`, `top: 0`, `width: 100%`, `z-index: 1000`
- **Estado inicial** (sobre hero): `background: transparent`, logo blanco, links blancos
- **Al scroll >60px:** `background: rgba(245,240,232,0.97)`, `backdrop-filter: blur(10px)`, logo color, links azul marino
- **Transición:** `all 0.35s ease`
- **Logo:** `lm_logo-white.svg` sobre hero / `lm_logo-color.svg` al scroll
- **Ítems de navegación:** número dorado `(01)` seguido del nombre y slash: `(01) Nosotros/`
- **CTA botón:** "Solicitar cotización" — `background: #c8a020`, `color: #0f2535`, `border-radius: 2px`
- **Hover ítems nav:** `::after` línea dorada `width: 0 → 60%`, `transition: .3s ease`

### React scroll listener (`components/Navbar.tsx`)
```tsx
'use client'
import { useEffect, useRef } from 'react'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () =>
      navRef.current?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return <nav ref={navRef} id="navbar">{/* contenido */}</nav>
}
```

---

## 10. SECCIONES — CONTENIDO COMPLETO

---

### (00) NAVBAR
```
Logo LM | (01) Nosotros/ | (02) Servicios/ | (03) Clientes/ | (04) Cobertura/ | (05) Contacto/ | [Solicitar cotización]
```

---

### (01) HERO — 100vh

- **Fondo:** `public/images/hero/hero_bg.jpg` con overlay `rgba(15,37,53,0.65)`
- **PLACEHOLDER:** `linear-gradient(160deg, #0f2535 0%, #1b4254 60%, #2b5a72 100%)`
- **Overline dorada:** "Desde 1981 · Consultores en Fianzas"
- **H1:** "SOLIDEZ Y CONFIANZA EN CADA FIANZA"
- **Párrafo:** "Especialistas en asesoría, consultoría e intermediación de fianzas con más de 40 años de experiencia en el sector afianzador."
- **Botón primario:** "Conoce nuestros servicios" → `background: #1b4254`
- **Botón outline:** "Contáctanos" → `border: 1.5px solid white`, `color: white`, `background: transparent`

**Fotografía recomendada:** apretón de manos profesional, firma de contrato, reunión de negocios. Iluminación cálida, natural, NO fría.

---

### (02) STATS — Franja de credenciales

- **Fondo:** `#1b4254`
- **Layout:** 4 columnas centradas
- **Contadores animados** (se activan al entrar al viewport con IntersectionObserver en `useEffect`):

| ID           | Valor | Sufijo | Etiqueta              |
|--------------|-------|--------|-----------------------|
| `c-years`    | 40    | +      | Años de experiencia   |
| `c-states`   | 14    | —      | Estados               |
| `c-firms`    | 10    | —      | Afianzadoras          |
| `c-clients`  | 12    | +      | Clientes destacados   |

---

### (03) NOSOTROS

- **Overline + línea dorada:** "Capítulo 1 · Nosotros"
- **H2:** "Más de 40 años respaldando tu patrimonio"
- **Layout:** 2 columnas desktop — texto izquierda, foto derecha
- **Foto:** `public/images/nosotros/nos_equipo.jpg` — PLACEHOLDER: gradiente
- **Fotografía recomendada:** equipo trabajando en oficina, natural, no posada

**Historia (texto exacto):**
> LOMELI MORFIN CONSULTORES es una organización especializada en Asesoría, Consultoría e Intermediación de todo tipo de Fianzas (Administrativas, Judiciales, Fidelidad y de Crédito), contamos con la Cédula de Autorización por parte de la Comisión Nacional de Seguros y Fianzas (SHCP) desde el año de 1981, lo que nos permite contar con una amplia experiencia profesional en el Sector Afianzador para brindar a nuestros Clientes un servicio de calidad y excelencia de acuerdo a sus necesidades.

**Misión** (en bloque con borde izquierdo dorado):
> Lograr a partir del compromiso de todo nuestro Equipo, la atracción y confianza de cada uno de nuestros Clientes, que les permita tener una ventaja competitiva frente a otros creando una total satisfacción.

**Visión:**
> Posicionarnos como LA ORGANIZACIÓN DE TRÁMITE DE FIANZAS más importante a nivel nacional e internacional, ofreciendo una opción de excelencia en servicios de consultoría y asesoría para las Empresas.

**6 Valores** — grid 3×2, cada uno con ícono SVG de línea (`ico_`) + título + descripción corta:

| Ícono             | Valor         | Descripción corta                                      |
|-------------------|---------------|--------------------------------------------------------|
| `ico_innovacion`  | Innovación    | A la vanguardia en estrategias organizacionales        |
| `ico_calidad`     | Calidad       | Satisfacer las más altas exigencias del sector         |
| `ico_puntualidad` | Puntualidad   | La entrega oportuna como base fundamental              |
| `ico_honestidad`  | Honestidad    | Cumplimiento del reglamento interno                    |
| `ico_confianza`   | Confianza     | Seguridad y certeza en cada integrante del equipo      |
| `ico_comunicacion`| Comunicación  | Base que promueve el conocimiento organizacional       |

---

### (04) SERVICIOS

- **Overline + línea dorada:** "Capítulo 2 · Servicios"
- **H2:** "Soluciones para cada necesidad"
- **Layout:** grid 2×2 de cards grandes con imagen de fondo
- **Al hacer clic en una card:** abre modal con descripción completa y subtipos

#### Card (01) — Fianzas de Fidelidad
- **Imagen:** `public/images/servicios/srv_fidelidad.jpg`
- **PLACEHOLDER:** `linear-gradient(135deg, #0f2535, #1b4254)`
- **Descripción:** Garantiza el resarcimiento del daño patrimonial que cause un empleado por la comisión de un delito (Robo, Fraude, Abuso de Confianza o Peculado) en contra de bienes de la empresa.

#### Card (02) — Fianzas Judiciales
- **Imagen:** `public/images/servicios/srv_judiciales.jpg`
- **PLACEHOLDER:** `linear-gradient(135deg, #1b4254, #2b5a72)`
- **Subtipos en modal:**
  - Penales: Libertad Provisional, Libertad Preparatoria, Condena Condicional
  - No Penales: Civiles, Mercantiles, Amparo, Laborales

#### Card (03) — Fianzas Administrativas
- **Imagen:** `public/images/servicios/srv_administrativas.jpg`
- **PLACEHOLDER:** `linear-gradient(135deg, #2b5a72, #1b4254)`
- **Subtipos en modal:** Concurso y Licitación, Anticipo, Cumplimiento, Buena Calidad, Penas Convencionales, Obligaciones Laborales, Inconformidad Fiscal, Convenio de Pagos, Arrendamiento

#### Card (04) — Fianzas de Crédito
- **Imagen:** `public/images/servicios/srv_credito.jpg`
- **PLACEHOLDER:** `linear-gradient(135deg, #0f2535, #c8a020)`
- **Subtipos en modal:** Suministro PEMEX, Suministro ASA, Compra-Venta, Distribución Mercantil

#### Comportamiento hover de cards
```css
.service-card img {
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.service-card:hover img { transform: scale(1.05); }
.service-card .overlay {
  background: rgba(15,37,53,0);
  transition: background 0.4s ease;
}
.service-card:hover .overlay { background: rgba(15,37,53,0.38); }
.service-card .label {
  transform: translateY(6px); opacity: 0.7;
  transition: all 0.35s ease;
}
.service-card:hover .label { transform: translateY(0); opacity: 1; }
```

---

### (05) AFIANZADORAS

- **Fondo:** `#e8e0d0`
- **Overline + línea dorada:** "Capítulo 3 · Respaldo"
- **H2:** "Respaldados por las mejores afianzadoras"
- **Intro:** "Contamos con relación comercial y apoyo de las afianzadoras líderes del sector:"
- **Layout:** grid 5 columnas desktop, 3 mobile, 2 en xs
- **Logos disponibles:** usar `af_nombre.png` cuando existan; placeholder = nombre en texto estilizado
- **Hover:** `filter: grayscale(100%) opacity(0.6)` por defecto → `filter: none` en hover, `transition: filter 0.35s ease`

**Lista de afianzadoras:**
1. ACE Fianzas Monterrey, S.A. → `af_ace.png`
2. Afianzadora Insurgentes, S.A. de C.V. → `af_insurgentes.png`
3. Afianzadora Aserta, S.A. de C.V. → `af_aserta.png`
4. Afianzadora Sofimex, S.A. → `af_sofimex.png`
5. Fianzas Dorama, S.A. de C.V. → `af_dorama.png`
6. Afianzadora Fiducia, S.A. de C.V. → `af_fiducia.png`
7. Liberty Fianzas → `af_liberty.png`
8. Fianzas Atlas, S.A. → `af_atlas.png`
9. Zurich Fianzas México, S.A. de C.V. → `af_zurich.png`
10. Fianzas Guadiana Inbursa, S.A. → `af_inbursa.png`

---

### (06) CLIENTES

- **Misma estructura que Afianzadoras** (fondo alterno `#f5f0e8`)
- **Overline + línea dorada:** "Capítulo 4 · Clientes"
- **H2:** "Empresas que confían en nosotros"

**Lista de clientes:**
1. Abengoa México, S.A. de C.V. → `cl_abengoa.png`
2. Construcciones Metálicas Mexicanas Comemsa, S.A. de C.V. → `cl_comemsa.png`
3. Emerson Process Management, S.A. de C.V. → `cl_emerson.png`
4. Alfa Proveedores y Contratistas, S.A. de C.V. → `cl_alfa-proveedores.png`
5. Equipos y Servicios Vica, S.A. de C.V. → `cl_vica.png`
6. Electelco, S.A. de C.V. → `cl_electelco.png`
7. Multieléctrica Industrial, S.A. de C.V. → `cl_multielectrica.png`
8. Prom/Tec, S.A. de C.V. → `cl_promtec.png`
9. Samson Control, S.A. de C.V. → `cl_samson.png`
10. Consorcio Aristos, S.A. de C.V. → `cl_aristos.png`
11. ISI Mustang Servicios en Ingeniería de México → `cl_isi-mustang.png`
12. Grupo ADO (y sus 103 Empresas Filiales) → `cl_grupo-ado.png`

---

### (07) COBERTURA

- **Fondo:** `#f5f0e8`
- **Overline + línea dorada:** "Capítulo 5 · Cobertura"
- **H2:** "Presencia nacional e internacional"
- **Implementación:** mapa SVG del continente americano (usar SVG libre, no imagen raster)
- **México:** `fill: #1b4254` con 14 marcadores dorados pulsantes
- **Argentina:** `fill: #2b5a72`
- **Resto del continente:** `fill: #d0cfc8`
- **Marcadores:** puntos dorados con animación `pulse` sobre cada estado activo
- **Tooltip en hover:** nombre del estado
- **Contador debajo:** "14 estados · 2 países" (animado al entrar al viewport)

**14 estados activos en México:**
Monterrey · Guadalajara · CDMX · Puebla · Villahermosa ·
Baja California · Veracruz · Chiapas · Estado de México ·
Mérida · Colima · Nayarit · Morelos · Michoacán

---

### (08) CONTACTO — CTA Final

- **Fondo:** `#1b4254`
- **Texto grande:** "¿Listo para tramitar tu fianza?"
- **Subtexto:** "Contáctanos y uno de nuestros especialistas te atenderá a la brevedad."
- **Botón:** "Solicitar cotización" → `background: #c8a020`, `color: #0f2535`

---

### FOOTER

- **Fondo:** `#0f2535`
- **Separador superior:** línea 2px `#c8a020`
- **Logo:** `lm_logo-white.svg`
- **4 columnas:**
  - Logo + descripción corta
  - Navegación: Nosotros / Servicios / Clientes / Cobertura / Contacto
  - Contacto: teléfono, email, dirección
  - Redes sociales + créditos
- **Todo en blanco** sobre fondo oscuro, sin colores adicionales

---

## 11. SISTEMA DE ANIMACIONES

### Filosofía
- Las animaciones **revelan**, no decoran
- Cada elemento anima **una sola vez** al entrar al viewport
- **NUNCA** loops, **NUNCA** animaciones automáticas en sección visible
- Siempre envolver en `@media (prefers-reduced-motion: no-preference)`
- Easing estándar del sitio: `cubic-bezier(0.77, 0, 0.18, 1)`
- IntersectionObserver e instancias de scroll van en `useEffect` con cleanup

---

### Animación 1 — Clip-path reveal (títulos)

```css
@keyframes clipReveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0%   0 0); }
}
.reveal-title {
  animation: clipReveal 1.1s cubic-bezier(0.77, 0, 0.18, 1) forwards;
}
```

**Uso:** H1 del hero (al cargar), H2 de cada sección (IntersectionObserver en `useEffect`)

---

### Animación 2 — Línea dorada + overline

```html
<div class="overline-wrap">
  <div class="gold-line"></div>
  <span class="overline-text">Capítulo 2 · Servicios</span>
</div>
```

```css
.gold-line {
  height: 1px;
  background: #c8a020;
  width: 0;
  transition: width 0.9s cubic-bezier(0.77, 0, 0.18, 1);
}
.overline-text {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.55s ease 0.5s, transform 0.55s ease 0.5s;
}
.overline-wrap.visible .gold-line    { width: 60px; }
.overline-wrap.visible .overline-text { opacity: 1; transform: translateY(0); }
```

**Uso:** antes de cada overline de sección — IntersectionObserver añade clase `.visible`

---

### Animación 3 — Stagger en grids

```css
.stagger-child {
  opacity: 0;
  transform: translateY(24px);
}
@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}
.stagger-child.visible { animation: fadeUp 0.55s ease forwards; }
.stagger-child:nth-child(1).visible { animation-delay: 0.00s; }
.stagger-child:nth-child(2).visible { animation-delay: 0.08s; }
.stagger-child:nth-child(3).visible { animation-delay: 0.16s; }
.stagger-child:nth-child(4).visible { animation-delay: 0.24s; }
.stagger-child:nth-child(5).visible { animation-delay: 0.32s; }
.stagger-child:nth-child(6).visible { animation-delay: 0.40s; }
```

**Uso:** grid de servicios, 6 valores, logos afianzadoras/clientes

---

### Animación 4 — Contadores numéricos

```typescript
function animateCounter(el: HTMLElement, target: number, suffix = '', duration = 1500) {
  const start = performance.now()
  ;(function step(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
    el.textContent = Math.floor(eased * target) + suffix
    if (progress < 1) requestAnimationFrame(step)
  })(performance.now())
}
```

Activar con IntersectionObserver dentro de `useEffect` en `Stats.tsx`.

---

### Microinteracciones CSS puras

```css
/* Cards de servicios — hover */
.service-card { overflow: hidden; }
.service-card img { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
.service-card:hover img { transform: scale(1.05); }

/* Botones — hover */
.btn-primary { transition: background 0.25s ease; }
.btn-primary:hover { background: #2b5a72; }
.btn-gold:hover { background: #a08010; }

/* Nav items — underline dorado */
.nav-item { position: relative; }
.nav-item::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 0; height: 1px; background: #c8a020;
  transition: width 0.3s ease;
}
.nav-item:hover::after { width: 100%; }

/* Logos afianzadoras/clientes — grayscale hover */
.logo-grid img {
  filter: grayscale(100%) opacity(0.6);
  transition: filter 0.35s ease;
}
.logo-grid img:hover { filter: none; }
```

---

## 12. PLACEHOLDERS MIENTRAS NO HAY ASSETS REALES

```css
/* Usar gradientes de la paleta — NO servicios externos */
.placeholder-hero    { background: linear-gradient(160deg, #0f2535 0%, #1b4254 60%, #2b5a72 100%); }
.placeholder-nosotros{ background: linear-gradient(135deg, #1b4254, #2b5a72); }
.placeholder-srv-1   { background: linear-gradient(135deg, #0f2535, #1b4254); }
.placeholder-srv-2   { background: linear-gradient(135deg, #1b4254, #2b5a72); }
.placeholder-srv-3   { background: linear-gradient(135deg, #2b5a72, #1b4254); }
.placeholder-srv-4   { background: linear-gradient(135deg, #0f2535, #c8a020); }
```

**Logos placeholder:** mostrar el nombre de la empresa en texto centrado, `color: #5a6a7a`, dentro de la celda del grid. La estructura JSX/CSS NO debe cambiar cuando lleguen los assets reales — solo se actualizan rutas.

---

## 13. FLUJO DE DESARROLLO — SESIONES RECOMENDADAS

Construir en este orden, una sesión por bloque:

1. **Base:** `globals.css` con `@theme` + reset (box-sizing, margin 0, scroll-behavior smooth) + `app/layout.tsx` con Montserrat + `app/page.tsx` limpio
2. **Splashes:** `components/Splash.tsx` con lógica `useEffect`
3. **Navbar + Hero:** `Navbar.tsx` con scroll listener + `Hero.tsx`
4. **Stats + Nosotros:** `Stats.tsx` con contadores + `Nosotros.tsx` con valores
5. **Servicios:** `Servicios.tsx` con grid de cards + modal de subtipos
6. **Afianzadoras + Clientes:** grids de logos con placeholders
7. **Cobertura:** `Cobertura.tsx` con mapa SVG interactivo
8. **Contacto + Footer:** CTA final + footer completo
9. **Animaciones:** implementar las 4 animaciones en `globals.css` + observers en cada componente
10. **Responsive mobile:** breakpoints, tipografía fluida, grids a 1 columna
11. **Assets reales:** reemplazar placeholders por fotos y logos definitivos
12. **Pulido final:** performance, meta tags, og:image, favicon

---

## 14. LO QUE NO HACER — LISTA ROJA

```
✗ Bootstrap, Foundation u otro framework CSS adicional
✗ jQuery u otras librerías JS pesadas
✗ Pages Router de Next.js — usar solo App Router
✗ tailwind.config.js para definir la paleta — usar @theme en globals.css
✗ font-weight 700 u 800 en cualquier elemento
✗ border-radius > 6px en UI (excepto pills/tags: hasta 20px)
✗ box-shadow decorativas en cards o botones
✗ Fondo blanco puro #ffffff como fondo de página
✗ Parallax en imágenes
✗ Cursor personalizado
✗ Animaciones en loop (excepto el pulse del mapa)
✗ Servicios externos de placeholder (picsum.photos, etc.)
✗ Cambiar la estructura JSX cuando lleguen assets reales
✗ Usar <hr> gris como separador
✗ Sombras en texto (text-shadow)
✗ Más de 3 pesos tipográficos distintos en una misma sección
✗ NUNCA instalar plugins de Tailwind sin consultar primero
```

---

*Documento generado a partir de: Manual de Identidad Gráfica LM, Concentrado de Contenidos, referencia visual verholy.com, y sesión de diseño completa.*
