import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  MessageCircle, Mail, MapPin, Zap, Star, Package,
  BadgeDollarSign, Ruler, Leaf, HeadphonesIcon,
  Menu, X, ChevronDown, Check, ArrowRight,
} from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────────
const WA_NUM  = '529992697401'
const WA_LINK = `https://wa.me/${WA_NUM}`
const EMAIL   = 'bustabolsas@gmail.com'
const GOLD    = '#D4AF37'
const SERIF   = "'Playfair Display', Georgia, serif"

// ─── Types ────────────────────────────────────────────────────────────────────
interface Producto {
  id: string; nombre: string; usos: string; mayoreo: number; menudeo: number
}
interface Categoria {
  id: string; label: string; labelCorto: string; unidad: string
  minMayoreo: string; descripcion: string; badge?: string; productos: Producto[]
}

// ─── Catalog ──────────────────────────────────────────────────────────────────
const CATALOGO: Categoria[] = [
  {
    id: 'basura-kg', label: 'Bolsa Negra para Basura', labelCorto: 'Basura × Kg',
    unidad: 'kg', minMayoreo: '10 kg', badge: 'Más vendido',
    descripcion: 'Calibre 250 · Uso rudo · Precio por kilo',
    productos: [
      { id: 'bk1', nombre: '50×70 cm',  usos: '30 pz/kg · 14 Lts · Doméstica',  mayoreo: 40, menudeo: 45 },
      { id: 'bk2', nombre: '60×90 cm',  usos: '20 pz/kg · 22 Lts · General',    mayoreo: 40, menudeo: 45 },
      { id: 'bk3', nombre: '75×90 cm',  usos: '15 pz/kg · 27 Lts · Industrial', mayoreo: 40, menudeo: 45 },
      { id: 'bk4', nombre: '90×120 cm', usos: '8 pz/kg · 43 Lts · Jardinería',  mayoreo: 40, menudeo: 45 },
    ],
  },
  {
    id: 'basura-rollo', label: 'Bolsa Negra en Rollo', labelCorto: 'Basura × Rollo',
    unidad: 'rollo', minMayoreo: '10 rollos',
    descripcion: 'Calibre 200 · Precio por rollo',
    productos: [
      { id: 'br1', nombre: '60×90 cm',  usos: 'Rollo c/20 pzs · Oficinas, cocina',  mayoreo: 50, menudeo: 54 },
      { id: 'br2', nombre: '90×120 cm', usos: 'Rollo c/15 pzs · Industrial, jardín', mayoreo: 75, menudeo: 80 },
    ],
  },
  {
    id: 'camiseta', label: 'Bolsa Tipo Camiseta en Rollo', labelCorto: 'Camiseta',
    unidad: 'rollo', minMayoreo: '3 rollos',
    descripcion: '75 pzs · 25×15×15 cm · Precio por rollo',
    productos: [
      { id: 'cam1', nombre: 'Negra #2',    usos: '75 pzs · Tiendas, mercados', mayoreo: 50, menudeo: 60 },
      { id: 'cam2', nombre: 'Amarilla #2', usos: '75 pzs · Alta visibilidad',   mayoreo: 60, menudeo: 70 },
    ],
  },
  {
    id: 'alta-densidad', label: 'Alta Densidad Rollo Punteado', labelCorto: 'Alta Densidad',
    unidad: 'kg', minMayoreo: '5 kg',
    descripcion: 'Grado alimenticio · Rollo punteado · Precio por kilo',
    productos: [
      { id: 'ad1', nombre: '8×22 cm',  usos: 'Salsas, cubiertos, dulces',       mayoreo: 100, menudeo: 120 },
      { id: 'ad2', nombre: '20×30 cm', usos: 'Alimentos, pan, frutas pequeñas', mayoreo: 70,  menudeo: 80  },
      { id: 'ad3', nombre: '25×35 cm', usos: 'Comida, panadería, tienda',        mayoreo: 70,  menudeo: 80  },
      { id: 'ad4', nombre: '30×40 cm', usos: 'Ropa ligera, alimentos medianos',  mayoreo: 75,  menudeo: 85  },
      { id: 'ad5', nombre: '35×50 cm', usos: 'Ropa, mercancía mediana',          mayoreo: 80,  menudeo: 85  },
      { id: 'ad6', nombre: '40×60 cm', usos: 'Alimentos, ropa, voluminosos',     mayoreo: 85,  menudeo: 90  },
      { id: 'ad7', nombre: '50×70 cm', usos: 'Ropa grande, paquetes',            mayoreo: 90,  menudeo: 100 },
    ],
  },
  {
    id: 'natural', label: 'Bolsa Natural Transparente', labelCorto: 'Natural',
    unidad: 'kg', minMayoreo: '5 kg', badge: 'Más vendido',
    descripcion: 'Grado alimenticio · Precio único por kilo',
    productos: [
      { id: 'na1', nombre: '15×25 cm',  usos: 'Dulces, tornillos, bisutería',  mayoreo: 60, menudeo: 65 },
      { id: 'na2', nombre: '20×30 cm',  usos: 'Alimentos, especias',            mayoreo: 60, menudeo: 65 },
      { id: 'na3', nombre: '25×35 cm',  usos: 'Pan, frutas, verduras',          mayoreo: 60, menudeo: 65 },
      { id: 'na4', nombre: '30×40 cm',  usos: 'Ropa, alimentos medianos',       mayoreo: 60, menudeo: 65 },
      { id: 'na5', nombre: '25×50 cm',  usos: 'Ropa, paquetes medianos',        mayoreo: 60, menudeo: 65 },
      { id: 'na6', nombre: '40×60 cm',  usos: 'Ropa grande, almacenamiento',    mayoreo: 60, menudeo: 65 },
      { id: 'na7', nombre: '50×70 cm',  usos: 'Colchones, bultos',              mayoreo: 60, menudeo: 65 },
      { id: 'na8', nombre: '60×90 cm',  usos: 'Industrial, almacén',            mayoreo: 60, menudeo: 65 },
      { id: 'na9', nombre: '90×120 cm', usos: 'Industrial, almacén grande',     mayoreo: 60, menudeo: 65 },
    ],
  },
  {
    id: 'hielo', label: 'Bolsa para Hielo', labelCorto: 'Hielo',
    unidad: 'kg', minMayoreo: '3 kg',
    descripcion: 'Alta claridad · Apta alimentos · Baja temperatura',
    productos: [
      { id: 'hi1', nombre: 'Mayoreo (25+ kg)',    usos: 'Distribuidoras y negocios de hielo',  mayoreo: 80,  menudeo: 80  },
      { id: 'hi2', nombre: 'Medio mayoreo',        usos: 'Pedidos medianos',                    mayoreo: 90,  menudeo: 90  },
      { id: 'hi3', nombre: 'Menudeo (mín. 3 kg)', usos: 'Consumo personal o pequeño negocio', mayoreo: 100, menudeo: 100 },
    ],
  },
]

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [threshold])
  return scrolled
}

