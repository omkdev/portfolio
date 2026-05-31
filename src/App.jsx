import Navbar from './components/Navbar'
import FeaturedTechnologies from './components/FeaturedTechnologies'
import Footer from './components/Footer'
import About from './sections/About'
import Contact from './sections/Contact'
import Experience from './sections/Experience'
import Hero from './sections/Hero'
import Metrics from './sections/Metrics'
import Principles from './sections/Principles'
import Projects from './sections/Projects'
import Skills from './sections/Skills'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedTechnologies />
        <Metrics />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
