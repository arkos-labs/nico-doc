// Routeur léger basé sur l'API History — fournit une URL indexable par page.

export const PAGES = {
  home: '/',
  catalogue: '/catalogue',
  journal: '/journal',
  about: '/histoire',
  contact: '/contact',
  faq: '/faq',
  mentions: '/mentions-legales',
  cgv: '/cgv',
  privacy: '/confidentialite',
  checkout: '/commande',
  success: '/commande/succes',
  admin: '/admin',
  track: '/suivi-commande',
}

// URL absolue de production (à remplacer par le vrai domaine).
export const SITE_URL = 'https://kohi.fr'

export function pathFor(page, data) {
  if (page === 'product' && data && data.id != null) return `/produit/${data.id}`
  return PAGES[page] || '/'
}

export function parsePath(pathname) {
  const clean = (pathname || '/').split('?')[0]
  const m = clean.match(/^\/produit\/(\d+)$/)
  if (m) return { page: 'product', id: Number(m[1]) }
  for (const [page, p] of Object.entries(PAGES)) {
    if (p === clean) return { page, id: null }
  }
  return { page: 'home', id: null }
}
