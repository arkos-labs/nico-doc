import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Seo from './components/Seo'
import { pathFor, parsePath, PAGES, SITE_URL } from './lib/router'
import { organization, website, product, breadcrumb, faqPage } from './lib/jsonLd'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Journal from './pages/Journal'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Mentions from './pages/Mentions'
import CGV from './pages/CGV'
import Privacy from './pages/Privacy'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import Admin from './pages/Admin'
import Track from './pages/Track'
import { products } from './data'

const INITIAL = parsePath(window.location.pathname)
const INITIAL_PRODUCT = INITIAL.page === 'product' && INITIAL.id
  ? products.find(x => x.id === INITIAL.id) || null
  : null

const faqs = [
  { question: 'Quels sont les délais de livraison ?', answer: 'Nos délais de livraison standard sont de 2 à 4 jours ouvrés. Expédition en 24h après confirmation de commande.' },
  { question: 'Comment utiliser un pistolet de massage percussif ?', answer: 'Commencez par les réglages de vitesse les plus bas. Appliquez l\'appareil sur le muscle cible et déplacez-le lentement. Évitez les os et les articulations. 30 à 60 secondes par zone suffit.' },
  { question: 'Puis-je retourner ma commande si je change d\'avis ?', answer: 'Oui, vous disposez de 30 jours après réception pour nous retourner les articles dans leur emballage d\'origine, frais de retour offerts.' },
  { question: 'La garantie couvre-t-elle quoi exactement ?', answer: 'La garantie 2 ans SŌMA couvre tous les défauts de fabrication et de matériaux. SAV réactif 7j/7 par chat et email.' },
]

function seoFor(page, prod) {
  const base = { image: `${SITE_URL}/hero.jpg`, jsonLd: [organization()] }
  switch (page) {
    case 'home':
      return { ...base, title: 'Massage Électronique Premium — Pistolet Percussif & EMS | SŌMA', description: 'Appareils de massage électronique haut de gamme : pistolets percussifs, EMS, masseurs cervicaux. Récupérez 2× plus vite. Livraison gratuite dès 60€.', keywords: 'pistolet massage, massage percussif, EMS massage, masseur cervical, masseur électronique, récupération musculaire', canonical: '/' }
    case 'catalogue':
      return { ...base, title: 'Boutique Massage Électronique — Récupération & Bien-être | SŌMA', description: 'Découvrez nos appareils de massage percussif, EMS et bien-être. Paiement sécurisé, retours 30 jours, garantie 2 ans.', keywords: 'pistolet massage percussif, masseur EMS, masseur nuque épaules, masseur pieds, appareil bien-être', canonical: '/catalogue' }
    case 'product':
      return prod
        ? {
            ...base,
            title: prod.seoTitle || `${prod.name} — SŌMA`,
            description: prod.seoDescription || prod.description,
            keywords: prod.keywords || 'massage électronique, récupération musculaire, bien-être',
            canonical: `/produit/${prod.id}`,
            image: prod.image.startsWith('http') ? prod.image : `${SITE_URL}${prod.image}`,
            jsonLd: [organization(), prod, breadcrumb(prod)],
          }
        : { ...base, noindex: true, title: 'Produit — SŌMA', canonical: '/catalogue' }
    case 'journal':
      return { ...base, title: 'Journal Bien-être — Guides & Conseils Récupération | SŌMA', description: 'Comment optimiser votre récupération, choisir votre pistolet de massage, réduire les douleurs musculaires : guides et conseils SŌMA.', keywords: 'récupération musculaire, courbatures, massage percussif, bien-être, sport', canonical: '/journal' }
    case 'about':
      return { ...base, title: 'Notre Histoire — SŌMA, Technologie Bien-être Premium', description: 'SŌMA, la technologie au service de votre récupération. Des appareils certifiés CE, conçus pour les corps qui exigent le meilleur.', keywords: 'massage électronique premium, récupération sportive, bien-être technologie', canonical: '/histoire' }
    case 'contact':
      return { ...base, title: 'Contact — SŌMA, Service Client Massage & Bien-être', description: 'Une question sur nos appareils de massage ? Contactez l\'équipe SŌMA. Réponse sous 24h, 7j/7.', keywords: 'contact, service client, massage électronique, sōma', canonical: '/contact' }
    case 'faq':
      return { ...base, title: 'FAQ — Livraison, Garantie, Utilisation | SŌMA', description: 'Livraison, garantie 2 ans, utilisation des appareils de massage : toutes les réponses à vos questions SŌMA.', keywords: 'livraison, garantie, massage percussif, pistolet massage', canonical: '/faq', jsonLd: [organization(), website(), faqPage(faqs)] }
    case 'mentions':
      return { ...base, title: 'Mentions Légales — SŌMA', description: 'Mentions légales de la boutique SŌMA.', keywords: 'mentions légales, soma massage', canonical: '/mentions-legales' }
    case 'cgv':
      return { ...base, title: 'Conditions Générales de Vente — SŌMA', description: 'Conditions générales de vente de SŌMA.', keywords: 'cgv, conditions de vente, soma', canonical: '/cgv' }
    case 'privacy':
      return { ...base, title: 'Politique de Confidentialité — SŌMA', description: 'Politique de confidentialité et de protection des données de SŌMA.', keywords: 'confidentialité, données personnelles, soma', canonical: '/confidentialite' }
    case 'checkout':
      return { ...base, noindex: true, title: 'Commande — SŌMA', canonical: '/commande' }
    case 'success':
      return { ...base, noindex: true, title: 'Commande confirmée — SŌMA', canonical: '/commande/succes' }
    case 'track':
      return { ...base, title: 'Suivre ma commande — SŌMA', description: 'Suivez l\'expédition et le statut de votre commande SŌMA en temps réel.', keywords: 'suivi commande, livraison, soma', canonical: '/suivi-commande' }
    case 'admin':
      return { ...base, noindex: true, title: 'Espace Admin — SŌMA', canonical: '/admin' }
    default:
      return { ...base, title: 'SŌMA — Massage Électronique Premium', canonical: '/' }
  }
}

