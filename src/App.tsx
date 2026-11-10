import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Hero from './sections/hero.tsx'
import Navbar from './sections/navbar.tsx'
function App() {
  const [language, setLanguage] = useState("en");
  return (
    <>
      <Hero language={language}/>
            <Navbar onLanguageChange={setLanguage} language={language}/>

      {/* <Hero language={language}/> */}
    </>
  )
}

export default App
