import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Hero from './sections/hero.tsx'
import Navbar from './sections/navbar.tsx'
import MapViewer from './sections/map.tsx'
import Footer from './sections/footer.tsx'
function App() {
  const [language, setLanguage] = useState("en");
  return (
    <>
    {/* <MapViewertest language='en' /> */}
      {/* <Hero language={language}/> */}
      <Navbar onLanguageChange={setLanguage} language={language}/>
      <Hero language={language}/>
      <MapViewer language={language}/>
      <Footer/>
    </>
  )
}

export default App
