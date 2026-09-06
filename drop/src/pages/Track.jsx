import React, { useState } from 'react'

const S = { fontFamily: "'DM Sans', sans-serif" }
const P = { fontFamily: "'Playfair Display', serif" }
const dark    = '#1A1A1A'
const matcha  = '#6B8E5A'
const cream   = '#FAF6F1'
const stone   = '#8A8278'

const steps = [
  { id: 'confirmed', label: 'Commande confirmée' },
  { id: 'prep', label: 'En préparation' },
  { id: 'shipped', label: 'Expédiée' },
  { id: 'transit', label: 'En transit' },
  { id: 'delivered', label: 'Livrée' }
]

export default function Track() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!orderId || !email) {
      setError("Veuillez remplir tous les champs.")
      return
    }
    setLoading(true)
    setError(null)
    setTimeout(() => {
      setLoading(false)
      setResult({
        currentStep: 3,
        message: "Votre colis est actuellement en transit dans notre réseau logistique international.",
        date: new Date().toLocaleDateString('fr-FR')
      })
    }, 1500)
  }

  return (
    <main style={{ background: cream, paddingTop: '100px', minHeight: '100vh' }}>
      <section style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <p style={{
          ...S, fontSize: '0.65rem', fontWeight: 600,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: matcha, marginBottom: '24px', textAlign: 'center'
        }}>
          Suivi de Commande
        </p>
        
        <h1 style={{
          ...P,
          fontSize: 'clamp(2.2rem, 5vw, 3rem)',
          fontWeight: 400,
          color: dark,
          lineHeight: 1,
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          Où est mon colis ?
        </h1>

        {!result ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', borderRadius: '4px' }}>
            {error && (
              <div style={{ ...S, fontSize: '0.8rem', color: '#DC2626', background: '#FEF2F2', padding: '12px', border: '1px solid #DC2626', borderRadius: '2px' }}>
                {error}
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ ...S, fontSize: '0.8rem', color: dark, fontWeight: 500 }}>Numéro de commande</label>
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="ex: #1024"
                style={{ ...S, padding: '12px', border: `1px solid rgba(26,26,26,0.2)`, outline: 'none', borderRadius: '2px' }} 
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ ...S, fontSize: '0.8rem', color: dark, fontWeight: 500 }}>Email utilisé lors de la commande</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ ...S, padding: '12px', border: `1px solid rgba(26,26,26,0.2)`, outline: 'none', borderRadius: '2px' }} 
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              style={{
                ...S, fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                background: matcha, color: cream, padding: '16px', border: 'none', cursor: loading ? 'wait' : 'pointer',
                marginTop: '10px', opacity: loading ? 0.7 : 1, borderRadius: '2px',
              }}
            >
              {loading ? 'Recherche en cours...' : 'Suivre mon colis'}
            </button>
          </form>
        ) : (
          <div style={{ background: '#fff', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <div>
                <h3 style={{ ...S, fontSize: '1.2rem', color: dark, margin: '0 0 8px' }}>Commande {orderId}</h3>
                <p style={{ ...S, fontSize: '0.8rem', color: stone, margin: 0 }}>Mise à jour le {result.date}</p>
              </div>
              <button 
                onClick={() => setResult(null)}
                style={{ ...S, fontSize: '0.75rem', background: 'none', border: 'none', color: matcha, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Nouvelle recherche
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {steps.map((step, index) => {
                const isActive = index <= result.currentStep
                const isCurrent = index === result.currentStep
                return (
                  <div key={step.id} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ 
                      width: '24px', height: '24px', 
                      borderRadius: '50%', 
                      background: isActive ? matcha : '#E7E5E4',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: cream, flexShrink: 0, position: 'relative'
                    }}>
                      {isActive && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {index < steps.length - 1 && (
                        <div style={{
                          position: 'absolute', top: '24px', left: '11px',
                          width: '2px', height: '30px',
                          background: index < result.currentStep ? matcha : '#E7E5E4'
                        }} />
                      )}
                    </div>
                    <div>
                      <h4 style={{ ...S, fontSize: '0.9rem', color: isActive ? dark : stone, margin: '2px 0 4px', fontWeight: isCurrent ? 600 : 400 }}>
                        {step.label}
                      </h4>
                      {isCurrent && (
                        <p style={{ ...S, fontSize: '0.8rem', color: stone, margin: 0, lineHeight: 1.5 }}>
                          {result.message}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div style={{ marginTop: '50px', padding: '20px', background: cream, textAlign: 'center', borderRadius: '4px' }}>
              <p style={{ ...S, fontSize: '0.75rem', color: stone, margin: 0, lineHeight: 1.6 }}>
                Besoin d'aide avec votre commande ?<br />
                <span style={{ color: dark, fontWeight: 500 }}>Contactez notre service client</span>
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
