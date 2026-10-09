/* ============================================================
   ENIAC print edition — pagination segments (shared by the app and the
   export script). Order here is the order of the final PDF.
   Each segment is a named CSS page: it always starts on a new sheet and
   carries its own running head, so the PDF folios are automatic.
   ============================================================ */

export const SEGMENTS = [
  { key: 'cover', id: 'print-cover', page: 'cover', route: null },
  { key: 'contents', id: 'print-contents', page: 'frontmatter', route: null },
  { key: 'front', id: 'print-front', page: 'front', route: '/' },
  { key: 'timeline', id: 'story-01', page: 'story-01', route: '/timeline' },
  { key: 'eniac', id: 'story-02', page: 'story-02', route: '/eniac' },
  { key: 'bca', id: 'story-03', page: 'story-03', route: '/bca' },
  { key: 'cyber', id: 'story-04', page: 'story-04', route: '/cyber' },
  { key: 'ai', id: 'story-05', page: 'story-05', route: '/ai' },
  { key: 'games', id: 'story-06', page: 'story-06', route: '/games' },
  { key: 'colophon', id: 'print-colophon', page: 'colophon', route: null },
]

/* Route (e.g. "/eniac") → segment id, used to turn website links into PDF-internal links. */
export const routeToSegmentId = (href) => {
  const path = href.split(/[?#]/)[0] || '/'
  const seg = SEGMENTS.find((s) => s.route === path)
  return seg ? seg.id : null
}
