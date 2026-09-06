import React, { useState } from 'react'

const S = { fontFamily: "'DM Sans', sans-serif" }
const P = { fontFamily: "'Playfair Display', serif" }
const dark  = '#1A1A1A'
const matcha = '#6B8E5A'
const cream = '#FAF6F1'
const stone = '#8A8278'

const faqs = [
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Toutes nos commandes sont traitées avec soin. Nos délais de livraison standard sont généralement de 7 à 14 jours ouvrés."
  },
  {
    question: "Comment préparer un matcha parfait ?",
    answer: "Versez 2g de poudre de matcha dans votre bol (Chawan). Ajoutez environ 80ml d'eau chaude à 80°C (jamais bouillante). Fouettez vigoureusement en forme de W avec le Chasen jusqu'à obtenir une mousse fine et onctueuse."
  },
  {
    question: "Puis-je retourner ma commande si je change d'avis ?",
    answer: "Absolument. Vous disposez de 30 jours après réception pour nous retourner les articles dans leur emballage d'origine. Les frais de retour sont offerts."
  },
  {
    question: "D'où proviennent vos matériaux ?",
    answer: "Notre céramique est fabriquée artisanalement. Nos fouets à matcha (Chasen) sont en bambou naturel, taillés à la main selon la tradition japonaise. Nos bouilloires allient céramique et design contemporain."
  },
  {
    question: "Je n'ai reçu qu'une partie de ma commande, est-ce normal ?",
    answer: "Oui, tout à fait. Pour vous offrir les meilleurs prix, nous travaillons avec plusieurs entrepôts. Si vous avez commandé plusieurs articles différents, il est fréquent qu'ils soient expédiés séparément. Le reste de votre commande est déjà en route et arrivera sous peu !"
  }
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <main style={{ background: cream, paddingTop: '72px', minHeight: '100vh' }}>
      <section style={{ padding: '80px 80px 120px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <p style={{
          ...S, fontSize: '0.52rem', fontWeight: 600,
          letterSpacing: '0.32em', textTransform: 'uppercase',
          color: matcha, marginBottom: '24px', textAlign: 'center'
        }}>
          Service Client
        </p>
        
        <h1 style={{
          ...P,
          fontSize: 'clamp(3rem, 6vw, 4.5rem)',
          fontWeight: 400,
          color: dark,
          lineHeight: 0.95,
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          Questions Fréquentes
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              style={{ borderBottom: `1px solid rgba(26,26,26,0.1)`, padding: '32px 0' }}
            >
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <h3 style={{ ...P, fontSize: '1.6rem', color: dark, margin: 0 }}>
                  {faq.question}
                </h3>
                <span style={{ fontSize: '2rem', color: matcha, lineHeight: 1 }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              
              <div style={{
                maxHeight: open === i ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease',
              }}>
                <p style={{
                  ...S, fontSize: '0.85rem', fontWeight: 300,
                  color: stone, lineHeight: 1.8, paddingTop: '20px', margin: 0, maxWidth: '800px'
                }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
