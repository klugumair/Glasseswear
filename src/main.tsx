import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, Eye, Glasses, MapPin, Menu, MessageCircle, Phone, Sun, X } from 'lucide-react'
import { business, whatsappUrl } from './config'
import './styles.css'

type Product = { name: string; category: string; price: string; image: string; tone: string }

const products: Product[] = [
  { name: 'The Sienna', category: "Women's Eyewear", price: 'PKR 8,900', tone: 'warm', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85' },
  { name: 'The Regent', category: "Men's Eyewear", price: 'PKR 9,600', tone: 'olive', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=85' },
  { name: 'Solace', category: 'Sunglasses', price: 'PKR 10,500', tone: 'sand', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85' },
  { name: 'The Archive', category: 'Classic Frames', price: 'PKR 8,200', tone: 'charcoal', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=85' },
  { name: 'Marlow', category: "Women's Eyewear", price: 'PKR 9,200', tone: 'rose', image: 'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?auto=format&fit=crop&w=900&q=85' },
  { name: 'Verde', category: "Men's Eyewear", price: 'PKR 9,900', tone: 'green', image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=85' },
]

const links = [
  ['Home', '#home'], ['Eyewear', '#eyewear'], ['Our Services', '#services'], ['About', '#about'], ['Contact', '#contact'],
]
const message = {
  general: "Hello Al-Safa Optics, I'd like to inquire about your eyewear collection.",
  eyeTest: "Hello, I'd like to ask about booking an eye test.",
}

function Wordmark() { return <a href="#home" className="wordmark" aria-label="Al-Safa Optics home"><span>AL-SAFA</span><em>OPTICS</em><small>SEE THE DIFFERENCE</small></a> }
function WhatsApp({ text = message.general, label = 'WhatsApp' }: { text?: string; label?: string }) { return <a className="whatsapp" href={whatsappUrl(text)} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{label}</a> }

function App() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('All Frames')
  const filters = ['All Frames', "Men's Eyewear", "Women's Eyewear", 'Sunglasses', 'Classic Frames']
  const visibleProducts = active === 'All Frames' ? products : products.filter(p => p.category === active)
  const nav = () => <>{links.map(([label, href]) => <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>)}</>
  return <div>
    <header className="nav-shell">
      <nav className="nav container"><Wordmark/><div className="desktop-links">{nav()}</div><div className="desktop-action"><WhatsApp label="Book on WhatsApp"/></div><button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button></nav>
      <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{height:0, opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><div className="container">{nav()}<WhatsApp label="Book on WhatsApp"/></div></motion.div>}</AnimatePresence>
    </header>
    <main>
      <section id="home" className="hero">
        <div className="hero-copy"><motion.p className="eyebrow" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}>A considered vision of eyewear</motion.p><motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:.1}}>See the world<br/><i>differently.</i></motion.h1><motion.p className="hero-text" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.2}}>Discover eyewear that brings clarity, comfort and confidence to everyday life.</motion.p><motion.div className="hero-actions" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.3}}><a className="button button-dark" href="#eyewear">Explore Eyewear <ArrowRight size={17}/></a><a className="button button-light" href={whatsappUrl(message.eyeTest)} target="_blank" rel="noreferrer"><CalendarDays size={17}/>Book an Eye Test</a></motion.div><div className="location-pin"><MapPin size={15}/>{business.location}</div></div>
        <div className="hero-image"><img src="https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1600&q=90" alt="Woman wearing elegant optical glasses"/><div className="image-note"><span>01</span><p>Frames made for<br/>the way you live.</p></div></div>
      </section>

      <section id="eyewear" className="collection section container"><div className="section-head"><div><p className="eyebrow">The collection</p><h2>Find your<br/><i>favourite frame.</i></h2></div><p>Illustrative selection only. Please contact the store to confirm current availability, brands and pricing.</p></div><div className="filters">{filters.map(f => <button className={active===f?'active':''} onClick={()=>setActive(f)} key={f}>{f}</button>)}</div><motion.div layout className="products">{visibleProducts.map((p, i) => <motion.article layout initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:i*.05}} className="product" key={p.name}><div className={'product-image '+p.tone}><img src={p.image} alt={`${p.name} sample eyewear`} loading="lazy"/><span>Sample style</span></div><div className="product-info"><div><p>{p.category}</p><h3>{p.name}</h3></div><strong>{p.price}</strong></div><div className="product-actions"><a href={whatsappUrl(`Hello, I'm interested in ${p.name}. Could you provide more details?`)} target="_blank" rel="noreferrer">Inquire <MessageCircle size={15}/></a><button onClick={()=>alert(`${p.name} is an illustrative sample. Contact Al-Safa Optics for current options and availability.`)}>View details <ArrowRight size={15}/></button></div></motion.article>)}</motion.div></section>

      <section id="services" className="services"><div className="container"><div className="services-top"><p className="eyebrow">Thoughtful support</p><h2>Care for every<br/><i>point of view.</i></h2><p>From your first question to finding the right fit, we make the experience feel more personal.</p></div><div className="service-grid"><Service icon={<Eye/>} number="01" title="Eye Testing" text="Professional eye examination services. Please contact the store to discuss your needs."/><Service icon={<Glasses/>} number="02" title="Prescription Eyewear" text="Eyewear solutions based on individual prescriptions and everyday comfort."/><Service icon={<Sun/>} number="03" title="Contact Lenses" text="Guidance and product inquiries for contact lens options and care."/><Service icon={<Check/>} number="04" title="Frame Selection" text="A helping hand to find frames that feel right for your preferences."/></div></div></section>

      <section className="values section container"><div className="values-image"><img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=85" alt="Eyeglasses on an open book"/></div><div className="values-copy"><p className="eyebrow">The Al-Safa approach</p><h2>Small details,<br/><i>clear difference.</i></h2><div className="value-list"><Value n="01" title="Personalized Assistance"/><Value n="02" title="Quality Eyewear"/><Value n="03" title="Customer-Focused Service"/><Value n="04" title="Convenient Local Access"/></div><p className="disclaimer">Proposed brand messaging for this private website concept.</p></div></section>

      <section id="about" className="about"><div className="container about-inner"><div><p className="eyebrow">Our point of view</p><h2>Clear vision.<br/><i>Confident style.</i></h2><p>Finding the right eyewear is about more than seeing well. It is about a considered fit, a frame that feels like you, and the support to choose with confidence.</p><a className="text-link" href={whatsappUrl(message.general)} target="_blank" rel="noreferrer">Start a conversation <ArrowRight size={17}/></a></div><img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85" alt="Stylish glasses and accessories"/></div></section>

      <section id="contact" className="contact section"><div className="container contact-grid"><div><p className="eyebrow">Visit & connect</p><h2>Let’s find the<br/><i>right perspective.</i></h2><p>Questions about eyewear, a prescription, or an eye test? Send an inquiry and the store can confirm the details with you.</p><WhatsApp label="Message on WhatsApp"/></div><div className="contact-card"><p className="card-label">AL-SAFA OPTICS</p><div className="contact-row"><MapPin/><div><b>{business.location}</b><a href={business.mapsUrl} target="_blank" rel="noreferrer">Get directions <ArrowRight size={14}/></a></div></div><div className="contact-row"><Phone/><div><b>+92 348 8959807</b><a href={whatsappUrl(message.general)} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowRight size={14}/></a></div></div><div className="hours"><span>Business hours</span><b>Please confirm with the store</b></div></div></div></section>
    </main>
    <footer><div className="container footer-inner"><Wordmark/><div><p>Private website concept. Information and product styles are illustrative; please confirm details with the store.</p><small>© 2026 Al-Safa Optics</small></div><div className="footer-links">{links.slice(1).map(([n,h])=><a key={n} href={h}>{n}</a>)}</div></div></footer>
  </div>
}

function Service({icon,number,title,text}:{icon:React.ReactNode;number:string;title:string;text:string}){return <article className="service"><div><span>{number}</span>{icon}</div><h3>{title}</h3><p>{text}</p></article>}
function Value({n,title}:{n:string;title:string}){return <div className="value"><span>{n}</span><b>{title}</b><ArrowRight size={17}/></div>}
createRoot(document.getElementById('root')!).render(<App />)
