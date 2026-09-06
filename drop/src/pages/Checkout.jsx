import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const M = { fontFamily: "'DM Sans', sans-serif" }
const C = { fontFamily: "'Playfair Display', serif" }
const dark  = '#1A1A1A'
const gold  = '#6B8E5A'
const cream = '#FAF6F1'
const stone = '#8A8278'
const warm  = '#F0EBE3'

export default function Checkout({ cart }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'FR'
  })

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const freeShipping = true
  const shippingCost = freeShipping ? 0 : 4.99
  const finalTotal = total + shippingCost

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (cart.length === 0) {
      setError("Votre panier est vide.")
      setLoading(false)
      return
    }

    try {
      // Appel de la fonction Supabase Edge pour créer la session Stripe
      // Note : La Edge Function n'est pas encore déployée, ceci est la logique frontend.
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          cart,
          customerDetails: formData
        }
      })

      if (error) throw error

      if (data?.url) {
        // Redirection vers Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error("L'URL de paiement n'a pas été générée.")
      }
    } catch (err) {
      console.error(err)
      setError("Une erreur est survenue lors de la création de la session de paiement. Vérifiez que la configuration Supabase et Stripe est bien en place.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    ...M, fontSize: '0.8rem', padding: '14px',
    border: '1px solid rgba(28,25,23,0.15)',
    width: '100%', background: cream, color: dark, outline: 'none'
  }

  return (
    <div style={{ background: cream, minHeight: '100vh', paddingTop: '100px' }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '40px',
        display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px'
      }}>
        
        {/* Colonne Formulaire */}
        <div>
          <h1 style={{ ...C, fontSize: '3rem', color: dark, marginBottom: '40px', fontStyle: 'italic' }}>
            Finaliser la commande
          </h1>

          {error && (
            <div style={{ padding: '16px', background: '#FEE2E2', color: '#B91C1C', marginBottom: '24px', ...M, fontSize: '0.8rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ ...M, fontSize: '1rem', fontWeight: 600, color: dark, marginBottom: '16px' }}>Coordonnées</h2>
              <input type="email" name="email" placeholder="Adresse e-mail" required value={formData.email} onChange={handleChange} style={inputStyle} />
            </div>

            <div>
              <h2 style={{ ...M, fontSize: '1rem', fontWeight: 600, color: dark, marginBottom: '16px' }}>Livraison</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <input type="text" name="firstName" placeholder="Prénom" required value={formData.firstName} onChange={handleChange} style={inputStyle} />
                <input type="text" name="lastName" placeholder="Nom" required value={formData.lastName} onChange={handleChange} style={inputStyle} />
              </div>
              <input type="text" name="address" placeholder="Adresse complète" required value={formData.address} onChange={handleChange} style={{ ...inputStyle, marginBottom: '16px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <input type="text" name="postalCode" placeholder="Code postal" required value={formData.postalCode} onChange={handleChange} style={inputStyle} />
                <input type="text" name="city" placeholder="Ville" required value={formData.city} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: dark, color: cream, border: 'none',
                padding: '18px', ...M, fontSize: '0.7rem', fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
                marginTop: '16px'
              }}
            >
              {loading ? 'Redirection...' : 'Payer de manière sécurisée'}
            </button>
          </form>
        </div>

        {/* Colonne Récapitulatif */}
        <div style={{ background: warm, padding: '40px', alignSelf: 'start' }}>
          <h2 style={{ ...M, fontSize: '0.8rem', fontWeight: 600, color: dark, marginBottom: '32px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Résumé de la commande
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ ...C, fontSize: '1.2rem', color: dark, margin: '0 0 4px' }}>{item.name}</p>
                  <p style={{ ...M, fontSize: '0.7rem', color: stone, margin: 0 }}>Qté: {item.qty}</p>
                </div>
                <div style={{ ...M, fontSize: '0.9rem', fontWeight: 600, color: dark }}>
                  {(item.price * item.qty).toFixed(2)} €
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(28,25,23,0.1)', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ ...M, fontSize: '0.8rem', color: stone }}>Sous-total</span>
              <span style={{ ...M, fontSize: '0.8rem', color: dark }}>{total.toFixed(2)} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span style={{ ...M, fontSize: '0.8rem', color: stone }}>Livraison</span>
              <span style={{ ...M, fontSize: '0.8rem', color: dark }}>{freeShipping ? 'Offerte' : `${shippingCost.toFixed(2)} €`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(28,25,23,0.1)', paddingTop: '24px' }}>
              <span style={{ ...M, fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark }}>Total</span>
              <span style={{ ...C, fontSize: '2.4rem', fontWeight: 700, color: dark }}>{finalTotal.toFixed(2)} €</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
