import React, { useState, useEffect, useRef } from 'react'

/* ─── Tokens ─────────────────────────────────────────────────────────────────── */
const S = { fontFamily: "'Outfit', sans-serif" }
const P = { fontFamily: "'Cormorant Garant', Georgia, serif" }
const BLK   = '#080808'
const DARK  = '#111010'
const GOLD  = '#C4966A'
const GOLDL = '#DDB880'
const CREAM = '#EDE8DF'
const STONE = '#8A7A6E'
const IVORY = '#F9F5F0'
const IALT  = '#F0EBE3'

const CSS = `
@keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-5%,-10%)}20%{transform:translate(-15%,5%)}30%{transform:translate(7%,-25%)}40%{transform:translate(-5%,25%)}50%{transform:translate(-15%,10%)}60%{transform:translate(15%,0)}70%{transform:translate(0,15%)}80%{transform:translate(3%,35%)}90%{transform:translate(-10%,10%)}}
.grain::after{content:"";position:absolute;inset:-200%;width:400%;height:400%;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:0.038;pointer-events:none;z-index:1;animation:grain 8s steps(10) infinite;}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
.reveal.in{opacity:1;transform:translateY(0)}
.art-hover .art-img{transform:scale(1);transition:transform 1s ease}
.art-hover:hover .art-img{transform:scale(1.06)}
.art-hover{transform:translateY(0);transition:transform .4s cubic-bezier(.16,1,.3,1)}
.art-hover:hover{transform:translateY(-5px)}
`

function useReveal(thr=.1){
  const ref=useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el)return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add('in');obs.disconnect()}},{threshold:thr})
    obs.observe(el); return()=>obs.disconnect()
  },[thr])
  return ref
}
function Rev({children,delay=0,style={}}){
  const ref=useReveal()
  return <div ref={ref} className="reveal" style={{transitionDelay:`${delay}s`,...style}}>{children}</div>
}

const ARTICLES = [
  {
    id:1, category:'Guide', issue:'No.01',
    title:'Comment Utiliser un Pistolet de Massage',
    subtitle:'Techniques, zones & fréquences',
    excerpt:'Durée, pression, embouts : la méthode complète pour tirer le maximum de votre pistolet percussif sans risque de blessure ni d\'inflammation.',
    image:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85',
    date:'12 Oct 2026', readTime:'6 min', featured:true,
  },
  {
    id:2, category:'Guide', issue:'No.02',
    title:'Récupération Musculaire : Le Guide Complet',
    subtitle:'Nutrition, sommeil, massage',
    excerpt:'Les 4 piliers de la récupération que tout sportif devrait maîtriser. Ce que font les pros que vous ne faites probablement pas encore.',
    image:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80',
    date:'28 Sep 2026', readTime:'8 min', featured:false,
  },
  {
    id:3, category:'Science', issue:'No.03',
    title:'EMS vs Massage Percussif',
    subtitle:'La science derrière les deux',
    excerpt:'Électrodes ou vibrations ? On explique comment fonctionnent les deux technologies et pour quel profil chacune est adaptée.',
    image:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80',
    date:'15 Sep 2026', readTime:'5 min', featured:false,
  },
  {
    id:4, category:'Routine', issue:'No.04',
    title:'Routine Post-Entraînement en 15 Min',
    subtitle:'Protocole SŌMA officiel',
    excerpt:'Stretching, massage percussif, hydratation : le protocole complet que vous pouvez appliquer dès ce soir après votre séance.',
    image:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80',
    date:'3 Sep 2026', readTime:'4 min', featured:false,
  },
  {
    id:5, category:'Science', issue:'No.05',
    title:'Courbatures : Comprendre & Guérir Vite',
    subtitle:'DOMS expliqué',
    excerpt:'Ce que sont vraiment les DOMS, pourquoi ils surviennent, et ce que la science dit sur les meilleurs moyens de les réduire.',
    image:'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=900&q=80',
    date:'20 Août 2026', readTime:'7 min', featured:false,
  },
  {
    id:6, category:'Routine', issue:'No.06',
    title:'Douleurs Cervicales : Protocole Complet',
    subtitle:'Pour les télétravailleurs',
    excerpt:'8h par jour devant un écran = 8h de tension cervicale. Le protocole que nos clients utilisent chaque soir avec le masseur SŌMA.',
    image:'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=80',
    date:'8 Août 2026', readTime:'5 min', featured:false,
  },
]

