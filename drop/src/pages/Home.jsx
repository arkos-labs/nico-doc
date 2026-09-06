import { useState, useEffect, useRef } from 'react'
import { products } from '../data'

/* ─── Design tokens ─────────────────────────────────────────────────────────── */
const S = { fontFamily: "'Outfit', sans-serif" }
const P = { fontFamily: "'Cormorant Garant', Georgia, serif" }
const BLK   = '#080808'
const DARK  = '#111010'
const SRF   = '#1C1A1A'
const GOLD  = '#C4966A'
const GOLDL = '#DDB880'
const CREAM = '#EDE8DF'
const STONE = '#8A7A6E'
const IVORY = '#F9F5F0'
const IALT  = '#F0EBE3'
const CREAM70 = 'rgba(237,232,223,0.7)'
const CREAM40 = 'rgba(237,232,223,0.4)'

/* ─── Grain overlay ─────────────────────────────────────────────────────────── */
const GRAIN_CSS = `
@keyframes grain {
  0%,100%{transform:translate(0,0)}
  10%{transform:translate(-5%,-10%)}
  20%{transform:translate(-15%,5%)}
  30%{transform:translate(7%,-25%)}
  40%{transform:translate(-5%,25%)}
  50%{transform:translate(-15%,10%)}
  60%{transform:translate(15%,0)}
  70%{transform:translate(0,15%)}
  80%{transform:translate(3%,35%)}
  90%{transform:translate(-10%,10%)}
}
.grain::after{
  content:"";
  position:absolute;inset:-200%;
  width:400%;height:400%;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity:0.038;pointer-events:none;z-index:1;
  animation:grain 8s steps(10) infinite;
}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
.reveal{opacity:0;transform:translateY(32px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
.reveal.in{opacity:1;transform:translateY(0)}
`

/* ─── Canvas: Massage Gun ───────────────────────────────────────────────────── */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r)
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h)
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r)
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath()
}

function drawGun(canvas) {
  const W=canvas.width, H=canvas.height, ctx=canvas.getContext('2d')
  ctx.clearRect(0,0,W,H)
  // glow
  const g=ctx.createRadialGradient(W*.56,H*.44,8,W*.56,H*.44,220)
  g.addColorStop(0,'rgba(196,150,106,0.32)'); g.addColorStop(.5,'rgba(196,150,106,0.08)'); g.addColorStop(1,'rgba(196,150,106,0)')
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H)
  ctx.save(); ctx.translate(W*.54,H*.5); ctx.rotate(-0.07)
  ctx.fillStyle='rgba(196,150,106,0.08)'; ctx.strokeStyle=GOLD; ctx.lineWidth=2; ctx.lineCap='round'; ctx.lineJoin='round'
  // body
  roundRect(ctx,-35,-78,80,152,18); ctx.fill(); ctx.stroke()
  // grip
  ctx.fillStyle='rgba(196,150,106,0.06)'; roundRect(ctx,-18,66,46,94,12); ctx.fill(); ctx.stroke()
  // connector
  ctx.fillStyle='rgba(196,150,106,0.09)'; roundRect(ctx,-92,-16,60,50,10); ctx.fill(); ctx.stroke()
  // head disc
  ctx.beginPath(); ctx.arc(-108,9,32,0,Math.PI*2); ctx.fillStyle='rgba(196,150,106,0.1)'; ctx.fill()
  ctx.strokeStyle=GOLD; ctx.lineWidth=2; ctx.stroke()
  ctx.beginPath(); ctx.arc(-108,9,16,0,Math.PI*2); ctx.strokeStyle='rgba(196,150,106,0.5)'; ctx.lineWidth=1.2; ctx.stroke()
  // texture lines
  ctx.strokeStyle='rgba(196,150,106,0.28)'; ctx.lineWidth=1
  for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(-28,-52+i*24);ctx.lineTo(38,-52+i*24);ctx.stroke()}
  // LEDs
  ['#C4966A','#C4966A','#C4966A','rgba(196,150,106,0.25)'].forEach((c,i)=>{
    ctx.beginPath();ctx.arc(-15+i*12,57,3.5,0,Math.PI*2);ctx.fillStyle=c;ctx.fill()})
  // buttons
  roundRect(ctx,-20,87,44,26,7); ctx.stroke(); roundRect(ctx,-14,122,32,11,5); ctx.stroke()
  ctx.restore()
  // waves
  const hx=W*.54-115, hy=H*.5+9
  for(let r=0;r<5;r++){
    ctx.beginPath(); ctx.arc(hx,hy,50+r*32,-Math.PI*.65,Math.PI*.15)
    ctx.strokeStyle=`rgba(196,150,106,${Math.max(0,.26-r*.052)})`; ctx.lineWidth=Math.max(.5,1.6-r*.25); ctx.stroke()}
  // particles
  [[W*.1,H*.12,2.5],[W*.88,H*.18,1.8],[W*.07,H*.8,2],[W*.93,H*.64,1.8],[W*.78,H*.9,1.5],[W*.94,H*.36,1.4]].forEach(([px,py,pr])=>{
    ctx.beginPath();ctx.arc(px,py,pr,0,Math.PI*2);ctx.fillStyle='rgba(196,150,106,0.4)';ctx.fill()})
}

