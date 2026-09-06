import { useEffect } from 'react'
import { products } from '../data'

const M = { fontFamily: "'DM Sans', sans-serif" }
const C = { fontFamily: "'Playfair Display', serif" }
const dark  = '#1A1A1A'
const gold  = '#6B8E5A'
const cream = '#FAF6F1'
const stone = '#8A8278'
const warm  = '#F0EBE3'

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const TruckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
)

export default function Cart({ cart, removeFromCart, updateQty, setCartOpen, navigate, addToCart }) {
  const format99 = (val) => (Math.floor(val) + 0.99).toFixed(2)
  
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)
  const freeShipping = total >= 50

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>

      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(26,26,26,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'relative',
        background: '#1A1A1A',
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        boxShadow: '-24px 0 80px rgba(0,0,0,0.4)',
        zIndex: 1,
        overflow: 'hidden',
        borderLeft: '1px solid rgba(255,255,255,0.08)'
      }}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div style={{
          padding: '24px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <h2 style={{
            ...C, fontSize: '1.05rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: cream, margin: 0,
          }}>
            VOTRE PANIER <span style={{ color: 'rgba(250,246,241,0.5)', fontSize: '0.8rem', marginLeft: '4px' }}>({count})</span>
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            style={{
              width: '32px', height: '32px',
              background: 'transparent', color: cream,
              border: `1px solid rgba(255,255,255,0.15)`,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'background 0.2s',
              flexShrink: 0,
            }}
            aria-label="Fermer le panier"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Shipping Banner */}
        <div style={{
          background: '#1F3A24',
          padding: '12px 24px',
          display: 'flex', alignItems: 'center', gap: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <span style={{ color: '#78A36F', display: 'flex', alignItems: 'center' }}><TruckIcon /></span>
          <span style={{ ...M, fontSize: '0.75rem', color: '#78A36F', fontWeight: 500 }}>
            {freeShipping ? 'Livraison offerte' : `Livraison offerte dès 50 €`}
          </span>
        </div>

        {/* ── Items ──────────────────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ ...C, fontSize: '1.2rem', color: 'rgba(250,246,241,0.5)' }}>Votre panier est vide</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <CartItem
                key={item.id}
                item={item}
                isLast={i === cart.length - 1}
                updateQty={updateQty}
                removeFromCart={removeFromCart}
              />
            ))
          )}

          {/* ── Upsells ──────────────────────────────────────────────────── */}
          {cart.some(i => i.id === 101) && products.filter(p => p.id !== 101 && !cart.some(ci => ci.id === p.id)).length > 0 && (
            <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
              <h3 style={{
                ...C, fontSize: '1.05rem', color: 'rgba(250,246,241,0.5)', fontStyle: 'italic',
                marginBottom: '16px', fontWeight: 400
              }}>
                Complétez votre rituel
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {products.filter(p => p.id !== 101 && !cart.some(ci => ci.id === p.id)).map(upsell => (
                  <div key={upsell.id} style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    border: '1px solid rgba(255,255,255,0.06)', padding: '12px', borderRadius: '12px'
                  }}>
                    <div style={{ width: '56px', height: '56px', flexShrink: 0, background: cream, borderRadius: '8px', padding: '4px' }}>
                      <img src={upsell.image} alt={upsell.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ ...M, fontSize: '0.8rem', fontWeight: 600, color: cream, margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{upsell.name}</p>
                      <p style={{ ...M, fontSize: '0.75rem', color: 'rgba(250,246,241,0.5)', margin: 0 }}>{upsell.price.toFixed(2).replace('.', ',')} €</p>
                    </div>
                    <button 
                      onClick={() => addToCart(upsell)}
                      style={{
                        background: cream, color: dark,
                        ...M, fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                        padding: '10px 16px', border: 'none', cursor: 'pointer', borderRadius: '6px'
                      }}
                    >
                      Ajouter
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        {cart.length > 0 && (
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '24px',
            flexShrink: 0,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '20px',
            }}>
              <span style={{
                ...M, fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,246,241,0.5)',
              }}>
                TOTAL
              </span>
              <span style={{
                ...C, fontSize: '1.4rem', fontWeight: 700, color: cream,
              }}>
                {format99(total).replace('.', ',')} €
              </span>
            </div>

            <button
              onClick={() => {
                setCartOpen(false)
                navigate('checkout')
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              style={{
                width: '100%',
                background: cream, color: dark,
                border: 'none', cursor: 'pointer', borderRadius: '8px',
                ...M, fontSize: '0.8rem', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                padding: '16px',
                transition: 'opacity 0.2s',
              }}
            >
              Passer la commande
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CartItem({ item, isLast, updateQty, removeFromCart }) {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      paddingBottom: '24px',
      marginBottom: isLast ? 0 : '24px',
    }}>
      {/* Thumbnail */}
      <div style={{
        width: '80px', height: '80px',
        flexShrink: 0, overflow: 'hidden',
        background: cream, borderRadius: '12px', padding: '8px'
      }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{
          ...C, fontSize: '1.05rem', fontWeight: 500,
          color: cream, margin: '0 0 16px', lineHeight: 1.2,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.name}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Qty controls */}
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '2px 8px' }}>
            <button
              onClick={() => {
                if (item.qty > 1) updateQty(item.id, item.qty - 1)
                else removeFromCart(item.id)
              }}
              style={{
                width: '24px', height: '24px',
                background: 'none', border: 'none',
                fontSize: '1rem', cursor: 'pointer',
                color: 'rgba(250,246,241,0.5)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >−</button>
            <span style={{
              width: '24px', textAlign: 'center',
              ...M, fontSize: '0.85rem', fontWeight: 600, color: cream,
            }}>
              {item.qty}
            </span>
            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              style={{
                width: '24px', height: '24px',
                background: 'none', border: 'none',
                fontSize: '1rem', cursor: 'pointer',
                color: 'rgba(250,246,241,0.5)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >+</button>
          </div>

          {/* Price */}
          <p style={{
            ...M, fontSize: '1rem', fontWeight: 600,
            color: cream, margin: 0,
          }}>
            {(Math.floor(item.price * item.qty) + 0.99).toFixed(2).replace('.', ',')} €
          </p>
        </div>
      </div>
    </div>
  )
}
