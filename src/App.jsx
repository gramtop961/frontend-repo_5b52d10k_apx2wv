import { useEffect, useMemo, useRef, useState } from 'react'

function GalaxyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute top-20 -right-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl animate-[float_12s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl animate-[float_14s_ease-in-out_infinite]" />
      <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {Array.from({ length: 80 }).map((_, i) => (
          <circle key={i} cx={Math.random()*1600} cy={Math.random()*900} r={Math.random()*1.6+0.5} fill="url(#g)" />
        ))}
      </svg>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes launch { 0%{ transform: translate(-50%, 60vh) rotate(0deg)} 100%{ transform: translate(-50%, -120vh) rotate(-5deg)} }
        @keyframes twinkle { 0%,100%{opacity:.3} 50%{opacity:1} }
      `}</style>
    </div>
  )
}

function ScienceIcons() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Atom */}
      <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.35)] transition-transform duration-300 hover:scale-110">
        <circle cx="60" cy="60" r="6" fill="currentColor"/>
        <ellipse cx="60" cy="60" rx="40" ry="18" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="60" cy="60" rx="18" ry="40" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(60 60 60)"/>
        <ellipse cx="60" cy="60" rx="18" ry="40" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(-60 60 60)"/>
      </svg>
      {/* DNA */}
      <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto text-indigo-400 drop-shadow-[0_0_12px_rgba(99,102,241,0.35)] transition-transform duration-300 hover:scale-110">
        {[...Array(10)].map((_, i) => (
          <g key={i}>
            <line x1="30" y1={12+i*10} x2="90" y2={18+i*10} stroke="currentColor" strokeWidth="2"/>
            <line x1="90" y1={12+i*10} x2="30" y2={18+i*10} stroke="currentColor" strokeWidth="2" opacity="0.4"/>
          </g>
        ))}
        <path d="M30 10 C 50 30, 70 10, 90 30 S 70 50, 90 70 S 70 90, 90 110" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M30 30 C 50 10, 70 30, 90 10 S 70 50, 90 50 S 70 70, 90 90" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
      {/* Cell */}
      <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto text-fuchsia-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.35)] transition-transform duration-300 hover:scale-110">
        <ellipse cx="60" cy="60" rx="45" ry="35" fill="currentColor" opacity="0.1"/>
        <ellipse cx="60" cy="60" rx="45" ry="35" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="70" cy="60" r="12" fill="currentColor" opacity="0.4"/>
        <circle cx="70" cy="60" r="6" fill="currentColor"/>
        <circle cx="45" cy="45" r="6" fill="currentColor" opacity="0.5"/>
        <ellipse cx="45" cy="80" rx="10" ry="6" fill="currentColor" opacity="0.3"/>
      </svg>
    </div>
  )
}

function SuggestionChip({ label, onClick }) {
  return (
    <button onClick={() => onClick(label)} className="text-xs rounded-full bg-white/10 hover:bg-white/15 text-slate-200 px-3 py-1 transition">{label}</button>
  )
}

function RobotAssistant({ onAsk, onEasterEgg }) {
  const [open, setOpen] = useState(true)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Halo! Aku RoboLab 🤖✨. Tanyakan: profil, visi, misi, tujuan, prestasi. Coba juga: rocket 🚀' }
  ])
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const send = (preset) => {
    const content = preset || input
    if (!content?.trim()) return
    const q = content.trim()
    setMessages(m => [...m, { role: 'user', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      if (/rocket|🚀/i.test(q)) {
        onEasterEgg?.()
      }
      const reply = onAsk ? onAsk(q) : 'Untuk saat ini aku menjawab hal-hal dasar seputar KIR.'
      setMessages(m => [...m, { role: 'bot', text: reply }])
      setTyping(false)
    }, 500)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-80 rounded-2xl bg-slate-900/90 text-slate-100 shadow-2xl ring-1 ring-indigo-400/30 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 animate-pulse" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="text-sm font-semibold">RoboLab</div>
            <button onClick={() => setOpen(false)} className="ml-auto text-xs opacity-70 hover:opacity-100">Sembunyikan</button>
          </div>
          <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2 border-b border-white/10">
            {['Profil','Visi','Misi','Tujuan','Prestasi','Rocket 🚀'].map((l)=> (
              <SuggestionChip key={l} label={l} onClick={send} />
            ))}
          </div>
          <div className="max-h-64 overflow-y-auto px-4 py-3 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'bot' ? 'text-indigo-200' : 'text-slate-300 text-right'}>{m.text}</div>
            ))}
            {typing && (
              <div className="text-indigo-200 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.2s]"></span>
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce"></span>
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></span>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="p-3 flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Tanya RoboLab..." className="flex-1 rounded-lg bg-slate-800/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button onClick={()=>send()} className="rounded-lg bg-indigo-500 px-3 py-2 text-sm font-semibold hover:bg-indigo-600 active:scale-[0.98] transition">Kirim</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="group flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-slate-100 shadow-xl ring-1 ring-indigo-400/30 backdrop-blur hover:scale-105 transition">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>RoboLab</span>
        </button>
      )}
    </div>
  )
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove('opacity-0', 'translate-y-6')
          e.target.classList.add('opacity-100', 'translate-y-0')
        }
      })
    }, { threshold: 0.15 })
    el.querySelectorAll('[data-reveal]')?.forEach((c) => {
      c.classList.add('opacity-0', 'translate-y-6', 'transition', 'duration-700')
      obs.observe(c)
    })
    return () => obs.disconnect()
  }, [])
  return ref
}

function Badge({ children }) {
  return <span className="inline-flex items-center gap-1 text-xs rounded-full bg-white/10 px-2 py-1 mr-2 mb-2 ring-1 ring-white/15">{children}</span>
}

function getBadges(p) {
  const list = []
  const lvl = String(p?.tingkat||'').toLowerCase()
  const bidang = String(p?.bidang||'').toLowerCase()
  if (/nasional/.test(lvl)) list.push('🏆 Nasional')
  else if (/prov/.test(lvl)) list.push('🥇 Provinsi')
  else if (/kab|kota|daerah/.test(lvl)) list.push('🥈 Daerah')
  if (/bio/.test(bidang)) list.push('🧬 Biologi')
  if (/fis/.test(bidang)) list.push('⚛️ Fisika')
  if (/kim/.test(bidang)) list.push('⚗️ Kimia')
  if (/kom|ti|informatika|coding/.test(bidang)) list.push('💻 Komputer')
  return list
}

function RocketLaunch({ show, onDone }) {
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => onDone?.(), 3500)
    return () => clearTimeout(t)
  }, [show, onDone])
  if (!show) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 to-slate-950/70" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2" style={{animation:'launch 3.2s ease-in-out forwards'}}>
        <div className="text-6xl drop-shadow-[0_8px_20px_rgba(99,102,241,0.5)]">🚀</div>
      </div>
      {Array.from({length:30}).map((_,i)=> (
        <div key={i} className="absolute h-1 w-1 bg-white rounded-full" style={{left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, animation:'twinkle 1.6s infinite', animationDelay:`-${Math.random()}s`, opacity:.4}} />
      ))}
    </div>
  )
}

function Gallery() {
  const imgs = [
    'https://images.unsplash.com/photo-1532634896-26909d0d4b6a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517976487492-576ea36be7a5?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1200&auto=format&fit=crop'
  ]
  const [idx, setIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const startX = useRef(0)
  const onTouchStart = (e)=> { startX.current = e.touches[0].clientX }
  const onTouchEnd = (e)=> {
    const dx = e.changedTouches[0].clientX - startX.current
    if (dx > 50) setIdx((i)=> (i-1+imgs.length)%imgs.length)
    if (dx < -50) setIdx((i)=> (i+1)%imgs.length)
  }
  const next = ()=> setIdx((i)=> (i+1)%imgs.length)
  const prev = ()=> setIdx((i)=> (i-1+imgs.length)%imgs.length)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10" data-reveal>
      <h2 className="text-2xl font-bold">Galeri Kegiatan</h2>
      <p className="text-slate-300 mt-1">Swipe atau klik untuk melihat momen seru KIR.</p>
      <div className="mt-4 relative select-none">
        <div className="aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/10 bg-slate-900" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <img src={imgs[idx]} alt="Kegiatan KIR" className="h-full w-full object-cover" />
        </div>
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-3 py-2 hover:bg-black/60">‹</button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-3 py-2 hover:bg-black/60">›</button>
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {imgs.map((u,i)=> (
            <button key={u} onClick={()=>{setIdx(i);}} className={`h-16 aspect-video rounded-lg overflow-hidden ring-1 ${i===idx?'ring-indigo-400':'ring-white/10'} hover:opacity-90`}>
              <img src={u} alt="thumb" className="h-full w-full object-cover" />
            </button>
          ))}
          <button onClick={()=>setOpen(true)} className="ml-auto text-sm rounded-full bg-white/10 px-3 py-2 hover:bg-white/15">Buka Lightbox</button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4" onClick={()=>setOpen(false)}>
          <div className="relative max-w-5xl w-full" onClick={(e)=>e.stopPropagation()}>
            <img src={imgs[idx]} alt="lightbox" className="w-full h-auto rounded-xl" />
            <div className="absolute inset-x-0 -bottom-12 flex items-center justify-between">
              <button onClick={()=>setOpen(false)} className="rounded-full bg-white/10 px-4 py-2">Tutup</button>
              <div className="flex gap-2">
                <button onClick={prev} className="rounded-full bg-white/10 px-4 py-2">‹</button>
                <button onClick={next} className="rounded-full bg-white/10 px-4 py-2">›</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  const initialUrl = useMemo(() => {
    const envUrl = import.meta.env.VITE_BACKEND_URL || ''
    try {
      const saved = localStorage.getItem('backend_url')
      return saved || envUrl
    } catch {
      return envUrl
    }
  }, [])

  const [backendUrl, setBackendUrl] = useState(initialUrl)
  const [site, setSite] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hello, setHello] = useState('')
  const [filter, setFilter] = useState({ tahun: 'Semua', q: '' })
  const [vibes, setVibes] = useState(false)
  const [rocket, setRocket] = useState(false)

  const base = backendUrl?.replace(/\/$/, '')
  const revealRef = useReveal()
  const audioRef = useRef(null)

  const fetchContent = async () => {
    if (!base) return
    setLoading(true)
    setError('')
    try {
      const [sRes, aRes, hRes] = await Promise.all([
        fetch(`${base}/api/site`),
        fetch(`${base}/api/achievements`),
        fetch(`${base}/api/hello`)
      ])
      if (!sRes.ok || !aRes.ok || !hRes.ok) throw new Error('Gagal memuat konten dari backend')
      const s = await sRes.json()
      const a = await aRes.json()
      const h = await hRes.json()
      setSite(s.content)
      setAchievements(a.items || [])
      setHello(h.message || '')
    } catch (e) {
      setError(e.message || 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    try { localStorage.setItem('backend_url', backendUrl) } catch {}
  }, [backendUrl])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    if (vibes) {
      a.volume = 0.25
      const p = a.play()
      if (p && p.catch) p.catch(()=>{})
    } else {
      a.pause()
    }
  }, [vibes])

  const askRobot = (q) => {
    const text = q.toLowerCase()
    if (/rocket|🚀/.test(text)) {
      setRocket(true)
      setTimeout(()=>setRocket(false), 3600)
      return 'Tahan... peluncuran dimulai! 🚀'
    }
    if (!site) return 'Hubungkan backend dulu, lalu klik Muat Konten.'
    if (text.includes('profil')) return site.profil?.sejarah || 'Profil belum tersedia.'
    if (text.includes('visi')) return site.visi
    if (text.includes('misi')) return (site.misi || []).map((m,i)=>`${i+1}. ${m}`).join('\n')
    if (text.includes('tujuan')) return (site.tujuan || []).map((t,i)=>`• ${t}`).join('\n')
    if (text.includes('prestasi')) return achievements.length ? achievements.map(p=>`${p.tahun} – ${p.bidang} (${p.tingkat}): ${p.prestasi}`).join('\n') : 'Belum ada data prestasi.'
    return 'Coba kata kunci: profil, visi, misi, tujuan, prestasi, rocket.'
  }

  const years = ['Semua', ...Array.from(new Set((achievements||[]).map(a=>a.tahun))).sort((a,b)=>String(b).localeCompare(String(a)))]
  const filtered = (achievements||[]).filter((p)=> {
    const byYear = filter.tahun === 'Semua' || String(p.tahun) === String(filter.tahun)
    const byQ = !filter.q || [p.prestasi, p.bidang, p.tingkat, p.tahun].join(' ').toLowerCase().includes(filter.q.toLowerCase())
    return byYear && byQ
  })

  return (
    <div className="min-h-screen relative bg-slate-950 text-slate-100" ref={revealRef}>
      <GalaxyBackground />
      <RocketLaunch show={rocket} onDone={()=>setRocket(false)} />

      {/* Hidden/controlled audio for Vibes mode */}
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/03/15/audio_4f0f3a3a72.mp3" />

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/60 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className={`h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 group-hover:scale-110 transition ${vibes ? 'ring-2 ring-indigo-400/60 shadow-[0_0_20px_rgba(99,102,241,.35)]' : ''}`} />
            <div className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300">KIR MAN 1 HST</div>
          </a>
          <nav className="hidden md:flex gap-6 text-sm text-slate-300">
            <a href="#profil" className="hover:text-white">Profil</a>
            <a href="#tujuan" className="hover:text-white">Tujuan</a>
            <a href="#visi-misi" className="hover:text-white">Visi & Misi</a>
            <a href="#prestasi" className="hover:text-white">Prestasi</a>
            <a href="#galeri" className="hover:text-white">Galeri</a>
            <a href="#demo" className="hover:text-white">Integrasi</a>
          </nav>
          <button onClick={()=>setVibes(v=>!v)} className={`ml-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ring-1 transition ${vibes ? 'bg-indigo-500/20 ring-indigo-400 text-indigo-200' : 'bg-white/5 ring-white/15 text-slate-300 hover:bg-white/10'}`}>
            {vibes ? '🎧 Vibes On' : '🎧 Vibes Off'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-4 pt-12 pb-8" data-reveal>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300">
              Komunitas Karya Ilmiah Remaja MAN 1 HST
            </h1>
            <p className="mt-4 text-slate-300">
              Eksplorasi sains bertema laboratorium dan galaksi — informatif, interaktif, dan ramah Gen Z.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#profil" className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-5 py-2.5 text-white font-semibold shadow hover:bg-indigo-600 active:scale-[0.98] transition">Lihat Profil</a>
              <a href="#prestasi" className="inline-flex items-center justify-center rounded-lg bg-white/10 px-5 py-2.5 text-indigo-200 font-semibold ring-1 ring-white/20 hover:bg-white/15 active:scale-[0.98] transition">Prestasi</a>
            </div>
            <div className="mt-6" data-reveal>
              <ScienceIcons />
            </div>
          </div>
          <div className="relative" data-reveal>
            <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl ring-1 ring-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.15),transparent_40%)]" />
              <div className="text-center px-6 relative z-10">
                <div className="text-6xl">🧪🚀</div>
                <p className="mt-3 text-slate-300">Tema lab + galaksi dengan micro-interactions yang halus.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profil */}
      <section id="profil" className="max-w-6xl mx-auto px-4 py-10" data-reveal>
        <h2 className="text-2xl font-bold">Profil</h2>
        <p className="mt-2 text-slate-300">{site?.info || 'Hubungkan backend untuk memuat profil.'}</p>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5 transition hover:translate-y-[-2px] hover:bg-white/7.5">
            <div className="text-sm text-slate-300">Sejarah & Kegiatan</div>
            <p className="mt-2 text-slate-200">{site?.profil?.sejarah || '—'}</p>
            <ul className="mt-3 list-disc list-inside text-slate-300">
              {(site?.profil?.kegiatan || []).map((k,i)=> <li key={i}>{k}</li>)}
            </ul>
          </div>
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5 transition hover:translate-y-[-2px]">
            <div className="text-sm text-slate-300">Model Sains</div>
            <div className="mt-3 flex items-center justify-center">
              <ScienceIcons />
            </div>
          </div>
        </div>
      </section>

      {/* Tujuan */}
      <section id="tujuan" className="max-w-6xl mx-auto px-4 py-10" data-reveal>
        <h2 className="text-2xl font-bold">Tujuan</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(site?.tujuan || ["Menumbuhkan budaya riset","Mendorong publikasi","Membangun jejaring"]).map((t,i) => (
            <div key={i} className="rounded-xl bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 ring-1 ring-white/10 p-4 transition hover:translate-y-[-2px] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
              <div className="text-slate-200">{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Visi & Misi */}
      <section id="visi-misi" className="max-w-6xl mx-auto px-4 py-10" data-reveal>
        <h2 className="text-2xl font-bold">Visi & Misi</h2>
        <div className="mt-4 rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
          <div className="text-slate-200 font-semibold">Visi</div>
          <p className="text-slate-300 mt-1">{site?.visi || '—'}</p>
          <div className="text-slate-200 font-semibold mt-4">Misi</div>
          <ul className="mt-1 list-decimal list-inside text-slate-300">
            {(site?.misi || []).map((m,i)=>(<li key={i}>{m}</li>))}
          </ul>
        </div>
      </section>

      {/* Prestasi */}
      <section id="prestasi" className="max-w-6xl mx-auto px-4 py-10" data-reveal>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-2xl font-bold">Prestasi</h2>
          <div className="flex flex-wrap items-center gap-2">
            <select value={filter.tahun} onChange={(e)=>setFilter(f=>({...f, tahun:e.target.value}))} className="rounded-lg bg-white/5 ring-1 ring-white/15 px-3 py-2 text-sm">
              {years.map(y=> <option key={y} value={y}>{y}</option>)}
            </select>
            <input value={filter.q} onChange={(e)=>setFilter(f=>({...f, q:e.target.value}))} placeholder="Cari prestasi/bidang..." className="rounded-lg bg-white/5 ring-1 ring-white/15 px-3 py-2 text-sm placeholder:text-slate-400" />
            <a href="#demo" className="text-sm text-indigo-300 hover:text-white">Hubungkan Backend →</a>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {(filtered || []).map((p, i) => (
            <div key={i} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 transition hover:translate-y-[-2px] hover:bg-white/[.07]">
              <div className="text-slate-200 font-semibold">{p.tahun} • {p.bidang}</div>
              <div className="text-slate-400 text-sm">{p.tingkat}</div>
              <div className="mt-1">{p.prestasi}</div>
              <div className="mt-3 -mb-1">
                {getBadges(p).map(b=> <Badge key={b}>{b}</Badge>)}
              </div>
            </div>
          ))}
          {!filtered?.length && (
            <div className="text-slate-400">Belum ada data. Hubungkan backend lalu klik Muat Konten.</div>
          )}
        </div>
      </section>

      {/* Galeri */}
      <section id="galeri">
        <Gallery />
      </section>

      {/* Integrasi Backend */}
      <section id="demo" className="max-w-6xl mx-auto px-4 py-10" data-reveal>
        <h2 className="text-2xl font-bold">Integrasi Backend</h2>
        <p className="text-slate-300 mt-1">Masukkan URL backend, lalu muat konten situs dan coba salam dari API.</p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <input
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            placeholder="https://your-backend-url"
            className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={fetchContent}
            disabled={loading || !backendUrl}
            className="rounded-lg bg-indigo-500 px-5 py-2.5 text-white font-semibold shadow hover:bg-indigo-600 active:scale-[0.98] transition disabled:opacity-60"
          >{loading ? 'Memuat...' : 'Muat Konten'}</button>
        </div>

        {hello && (
          <div className="mt-4 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-400/30 text-emerald-200 px-4 py-3">
            Salam API: {hello}
          </div>
        )}
        {!!error && (
          <div className="mt-4 rounded-lg bg-rose-500/10 ring-1 ring-rose-400/30 text-rose-200 px-4 py-3">
            {error}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/60" data-reveal>
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} KIR MAN 1 HST</div>
          <div className="flex gap-4">
            <a href="#profil" className="hover:text-white">Profil</a>
            <a href="#visi-misi" className="hover:text-white">Visi & Misi</a>
            <a href="#prestasi" className="hover:text-white">Prestasi</a>
            <a href="#galeri" className="hover:text-white">Galeri</a>
          </div>
        </div>
      </footer>

      <RobotAssistant onAsk={askRobot} onEasterEgg={()=>{ setRocket(true); setTimeout(()=>setRocket(false), 3600) }} />
    </div>
  )
}

export default App
