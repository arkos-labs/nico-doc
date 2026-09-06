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
const ERR   = '#C0392B'

const CSS = `
@keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-5%,-10%)}20%{transform:translate(-15%,5%)}30%{transform:translate(7%,-25%)}40%{transform:translate(-5%,25%)}50%{transform:translate(-15%,10%)}60%{transform:translate(15%,0)}70%{transform:translate(0,15%)}80%{transform:translate(3%,35%)}90%{transform:translate(-10%,10%)}}
.grain::after{content:"";position:absolute;inset:-200%;width:400%;height:400%;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:0.038;pointer-events:none;z-index:1;animation:grain 8s steps(10) infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
input::placeholder{color:rgba(237,232,223,0.2)}
textarea::placeholder{color:rgba(237,232,223,0.2)}
`

/* ─── Floating label field ──────────────────────────────────────────────────── */
function Field({label, type='text', isTextArea=false, value, onChange, error, dark=false}) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || (value && value.length>0)
  const textColor = dark ? CREAM : '#111'
  const borderCol = error ? ERR : focused ? (dark?CREAM:DARK) : dark?'rgba(237,232,223,0.18)':'rgba(17,16,16,0.18)'
  const labelCol  = error ? ERR : isActive ? GOLD : dark?'rgba(237,232,223,0.45)':STONE

  const baseInput = {
    ...S, width:'100%', background:'transparent', border:'none',
    borderBottom:`1px solid ${borderCol}`, outline:'none', resize:'none',
    fontSize:'.9rem', color:textColor, transition:'border-color .3s',
  }

  return (
    <div style={{position:'relative',marginBottom:error?'28px':'40px'}}>
      <label style={{
        ...S, position:'absolute', left:0,
        top:isActive ? '-13px' : (isTextArea?'14px':'16px'),
        fontSize:isActive?'.57rem':'.87rem',
        color:labelCol, letterSpacing:isActive?'.1em':'0',
        textTransform:isActive?'uppercase':'none',
        transition:'all .3s ease', pointerEvents:'none',
      }}>{label}</label>
      {isTextArea
        ? <textarea rows={5} value={value} onChange={e=>onChange(e.target.value)}
            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
            style={{...baseInput,padding:'14px 0 10px'}}/>
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)}
            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
            style={{...baseInput,padding:'16px 0'}}/>
      }
      {error && <p style={{...S,fontSize:'.58rem',color:ERR,margin:'5px 0 0'}}>{error}</p>}
    </div>
  )
}

/* ─── Accordion ─────────────────────────────────────────────────────────────── */
function Accordion({items, dark=true}) {
  const [open, setOpen] = useState(null)
  const bg = dark ? 'rgba(196,150,106,0.1)' : 'rgba(196,150,106,0.15)'
  const textCol = dark ? 'rgba(237,232,223,0.68)' : DARK
  const subCol  = dark ? 'rgba(237,232,223,0.42)' : STONE
  const border  = dark ? 'rgba(196,150,106,0.1)' : 'rgba(17,16,16,0.08)'
  return (
    <div>
      {items.map((f,i)=>(
        <div key={i} style={{borderTop:`1px solid ${border}`}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{
            ...S, width:'100%', background:'none', border:'none', cursor:'pointer',
            padding:'15px 0', display:'flex', justifyContent:'space-between', alignItems:'center',
            fontSize:'.76rem', fontWeight:400, color:textCol, textAlign:'left', gap:'12px',
          }}>
            <span>{f.q}</span>
            <span style={{color:GOLD,fontSize:'1.05rem',flexShrink:0,transition:'transform .3s',transform:open===i?'rotate(45deg)':'rotate(0)'}}>+</span>
          </button>
          {open===i && (
            <p style={{...S,fontSize:'.73rem',fontWeight:300,color:subCol,lineHeight:1.8,paddingBottom:'14px',margin:0}}>
              {f.a}
            </p>
          )}
        </div>
      ))}
      <div style={{borderTop:`1px solid ${border}`}}/>
    </div>
  )
}