const CATS = ['Tous','Guide','Science','Routine']

export default function Journal() {
  const [cat, setCat] = useState('Tous')
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<768)
    check(); window.addEventListener('resize',check); return()=>window.removeEventListener('resize',check)
  },[])

  const featured = ARTICLES.find(a=>a.featured)
  const filtered  = ARTICLES.filter(a=>!a.featured).filter(a=>cat==='Tous'||a.category===cat)
  const showFeat  = cat==='Tous'||cat===featured.category
  const px = isMobile?'24px':'80px'

  return (
    <main style={{background:IVORY,paddingTop:'72px',minHeight:'100vh'}}>
      <style>{CSS}</style>

      {/* ─── HEADER ───────────────────────────────────────────────────────── */}
      <section className="grain" style={{background:BLK,padding:isMobile?'64px 24px 48px':`80px ${px} 56px`,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 70% at 20% 80%,rgba(196,150,106,0.07) 0%,transparent 65%)',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:2}}>
          <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'12px',display:'flex',alignItems:'center',gap:'14px'}}>
            <span style={{width:'28px',height:'1px',background:GOLD}}/>Éditorial
          </p>
          <h1 style={{
            ...P,fontSize:'clamp(5rem,14vw,15rem)',
            fontWeight:300,lineHeight:.83,letterSpacing:'-.03em',
            color:CREAM,margin:'0 0 28px',
          }}>
            Le Journal
          </h1>
          <div style={{height:'1px',background:'rgba(196,150,106,0.18)',marginBottom:'20px'}}/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
            <p style={{...S,fontSize:'.62rem',fontWeight:300,color:'rgba(237,232,223,0.38)',letterSpacing:'.25em',textTransform:'uppercase',margin:0}}>
              Guides, science & routines de récupération — {ARTICLES.length} articles
            </p>
            <p style={{...S,fontSize:'.62rem',fontWeight:300,color:'rgba(237,232,223,0.25)',letterSpacing:'.15em',textTransform:'uppercase',margin:0}}>
              2026
            </p>
          </div>
        </div>
      </section>

      {/* ─── FILTRES ──────────────────────────────────────────────────────── */}
      <section style={{background:DARK,padding:`0 ${px}`,borderBottom:`1px solid rgba(196,150,106,0.1)`}}>
        <div style={{display:'flex',gap:0,overflowX:'auto'}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)} style={{
              ...S,fontSize:'.56rem',fontWeight:600,letterSpacing:'.22em',textTransform:'uppercase',
              padding:'18px 24px',border:'none',cursor:'pointer',background:'transparent',
              color:cat===c?GOLD:'rgba(237,232,223,0.32)',
              borderBottom:`2px solid ${cat===c?GOLD:'transparent'}`,
              transition:'all .25s ease',whiteSpace:'nowrap',
            }}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ─── HERO ARTICLE ─────────────────────────────────────────────────── */}
      {showFeat && (
        <section style={{padding:`clamp(48px,8vw,80px) ${px}`,background:IVORY}}>
          <div className="art-hover" style={{cursor:'pointer',position:'relative'}}>
            <div style={{height:isMobile?'70vw':'620px',overflow:'hidden',position:'relative'}}>
              <img className="art-img" src={featured.image} alt={featured.title} style={{
                width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'brightness(.72)',
              }}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(8,8,8,.9) 0%,rgba(8,8,8,.15) 55%,transparent 100%)'}}/>
            </div>
            {/* Overlay content */}
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:isMobile?'32px 24px':'56px 64px'}}>
              <div style={{display:'flex',gap:'14px',alignItems:'center',marginBottom:'16px',flexWrap:'wrap'}}>
                <span style={{...S,fontSize:'.5rem',fontWeight:700,letterSpacing:'.24em',textTransform:'uppercase',color:GOLD,border:`1px solid rgba(196,150,106,0.35)`,padding:'4px 12px'}}>
                  {featured.category}
                </span>
                <span style={{width:'3px',height:'3px',background:CREAM,borderRadius:'50%',opacity:.3}}/>
                <span style={{...S,fontSize:'.5rem',fontWeight:300,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(237,232,223,0.45)'}}>
                  {featured.date} · {featured.readTime} de lecture
                </span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'24px'}}>
                <div style={{flex:1}}>
                  <h2 style={{...P,fontSize:'clamp(2rem,4.5vw,4.5rem)',fontWeight:300,color:CREAM,fontStyle:'italic',lineHeight:1,marginBottom:'8px',letterSpacing:'-.02em'}}>
                    {featured.title}
                  </h2>
                  <p style={{...P,fontSize:'clamp(1rem,1.5vw,1.2rem)',color:GOLD,fontStyle:'italic',opacity:.75,margin:0}}>{featured.subtitle}</p>
                </div>
                <p style={{...S,fontSize:'.82rem',fontWeight:300,color:'rgba(237,232,223,0.65)',maxWidth:'38ch',lineHeight:1.8,margin:0}}>
                  {featured.excerpt}
                </p>
              </div>
              <div style={{marginTop:'28px',display:'flex',alignItems:'center',gap:'12px'}}>
                <span style={{...S,fontSize:'.58rem',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:GOLD}}>Lire l'article</span>
                <span style={{color:GOLD}}>→</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── GRID ─────────────────────────────────────────────────────────── */}
      {filtered.length>0 && (
        <section style={{padding:`0 ${px} clamp(80px,12vh,140px)`,background:IVORY}}>
          {showFeat && (
            <div style={{display:'flex',alignItems:'center',gap:'20px',marginBottom:'48px'}}>
              <span style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.22em',textTransform:'uppercase',color:STONE}}>À lire aussi</span>
              <div style={{flex:1,height:'1px',background:'rgba(138,122,110,0.2)'}}/>
            </div>
          )}
          <div style={{
            display:'grid',
            gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',
            gap:isMobile?'64px':'48px',
          }}>
            {filtered.map((a,i)=>(
              <Rev key={a.id} delay={i*.08}>
                <article className="art-hover" style={{cursor:'pointer'}}>
                  <div style={{overflow:'hidden',height:isMobile?'60vw':'320px',marginBottom:'24px',position:'relative'}}>
                    <img className="art-img" src={a.image} alt={a.title} style={{
                      width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'brightness(.85)',
                    }}/>
                    {/* Issue number overlay */}
                    <span style={{
                      position:'absolute',top:'16px',right:'16px',
                      ...S,fontSize:'.48rem',fontWeight:700,letterSpacing:'.2em',color:CREAM,
                      background:'rgba(8,8,8,.55)',padding:'4px 10px',
                    }}>{a.issue}</span>
                  </div>
                  <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'14px'}}>
                    <span style={{...S,fontSize:'.48rem',fontWeight:700,letterSpacing:'.22em',textTransform:'uppercase',color:GOLD}}>{a.category}</span>
                    <span style={{width:'3px',height:'3px',background:STONE,borderRadius:'50%',opacity:.4}}/>
                    <span style={{...S,fontSize:'.48rem',fontWeight:300,letterSpacing:'.1em',textTransform:'uppercase',color:STONE}}>{a.date}</span>
                    <span style={{width:'3px',height:'3px',background:STONE,borderRadius:'50%',opacity:.4}}/>
                    <span style={{...S,fontSize:'.48rem',fontWeight:300,color:STONE}}>{a.readTime}</span>
                  </div>
                  <h3 style={{...P,fontSize:'clamp(1.5rem,2.5vw,2rem)',fontWeight:300,color:DARK,lineHeight:1.1,marginBottom:'6px',letterSpacing:'-.01em'}}>{a.title}</h3>
                  <p style={{...P,fontSize:'.9rem',color:STONE,fontStyle:'italic',marginBottom:'12px'}}>{a.subtitle}</p>
                  <p style={{...S,fontSize:'.8rem',fontWeight:300,color:STONE,lineHeight:1.8,margin:'0 0 18px'}}>{a.excerpt}</p>
                  <span style={{...S,fontSize:'.56rem',fontWeight:600,letterSpacing:'.16em',textTransform:'uppercase',color:DARK,borderBottom:`1px solid rgba(196,150,106,0)`,paddingBottom:'2px'}}>
                    Lire →
                  </span>
                </article>
              </Rev>
            ))}
          </div>
        </section>
      )}

      {/* ─── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="grain" style={{background:BLK,padding:`clamp(100px,14vh,140px) ${px}`,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 40% 60% at 80% 50%,rgba(196,150,106,0.06) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div style={{
          display:'flex',flexDirection:isMobile?'column':'row',
          alignItems:isMobile?'flex-start':'center',justifyContent:'space-between',
          gap:'56px',position:'relative',zIndex:2,
        }}>
          <div style={{maxWidth:'480px'}}>
            <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'20px',display:'flex',alignItems:'center',gap:'14px'}}>
              <span style={{width:'28px',height:'1px',background:GOLD}}/>La Lettre SŌMA
            </p>
            <h2 style={{...P,fontSize:'clamp(2.5rem,5vw,5rem)',fontWeight:300,color:CREAM,margin:'0 0 20px',lineHeight:.95,letterSpacing:'-.025em'}}>
              La récupération,<br/><em style={{color:GOLD,fontStyle:'italic'}}>dans votre inbox.</em>
            </h2>
            <p style={{...S,fontSize:'.85rem',fontWeight:300,color:'rgba(237,232,223,0.48)',lineHeight:1.85,margin:0}}>
              Guides, routines et conseils de récupération. Une fois par semaine, pas de spam.
            </p>
          </div>

          <div style={{flex:1,maxWidth:'460px',width:'100%'}}>
            {subbed ? (
              <div style={{textAlign:'center',padding:'40px 0'}}>
                <div style={{
                  width:'60px',height:'60px',borderRadius:'50%',
                  border:`1px solid rgba(196,150,106,0.35)`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  margin:'0 auto 24px',fontSize:'1.3rem',color:GOLD,
                }}>✓</div>
                <p style={{...P,fontSize:'1.8rem',color:CREAM,fontStyle:'italic',marginBottom:'8px',fontWeight:300}}>Bienvenue dans SŌMA.</p>
                <p style={{...S,fontSize:'.7rem',color:'rgba(237,232,223,0.35)',fontWeight:300}}>Premier email à venir.</p>
              </div>
            ) : (
              <>
                <form onSubmit={e=>{e.preventDefault();if(email)setSubbed(true)}} style={{display:'flex',gap:0,borderBottom:`1px solid rgba(196,150,106,0.22)`}}>
                  <input
                    type="email" value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="votre@email.com" required
                    style={{
                      ...S,flex:1,background:'transparent',border:'none',outline:'none',
                      padding:'20px 0',fontSize:'.9rem',color:CREAM,
                    }}
                  />
                  <button type="submit" style={{
                    ...S,background:'transparent',border:'none',cursor:'pointer',
                    fontSize:'.58rem',fontWeight:700,letterSpacing:'.22em',textTransform:'uppercase',
                    color:GOLD,padding:'20px 0 20px 24px',whiteSpace:'nowrap',
                    transition:'color .25s',
                  }}
                    onMouseEnter={e=>e.currentTarget.style.color=GOLDL}
                    onMouseLeave={e=>e.currentTarget.style.color=GOLD}
                  >S'abonner →</button>
                </form>
                <p style={{...S,fontSize:'.54rem',color:'rgba(237,232,223,0.2)',marginTop:'14px',lineHeight:1.6}}>
                  Désabonnement en un clic. Aucune revente de données.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
