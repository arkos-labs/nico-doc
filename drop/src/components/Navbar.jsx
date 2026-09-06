import { useState, useEffect } from 'react'

const S = { fontFamily: "'Outfit', sans-serif" }
const P = { fontFamily: "'Cormorant Garant', Georgia, serif" }
const bg      = '#F5EFE8'
const dark    = '#18152E'
const gold    = '#C4966A'
const cream   = '#EDE8DF'   // used in hero/dark sections
const stone   = '#8A7A6E'

const BagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

export default function Navbar({ navigate, cartCount, setCartOpen, currentPage }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isTransparent = currentPage === 'home' && !scrolled

  const navStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    height: '68px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(24px, 5vw, 80px)',
    background: isTransparent ? 'transparent' : 'rgba(245,239,232,0.94)',
    backdropFilter: isTransparent ? 'none' : 'blur(20px)',
    WebkitBackdropFilter: isTransparent ? 'none' : 'blur(20px)',
    borderBottom: isTransparent ? 'none' : '1px solid rgba(196,150,106,0.2)',
    transition: 'background 0.4s ease, border-color 0.4s ease',
  }

  const links = [
    { label: 'Boutique', page: 'catalogue' },
    { label: 'Notre histoire', page: 'about' },
    { label: 'Journal', page: 'journal' },
    { label: 'Contact', page: 'contact' },
  ]

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          style={{
            ...P,
            fontSize: '1.7rem',
            fontWeight: 600,
            color: isTransparent ? cream : dark,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            lineHeight: 1,
            background: 'none',
            border: 'none',
          }}
        >
          <span style={{ color: gold }}>SŌ</span>MA
        </button>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {links.map(({ label, page }) => {
            const isActive = page && currentPage === page
            const isHovered = hoveredLink === label
            return (
              <button
                key={label}
                onClick={() => page && navigate(page)}
                onMouseEnter={() => setHoveredLink(label)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  ...S,
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isTransparent ? ((isActive || isHovered) ? gold : cream) : ((isActive || isHovered) ? gold : dark),
                  cursor: page ? 'pointer' : 'default',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? `1px solid ${gold}` : '1px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => setCartOpen(true)}
            style={{ position: 'relative', color: isTransparent ? cream : dark, cursor: 'pointer', display: 'flex', transition: 'color 0.2s', background: 'none', border: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = gold}
            onMouseLeave={e => e.currentTarget.style.color = stone}
            aria-label="Panier"
          >
            <BagIcon />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px', right: '-8px',
                background: gold,
                color: '#fff',
                ...S,
                fontSize: '0.48rem',
                fontWeight: 700,
                width: '16px', height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: 0,
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{ color: isTransparent ? cream : dark, display: 'flex', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = gold}
            onMouseLeave={e => e.currentTarget.style.color = stone}
            aria-label="Menu"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '68px', left: 0, right: 0,
          background: 'rgba(6,8,16,0.97)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,
          padding: '36px clamp(24px, 5vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderBottom: '1px solid rgba(196,150,106,0.15)',
          animation: 'fadeUp 0.25s ease',
        }}>
          {links.map(({ label, page }) => (
            <button
              key={label}
              onClick={() => { page && navigate(page); setMenuOpen(false) }}
              style={{
                ...S,
                fontSize: '0.68rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: page && currentPage === page ? gold : cream,
                textAlign: 'left',
                cursor: page ? 'pointer' : 'default',
                background: 'none',
                border: 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
