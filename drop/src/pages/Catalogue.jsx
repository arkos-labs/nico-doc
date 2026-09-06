import { useState } from 'react'
import { products } from '../data'

const S = { fontFamily: "'Outfit', sans-serif" }
const P = { fontFamily: "'Cormorant Garant', Georgia, serif" }
const bg      = '#F5EFE8'
const dark    = '#18152E'
const surface = '#fff'
const heroSurf= '#161430'
const gold    = '#C4966A'
const goldL   = '#DDB880'
const cream   = '#EDE8DF'
const stone   = '#8A7A6E'

const displayProducts = products
const cats = ['Tout', ...new Set(displayProducts.map(p => p.category))]

// ── Grid Card ──────────────────────────────────────────────────────────────
function GridCard({ product, onAdd, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onClick={() => onOpen(product.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: surface,
        border: '1px solid rgba(196,150,106,0.1)',
        borderColor: hovered ? 'rgba(196,150,106,0.3)' : 'rgba(196,150,106,0.1)',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Image wrapper */}
      <div style={{ position: 'relative', paddingBottom: '115%', overflow: 'hidden', background: '#0A0918' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.8s ease',
            filter: 'brightness(0.9)',
          }}
        />

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(6,8,16,0.55)' : 'rgba(6,8,16,0)',
          transition: 'background 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {hovered && (
            <button
              onClick={(e) => { e.stopPropagation(); onAdd(product) }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.86'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              style={{
                background: gold, color: '#fff',
                ...S, fontSize: '0.58rem', fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                padding: '12px 24px',
                border: 'none', cursor: 'pointer',
                animation: 'fadeUp 0.25s ease',
                transition: 'opacity 0.2s ease',
              }}
            >
              + Panier
            </button>
          )}
        </div>

        {/* Badge */}
        {product.badge && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            background: gold, color: '#fff',
            ...S, fontSize: '0.48rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '4px 10px',
          }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '18px' }}>
        <span style={{
          ...S, fontSize: '0.52rem', fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: gold, display: 'block', marginBottom: '6px',
        }}>
          {product.category}
        </span>
        <p style={{
          ...P, fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
          color: cream, margin: '0 0 10px', lineHeight: 1.2,
        }}>
          {product.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{ ...P, fontSize: '1.1rem', fontWeight: 600, color: cream }}>
            {product.price.toFixed(2)} €
          </span>
          {product.originalPrice && (
            <span style={{ ...S, fontSize: '0.72rem', color: stone, textDecoration: 'line-through' }}>
              {product.originalPrice.toFixed(2)} €
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

// ── Hero Product Card ──────────────────────────────────────────────────────
function HeroProductCard({ product, onAdd, onOpen }) {
  const [hovered, setHovered] = useState(false)
  const [btnHov, setBtnHov] = useState(false)

  return (
    <div
      onClick={() => onOpen(product.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '58% 42%',
        height: '500px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid rgba(196,150,106,0.15)',
        borderColor: hovered ? 'rgba(196,150,106,0.35)' : 'rgba(196,150,106,0.15)',
        transition: 'border-color 0.35s ease',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0A0918' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.8s ease',
            filter: 'brightness(0.88)',
          }}
        />
        {product.badge && (
          <span style={{
            position: 'absolute', top: '20px', left: '20px',
            background: gold, color: '#fff',
            ...S, fontSize: '0.48rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '6px 14px',
          }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{
        background: '#0F0D1F',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <span style={{
            ...S, fontSize: '0.52rem', fontWeight: 600,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: gold, display: 'block', marginBottom: '16px',
          }}>
            {product.badge ? `${product.badge} · ${product.category}` : product.category}
          </span>
          <h2 style={{
            ...P,
            fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: cream,
            lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            {product.name}
          </h2>
          <p style={{
            ...S, fontSize: '0.82rem', fontWeight: 300,
            color: stone, lineHeight: 1.75,
            maxWidth: '280px',
          }}>
            {product.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...P, fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 600, color: cream }}>
            {product.price.toFixed(2)} €
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product) }}
            onMouseEnter={() => setBtnHov(true)}
            onMouseLeave={() => setBtnHov(false)}
            style={{
              background: btnHov ? '#DDB880' : gold, color: '#fff',
              ...S, fontSize: '0.62rem', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '14px 32px',
              border: 'none', cursor: 'pointer',
              transition: 'background 0.25s ease',
            }}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Catalogue ──────────────────────────────────────────────────────────────
export default function Catalogue({ onAdd, onOpen }) {
  const [active, setActive] = useState('Tout')
  const [sort, setSort] = useState('default')
  const [hoveredFilter, setHoveredFilter] = useState(null)

  let filtered = active === 'Tout' ? displayProducts : displayProducts.filter(p => p.category === active)
  if (sort === 'prix-croissant') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'prix-decroissant') filtered = [...filtered].sort((a, b) => b.price - a.price)

  const hero = filtered[0]
  const rest = filtered.slice(1)

  return (
    <main style={{ background: bg, paddingTop: '68px' }}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section style={{ background: bg, padding: 'clamp(48px,8vh,80px) clamp(24px,5vw,80px) clamp(40px,6vh,60px)' }}>
        <p style={{
          ...S, fontSize: '0.52rem', fontWeight: 600,
          letterSpacing: '0.32em', textTransform: 'uppercase',
          color: gold, marginBottom: '12px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ width: '24px', height: '1px', background: gold }} />
          SŌMA · {filtered.length} produit{filtered.length > 1 ? 's' : ''}
        </p>
        <h1 style={{
          ...P,
          fontSize: 'clamp(3.5rem, 9vw, 9rem)',
          fontWeight: 300,
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          color: dark,
          margin: '0 0 24px',
        }}>
          La Boutique
        </h1>
        <div style={{ height: '1px', background: gold, marginBottom: '16px', opacity: 0.15 }} />
        <p style={{
          ...S, fontSize: '0.7rem', fontWeight: 300,
          color: stone, letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          Récupération · Bien-être · Performance
        </p>
      </section>

      {/* ── Filters ────────────────────────────────────────────────────── */}
      <div style={{
        padding: '0 clamp(24px,5vw,80px) 32px',
        display: 'flex',
        gap: '32px',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(196,150,106,0.15)',
      }}>
        {/* Category pills */}
        <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
          {cats.map(cat => {
            const isActive = active === cat
            const isHov = hoveredFilter === cat
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                onMouseEnter={() => setHoveredFilter(cat)}
                onMouseLeave={() => setHoveredFilter(null)}
                style={{
                  ...S, fontSize: '0.6rem', fontWeight: 500,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: isActive ? dark : isHov ? dark : stone,
                  padding: '8px 20px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? `2px solid ${gold}` : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'color 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{
            ...S, fontSize: '0.58rem', fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: stone, background: bg,
            border: '1px solid rgba(196,150,106,0.25)',
            padding: '8px 16px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="default">Trier par</option>
          <option value="prix-croissant">Prix croissant</option>
          <option value="prix-decroissant">Prix décroissant</option>
        </select>
      </div>

      {/* ── Hero Product Card ───────────────────────────────────────────── */}
      {hero && (
        <div style={{ padding: 'clamp(32px,5vh,48px) clamp(24px,5vw,80px)' }}>
          <HeroProductCard product={hero} onAdd={onAdd} onOpen={onOpen} />
        </div>
      )}

      {/* ── Product Grid ────────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(80px,12vh,120px)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2px',
          }}>
            {rest.map(p => (
              <GridCard key={p.id} product={p} onAdd={onAdd} onOpen={onOpen} />
            ))}
          </div>
        </section>
      )}

      {rest.length === 0 && hero && (
        <div style={{
          textAlign: 'center', padding: '80px',
          ...S, fontSize: '0.7rem', color: stone, letterSpacing: '0.1em', background: bg,
        }}>
          Un seul produit dans cette catégorie — l'essentiel.
        </div>
      )}

    </main>
  )
}
