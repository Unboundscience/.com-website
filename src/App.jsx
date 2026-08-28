import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { Breakthrough } from './components/Breakthrough'
import { HowItWorks } from './components/HowItWorks'
import { FocusAreas } from './components/FocusAreas'
import { Stats } from './components/Stats'
import { Growth } from './components/Growth'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
import { Loader } from './components/Loader'
import { usePreloader } from './hooks/usePreloader'
import { PreloadContext } from './context/PreloadContext'

function App() {
  const { progress, isLoaded, images } = usePreloader()

  if (!isLoaded) {
    return <Loader progress={progress} />
  }

  return (
    <PreloadContext.Provider value={images}>
      <Navbar />
      <Hero />
      <Problem />
      <Breakthrough />
      <HowItWorks />
      <FocusAreas />
      <Stats />
      <Growth />
      <CTA />
      <Footer />
    </PreloadContext.Provider>
  )
}

export default App
