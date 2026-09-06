import React, { useEffect } from 'react'

const M = { fontFamily: "'DM Sans', sans-serif" }
const C = { fontFamily: "'Playfair Display', serif" }
const dark  = '#1A1A1A'
const gold  = '#6B8E5A'
const cream = '#FAF6F1'
const stone = '#8A8278'

export default function Success({ navigate, clearCart }) {
  useEffect(() => {
    // Vider le panier dès que la page de succès est affichée
    clearCart()
  }, [clearCart])

  return (
    <div style={{ background: cream, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px' }}>
      <div style={{ maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '50%', background: '#F0EBE3', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1 style={{ ...C, fontSize: '3.5rem', color: dark, marginBottom: '24px', lineHeight: 1.1, fontStyle: 'italic' }}>
          Merci pour votre commande
        </h1>
        
        <p style={{ ...M, fontSize: '0.9rem', color: stone, lineHeight: 1.8, marginBottom: '40px', fontWeight: 300 }}>
          Votre paiement a bien été traité. Nous préparons avec soin votre commande et vous recevrez très prochainement un e-mail avec vos informations de suivi.
        </p>

        <button
          onClick={() => {
            // Nettoyer l'URL
            window.history.replaceState({}, document.title, window.location.pathname)
            navigate('catalogue')
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.86'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          style={{
            background: dark, color: cream, border: 'none', cursor: 'pointer',
            ...M, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '16px 32px', transition: 'opacity 0.2s',
          }}
        >
          Retour à la collection
        </button>
      </div>
    </div>
  )
}
