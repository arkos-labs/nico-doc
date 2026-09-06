import { useEffect } from 'react'
import { SITE_URL } from '../lib/router'

const DEFAULT_TITLE = 'Bouilloire Céramique Café & Matcha | KŌHI'
const DEFAULT_DESC = 'Bouilloire en céramique artisanale, mousseur à lait et kit matcha. Sublimez votre rituel café et thé. Livraison offerte dès 60€.'
const DEFAULT_IMAGE = `${SITE_URL}/hero_new.jpg`

function upsertMeta(attr, name, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({
  title,
  description,
  keywords,
  canonical,
  image,
  noindex = false,
  jsonLd = [],
}) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE
    const url = SITE_URL + (canonical || '/')
    const img = image || DEFAULT_IMAGE

    upsertMeta('name', 'description', description || DEFAULT_DESC)
    // Les mots-clés (meta keywords) ont peu de poids pour Google,
    // mais utiles comme grille interne et pour Bing/moteurs secondaires.
    upsertMeta('name', 'keywords', keywords || '')
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertLink('canonical', url)

    // Open Graph / Twitter
    upsertMeta('property', 'og:title', title || DEFAULT_TITLE)
    upsertMeta('property', 'og:description', description || DEFAULT_DESC)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', img)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'KŌHI')
    upsertMeta('property', 'og:locale', 'fr_FR')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title || DEFAULT_TITLE)
    upsertMeta('name', 'twitter:description', description || DEFAULT_DESC)
    upsertMeta('name', 'twitter:image', img)

    // Données structurées JSON-LD
    document.head.querySelectorAll('script[data-seo-jsonld]').forEach(s => s.remove())
    jsonLd.forEach(obj => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.setAttribute('data-seo-jsonld', 'true')
      s.textContent = JSON.stringify(obj)
      document.head.appendChild(s)
    })
  }, [title, description, keywords, canonical, image, noindex, jsonLd])

  return null
}