function useCounter(end: number, active: boolean, ms = 1600) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let v = 0
    const step = end / (ms / 16)
    const t = setInterval(() => {
      v += step
      if (v >= end) { setVal(end); clearInterval(t) }
      else setVal(Math.floor(v))
    }, 16)
    return () => clearInterval(t)
  }, [active, end, ms])
  return val
}

// ─── FadeUp — whileInView ─────────────────────────────────────────────────────
function FadeUp({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
}

// ─── Serif italic helper ──────────────────────────────────────────────────────
function Gold({ children }: { children: React.ReactNode }) {
  return (
    <em style={{ fontFamily: SERIF, fontStyle: 'italic', color: GOLD, fontWeight: 700 }}>
      {children}
    </em>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#catalogo',    label: 'Catálogo'    },
    { href: '#calculadora', label: 'Calculadora' },
    { href: '#nosotros',    label: 'Nosotros'    },
    { href: '#contacto',    label: 'Contacto'    },
  ]
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-2xl font-black tracking-tight" style={{ color: GOLD }}>BK</a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">
              {l.label}
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-black bg-yellow-500 hover:bg-yellow-400 transition-colors">
            <MessageCircle size={14} />
            WhatsApp
          </a>
        </nav>
        <button className="md:hidden text-white" onClick={() => setOpen(o => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 pb-5">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3 text-zinc-300 hover:text-white border-b border-white/5 text-sm font-medium">
              {l.label}
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="block mt-4 py-3 rounded-lg text-center text-sm font-bold text-black bg-yellow-500">
            Cotizar por WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

// ─── Hero Mockup Card ─────────────────────────────────────────────────────────
function MockupCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Window bar */}
      <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <span className="text-xs text-zinc-500 ml-2 font-medium">WhatsApp · Distribuidora BK</span>
      </div>
      {/* Chat content */}
      <div className="p-5 space-y-3">
        <div className="bg-zinc-800 rounded-xl rounded-tl-sm p-4 max-w-[90%]">
          <p className="text-xs text-zinc-400 mb-1 font-medium">📦 Pedido confirmado</p>
          <p className="text-white font-semibold text-sm">Bolsa Negra 90×120 cm</p>
          <p className="text-zinc-400 text-xs mt-0.5">8 pz/kg · 43 Lts · Jardinería</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl rounded-tl-sm p-4 max-w-[90%]">
          <p className="text-xs text-zinc-400 mb-1 font-medium">💵 Total estimado</p>
          <p className="text-yellow-400 font-black text-2xl">$800</p>
          <p className="text-zinc-500 text-xs mt-0.5">20 kg × $40/kg · Mayoreo</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-400 font-semibold">
          <Check size={12} className="flex-shrink-0" />
          Enviado · Entrega hoy mismo
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-zinc-800/60 rounded-xl p-3 border border-white/5">
            <p className="text-zinc-500 text-xs mb-0.5">Ahorro</p>
            <p className="text-white font-bold text-sm">$100 (11%)</p>
          </div>
          <div className="bg-zinc-800/60 rounded-xl p-3 border border-white/5">
            <p className="text-zinc-500 text-xs mb-0.5">Clientes hoy</p>
            <p className="text-white font-bold text-sm">12 pedidos</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  })

  return (
    <section
      className="min-h-screen flex items-center bg-black relative overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(212,175,55,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.03) 1px,transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(212,175,55,0.07) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-28">
        <div className="grid md:grid-cols-5 gap-12 items-center">

          {/* ── Left content ── */}
          <div className="md:col-span-3">
            <motion.div {...fade(0)}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border"
                style={{ color: GOLD, borderColor: `${GOLD}40`, background: `${GOLD}10` }}>
                <Zap size={14} />
                Entrega en Mérida · Mayoreo sin límite
              </span>
            </motion.div>

            <motion.div {...fade(0.2)}>
              <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none mb-5">
                <span className="text-white">Distribuidora</span>
                <br />
                <span style={{ color: GOLD }}>BK</span>
              </h1>
            </motion.div>

            <motion.div {...fade(0.4)}>
              <p className="text-lg md:text-xl text-zinc-400 font-medium mb-2 leading-relaxed">
                Bolsas y plásticos al{' '}
                <Gold>mayoreo</Gold>
                {' '}en Mérida
              </p>
              <p className="text-zinc-600 text-sm">"Bolsas y Mucho Más"</p>
            </motion.div>

            <motion.div {...fade(0.6)} className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="#catalogo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-black bg-yellow-500 hover:bg-yellow-400 transition-colors">
                Ver catálogo
                <ArrowRight size={16} />
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white border border-white/20 hover:bg-white/5 transition-colors">
                <MessageCircle size={18} />
                Cotizar por WhatsApp
              </a>
            </motion.div>
          </div>

          {/* ── Right mockup ── */}
          <div className="md:col-span-2 hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}>
              <MockupCard />
            </motion.div>
          </div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-700 animate-bounce">
        <ChevronDown size={22} />
      </motion.div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatCard({ end, suffix, label, icon: Icon, delay }: {
  end: number; suffix: string; label: string; icon: React.ElementType; delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const val = useCounter(end, inView)
  return (
    <FadeUp delay={delay}>
      <div ref={ref}
        className="flex flex-col items-center p-8 rounded-2xl border text-center"
        style={{ background: 'rgba(255,255,255,0.03)', borderColor: `${GOLD}25` }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${GOLD}18` }}>
          <Icon size={22} style={{ color: GOLD }} />
        </div>
        <div className="text-4xl font-black text-white mb-1">{val}{suffix}</div>
        <div className="text-zinc-400 text-sm font-medium">{label}</div>
      </div>
    </FadeUp>
  )
}

function Stats() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard end={500} suffix="+"    label="Clientes en Mérida"     icon={Star}    delay={0}   />
          <StatCard end={6}   suffix=""     label="Categorías de productos" icon={Package} delay={0.1} />
          <StatCard end={1}   suffix=" día" label="Entrega mismo día"       icon={Zap}     delay={0.2} />
        </div>
      </div>
    </section>
  )
}

// ─── Catálogo ─────────────────────────────────────────────────────────────────
function Catalogo() {
  const [tab, setTab] = useState(0)
  const cat = CATALOGO[tab]

  return (
    <section id="catalogo" className="py-24 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%)' }} />
      <div className="relative max-w-6xl mx-auto px-6">

        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: GOLD }}>
            Catálogo completo
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3 text-center">
            Todos nuestros <Gold>productos</Gold>
          </h2>
          <p className="text-zinc-400 text-lg text-center">
            6 categorías · Mayoreo y menudeo · Precios directos
          </p>
        </FadeUp>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 mb-8">
          {CATALOGO.map((c, i) => (
            <button key={c.id} onClick={() => setTab(i)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap"
              style={tab === i
                ? { background: GOLD, color: '#000' }
                : { background: 'rgba(255,255,255,0.06)', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.08)' }
              }>
              {c.labelCorto}
            </button>
          ))}
        </div>

        {/* Header de categoría */}
        <div
          className="flex items-center justify-between flex-wrap gap-2 mb-4 px-5 py-4 rounded-2xl border"
          style={{ background: `${GOLD}08`, borderColor: `${GOLD}25` }}>
          <div>
            <p className="font-bold text-white">{cat.label}</p>
            <p className="text-zinc-400 text-sm">{cat.descripcion} · Mayoreo desde {cat.minMayoreo}</p>
          </div>
          {cat.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-black text-black" style={{ background: GOLD }}>
              ⭐ {cat.badge}
            </span>
          )}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cat.productos.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-colors h-full">
                <p className="font-bold text-white text-lg mb-1">{p.nombre}</p>
                <p className="text-zinc-500 text-sm mb-4">{p.usos}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Mayoreo</span>
                    <span className="font-black text-lg" style={{ color: GOLD }}>${p.mayoreo}/{cat.unidad}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl px-4 py-3 bg-white/5 border border-white/10">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Menudeo</span>
                    <span className="font-black text-lg text-zinc-200">${p.menudeo}/{cat.unidad}</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Calculadora ──────────────────────────────────────────────────────────────
const INPUT_STYLE = {
  background: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.12)',
  colorScheme: 'dark' as const,
}

function Calculadora() {
  const [catIdx, setCatIdx]   = useState(0)
  const [prodIdx, setProdIdx] = useState(0)
  const [qty, setQty]         = useState(10)
  const [mayoreo, setMayoreo] = useState(true)

  const cat    = CATALOGO[catIdx]
  const prod   = cat.productos[prodIdx] ?? cat.productos[0]
  const precio = mayoreo ? prod.mayoreo : prod.menudeo
  const total  = qty * precio

  const handleCat = (i: number) => { setCatIdx(i); setProdIdx(0) }

  const msg = encodeURIComponent(
    `Hola Distribuidora BK 👋\n\nQuiero cotizar:\n📦 ${prod.nombre} (${cat.labelCorto})\n📏 Cantidad: ${qty} ${cat.unidad}\n💰 Tipo: ${mayoreo ? 'Mayoreo' : 'Menudeo'}\n💵 Estimado: $${total.toLocaleString()}\n\n¿Tienen disponibilidad?`
  )

  return (
    <section id="calculadora" className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">

        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: GOLD }}>
            Herramienta
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3 text-center">
            Calculadora de <Gold>pedido</Gold>
          </h2>
          <p className="text-zinc-400 text-center">
            Calcula tu precio en segundos y envía directo por WhatsApp
          </p>
        </FadeUp>

        <div className="flex justify-center mt-10">
          <FadeUp delay={0.15}>
            <div className="w-full max-w-lg bg-zinc-900 rounded-3xl p-8 border border-white/10">

              {/* Toggle */}
              <div className="flex gap-2 p-1 rounded-xl mb-8"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {(['Mayoreo', 'Menudeo'] as const).map((t, i) => (
                  <button key={t} onClick={() => setMayoreo(i === 0)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
                    style={mayoreo === (i === 0) ? { background: GOLD, color: '#000' } : { color: '#71717a' }}>
                    {t}
                  </button>
                ))}
              </div>

              {/* Categoría */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: `${GOLD}99` }}>Categoría</label>
                <select value={catIdx} onChange={e => handleCat(Number(e.target.value))}
                  className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                  style={INPUT_STYLE}>
                  {CATALOGO.map((c, i) => (
                    <option key={c.id} value={i} style={{ background: '#18181b' }}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Medida */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: `${GOLD}99` }}>Medida / Producto</label>
                <select value={prodIdx} onChange={e => setProdIdx(Number(e.target.value))}
                  className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                  style={INPUT_STYLE}>
                  {cat.productos.map((p, i) => (
                    <option key={p.id} value={i} style={{ background: '#18181b' }}>{p.nombre} — {p.usos}</option>
                  ))}
                </select>
              </div>

              {/* Cantidad */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: `${GOLD}99` }}>
                  Cantidad ({cat.unidad}) · Mayoreo desde {cat.minMayoreo}
                </label>
                <input type="number" min={1} value={qty}
                  onChange={e => setQty(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                  style={INPUT_STYLE} />
              </div>

              {/* Resultado */}
              <div className="mt-6 rounded-2xl p-6 text-center bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-sm text-white/50 mb-1">Estimado · {mayoreo ? 'Mayoreo' : 'Menudeo'}</p>
                <p className="text-4xl font-black text-yellow-400">${total.toLocaleString()}</p>
                <p className="text-sm text-white/50 mt-1">{qty} {cat.unidad} × ${precio}/{cat.unidad}</p>
              </div>

              {/* CTA */}
              <a href={`https://wa.me/${WA_NUM}?text=${msg}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mt-4 py-4 rounded-xl font-bold text-lg text-black bg-yellow-500 hover:bg-yellow-400 transition-colors">
                <MessageCircle size={20} />
                Cotizar por WhatsApp
              </a>

            </div>
          </FadeUp>
        </div>

      </div>
    </section>
  )
}

// ─── Ventajas ─────────────────────────────────────────────────────────────────
const VENTAJAS = [
  { icon: BadgeDollarSign, title: 'Precios de mayoreo',      desc: 'Precios directos sin intermediarios. A mayor volumen, mayor ahorro para tu negocio.' },
  { icon: Ruler,           title: 'Variedad de medidas',     desc: 'El catálogo más completo del sureste: desde bolsas de 8 cm hasta 120 cm.' },
  { icon: Leaf,            title: 'Grado alimenticio',       desc: 'Bolsas certificadas para contacto con alimentos: alta densidad, natural y para hielo.' },
  { icon: HeadphonesIcon,  title: 'Atención personalizada', desc: 'Te asesoramos por WhatsApp para elegir el producto ideal según tu negocio.' },
]

function Ventajas() {
  return (
    <section id="nosotros" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">

        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: GOLD }}>
            Ventajas
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3 text-center">
            ¿Por qué elegir <Gold>BK</Gold>?
          </h2>
          <p className="text-zinc-400 text-lg text-center mb-12">
            Cientos de negocios en Mérida ya confían en nosotros.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VENTAJAS.map(({ icon: Icon, title, desc }, i) => (
            <FadeUp key={title} delay={i * 0.08}>
              <div className="relative flex gap-5 p-6 bg-zinc-900 rounded-2xl border border-white/10 hover:border-yellow-500/30 transition-colors h-full overflow-hidden">
                {/* Número decorativo */}
                <span className="absolute right-4 bottom-1 text-8xl font-black text-white/5 select-none leading-none pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${GOLD}18` }}>
                  <Icon size={22} style={{ color: GOLD }} />
                </div>
                <div className="relative">
                  <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Contacto ─────────────────────────────────────────────────────────────────
function Contacto() {
  return (
    <section id="contacto" className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Contacto</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            ¿Listo para <Gold>cotizar</Gold>?
          </h2>
          <p className="text-zinc-400 text-lg mb-10">
            Escríbenos por WhatsApp y te respondemos al instante.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xl text-black mb-10 bg-yellow-500 hover:bg-yellow-400 transition-colors">
            <MessageCircle size={24} />
            Escribir por WhatsApp
          </a>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-zinc-500 text-sm">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center hover:text-white transition-colors">
              <MessageCircle size={15} style={{ color: GOLD }} />
              999 269 7401
            </a>
            <a href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 justify-center hover:text-white transition-colors">
              <Mail size={15} style={{ color: GOLD }} />
              {EMAIL}
            </a>
            <span className="flex items-center gap-2 justify-center">
              <MapPin size={15} style={{ color: GOLD }} />
              Mérida, Yucatán
            </span>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 bg-black text-center">
      <p className="text-zinc-600 text-sm">
        © {new Date().getFullYear()} Distribuidora BK · "Bolsas y Mucho Más" · Mérida, Yucatán
      </p>
    </footer>
  )
}

// ─── Floating WhatsApp ────────────────────────────────────────────────────────
function FloatingWA() {
  return (
    <motion.a
      href={WA_LINK} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-400 transition-colors"
      style={{ boxShadow: '0 8px 32px rgba(34,197,94,0.4)' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}>
      <MessageCircle size={26} fill="white" className="text-white" />
    </motion.a>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Hero />
      <Divider />
      <Stats />
      <Divider />
      <Catalogo />
      <Divider />
      <Calculadora />
      <Divider />
      <Ventajas />
      <Divider />
      <Contacto />
      <Footer />
      <FloatingWA />
    </div>
  )
}