function HeroCanvas() {
  const ref = useRef(null)
  useEffect(()=>{
    const c=ref.current; if(!c)return; drawGun(c)
    const ro=new ResizeObserver(()=>drawGun(c)); ro.observe(c)
    return()=>ro.disconnect()
  },[])
  return <canvas ref={ref} width={520} height={480} style={{width:'100%',maxWidth:'520px',height:'auto',display:'block'}} aria-label="Pistolet de massage percussif SŌMA Apex Pro"/>
}

/* ─── Scroll-reveal hook ────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el)return
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){el.classList.add('in');obs.disconnect()} },{threshold:.12})
    obs.observe(el); return()=>obs.disconnect()
  },[])
  return ref
}

function Rev({children, delay=0, style={}}) {
  const ref = useReveal()
  return <div ref={ref} className="reveal" style={{transitionDelay:`${delay}s`,...style}}>{children}</div>
}

/* ─── Product Showcase ──────────────────────────────────────────────────────── */
function ProductShowcase({product, onOpen, onAdd}) {
  const [hov, setHov]=useState(false)
  const [btnHov, setBtnHov]=useState(false)
  if(!product)return null
  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        display:'grid', gridTemplateColumns:'1fr 1fr',
        border:`1px solid rgba(196,150,106,${hov?.3:.12})`,
        transition:'border-color .4s', overflow:'hidden', cursor:'pointer',
      }}
    >
      <div onClick={()=>onOpen(product.id)} style={{position:'relative',overflow:'hidden',background:BLK,minHeight:'560px'}}>
        <img src={product.image} alt={product.name} style={{
          width:'100%',height:'100%',objectFit:'cover',display:'block',
          transform:hov?'scale(1.04)':'scale(1)',transition:'transform 1s ease',
          opacity:.88,filter:'brightness(0.85)',
        }}/>
        <div style={{position:'absolute',inset:0,background:`linear-gradient(180deg,transparent 60%,rgba(8,8,8,.6) 100%)`}}/>
        <span style={{
          position:'absolute',top:'24px',left:'24px',
          background:GOLD,color:BLK,
          ...S,fontSize:'.52rem',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',padding:'6px 14px',
        }}>Bestseller №1</span>
      </div>
      <div onClick={()=>onOpen(product.id)} style={{
        padding:'clamp(40px,6vw,80px)',display:'flex',flexDirection:'column',
        justifyContent:'center',background:IVORY,
      }}>
        <span style={{...S,fontSize:'.55rem',fontWeight:600,letterSpacing:'.22em',textTransform:'uppercase',color:GOLD,display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
          <span style={{width:'28px',height:'1px',background:GOLD,display:'inline-block'}}/>Produit vedette
        </span>
        <h3 style={{...P,fontSize:'clamp(2rem,3.5vw,3.2rem)',fontWeight:300,fontStyle:'italic',color:DARK,lineHeight:1.1,marginBottom:'8px'}}>
          {product.name}
        </h3>
        <p style={{...P,fontSize:'1.05rem',color:GOLD,marginBottom:'20px'}}>{product.category}</p>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
          <span style={{color:GOLD,fontSize:'.75rem'}}>★★★★★</span>
          <span style={{...S,fontSize:'.75rem',color:STONE}}>4.9 · {product.reviews?.toLocaleString('fr-FR')} avis</span>
        </div>
        <p style={{...S,fontSize:'.88rem',fontWeight:300,color:STONE,lineHeight:1.85,maxWidth:'38ch',marginBottom:'28px'}}>{product.description}</p>
        {product.features && (
          <ul style={{listStyle:'none',padding:0,marginBottom:'36px',display:'flex',flexDirection:'column',gap:'10px'}}>
            {product.features.map((f,i)=>(
              <li key={i} style={{...S,fontSize:'.82rem',color:STONE,display:'flex',alignItems:'flex-start',gap:'10px'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" style={{flexShrink:0,marginTop:'2px'}}><polyline points="20 6 9 17 4 12"/></svg>{f}
              </li>
            ))}
          </ul>
        )}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'16px'}}>
          <div>
            <span style={{...P,fontSize:'2.4rem',fontWeight:600,color:DARK}}>{product.price?.toFixed(2)} €</span>
            {product.originalPrice && <span style={{...S,fontSize:'.9rem',color:STONE,textDecoration:'line-through',marginLeft:'14px'}}>{product.originalPrice.toFixed(2)} €</span>}
          </div>
          <button
            onClick={e=>{e.stopPropagation();onAdd(product)}}
            onMouseEnter={()=>setBtnHov(true)} onMouseLeave={()=>setBtnHov(false)}
            style={{
              background:btnHov?GOLDL:GOLD,color:BLK,
              ...S,fontSize:'.68rem',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',
              padding:'16px 36px',border:'none',cursor:'pointer',transition:'background .25s',
            }}>Ajouter au panier</button>
        </div>
      </div>
    </div>
  )
}