const FAQS = [
  {q:'Délais de livraison ?', a:'2 à 4 jours ouvrés après confirmation. Expédition sous 24h en semaine.'},
  {q:'Retours & échanges ?', a:'30 jours après réception, produit non utilisé dans son emballage. Frais de retour offerts.'},
  {q:'Comment suivre mon colis ?', a:'Un email avec le numéro de suivi est envoyé dès l\'expédition.'},
  {q:'La garantie couvre quoi ?', a:'2 ans contre tout défaut de fabrication. SAV 7j/7 par email et chat.'},
]

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false)
  const [form, setForm] = useState({name:'',email:'',subject:'',message:''})
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<900)
    check(); window.addEventListener('resize',check); return()=>window.removeEventListener('resize',check)
  },[])

  const set = k => v => setForm(f=>({...f,[k]:v}))

  const validate = () => {
    const e={}
    if(!form.name.trim()) e.name='Requis.'
    if(!form.email.trim()) e.email='Requis.'
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Email invalide.'
    if(!form.subject) e.subject='Choisissez un sujet.'
    if(!form.message.trim()) e.message='Requis.'
    else if(form.message.trim().length<20) e.message='Trop court (20 car. min.).'
    return e
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs=validate()
    if(Object.keys(errs).length){setErrors(errs);return}
    setErrors({}); setSending(true)
    await new Promise(r=>setTimeout(r,1400))
    setSending(false); setSubmitted(true)
  }

  return (
    <main style={{background:IVORY,paddingTop:'72px',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <style>{CSS}</style>

      <section style={{display:'flex',flexDirection:isMobile?'column':'row',flex:1,minHeight:isMobile?'auto':'calc(100vh - 72px)'}}>

        {/* ─── LEFT: DARK PANEL ─────────────────────────────────────────── */}
        <div className="grain" style={{
          flex:'0 0 45%', background:BLK,
          padding:isMobile?'64px 24px 60px':`clamp(80px,12vh,120px) 7% clamp(80px,12vh,120px) clamp(40px,8%,88px)`,
          display:'flex', flexDirection:'column', justifyContent:'space-between',
          position:'relative', overflow:'hidden',
        }}>
          {/* Ambient glow */}
          <div style={{position:'absolute',right:'-20%',bottom:'-10%',width:'60vh',height:'60vh',borderRadius:'50%',background:'radial-gradient(circle,rgba(196,150,106,0.08) 0%,transparent 70%)',pointerEvents:'none'}}/>

          <div style={{position:'relative',zIndex:2}}>
            <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:GOLD,marginBottom:'24px',display:'flex',alignItems:'center',gap:'14px'}}>
              <span style={{width:'28px',height:'1px',background:GOLD}}/>Service Client
            </p>
            <h1 style={{
              ...P,fontSize:'clamp(3.5rem,6vw,6rem)',
              fontWeight:300,color:CREAM,lineHeight:.9,
              marginBottom:'36px',fontStyle:'italic',letterSpacing:'-.025em',
            }}>
              On est là<br/><em style={{color:GOLD}}>pour vous.</em>
            </h1>
            <div style={{width:'40px',height:'1px',background:GOLD,marginBottom:'36px',opacity:.4}}/>
            <p style={{...S,fontSize:'.86rem',fontWeight:300,color:'rgba(237,232,223,0.55)',lineHeight:1.9,marginBottom:'56px',maxWidth:'36ch'}}>
              Une question sur une commande, un conseil d'utilisation ou une demande de partenariat — réponse garantie sous 24h ouvrées.
            </p>

            {/* Contact info */}
            <div style={{display:'flex',flexDirection:'column',gap:'24px',marginBottom:'56px'}}>
              {[
                {icon:'✉', label:'Email',    val:'hello@soma-wellness.com'},
                {icon:'◷', label:'Horaires', val:'Lun – Ven · 9h – 18h CET'},
                {icon:'◎', label:'Réponse',  val:'Moins de 24h ouvrées'},
              ].map((it,i)=>(
                <div key={i} style={{display:'flex',gap:'16px',alignItems:'flex-start'}}>
                  <span style={{color:GOLD,fontSize:'1rem',marginTop:'1px',flexShrink:0}}>{it.icon}</span>
                  <div>
                    <p style={{...S,fontSize:'.52rem',fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(237,232,223,0.5)',marginBottom:'3px'}}>{it.label}</p>
                    <p style={{...S,fontSize:'.8rem',fontWeight:300,color:'rgba(237,232,223,0.55)',margin:0}}>{it.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <p style={{...S,fontSize:'.52rem',fontWeight:600,letterSpacing:'.22em',textTransform:'uppercase',color:'rgba(237,232,223,0.38)',marginBottom:'16px'}}>
              Questions fréquentes
            </p>
            <Accordion items={FAQS} dark/>
          </div>
        </div>

        {/* ─── RIGHT: FORM ──────────────────────────────────────────────── */}
        <div style={{
          flex:1,
          padding:isMobile?'72px 24px 80px':`clamp(80px,12vh,120px) clamp(40px,8%,88px)`,
          display:'flex', flexDirection:'column', justifyContent:'center',
          background:IVORY,
        }}>
          <div style={{maxWidth:'520px',width:'100%'}}>

            {submitted ? (
              /* ─── SUCCESS ──────────────────────────────────────────────── */
              <div style={{textAlign:'center',padding:'48px 0',animation:'fadeUp .7s cubic-bezier(.16,1,.3,1)'}}>
                <div style={{
                  width:'64px',height:'64px',borderRadius:'50%',
                  border:`1px solid rgba(196,150,106,0.35)`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  margin:'0 auto 28px',fontSize:'1.4rem',color:GOLD,
                }}>✓</div>
                <h2 style={{...P,fontSize:'2.8rem',fontWeight:300,fontStyle:'italic',color:DARK,marginBottom:'20px',lineHeight:1.1}}>
                  Message reçu !
                </h2>
                <p style={{...S,fontSize:'.86rem',fontWeight:300,color:STONE,lineHeight:1.85,marginBottom:'40px',maxWidth:'36ch',margin:'0 auto 40px'}}>
                  Merci <strong style={{fontWeight:600}}>{form.name.split(' ')[0]}</strong> — nous vous répondrons sous 24h ouvrées à <em>{form.email}</em>.
                </p>
                <button
                  onClick={()=>{setSubmitted(false);setForm({name:'',email:'',subject:'',message:''})}}
                  style={{
                    ...S,background:'none',border:`1px solid rgba(17,16,16,0.15)`,
                    color:STONE,padding:'13px 32px',cursor:'pointer',
                    fontSize:'.6rem',fontWeight:600,letterSpacing:'.16em',textTransform:'uppercase',
                    transition:'border-color .3s',
                  }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=GOLD}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(17,16,16,0.15)'}
                >Nouveau message</button>
              </div>
            ) : (
              /* ─── FORM ─────────────────────────────────────────────────── */
              <>
                <h2 style={{...P,fontSize:'clamp(2rem,4vw,3rem)',fontWeight:300,color:DARK,marginBottom:'8px',lineHeight:1.1,letterSpacing:'-.02em'}}>
                  Envoyer un message
                </h2>
                <p style={{...S,fontSize:'.78rem',fontWeight:300,color:STONE,marginBottom:'48px',lineHeight:1.6}}>
                  Réponse garantie sous 24h ouvrées.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <Field label="Votre nom complet" value={form.name} onChange={set('name')} error={errors.name}/>
                  <Field label="Adresse email" type="email" value={form.email} onChange={set('email')} error={errors.email}/>

                  {/* Subject */}
                  <div style={{position:'relative',marginBottom:errors.subject?'28px':'40px'}}>
                    {form.subject && (
                      <p style={{...S,fontSize:'.57rem',color:GOLD,letterSpacing:'.1em',textTransform:'uppercase',marginBottom:'6px',margin:'0 0 6px'}}>
                        Sujet de votre demande
                      </p>
                    )}
                    <select
                      value={form.subject} onChange={e=>set('subject')(e.target.value)}
                      style={{
                        ...S, width:'100%', fontSize:'.9rem',
                        color:form.subject?DARK:STONE,
                        padding:form.subject?'10px 0':'16px 0',
                        background:'transparent', border:'none',
                        borderBottom:`1px solid ${errors.subject?ERR:'rgba(17,16,16,0.18)'}`,
                        outline:'none', appearance:'none', cursor:'pointer', borderRadius:0,
                      }}
                    >
                      <option value="" disabled>Sujet de votre demande</option>
                      <option value="order">Suivi de commande</option>
                      <option value="product">Information produit</option>
                      <option value="return">Retour / échange</option>
                      <option value="usage">Conseil d'utilisation</option>
                      <option value="press">Presse & Partenariats</option>
                      <option value="other">Autre demande</option>
                    </select>
                    <span style={{position:'absolute',right:0,bottom:errors.subject?'26px':'14px',pointerEvents:'none',color:STONE,fontSize:'.7rem'}}>▾</span>
                    {errors.subject && <p style={{...S,fontSize:'.58rem',color:ERR,margin:'5px 0 0'}}>{errors.subject}</p>}
                  </div>

                  <Field label="Votre message" isTextArea value={form.message} onChange={set('message')} error={errors.message}/>

                  <button
                    type="submit" disabled={sending}
                    style={{
                      ...S, width:'100%', padding:'19px 40px', border:'none',
                      background:sending?STONE:GOLD,
                      color:BLK, cursor:sending?'wait':'pointer',
                      fontSize:'.64rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase',
                      marginTop:'8px', transition:'background .3s,transform .25s',
                      display:'flex', alignItems:'center', justifyContent:'center', gap:'12px',
                    }}
                    onMouseEnter={e=>{if(!sending){e.currentTarget.style.background=GOLDL;e.currentTarget.style.transform='translateY(-2px)'}}}
                    onMouseLeave={e=>{if(!sending){e.currentTarget.style.background=GOLD;e.currentTarget.style.transform='translateY(0)'}}}
                  >
                    {sending ? (
                      <>
                        <span style={{display:'inline-block',width:'12px',height:'12px',border:`1.5px solid rgba(8,8,8,0.3)`,borderTopColor:BLK,borderRadius:'50%',animation:'spin .7s linear infinite'}}/>
                        Envoi en cours…
                      </>
                    ) : 'Envoyer le message →'}
                  </button>
                </form>

                <p style={{...S,fontSize:'.58rem',color:'rgba(138,122,110,0.55)',fontWeight:300,marginTop:'22px',lineHeight:1.65}}>
                  Données utilisées uniquement pour traiter votre demande. Aucune revente. Aucun spam.
                </p>
              </>
            )}
          </div>
        </div>

      </section>
    </main>
  )
}