export default function App() {
  const [page, setPage] = useState(INITIAL.page)
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCT)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const target = parsePath(window.location.pathname)
    let p = target.page
    let prod = null
    if (params.get('checkout') === 'success') p = 'success'
    else if (params.get('admin') === 'true' || window.location.pathname === '/admin') p = 'admin'
    if (target.page === 'product' && target.id) {
      prod = products.find(x => x.id === target.id) || null
    }
    setPage(p)
    setSelectedProduct(prod)

    const onPop = () => {
      const r = parsePath(window.location.pathname)
      setPage(r.page)
      setSelectedProduct(r.page === 'product' && r.id ? products.find(x => x.id === r.id) || null : null)
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (p, data = null) => {
    const url = pathFor(p, data)
    if (url !== window.location.pathname + window.location.search) {
      window.history.pushState({ page: p }, '', url)
    }
    setPage(p)
    setSelectedProduct(p === 'product' && data ? data : null)
    window.scrollTo(0, 0)
  }

  const handleOpen = (arg) => {
    if (arg === 'catalogue') {
      navigate('catalogue')
    } else {
      const prod = products.find(p => p.id === arg)
      if (prod) navigate('product', prod)
    }
  }

  const addToCart = (prod, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === prod.id)
      if (existing) return prev.map(i => i.id === prod.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...prod, qty }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }
  const clearCart = () => setCart([])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#F5EFE8', display: 'flex', flexDirection: 'column' }}>
      <Seo {...seoFor(page, selectedProduct)} />
      <Navbar navigate={navigate} cartCount={cartCount} setCartOpen={setCartOpen} currentPage={page} />

      <div style={{ flex: 1 }}>
        {page === 'home' && <Home onAdd={addToCart} onOpen={handleOpen} />}
        {page === 'catalogue' && <Catalogue onAdd={addToCart} onOpen={handleOpen} />}
        {page === 'product' && <ProductPage product={selectedProduct} navigate={navigate} addToCart={addToCart} />}
        {page === 'journal' && <Journal />}
        {page === 'about' && <About />}
        {page === 'contact' && <Contact />}
        {page === 'faq' && <FAQ />}
        {page === 'mentions' && <Mentions />}
        {page === 'cgv' && <CGV />}
        {page === 'privacy' && <Privacy />}
        {page === 'checkout' && <Checkout cart={cart} navigate={navigate} />}
        {page === 'success' && <Success navigate={navigate} clearCart={clearCart} />}
        {page === 'admin' && <Admin />}
        {page === 'track' && <Track />}
      </div>

      {page !== 'admin' && <Footer navigate={navigate} />}

      {cartOpen && page !== 'admin' && (
        <Cart cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} setCartOpen={setCartOpen} navigate={navigate} addToCart={addToCart} />
      )}
    </div>
  )
}
