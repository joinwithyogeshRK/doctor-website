import { CartProvider } from './context/CartContext'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CartDrawer } from './components/cart/CartDrawer'
import { Hero } from './components/sections/Hero'
import { Appointment } from './components/sections/Appointment'
import { Services } from './components/sections/Services'
import { About } from './components/sections/About'
import { WhyChoose } from './components/sections/WhyChoose'
import { Consultation } from './components/sections/Consultation'
import { Testimonials } from './components/sections/Testimonials'
import { Store } from './components/sections/Store'
import { Payment } from './components/sections/Payment'
import { Clinic } from './components/sections/Clinic'
import { Faq } from './components/sections/Faq'
import { FinalCta } from './components/sections/FinalCta'

export default function App() {
  useSmoothScroll()

  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Appointment />
        <Services />
        <About />
        <WhyChoose />
        <Consultation />
        <Testimonials />
        <Store />
        <Payment />
        <Clinic />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
