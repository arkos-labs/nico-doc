import { useState } from 'react'

const S = { fontFamily: "'Outfit', sans-serif" }
const P = { fontFamily: "'Cormorant Garant', Georgia, serif" }
const dark  = '#0F0D1F'
const gold  = '#C4966A'
const cream = '#EDE8DF'
const stone = '#7A758E'

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
)

export default function Footer({ navigate }) {
  const columns = [
    {
      label: 'Boutique',
      links: [
        { name: 'Accueil', page: 'home' },
        { name: 'Tous les produits', page: 'catalogue' },
        { name: 'Journal bien-être', page: 'journal' },
      ],
    },
    {
      label: 'Aide',
      links: [
        { name: 'Notre histoire', page: 'about' },
        { name: 'Contact', page: 'contact' },
        { name: 'FAQ', page: 'faq' },
        { name: 'Suivre ma commande', page: 'track' },
      ],
    },
  ]

  return (
    <footer style={{ background: dark, color: cream, zIndex: 10, position: 'relative', borderTop: '1px solid rgba(196,150,106,0.12)' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '60px',
        padding: 'clamp(48px,8vh,80px) clamp(24px,5vw,80px) 40px',
        maxWidth: '1440px',
        margin: '0 auto',
      }}>

        {/* Brand column */}
        <div>
          <button
            onClick={() => navigate('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '16px', display: 'block' }}
          >
            <span style={{ ...P, fontSize: '2.5rem', fontWeight: 600, letterSpacing: '0.1em', lineHeight: 1 }}>
              <span style={{ color: gold }}>SŌ</span>MA
            </span>
          </button>
          <p style={{
            ...S,
            fontSize: '0.8rem',
            fontWeight: 300,
            color: stone,
            lineHeight: 1.75,
            maxWidth: '240px',
            marginBottom: '24px',
          }}>
            La technologie au service de votre récupération. Des appareils premium, pour un corps qui performe.
          </p>
          <p style={{
            ...S,
            fontSize: '0.58rem',
            fontWeight: 300,
            color: stone,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '28px',
          }}>
            Bien-être · 2026
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { label: 'Instagram', icon: <InstagramIcon /> },
              { label: 'TikTok', icon: <TikTokIcon /> },
              { label: 'Facebook', icon: <FacebookIcon /> },
            ].map(({ label, icon }) => (
              <SocialBtn key={label} label={label} icon={icon} />
            ))}
          </div>
        </div>

        {/* Link columns */}
        {columns.map(({ label, links }) => (
          <div key={label}>
            <h4 style={{
              ...S,
              fontSize: '0.58rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: gold,
              marginBottom: '24px',
            }}>
              {label}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {links.map(link => (
                <li key={link.name}>
                  <FooterLink label={link.name} page={link.page} navigate={navigate} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '20px clamp(24px,5vw,80px)',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <span style={{
          ...S,
          fontSize: '0.65rem',
          fontWeight: 300,
          color: stone,
          letterSpacing: '0.04em',
        }}>
          © 2026 SŌMA. Tous droits réservés.
        </span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { name: 'Mentions légales', page: 'mentions' },
            { name: 'CGV', page: 'cgv' },
            { name: 'Confidentialité', page: 'privacy' },
          ].map(item => (
            <FooterLink key={item.name} label={item.name} page={item.page} navigate={navigate} />
          ))}
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ label, page, navigate }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => page && navigate && navigate(page)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: page ? 'pointer' : 'default',
        ...S,
        fontSize: '0.78rem',
        fontWeight: 300,
        color: hovered && page ? cream : stone,
        letterSpacing: '0.04em',
        textAlign: 'left',
        transition: 'color 0.2s',
        padding: 0,
      }}
    >
      {label}
    </button>
  )
}

function SocialBtn({ label, icon }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '36px', height: '36px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${hovered ? gold : 'rgba(255,255,255,0.1)'}`,
        color: hovered ? gold : stone,
        background: 'transparent',
        cursor: 'pointer',
        borderRadius: '50%',
        transition: 'color 0.2s, border-color 0.2s',
      }}
    >
      {icon}
    </button>
  )
}
