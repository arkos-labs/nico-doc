import React from 'react'

const M = { fontFamily: "'DM Sans', sans-serif" }
const C = { fontFamily: "'Playfair Display', serif" }
const dark  = '#1A1A1A'
const gold  = '#6B8E5A'
const cream = '#FAF6F1'
const stone = '#8A8278'

function LegalSection({ title, children }) {
  return (
    <div style={{ marginBottom: '60px' }}>
      <h2 style={{ ...C, fontSize: '2.5rem', color: dark, marginBottom: '24px' }}>
        {title}
      </h2>
      <div style={{ ...M, fontSize: '0.85rem', fontWeight: 300, color: stone, lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  )
}

export default function CGV() {
  return (
    <main style={{ background: cream, paddingTop: '72px', minHeight: '100vh' }}>
      <section style={{ padding: '80px 80px 120px', maxWidth: '800px', margin: '0 auto' }}>
        
        <p style={{
          ...M, fontSize: '0.52rem', fontWeight: 600,
          letterSpacing: '0.32em', textTransform: 'uppercase',
          color: gold, marginBottom: '24px'
        }}>
          Légal
        </p>
        
        <h1 style={{
          ...C, fontSize: 'clamp(3.5rem, 6vw, 5rem)',
          fontWeight: 400, color: dark, lineHeight: 0.95,
          marginBottom: '60px'
        }}>
          Conditions Générales de Vente
        </h1>

        <LegalSection title="Article 1. Champ d'application">
          <p>Les présentes Conditions Générales de Vente (ci-après les "CGV") s'appliquent, sans restriction ni réserve, à l'ensemble des ventes conclues par la société KOHI SAS auprès de consommateurs et d'acheteurs non professionnels désirant acquérir les produits proposés à la vente sur le site kohi-rituel.com.</p>
        </LegalSection>

        <LegalSection title="Article 2. Prix">
          <p>Les prix des produits sont indiqués en Euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d'expédition.</p>
          <p>La société KOHI SAS se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.</p>
        </LegalSection>

        <LegalSection title="Article 3. Commandes">
          <p>Vous pouvez passer commande sur notre site internet kohi-rituel.com. Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation reprenant ces informations contractuelles au plus tard au moment de la validation de votre commande.</p>
        </LegalSection>

        <LegalSection title="Article 4. Rétractation">
          <p>Conformément aux dispositions de l'article L.221-18 du Code de la Consommation, vous disposez d'un délai de rétractation de 30 jours à compter de la réception de vos produits pour exercer votre droit de rétraction sans avoir à justifier de motifs ni à payer de pénalité.</p>
        </LegalSection>

      </section>
    </main>
  )
}
