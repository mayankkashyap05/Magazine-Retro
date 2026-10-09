import React from 'react'
import ReactDOM from 'react-dom/client'

/* Flag read by the shared hooks (see lib/hooks.jsx). Set before any render. */
window.__ENIAC_PRINT__ = true

/* self-hosted typefaces — same set as the website */
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'
import '@fontsource-variable/archivo'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'

import '../styles/index.css'
import './print.css'
import PrintEdition from './PrintEdition.jsx'

const params = new URLSearchParams(window.location.search)
let pages = {}
try {
  pages = JSON.parse(params.get('pages') || '{}')
} catch {
  pages = {}
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrintEdition only={params.get('only')} pages={pages} />
  </React.StrictMode>
)