/* ─── Testimonials ──────────────────────────────────────────────────────────── */
const testimonials = [
  { stars:5, text:'"L\'Apex Pro a complètement transformé ma récupération. En deux semaines, mes courbatures ont diminué de moitié. La qualité est impressionnante."', name:'Sophie M.', role:'Coach sportive · Lyon' },
  { stars:5, text:'"Jamais un appareil de massage ne m\'avait autant convaincu. Silencieux, puissant, et le design est à la hauteur. Je recommande sans hésiter."', name:'Karim B.', role:'Préparateur physique · Paris' },
  { stars:5, text:'"Après des années de kiné hebdomadaire, l\'EMS SŌMA a remplacé la moitié de mes séances. Résultats identiques, chez moi, en 20 minutes."', name:'Marie-Laure D.', role:'Triathlète · Bordeaux' },
]

/* ─── Home ──────────────────────────────────────────────────────────────────── */
export default function Home({onAdd, onOpen}) {
  const featured = products.find(p=>p.id===201)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<768)
    check(); window.addEventListener('resize',check); return()=>window.removeEventListener('resize',check)
  },[])

  useEffect(()=>{
    const t=setInterval(()=>setActiveTestimonial(p=>(p+1)%testimonials.length),5000)
    return()=>clearInterval(t)
  },[])

  return (
    <main style={{background:IVORY,minHeight:'100vh'}}>
      <style>{GRAIN_CSS}</style>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="grain" style={{
        minHeight:'100vh', background:BLK,
        display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr',
        alignItems:'center', gap:isMobile?'40px':'3rem',
        padding:`clamp(100px,14vh,160px) clamp(24px,5vw,80px) clamp(60px,8vh,100px)`,
        position:'relative',overflow:'hidden',
      }}>
        <div style={{
          position:'absolute',inset:0, zIndex:0,
          background:'radial-gradient(ellipse 55% 70% at 72% 38%, rgba(196,150,106,0.1) 0%, transparent 65%)',
          pointerEvents:'none',
        }}/>

        {/* Left */}
        <div style={{position:'relative',zIndex:2}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'28px'}}>
            <span style={{width:'32px',height:'1px',background:GOLD,display:'inline-block',flexShrink:0}}/>
            <p style={{...S,fontSize:'.55rem',fontWeight:600,letterSpacing:'.3em',textTransform:'uppercase',color:GOLD,margin:0}}>
              Technologie bien-être premium
            </p>
          </div>

          <h1 style={{
            ...P,
            fontSize:'clamp(3.8rem,7.5vw,7.5rem)',
            fontWeight:300, lineHeight:.97, letterSpacing:'-0.02em',
            color:CREAM, margin:'0 0 32px',
          }}>
            La récupération,<br/>
            <em style={{color:GOLD,fontStyle:'italic'}}>réinventée.</em>
          </h1>

          <p style={{
            ...S,fontSize:'1rem',fontWeight:300,color:STONE,
            lineHeight:1.85,maxWidth:'44ch',marginBottom:'48px',
          }}>
            Des appareils de massage de haute performance, conçus pour les corps qui exigent le meilleur. Récupérez plus vite, vivez pleinement.
          </p>

          <div style={{display:'flex',gap:'14px',flexWrap:'wrap',marginBottom:'64px'}}>
            <button
              onClick={()=>document.getElementById('produit-vedette')?.scrollIntoView({behavior:'smooth'})}
              style={{
                background:GOLD,color:BLK,
                ...S,fontSize:'.68rem',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',
                padding:'17px 40px',border:'none',cursor:'pointer',
                display:'inline-flex',alignItems:'center',gap:'10px',
                transition:'background .25s,transform .25s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background=GOLDL;e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.background=GOLD;e.currentTarget.style.transform='translateY(0)'}}
            >
              Découvrir la collection
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button
              onClick={()=>onOpen('catalogue')}
              style={{
                background:'transparent',color:CREAM,
                border:`1px solid rgba(196,150,106,0.28)`,
                ...S,fontSize:'.68rem',fontWeight:500,letterSpacing:'.14em',textTransform:'uppercase',
                padding:'16px 40px',cursor:'pointer',transition:'border-color .25s,color .25s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.color=GOLD}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(196,150,106,0.28)';e.currentTarget.style.color=CREAM}}
            >Voir tous les produits</button>
          </div>

          {/* Stats */}
          <div style={{display:'flex',gap:'0',flexWrap:'wrap'}}>
            {[['12 847','Clients satisfaits'],['4.9 / 5','Note moyenne'],['2 ans','Garantie offerte']].map(([n,l],i)=>(
              <div key={i} style={{display:'flex',alignItems:'stretch',gap:'32px'}}>
                {i>0 && <div style={{width:'1px',background:'rgba(255,255,255,0.07)',margin:'0 32px'}}/>}
                <div>
                  <div style={{...P,fontSize:'2rem',fontWeight:600,color:CREAM,lineHeight:1}}>{n}</div>
                  <div style={{...S,fontSize:'.58rem',fontWeight:400,letterSpacing:'.12em',textTransform:'uppercase',color:STONE,marginTop:'6px'}}>{l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: canvas */}
        {!isMobile && (
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',position:'relative',zIndex:2}}>
            <HeroCanvas/>
          </div>
        )}
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────────────────────── */}
      <div style={{borderTop:`1px solid rgba(196,150,106,0.18)`,borderBottom:`1px solid rgba(196,150,106,0.18)`,background:DARK,overflow:'hidden',padding:'14px 0'}} aria-hidden="true">
        <div style={{display:'flex',animation:'marquee 32s linear infinite',whiteSpace:'nowrap'}}>
          {['Livraison gratuite dès 60€','Retours offerts 30 jours','Garantie 2 ans incluse','Certification CE européenne','Expédition en 24h','Service client 7j/7',
            'Livraison gratuite dès 60€','Retours offerts 30 jours','Garantie 2 ans incluse','Certification CE européenne','Expédition en 24h','Service client 7j/7',
          ].map((t,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center',gap:'14px',padding:'0 28px',...S,fontSize:'.6rem',fontWeight:500,letterSpacing:'.22em',textTransform:'uppercase',color:STONE}}>
              <span style={{width:'4px',height:'4px',background:GOLD,transform:'rotate(45deg)',flexShrink:0}}/>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ─── BENEFITS ─────────────────────────────────────────────────────── */}
      <section style={{background:IVORY,padding:`clamp(80px,12vh,160px) clamp(24px,5vw,80px)`}}>
        <Rev>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'80px',flexWrap:'wrap',gap:'24px'}}>
            <div>
              <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'16px',display:'flex',alignItems:'center',gap:'14px'}}>
                <span style={{width:'28px',height:'1px',background:GOLD}}/>Pourquoi SŌMA
              </p>
              <h2 style={{...P,fontSize:'clamp(3rem,6vw,5.5rem)',fontWeight:300,color:DARK,lineHeight:.95,letterSpacing:'-0.02em',margin:0}}>
                La technologie<br/>qui <em style={{fontStyle:'italic',color:GOLD}}>transforme</em>
              </h2>
            </div>
            <p style={{...S,fontSize:'.85rem',fontWeight:300,color:STONE,lineHeight:1.85,maxWidth:'36ch'}}>
              Développés avec des kinésithérapeutes et des préparateurs physiques, nos appareils sont l'aboutissement de 3 ans de R&D.
            </p>
          </div>
        </Rev>

        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:'2px',background:`rgba(196,150,106,0.08)`}}>
          {[
            {
              n:'01',
              icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
              title:'Soulagement immédiat',
              desc:'Nos pistolets ciblent les nœuds musculaires profonds là où les mains ne peuvent atteindre — soulagement en quelques secondes.',
            },
            {
              n:'02',
              icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
              title:'Récupération 2× plus rapide',
              desc:'Études cliniques à l\'appui : 48% de réduction des courbatures post-effort et une récupération musculaire accélérée.',
            },
            {
              n:'03',
              icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              title:'Certifié CE · Garanti 2 ans',
              desc:'Chaque appareil est certifié CE, testé par notre équipe qualité et couvert par une garantie complète de 2 ans.',
            },
          ].map(({n,icon,title,desc},i)=>(
            <Rev key={i} delay={i*.12}>
              <div style={{
                background:'#fff',padding:isMobile?'40px 28px':'56px 40px',
                display:'flex',flexDirection:'column',gap:'20px',height:'100%',
                borderTop:`3px solid transparent`,
                transition:'border-color .3s',
              }}
                onMouseEnter={e=>e.currentTarget.style.borderTopColor=GOLD}
                onMouseLeave={e=>e.currentTarget.style.borderTopColor='transparent'}
              >
                <span style={{...S,fontSize:'.55rem',fontWeight:700,letterSpacing:'.2em',color:'rgba(196,150,106,0.4)'}}>{n}</span>
                <div>{icon}</div>
                <h3 style={{...P,fontSize:'1.55rem',fontWeight:400,color:DARK,lineHeight:1.2}}>{title}</h3>
                <p style={{...S,fontSize:'.85rem',color:STONE,lineHeight:1.8,margin:0}}>{desc}</p>
              </div>
            </Rev>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCT ─────────────────────────────────────────────── */}
      <section id="produit-vedette" style={{background:IALT,padding:`clamp(80px,12vh,140px) clamp(24px,5vw,80px)`}}>
        <Rev>
          <div style={{marginBottom:'56px'}}>
            <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'16px',display:'flex',alignItems:'center',gap:'14px'}}>
              <span style={{width:'28px',height:'1px',background:GOLD}}/>Produit vedette
            </p>
            <h2 style={{...P,fontSize:'clamp(3rem,6vw,5rem)',fontWeight:300,color:DARK,lineHeight:.95,letterSpacing:'-0.02em',margin:0}}>
              Votre nouvel <em style={{fontStyle:'italic',color:GOLD}}>essentiel</em>
            </h2>
          </div>
        </Rev>
        <Rev delay={.1}>
          <ProductShowcase product={featured} onOpen={onOpen} onAdd={onAdd}/>
        </Rev>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="grain" style={{
        background:BLK,padding:`clamp(100px,14vh,160px) clamp(24px,5vw,80px)`,
        position:'relative',overflow:'hidden',
        borderTop:`1px solid rgba(196,150,106,0.1)`,
      }}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 60% at 50% 50%,rgba(196,150,106,0.06) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div style={{maxWidth:'860px',margin:'0 auto',position:'relative',zIndex:2}}>
          <Rev>
            <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'64px',textAlign:'center'}}>
              Ce que disent nos clients
            </p>
          </Rev>

          {testimonials.map((t,i)=>(
            <div key={i} style={{
              display:activeTestimonial===i?'block':'none',
              textAlign:'center',
              animation:'fadeUp .6s cubic-bezier(.16,1,.3,1)',
            }}>
              <div style={{display:'flex',justifyContent:'center',gap:'6px',marginBottom:'36px'}}>
                {Array(t.stars).fill(0).map((_,j)=><span key={j} style={{color:GOLD,fontSize:'1.1rem'}}>★</span>)}
              </div>
              <blockquote style={{
                ...P,fontSize:'clamp(1.6rem,3.5vw,2.8rem)',fontWeight:300,fontStyle:'italic',
                color:CREAM,lineHeight:1.45,marginBottom:'40px',
              }}>
                {t.text}
              </blockquote>
              <div style={{width:'32px',height:'1px',background:GOLD,margin:'0 auto 20px',opacity:.5}}/>
              <p style={{...S,fontSize:'.6rem',fontWeight:600,letterSpacing:'.2em',textTransform:'uppercase',color:GOLD}}>{t.name}</p>
              <p style={{...S,fontSize:'.6rem',fontWeight:300,letterSpacing:'.12em',textTransform:'uppercase',color:STONE,marginTop:'4px'}}>{t.role}</p>
            </div>
          ))}

          {/* Dots */}
          <div style={{display:'flex',justifyContent:'center',gap:'8px',marginTop:'52px'}}>
            {testimonials.map((_,i)=>(
              <button key={i} onClick={()=>setActiveTestimonial(i)} aria-label={`Témoignage ${i+1}`} style={{
                width:i===activeTestimonial?'28px':'8px',height:'8px',border:'none',cursor:'pointer',
                background:i===activeTestimonial?GOLD:'rgba(196,150,106,0.25)',
                transition:'all .4s ease',padding:0,
              }}/>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ────────────────────────────────────────────────────── */}
      <section style={{background:'#fff',borderTop:`1px solid rgba(196,150,106,0.12)`}}>
        <div style={{
          display:'grid',gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)',
        }}>
          {[
            {
              icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
              title:'Livraison gratuite',desc:'Dès 60 € · 2–4 jours ouvrés',
            },
            {
              icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              title:'Garantie 2 ans',desc:'SAV réactif 7j/7',
            },
            {
              icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
              title:'Retours 30 jours',desc:'Gratuits · Sans condition',
            },
            {
              icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.67a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>,
              title:'Support 7j/7',desc:'9h–21h tous les jours',
            },
          ].map(({icon,title,desc},i)=>(
            <div key={i} style={{
              padding:'36px 28px',display:'flex',flexDirection:'column',gap:'12px',
              borderRight:i<3?`1px solid rgba(196,150,106,0.1)`:'none',
              borderBottom:isMobile&&i<2?`1px solid rgba(196,150,106,0.1)`:'none',
              background:'#fff',
            }}>
              {icon}
              <p style={{...P,fontSize:'1.05rem',fontWeight:500,color:DARK,margin:0}}>{title}</p>
              <p style={{...S,fontSize:'.78rem',color:STONE,margin:0,lineHeight:1.6}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BAND ─────────────────────────────────────────────────────── */}
      <section style={{background:GOLD,padding:`clamp(56px,8vh,80px) clamp(24px,5vw,80px)`}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'32px'}}>
          <div>
            <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.3em',textTransform:'uppercase',color:'rgba(8,8,8,0.5)',marginBottom:'12px'}}>
              Prêt à commencer ?
            </p>
            <h2 style={{...P,fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:300,color:BLK,margin:0,lineHeight:1.1}}>
              Récupérez comme <em style={{fontStyle:'italic'}}>un pro.</em>
            </h2>
          </div>
          <button
            onClick={()=>onOpen('catalogue')}
            style={{
              background:BLK,color:CREAM,
              ...S,fontSize:'.65rem',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',
              padding:'18px 48px',border:'none',cursor:'pointer',
              transition:'opacity .2s,transform .25s',flexShrink:0,
            }}
            onMouseEnter={e=>{e.currentTarget.style.opacity='.85';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='translateY(0)'}}
          >Voir la collection →</button>
        </div>
      </section>

    </main>
  )
}
