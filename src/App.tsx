import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Hero from './sections/hero.tsx'
import Navbar from './sections/navbar.tsx'
import MapViewer from './sections/map.tsx'
// import MapViewerTest from './sections/test.tsx'
import Footer from './sections/footer.tsx'
import MapPage from './sections/mapPage.tsx'

function App() {
  const [language, setLanguage] = useState("en");
  const [mode,setMode]=useState('map');
  return (
    <>
    {/* <MapViewertest language='en' /> */}
      {/* <Hero language={language}/> */}
      <Navbar onLanguageChange={setLanguage} language={language} active={"#map"}/>
      {mode==='home'?
      (
      <>
        <Hero language={language}/>
        <MapViewer language={language}/>
      </>
      ):
      mode==='map'?
      (<>
      <MapPage/>
      </>):
      
      (<></>)
      }
      {/* <MapViewerTest language={language}/> */}
      <Footer/>
    </>
  )
}

export default App
