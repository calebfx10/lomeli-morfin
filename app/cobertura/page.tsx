import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import Cobertura from '@/components/Cobertura'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Cobertura — Lomeli Morfin Consultores en Fianzas',
  description: 'Presencia en 14 estados de México, Argentina, Colombia y España.',
}

export default function CoberturaPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Nuestra Cobertura"
          title="Presencia nacional e internacional"
          subtitle="14 estados en México y presencia en Argentina, Colombia y España, respaldados por las principales afianzadoras del sector."
          breadcrumb="Cobertura"
        />
        <Cobertura />
      </main>
      <Footer />
    </>
  )
}
