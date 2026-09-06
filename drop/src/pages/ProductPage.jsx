import { useState } from 'react'
import { products } from '../data'

const M = { fontFamily: "'DM Sans', sans-serif" }
const C = { fontFamily: "'Playfair Display', serif" }
const dark  = '#1A1A1A'
const gold  = '#6B8E5A'
const cream = '#FAF6F1'
const warm  = '#F0EBE3'
const stone = '#8A8278'

const StarFilled = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={gold} stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const TruckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)

const ReturnIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
  </svg>
)

export default function ProductPage({ product, navigate, addToCart }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [qtyHoverMinus, setQtyHoverMinus] = useState(false)
  const [qtyHoverPlus, setQtyHoverPlus] = useState(false)

  if (!product) { navigate('catalogue'); return null }

  const related = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4)
  const allRelated = related.length ? related : products.filter(p => p.id !== product.id).slice(0, 4)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAdd = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div style={{ background: cream, paddingTop: '72px' }}>

      {/* ── SPLIT LAYOUT ───────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        padding: '80px 80px 120px',
        alignItems: 'start',
      }}>

        {/* Left — sticky image */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div style={{ position: 'relative', height: '600px', overflow: 'hidden', background: 'transparent' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', mixBlendMode: 'multiply' }}
            />

          </div>
        </div>

        {/* Right — info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>

          {/* Breadcrumb */}
          <button
            onClick={() => navigate('catalogue')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              ...M, fontSize: '0.6rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: stone,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = dark}
            onMouseLeave={e => e.currentTarget.style.color = stone}
          >
            <BackArrow /> Accueil · {product.category}
          </button>

          {/* Category tag */}
          <p style={{
            ...M, fontSize: '0.52rem', fontWeight: 600,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: gold, margin: 0,
          }}>
            {product.category}
          </p>

          {/* Product name */}
          <h1 style={{
            ...C,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 500,
            fontStyle: 'italic',
            color: dark,
            lineHeight: 1.05,
            margin: 0,
          }}>
            {product.name}
          </h1>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ opacity: i < Math.round(product.rating) ? 1 : 0.2 }}>
                  <StarFilled />
                </span>
              ))}
            </div>
            <span style={{
              ...M, fontSize: '0.65rem', fontWeight: 300,
              color: stone, letterSpacing: '0.04em',
            }}>
              {product.rating} · {product.reviews} avis
            </span>
          </div>

          {/* Separator */}
          <div style={{ height: '1px', background: 'rgba(28,25,23,0.1)' }} />

          {/* Description */}
          <p style={{
            ...M, fontSize: '0.82rem', fontWeight: 300,
            color: stone, lineHeight: 1.8, letterSpacing: '0.02em',
            margin: 0,
          }}>
            {product.description}
          </p>

          {/* Price */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
              <span style={{
                ...C, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 600, color: dark, lineHeight: 1,
              }}>
                {product.price.toFixed(2)} €
              </span>
              {product.originalPrice && (
                <span style={{
                  ...M, fontSize: '0.88rem', color: stone,
                  textDecoration: 'line-through',
                }}>
                  {product.originalPrice.toFixed(2)} €
                </span>
              )}
            </div>
            {product.originalPrice && (
              <p style={{
                ...M, fontSize: '0.62rem', color: gold,
                fontWeight: 500, marginTop: '6px', letterSpacing: '0.06em',
              }}>
                Économie de {(product.originalPrice - product.price).toFixed(2)} €
              </p>
            )}
          </div>

          {/* Qty selector */}
          <div style={{ display: 'flex', gap: '10px', height: '52px' }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              border: `1px solid ${dark}`,
            }}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                onMouseEnter={() => setQtyHoverMinus(true)}
                onMouseLeave={() => setQtyHoverMinus(false)}
                style={{
                  width: '46px', height: '100%',
                  background: qtyHoverMinus ? dark : 'transparent',
                  border: 'none', fontSize: '1.2rem',
                  color: qtyHoverMinus ? cream : dark,
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                −
              </button>
              <span style={{
                width: '40px', textAlign: 'center',
                ...M, fontSize: '0.82rem', fontWeight: 500, color: dark,
              }}>
                {qty}
              </span>
              <button
                onClick={() => setQty(q => q + 1)}
                onMouseEnter={() => setQtyHoverPlus(true)}
                onMouseLeave={() => setQtyHoverPlus(false)}
                style={{
                  width: '46px', height: '100%',
                  background: qtyHoverPlus ? dark : 'transparent',
                  border: 'none', fontSize: '1.2rem',
                  color: qtyHoverPlus ? cream : dark,
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                +
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              onMouseEnter={e => { if (!added) e.currentTarget.style.opacity = '0.86' }}
              onMouseLeave={e => { if (!added) e.currentTarget.style.opacity = '1' }}
              style={{
                flex: 1,
                background: added ? '#166534' : dark,
                color: cream,
                border: 'none', cursor: 'pointer',
                ...M, fontSize: '0.62rem', fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                transition: 'background 0.3s, opacity 0.2s',
              }}
            >
              {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
            </button>
          </div>

          {/* Buy now */}
          <button
            onClick={() => {
              addToCart(product, qty)
              navigate('checkout')
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.86'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            style={{
              width: '100%',
              background: gold, color: cream,
              border: 'none', cursor: 'pointer',
              ...M, fontSize: '0.62rem', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '14px 32px',
              transition: 'opacity 0.2s',
            }}
          >
            Acheter maintenant
          </button>

          {/* Trust row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '24px',
            padding: '20px 0',
            borderTop: '1px solid rgba(28,25,23,0.1)',
            borderBottom: '1px solid rgba(28,25,23,0.1)',
          }}>
            {[
              { icon: <TruckIcon />, label: 'Livraison 48h' },
              { icon: <ReturnIcon />, label: 'Retour 30j' },
              { icon: <ShieldIcon />, label: 'Paiement sécurisé' },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                {icon}
                <span style={{
                  ...M, fontSize: '0.6rem', fontWeight: 500,
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: stone,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <p style={{
            ...M, fontSize: '0.65rem', fontWeight: 300,
            color: stone, lineHeight: 1.7, letterSpacing: '0.04em',
          }}>
            Expédition depuis la France · Emballage soigné · Numéro de suivi inclus
          </p>
        </div>
      </div>

      {/* ── PRODUITS ASSOCIÉS ──────────────────────────────────────────────── */}
      {allRelated.length > 0 && (
        <section style={{ background: warm, padding: '80px 80px' }}>
          {/* Header simplifié */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
              <div style={{ height: '1px', width: '40px', background: gold }} />
              <span style={{
                ...M, fontSize: '0.52rem', letterSpacing: '0.28em',
                textTransform: 'uppercase', color: gold,
              }}>
                Dans la même veine
              </span>
            </div>
            <h2 style={{
              ...C, fontSize: 'clamp(3rem, 5vw, 5.5rem)',
              fontWeight: 400, color: dark, lineHeight: 0.92, margin: 0,
            }}>
              Vous aimerez aussi
            </h2>
            <div style={{ height: '1px', background: 'rgba(28,25,23,0.1)', marginTop: '20px' }} />
          </div>

          {/* Grid 4 col */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {allRelated.map(p => {
              const d = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0
              return (
                <RelatedCard
                  key={p.id}
                  p={p}
                  d={d}
                  navigate={navigate}
                  addToCart={addToCart}
                />
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

function RelatedCard({ p, d, navigate, addToCart }) {
  const [hovered, setHovered] = useState(false)
  return (
    <article
      onClick={() => navigate('product', p)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.4s ease',
      }}
    >
      <div style={{ position: 'relative', paddingBottom: '110%', overflow: 'hidden', background: cream }}>
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.8s ease',
          }}
        />
        {d > 0 && (
          <span style={{
            position: 'absolute', top: '12px', right: '12px',
            ...M, fontSize: '0.48rem', fontWeight: 700,
            background: gold, color: cream,
            padding: '4px 8px',
          }}>
            -{d}%
          </span>
        )}
      </div>
      <div style={{ padding: '14px 0 0' }}>
        <p style={{
          ...M, fontSize: '0.52rem', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: stone, marginBottom: '6px',
        }}>
          {p.category}
        </p>
        <p style={{
          ...C, fontSize: '1.2rem', color: dark,
          marginBottom: '8px', lineHeight: 1.2,
        }}>
          {p.name}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ ...C, fontSize: '1.1rem', fontWeight: 600, color: dark }}>
            {p.price.toFixed(2)} €
          </span>
          <button
            onClick={e => { e.stopPropagation(); addToCart(p) }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            style={{
              ...M, fontSize: '0.56rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: dark, color: cream,
              border: 'none', padding: '8px 14px',
              cursor: 'pointer', transition: 'opacity 0.2s',
            }}
          >
            + Panier
          </button>
        </div>
      </div>
    </article>
  )
}
