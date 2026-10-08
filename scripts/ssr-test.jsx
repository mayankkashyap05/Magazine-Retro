import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Masthead from '../src/components/Masthead.jsx'
import Footer from '../src/components/Footer.jsx'
import Home from '../src/pages/Home.jsx'
import TimelineStory from '../src/pages/TimelineStory.jsx'
import EniacStory from '../src/pages/EniacStory.jsx'
import BcaStory from '../src/pages/BcaStory.jsx'
import CyberStory from '../src/pages/CyberStory.jsx'
import AiStory from '../src/pages/AiStory.jsx'
import GamesStory from '../src/pages/GamesStory.jsx'

const ROUTES = [
  ['/', Home],
  ['/timeline', TimelineStory],
  ['/eniac', EniacStory],
  ['/bca', BcaStory],
  ['/cyber', CyberStory],
  ['/ai', AiStory],
  ['/games', GamesStory],
]

export function run() {
  let failed = 0
  for (const [path, Page] of ROUTES) {
    try {
      const html = renderToString(
        <StaticRouter location={path}>
          <Masthead />
          <main id="main">
            <Page />
          </main>
          <Footer />
        </StaticRouter>
      )
      const checks = {
        hasWordmark: html.includes('ENIAC'),
        length: html.length,
      }
      console.log(`OK   ${path.padEnd(10)} ${checks.length} chars`)
    } catch (err) {
      failed++
      console.error(`FAIL ${path}: ${err.message}`)
    }
  }
  return failed
}
