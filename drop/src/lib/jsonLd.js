import { SITE_URL } from './router'

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KŌHI',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: 'Le rituel du café et du matcha sublimé. Bouilloires artisanales, accessoires de préparation, outils de barista.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'fr',
    },
  }
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KŌHI',
    url: SITE_URL,
    inLanguage: 'fr-FR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/catalogue?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function product(p) {
  const price = Number(p.price)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.image.startsWith('http') ? p.image : `${SITE_URL}${p.image}`,
    sku: String(p.id),
    brand: { '@type': 'Brand', name: 'KŌHI' },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/produit/${p.id}`,
      priceCurrency: 'EUR',
      price: price.toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      ...(p.originalPrice ? { priceValidUntil: '2026-12-31' } : {}),
    },
    ...(p.rating && p.reviews
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(p.rating),
            reviewCount: String(p.reviews),
          },
        }
      : {}),
  }
}

export function breadcrumb(p) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'La Boutique', item: SITE_URL + '/catalogue' },
      { '@type': 'ListItem', position: 3, name: p.name, item: `${SITE_URL}/produit/${p.id}` },
    ],
  }
}

export function faqPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}
