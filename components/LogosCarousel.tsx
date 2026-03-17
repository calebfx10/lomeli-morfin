import Image from 'next/image'

const LOGOS = [
  { src: '/logos/clientes/cl_abengoa.png',       alt: 'Abengoa' },
  { src: '/logos/clientes/cl_ado.png',           alt: 'Grupo ADO' },
  { src: '/logos/clientes/cl_alfaProveedoresyContratistas.png', alt: 'Alfa Proveedores' },
  { src: '/logos/clientes/cl_comemsa.png',       alt: 'Comemsa' },
  { src: '/logos/clientes/cl_electelco.png',     alt: 'Electelco' },
  { src: '/logos/clientes/cl_emerson.png',       alt: 'Emerson' },
  { src: '/logos/clientes/cl_meiTelecom.png',    alt: 'MEI Telecom' },
  { src: '/logos/clientes/cl_promtec.png',       alt: 'Promtec' },
  { src: '/logos/clientes/cl_samson.jpeg',       alt: 'Samson Control' },
  { src: '/logos/clientes/cl_vica.png',          alt: 'Vica' },
]

export default function LogosCarousel() {
  const doubled = [...LOGOS, ...LOGOS]

  return (
    <section className="logos-carousel-section">
      <p className="logos-carousel-label">Empresas que confían en nosotros</p>
      <div className="logos-carousel-track-wrap">
        <div className="logos-carousel-track">
          {doubled.map((logo, i) => (
            <div key={i} className="logos-carousel-item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={38}
                className="logos-carousel-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
