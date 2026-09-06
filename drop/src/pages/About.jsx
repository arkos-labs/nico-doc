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
.reveal{opacity:0;transform:translateY(28px);transition:opacity .95s cubic-bezier(.16,1,.3,1),transform .95s cubic-bezier(.16,1,.3,1)}
.reveal.in{opacity:1;transform:translateY(0)}
`

function useReveal(threshold=.1){
  const ref=useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el)return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add('in');obs.disconnect()}},{threshold})
    obs.observe(el); return()=>obs.disconnect()
  },[threshold])
  return ref
}
function Rev({children,delay=0,style={}}){
  const ref=useReveal()
  return <div ref={ref} className="reveal" style={{transitionDelay:`${delay}s`,...style}}>{children}</div>
}

const STATS = [
  {n:'2021', l:'Année de création'},
  {n:'14k+', l:'Sportifs équipés'},
  {n:'CE',   l:'Certifié européen'},
  {n:'4.9★', l:'Note moyenne'},
]

const TIMELINE = [
  {year:'2021', title:'L\'idée naît dans un vestiaire', text:'Deux passionnés de sport confrontés aux mêmes problèmes : des courbatures interminables, des appareils décevants. L\'idée : rendre la récupération premium accessible à tous les corps qui exigent le meilleur.'},
  {year:'2022', title:'Premier prototype & certifications CE', text:'18 mois de R&D avec des kinésithérapeutes et préparateurs physiques. Nos premiers appareils obtiennent la certification CE. Qualité clinique, design premium, prix juste.'},
  {year:'2023', title:'La communauté SŌMA', text:'De 0 à 8 000 clients en douze mois. Le pistolet SŌMA devient l\'outil incontournable des sportifs qui refusent les compromis.'},
  {year:'2024–25', title:'Gamme complète & expansion', text:'EMS, masseur cervical, bande de récupération. SŌMA devient un écosystème complet centré sur une conviction : chaque corps mérite de récupérer comme un pro.'},
]

const VALS = [
  {n:'01', title:'Performance sans compromis', desc:'Nos appareils sont testés sur le terrain — par des athlètes, des kinés, des gens ordinaires qui s\'entraînent extraordinairement. Si ça ne tient pas en conditions réelles, ça ne sort pas.'},
  {n:'02', title:'Technologie certifiée', desc:'Chaque appareil SŌMA passe la certification CE européenne. Ce n\'est pas une case à cocher — c\'est notre promesse de qualité et de sécurité, sans négociation.'},
  {n:'03', title:'Récupérer pour revenir', desc:'La récupération n\'est pas une pause. C\'est là où le corps se reconstruit plus fort. L\'équipement qui l\'accompagne mérite autant d\'attention que l\'effort lui-même.'},
]

export default function About() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<768)
    check(); window.addEventListener('resize',check); return()=>window.removeEventListener('resize',check)
  },[])
  const px = isMobile ? '24px' : '80px'

  return (
    <main style={{background:IVORY,paddingTop:'72px',overflowX:'hidden'}}>
      <style>{CSS}</style>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="grain" style={{
        background:BLK, minHeight:isMobile?'auto':'92vh',
        display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr',
        alignItems:'stretch', position:'relative', overflow:'hidden',
      }}>
        {/* Left: text */}
        <div style={{
          padding:isMobile?'72px 24px 64px':`clamp(100px,14vh,160px) ${px}`,
          display:'flex', flexDirection:'column', justifyContent:'flex-end',
          position:'relative', zIndex:2,
        }}>
          <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'radial-gradient(ellipse 60% 80% at 0% 100%,rgba(196,150,106,0.07) 0%,transparent 65%)',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'24px',display:'flex',alignItems:'center',gap:'14px'}}>
              <span style={{width:'28px',height:'1px',background:GOLD}}/>Notre Histoire
            </p>
            <h1 style={{
              ...P,fontSize:'clamp(4.5rem,9vw,9rem)',
              fontWeight:300,lineHeight:.9,letterSpacing:'-0.025em',
              color:CREAM,margin:'0 0 40px',
            }}>
              La tech<br/>au service<br/><em style={{color:GOLD,fontStyle:'italic'}}>du corps.</em>
            </h1>
            <div style={{width:'48px',height:'1px',background:GOLD,marginBottom:'36px',opacity:.5}}/>
            <p style={{...S,fontSize:'.9rem',fontWeight:300,color:STONE,lineHeight:1.9,maxWidth:'42ch'}}>
              SŌMA est née d'une conviction simple : chaque corps qui s'entraîne dur mérite une récupération à la hauteur. Des appareils certifiés CE, pensés pour ceux qui refusent les compromis.
            </p>
          </div>
        </div>

        {/* Right: full-bleed image */}
        <div style={{position:'relative',overflow:'hidden',minHeight:isMobile?'60vw':'auto'}}>
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85"
            alt="Récupération musculaire SŌMA"
            style={{width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'brightness(0.7)'}}
          />
          <div style={{position:'absolute',inset:0,background:isMobile?'linear-gradient(180deg,rgba(8,8,8,.4) 0%,transparent 50%)':'linear-gradient(270deg,transparent 40%,rgba(8,8,8,.4) 100%)'}}/>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────────────────── */}
      <section style={{background:DARK,padding:`56px ${px}`}}>
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)',gap:'0'}}>
          {STATS.map((s,i)=>(
            <Rev key={i} delay={i*.07}>
              <div style={{
                textAlign:'center',padding:'24px 16px',
                borderRight:i<3?`1px solid rgba(196,150,106,0.12)`:'none',
              }}>
                <p style={{...P,fontSize:'clamp(2.2rem,4vw,3.5rem)',fontWeight:300,color:GOLD,margin:0,lineHeight:1}}>{s.n}</p>
                <div style={{width:'20px',height:'1px',background:GOLD,margin:'14px auto',opacity:.4}}/>
                <p style={{...S,fontSize:'.55rem',fontWeight:600,letterSpacing:'.2em',textTransform:'uppercase',color:STONE,margin:0}}>{s.l}</p>
              </div>
            </Rev>
          ))}
        </div>
      </section>

      {/* ─── MANIFESTE ────────────────────────────────────────────────────── */}
      <section style={{background:IVORY,padding:`clamp(100px,14vh,160px) ${px}`}}>
        <Rev>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:'32px',marginBottom:'96px'}}>
            <div>
              <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'16px',display:'flex',alignItems:'center',gap:'14px'}}>
                <span style={{width:'28px',height:'1px',background:GOLD}}/>Ce en quoi nous croyons
              </p>
              <h2 style={{...P,fontSize:'clamp(3.5rem,7vw,7rem)',fontWeight:300,color:DARK,margin:0,lineHeight:.9,letterSpacing:'-0.025em'}}>
                Le Mani-<br/>feste SŌMA
              </h2>
            </div>
            <p style={{...S,fontSize:'.85rem',fontWeight:300,color:STONE,lineHeight:1.9,maxWidth:'34ch'}}>
              Trois convictions fondamentales qui guident chaque décision de design, de sélection et de service.
            </p>
          </div>
        </Rev>

        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:isMobile?'48px':'2px',background:isMobile?'transparent':`rgba(196,150,106,0.07)`}}>
          {VALS.map((v,i)=>(
            <Rev key={i} delay={i*.12}>
              <div style={{
                background:IVORY,
                padding:isMobile?'0':'56px 40px',
                paddingTop:isMobile?'32px':'56px',
                borderTop:isMobile?`1px solid rgba(196,150,106,0.2)`:0,
                height:'100%',
              }}>
                <span style={{...S,fontSize:'clamp(3rem,6vw,5rem)',fontWeight:700,letterSpacing:'-.03em',color:'rgba(196,150,106,0.1)',display:'block',lineHeight:1,marginBottom:'24px'}}>{v.n}</span>
                <div style={{width:'32px',height:'1px',background:GOLD,marginBottom:'24px',opacity:.6}}/>
                <h3 style={{...P,fontSize:'clamp(1.6rem,2.5vw,2rem)',fontWeight:400,color:DARK,marginBottom:'16px',lineHeight:1.2}}>{v.title}</h3>
                <p style={{...S,fontSize:'.84rem',fontWeight:300,color:STONE,lineHeight:1.9,margin:0}}>{v.desc}</p>
              </div>
            </Rev>
          ))}
        </div>

        {/* Citation */}
        <Rev delay={.15}>
          <div style={{marginTop:'120px',borderTop:`1px solid rgba(196,150,106,0.18)`,paddingTop:'80px',textAlign:'center'}}>
            <p style={{...P,fontSize:'clamp(1.8rem,3.5vw,3rem)',fontStyle:'italic',color:DARK,lineHeight:1.4,maxWidth:'700px',margin:'0 auto 28px',fontWeight:300}}>
              "Le corps qui récupère bien est le corps qui revient plus fort. Pas dans un mois — demain."
            </p>
            <span style={{...S,fontSize:'.55rem',letterSpacing:'.25em',textTransform:'uppercase',color:GOLD}}>
              — Les fondateurs, SŌMA
            </span>
          </div>
        </Rev>
      </section>

      {/* ─── IMAGE PLEINE LARGEUR ─────────────────────────────────────────── */}
      <section style={{height:isMobile?'55vw':'70vh',position:'relative',overflow:'hidden'}}>
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80"
          alt="Salle de sport SŌMA"
          style={{width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'brightness(0.55)'}}
        />
        <div style={{
          position:'absolute',inset:0,
          background:'linear-gradient(180deg,transparent 20%,rgba(8,8,8,.7) 100%)',
        }}/>
        <div style={{
          position:'absolute',
          bottom:isMobile?'32px':'72px',left:isMobile?'24px':'80px',right:isMobile?'24px':''
        }}>
          <p style={{...P,fontSize:'clamp(1.8rem,4vw,4rem)',color:CREAM,fontStyle:'italic',margin:0,lineHeight:1.1,fontWeight:300}}>
            Chaque corps mérite<br/>de récupérer comme un pro.
          </p>
        </div>
      </section>

      {/* ─── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="grain" style={{background:BLK,padding:`clamp(100px,14vh,160px) ${px}`,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 40% 60% at 80% 50%,rgba(196,150,106,0.06) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <Rev>
          <div style={{marginBottom:'80px',position:'relative',zIndex:2}}>
            <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'16px',display:'flex',alignItems:'center',gap:'14px'}}>
              <span style={{width:'28px',height:'1px',background:GOLD}}/>Notre parcours
            </p>
            <h2 style={{...P,fontSize:'clamp(3.5rem,7vw,7rem)',fontWeight:300,color:CREAM,margin:0,lineHeight:.9,letterSpacing:'-0.025em'}}>
              De l'idée<br/><em style={{color:GOLD,fontStyle:'italic'}}>à l'écosystème</em>
            </h2>
          </div>
        </Rev>

        <div style={{position:'relative',maxWidth:'840px',zIndex:2}}>
          {!isMobile && (
            <div style={{position:'absolute',left:'80px',top:'8px',bottom:0,width:'1px',background:'rgba(196,150,106,0.12)'}}/>
          )}
          {TIMELINE.map((t,i)=>(
            <Rev key={i} delay={i*.1}>
              <div style={{display:'flex',gap:isMobile?'20px':'40px',marginBottom:'72px',alignItems:'flex-start'}}>
                <div style={{flexShrink:0,width:isMobile?'56px':'96px',textAlign:'center'}}>
                  <div style={{width:'8px',height:'8px',borderRadius:'50%',background:GOLD,margin:'4px auto 12px',position:'relative',zIndex:1}}/>
                  <p style={{...S,fontSize:'.6rem',fontWeight:700,letterSpacing:'.1em',color:GOLD,margin:0}}>{t.year}</p>
                </div>
                <div style={{paddingBottom:'4px'}}>
                  <h3 style={{...P,fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:300,color:CREAM,marginBottom:'14px',lineHeight:1.15}}>{t.title}</h3>
                  <p style={{...S,fontSize:'.84rem',fontWeight:300,color:'rgba(237,232,223,0.55)',lineHeight:1.9,margin:0}}>{t.text}</p>
                </div>
              </div>
            </Rev>
          ))}
        </div>
      </section>

      {/* ─── SPLIT — Philosophie ──────────────────────────────────────────── */}
      <section style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',minHeight:isMobile?'auto':'60vh'}}>
        <div style={{height:isMobile?'60vw':'100%',overflow:'hidden'}}>
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80"
            alt="Entraînement intensif"
            style={{width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'brightness(0.75)'}}
          />
        </div>
        <div style={{
          background:IALT,display:'flex',alignItems:'center',justifyContent:'center',
          padding:isMobile?'64px 24px':'80px',
        }}>
          <Rev>
            <div style={{maxWidth:'420px'}}>
              <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'20px'}}>Certifié CE · Garantie 2 ans</p>
              <h3 style={{...P,fontSize:'clamp(2rem,3.5vw,3rem)',fontWeight:300,color:DARK,marginBottom:'24px',lineHeight:1.1,letterSpacing:'-.02em'}}>
                Une qualité clinique,<br/><em style={{fontStyle:'italic',color:GOLD}}>un prix juste.</em>
              </h3>
              <div style={{width:'40px',height:'1px',background:GOLD,marginBottom:'28px',opacity:.5}}/>
              <p style={{...S,fontSize:'.84rem',fontWeight:300,color:STONE,lineHeight:1.9,margin:0}}>
                Nous refusons le choix entre qualité et accessibilité. Chaque appareil SŌMA est conçu avec les mêmes exigences que les appareils utilisés en cabinet kiné — et livré directement chez vous, avec une garantie 2 ans et un SAV 7j/7.
              </p>
            </div>
          </Rev>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="grain" style={{
        background:BLK,padding:`clamp(100px,14vh,160px) ${px}`,
        textAlign:'center',position:'relative',overflow:'hidden',
      }}>
        <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(196,150,106,0.09) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <Rev>
          <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'24px',position:'relative',zIndex:2}}>
            Rejoindre SŌMA
          </p>
          <h2 style={{...P,fontSize:'clamp(4rem,8vw,8rem)',fontWeight:300,color:CREAM,marginBottom:'0',lineHeight:.9,letterSpacing:'-.025em',position:'relative',zIndex:2}}>
            Prêt à récupérer<br/><em style={{color:GOLD,fontStyle:'italic'}}>comme un pro ?</em>
          </h2>
          <p style={{...S,fontSize:'.9rem',fontWeight:300,color:STONE,lineHeight:1.85,maxWidth:'40ch',margin:'48px auto 0',position:'relative',zIndex:2}}>
            Pistolet percussif, EMS, masseur cervical. Livraison gratuite dès 60 €. Garantie 2 ans.
          </p>
          <div style={{marginTop:'56px',display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap',position:'relative',zIndex:2}}>
            <a
              href="/catalogue"
              onClick={e=>{e.preventDefault();window.history.pushState({},'','/catalogue');window.dispatchEvent(new PopStateEvent('popstate'))}}
              style={{
                ...S,display:'inline-block',background:GOLD,color:BLK,
                fontSize:'.65rem',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',
                padding:'18px 56px',textDecoration:'none',transition:'background .3s,transform .25s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background=GOLDL;e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.background=GOLD;e.currentTarget.style.transform='translateY(0)'}}
            >Découvrir la collection</a>
            <a
              href="/contact"
              onClick={e=>{e.preventDefault();window.history.pushState({},'','/contact');window.dispatchEvent(new PopStateEvent('popstate'))}}
              style={{
                ...S,display:'inline-block',background:'transparent',color:CREAM,
                border:`1px solid rgba(196,150,106,0.28)`,
                fontSize:'.65rem',fontWeight:500,letterSpacing:'.2em',textTransform:'uppercase',
                padding:'17px 56px',textDecoration:'none',transition:'border-color .3s,color .3s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.color=GOLD}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(196,150,106,0.28)';e.currentTarget.style.color=CREAM}}
            >Nous contacter</a>
          </div>
        </Rev>
      </section>

    </main>
  )
}
