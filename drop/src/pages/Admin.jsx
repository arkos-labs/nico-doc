import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const M = { fontFamily: "'DM Sans', sans-serif" }
const C = { fontFamily: "'Playfair Display', serif" }
const dark  = '#1A1A1A'
const gold  = '#6B8E5A'
const cream = '#FAF6F1'
const stone = '#8A8278'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()
    // Mot de passe ultra basique pour cacher la vue (à changer selon vos préférences)
    if (password === 'dropadmin') {
      setIsAuthenticated(true)
    } else {
      alert('Mot de passe incorrect')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error(err)
      setError(`Erreur Supabase: ${err.message || JSON.stringify(err)}`)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div style={{ background: cream, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <h1 style={{ ...C, color: dark, fontSize: '2rem', marginBottom: '24px' }}>Espace Admin</h1>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '12px', border: '1px solid #ddd', width: '250px', marginBottom: '16px', ...M }}
          />
          <br />
          <button type="submit" style={{ background: dark, color: cream, padding: '12px 24px', border: 'none', cursor: 'pointer', ...M }}>
            Connexion
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ background: cream, minHeight: '100vh', padding: '60px 40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ ...C, fontSize: '2.5rem', color: dark, margin: 0 }}>Tableau de bord des Commandes</h1>
          <button onClick={fetchOrders} style={{ background: 'transparent', border: `1px solid ${stone}`, padding: '8px 16px', cursor: 'pointer', ...M, color: dark }}>
            Actualiser
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <p style={{ ...M }}>Chargement des commandes...</p>}

        {!loading && orders.length === 0 && (
          <p style={{ ...M, color: stone }}>Aucune commande pour le moment.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ background: '#fff', border: '1px solid rgba(28,25,23,0.1)', padding: '24px', display: 'flex', gap: '24px' }}>
              
              {/* Infos Client */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ ...M, fontSize: '1.1rem', fontWeight: 600, color: dark, margin: 0 }}>
                    Commande de {order.customer_name}
                  </h3>
                  <span style={{ 
                    background: order.status === 'payé' ? '#D1FAE5' : '#FEF3C7', 
                    color: order.status === 'payé' ? '#065F46' : '#D97706', 
                    padding: '4px 8px', borderRadius: '4px', ...M, fontSize: '0.7rem', fontWeight: 600 
                  }}>
                    {order.status === 'payé' ? 'PAYÉ ✅' : order.status}
                  </span>
                </div>
                
                <p style={{ ...M, fontSize: '0.85rem', color: stone, margin: '0 0 8px' }}>
                  <strong>Email :</strong> {order.customer_email}
                </p>
                <div style={{ ...M, fontSize: '0.85rem', color: stone, background: '#F5F5F5', padding: '12px', borderRadius: '4px' }}>
                  <strong>Adresse à copier pour AliExpress :</strong><br />
                  {order.customer_name}<br />
                  {order.customer_address}
                </div>
                <p style={{ ...M, fontSize: '0.9rem', color: dark, marginTop: '16px', fontWeight: 600 }}>
                  Total payé : {order.total_amount.toFixed(2)} €
                </p>
              </div>

              {/* Produits à commander */}
              <div style={{ flex: 1, borderLeft: '1px solid rgba(28,25,23,0.1)', paddingLeft: '24px' }}>
                <h4 style={{ ...M, fontSize: '0.9rem', color: dark, marginBottom: '16px' }}>Produits à commander :</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ ...M, fontSize: '0.8rem', fontWeight: 600, margin: '0 0 4px', color: dark }}>
                          {item.name} (x{item.qty})
                        </p>
                        <a 
                          href={item.supplier} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block', background: gold, color: cream, textDecoration: 'none',
                            padding: '6px 12px', borderRadius: '4px', ...M, fontSize: '0.7rem', fontWeight: 500
                          }}
                        >
                          Commander sur AliExpress →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
