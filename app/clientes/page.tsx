import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import Clientes from '@/components/Clientes'
import Afianzadoras from '@/components/Afianzadoras'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Clientes y Afianzadoras — Lomeli Morfin Consultores en Fianzas',
  description: 'Empresas que confían en Lomeli Morfin y afianzadoras con las que trabajamos.',
}

export default function ClientesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Quiénes Confían en Nosotros"
          title="Clientes y Alianzas"
          subtitle="Más de 40 años construyendo relaciones de confianza con empresas líderes y las mejores afianzadoras del sector."
          breadcrumb="Clientes"
        />
        <Clientes />
        <Afianzadoras />
      </main>
      <Footer />
    </>
  )
}
