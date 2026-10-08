/* ============================================================
   ENIAC — issue & story data model
   Future issues: add a story object + a page; nothing else moves.
   ============================================================ */

export const ISSUE = {
  no: '01',
  vol: '01',
  date: 'SEPTEMBER 2026',
  name: 'THE FIRST ISSUE',
  tagline: 'Technology. People. Ideas.',
}

export const STORIES = [
  {
    no: '01',
    slug: 'timeline',
    nav: 'TIMELINE',
    cat: 'TECHNOLOGY',
    title: 'From Computer to Artificial Intelligence',
    short: 'FROM COMPUTER TO AI',
    dek: '5,000 years of human innovation — from counting to creating.',
    read: '8 MIN',
  },
  {
    no: '02',
    slug: 'eniac',
    nav: 'ENIAC',
    cat: 'ARCHIVE / 1946',
    title: 'ENIAC — The Giant That Started the Digital Age',
    short: 'ENIAC',
    dek: 'Before smartphones, laptops and AI, there was a 30-ton machine that filled a room.',
    read: '9 MIN',
  },
  {
    no: '03',
    slug: 'bca',
    nav: 'BCA',
    cat: 'PEOPLE / EDUCATION',
    title: 'BCA Is Not Just a Degree',
    short: 'BCA',
    dek: 'Not just a degree. A launchpad.',
    read: '6 MIN',
  },
  {
    no: '04',
    slug: 'cyber',
    nav: 'CYBER',
    cat: 'CYBERSECURITY',
    title: 'Cybersecurity — Your One Click Can Cost You Everything',
    short: 'CYBERSECURITY',
    dek: 'In the physical world we don’t open the door to strangers. Online, we sometimes do it with one click.',
    read: '7 MIN',
  },
  {
    no: '05',
    slug: 'ai',
    nav: 'AI',
    cat: 'AI / GENERATION',
    title: 'Young Generation & AI — Boon, Bane or Both?',
    short: 'YOUNG GENERATION & AI',
    dek: 'Our parents grew up with Google. We are growing up with AI.',
    read: '7 MIN',
  },
  {
    no: '06',
    slug: 'games',
    nav: 'GAMES',
    cat: 'HUMAN × MACHINE',
    title: 'Human Brain & Computer Games',
    short: 'BRAIN & GAMES',
    dek: 'You think you control the game. Who is controlling whom?',
    read: '7 MIN',
  },
]

export const storyBySlug = (slug) => STORIES.find((s) => s.slug === slug)
