import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'
import '@fontsource-variable/archivo'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'

import '../styles/index.css'
import './print.css'

import PrintEdition from './PrintEdition.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrintEdition />
  </React.StrictMode>
)

// Signal that fonts and images are ready for PDF export
if (typeof window !== 'undefined') {
  window.__ENIAC_PRINT_READY__ = false

  async function waitForAssets() {
    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready
      }
      const imgs = Array.from(document.images)
      await Promise.all(imgs.map(img => {
        if (img.complete) return Promise.resolve()
        return new Promise((res) => {
          img.addEventListener('load', res, { once: true })
          img.addEventListener('error', res, { once: true })
          setTimeout(res, 5000)
        })
      }))
      // Extra delay for layout stability
      await new Promise(r => setTimeout(r, 800))
      window.__ENIAC_PRINT_READY__ = true
      document.body.classList.add('print-ready')
      console.log('ENIAC print ready: fonts', document.fonts ? document.fonts.size : 'unknown', 'images', imgs.length)
    } catch (e) {
      console.error('Print ready wait failed', e)
      window.__ENIAC_PRINT_READY__ = true
    }
  }

  waitForAssets()
}
