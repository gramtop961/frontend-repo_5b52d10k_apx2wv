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

function RobotAssistant({ onAsk }) {
  const [open, setOpen] = useState(true)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Halo! Aku RoboLab 🤖✨. Tanyakan: profil, visi, misi, tujuan, atau prestasi.' }
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
            {['Profil','Visi','Misi','Tujuan','Prestasi'].map((l)=> (
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

  const base = backendUrl?.replace(/\/$/, '')
  const revealRef = useReveal()

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

  const askRobot = (q) => {
    const text = q.toLowerCase()
    if (!site) return 'Hubungkan backend dulu, lalu klik Muat Konten.'
    if (text.includes('profil')) return site.profil?.sejarah || 'Profil belum tersedia.'
    if (text.includes('visi')) return site.visi
    if (text.includes('misi')) return (site.misi || []).map((m,i)=>`${i+1}. ${m}`).join('\n')
    if (text.includes('tujuan')) return (site.tujuan || []).map((t,i)=>`• ${t}`).join('\n')
    if (text.includes('prestasi')) return achievements.length ? achievements.map(p=>`${p.tahun} – ${p.bidang} (${p.tingkat}): ${p.prestasi}`).join('\n') : 'Belum ada data prestasi.'
    return 'Coba kata kunci: profil, visi, misi, tujuan, prestasi.'
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

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/60 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 group-hover:scale-110 transition" />
            <div className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300">KIR MAN 1 HST</div>
          </a>
          <nav className="hidden md:flex gap-6 text-sm text-slate-300">
            <a href="#profil" className="hover:text-white">Profil</a>
            <a href="#tujuan" className="hover:text-white">Tujuan</a>
            <a href="#visi-misi" className="hover:text-white">Visi & Misi</a>
            <a href="#prestasi" className="hover:text-white">Prestasi</a>
            <a href="#demo" className="hover:text-white">Integrasi</a>
          </nav>
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
            </div>
          ))}
          {!filtered?.length && (
            <div className="text-slate-400">Belum ada data. Hubungkan backend lalu klik Muat Konten.</div>
          )}
        </div>
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
          </div>
        </div>
      </footer>

      <RobotAssistant onAsk={askRobot} />
    </div>
  )
}

export default App
