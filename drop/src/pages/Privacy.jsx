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

export default function Privacy() {
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
          ...C, fontSize: 'clamp(3rem, 5vw, 4.5rem)',
          fontWeight: 400, color: dark, lineHeight: 0.95,
          marginBottom: '60px'
        }}>
          Politique de Confidentialité
        </h1>

        <LegalSection title="Collecte des données personnelles">
          <p>La société KOHI SAS s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site kohi-rituel.com, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.</p>
          <p>Nous collectons les données suivantes : nom, prénom, adresse postale, adresse e-mail, numéro de téléphone, historique de commandes.</p>
        </LegalSection>

        <LegalSection title="Utilisation des données">
          <p>Vos données personnelles sont utilisées pour :</p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>La gestion de vos commandes et livraisons</li>
            <li>Le service après-vente</li>
            <li>L'envoi de notre newsletter (si vous y avez souscrit)</li>
            <li>L'amélioration de votre expérience utilisateur sur notre site</li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies">
          <p>Un cookie est un fichier texte déposé sur votre ordinateur lors de la visite d'un site ou de la consultation d'une publicité. Ils ont pour but de collecter des informations relatives à votre navigation et de vous adresser des services adaptés à votre terminal.</p>
          <p>Nous n'utilisons que des cookies strictement nécessaires au fonctionnement du site (panier, session utilisateur).</p>
        </LegalSection>

        <LegalSection title="Vos droits">
          <p>Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Vous pouvez exercer ce droit en nous contactant à : privacy@kohi-rituel.com.</p>
        </LegalSection>

      </section>
    </main>
  )
}
