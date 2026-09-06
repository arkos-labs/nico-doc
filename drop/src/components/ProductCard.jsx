export default function ProductCard({ product, navigate, addToCart }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)
  return (
    <article
      onClick={() => navigate('product', product)}
      style={{
        background: '#fff',
        border: '1px solid rgba(196,150,106,0.15)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(196,150,106,0.12)'
        e.currentTarget.style.borderColor = 'rgba(196,150,106,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(196,150,106,0.12)'
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '240px', background: '#151323' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
          decoding="async"
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {product.badge && (
            <span style={{
              background: '#C4966A',
              color: '#fff',
              fontSize: '0.58rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              fontFamily: "'Outfit', sans-serif",
            }}>
              {product.badge}
            </span>
          )}
          <span style={{
            background: 'rgba(196,150,106,0.18)',
            color: '#C4966A',
            border: '1px solid rgba(196,150,106,0.3)',
            fontSize: '0.58rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '4px 8px',
            fontFamily: "'Outfit', sans-serif",
          }}>
            -{discount}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.62rem',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#C4966A',
          margin: 0,
        }}>
          {product.category}
        </p>
        <h3 style={{
          fontFamily: "'Cormorant Garant', Georgia, serif",
          fontSize: '1.3rem',
          fontWeight: 400,
          color: '#18152E',
          margin: 0,
          lineHeight: 1.2,
        }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#C4966A', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
          </span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.65rem', color: '#7A758E' }}>
            ({product.reviews})
          </span>
        </div>

        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div>
            <span style={{
              fontFamily: "'Cormorant Garant', Georgia, serif",
              fontSize: '1.4rem',
              fontWeight: 600,
              color: '#18152E',
            }}>
              {product.price.toFixed(2)} €
            </span>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.78rem',
              color: '#7A758E',
              textDecoration: 'line-through',
              marginLeft: '8px',
            }}>
              {product.originalPrice.toFixed(2)} €
            </span>
          </div>
          <button
            onClick={e => { e.stopPropagation(); addToCart(product) }}
            style={{
              background: '#C4966A',
              color: '#fff',
              border: 'none',
              padding: '10px 16px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            aria-label={`Ajouter ${product.name} au panier`}
          >
            + Panier
          </button>
        </div>
      </div>
    </article>
  )
}
