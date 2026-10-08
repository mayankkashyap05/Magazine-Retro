import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Masthead from './components/Masthead.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import TimelineStory from './pages/TimelineStory.jsx'
import EniacStory from './pages/EniacStory.jsx'
import BcaStory from './pages/BcaStory.jsx'
import CyberStory from './pages/CyberStory.jsx'
import AiStory from './pages/AiStory.jsx'
import GamesStory from './pages/GamesStory.jsx'

/* Reset scroll on route change */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Masthead />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<TimelineStory />} />
          <Route path="/eniac" element={<EniacStory />} />
          <Route path="/bca" element={<BcaStory />} />
          <Route path="/cyber" element={<CyberStory />} />
          <Route path="/ai" element={<AiStory />} />
          <Route path="/games" element={<GamesStory />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
