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

export default function Mentions() {
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
          Mentions Légales
        </h1>

        <LegalSection title="1. Éditeur du site">
          <p>Le site KOHI (ci-après "le Site") est édité par la société KOHI SAS, société par actions simplifiée au capital de 10 000 euros, dont le siège social est situé au 15 rue de la Paix, 75002 Paris, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 900 123 456.</p>
          <p>TVA Intracommunautaire : FR 12 900 123 456</p>
          <p>Email de contact : hello@kohi-rituel.com</p>
        </LegalSection>

        <LegalSection title="2. Directeur de la publication">
          <p>Le Directeur de la publication est Monsieur Jean Dupont, en sa qualité de Président de KOHI SAS.</p>
        </LegalSection>

        <LegalSection title="3. Hébergement">
          <p>Le Site est hébergé par Vercel Inc., dont le siège social est situé 340 S Lemon Ave #4133 Walnut, CA 91789, USA.</p>
        </LegalSection>

        <LegalSection title="4. Propriété intellectuelle">
          <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          <p>La reproduction de tout ou partie de ce site sur un support électronique ou papier quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.</p>
        </LegalSection>

      </section>
    </main>
  )
}
