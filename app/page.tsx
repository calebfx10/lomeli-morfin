import Splash from '@/components/Splash'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import NosotrosPreview from '@/components/NosotrosPreview'
import ServiciosPreview from '@/components/ServiciosPreview'
import CoberturaPreview from '@/components/CoberturaPreview'
import Afianzadoras from '@/components/Afianzadoras'
import LogosCarousel from '@/components/LogosCarousel'
import ContactoCTA from '@/components/ContactoCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Splash />
      <main id="site" style={{ opacity: 0 }}>
        <Navbar />
        <Hero />
        <Stats />
        <NosotrosPreview />
        <ServiciosPreview />
        <CoberturaPreview />
        <Afianzadoras />
        <LogosCarousel />
        <ContactoCTA />
      </main>
      <Footer />
    </>
  )
}
