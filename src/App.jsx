import { useEffect, useMemo, useState } from 'react'

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
  const [hello, setHello] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const callHello = async () => {
    setLoading(true)
    setError('')
    setHello(null)
    try {
      if (!backendUrl) {
        throw new Error('Masukkan URL backend terlebih dahulu')
      }
      const url = backendUrl.replace(/\/$/, '') + '/api/hello'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Gagal memanggil API')
      const data = await res.json()
      setHello(data?.message || 'Sukses!')
    } catch (e) {
      setError(e.message || 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    try {
      localStorage.setItem('backend_url', backendUrl)
    } catch {}
  }, [backendUrl])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 text-gray-800">
      {/* Navbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-extrabold text-xl tracking-tight">Situs Sederhana</div>
          <nav className="hidden sm:flex gap-6 text-sm text-slate-600">
            <a href="#fitur" className="hover:text-slate-900">Fitur</a>
            <a href="#demo" className="hover:text-slate-900">Demo</a>
            <a href="#kontak" className="hover:text-slate-900">Kontak</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Bangun Website Sederhana dengan Cepat
            </h1>
            <p className="mt-4 text-slate-600">
              Ini adalah contoh website sederhana dengan tampilan modern. Ada bagian fitur, demo yang terhubung ke backend, dan footer kontak.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#demo" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-blue-700 transition">Lihat Demo</a>
              <a href="#fitur" className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-blue-700 font-semibold border border-blue-200 hover:border-blue-300 transition">Jelajahi Fitur</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video w-full rounded-xl bg-white shadow-lg ring-1 ring-slate-200 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-6xl">✨</div>
                <p className="mt-3 text-slate-600">UI sederhana, clean, dan responsif</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-blue-200/50 blur-2xl" />
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-indigo-200/50 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold">Fitur Utama</h2>
        <p className="text-slate-600 mt-1">Beberapa hal yang tersedia di halaman ini.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{
            title: 'Desain Responsif', desc: 'Tampil rapi di mobile hingga desktop.'
          }, {
            title: 'Komponen Reusable', desc: 'Struktur mudah dikembangkan.'
          }, {
            title: 'Terhubung ke Backend', desc: 'Coba panggil API sederhana.'
          }].map((f, i) => (
            <div key={i} className="rounded-xl bg-white p-5 shadow ring-1 ring-slate-200">
              <div className="text-lg font-semibold">{f.title}</div>
              <div className="mt-2 text-slate-600 text-sm">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo calling backend */}
      <section id="demo" className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold">Demo Terhubung ke Backend</h2>
        <p className="text-slate-600 mt-1">Masukkan URL backend lalu tekan tombol untuk memanggil API.</p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <input
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            placeholder="https://your-backend-url"
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={callHello}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Memanggil...' : 'Panggil /api/hello'}
          </button>
        </div>

        {hello && (
          <div className="mt-4 rounded-lg bg-green-50 border border-green-200 text-green-800 px-4 py-3">
            {hello}
          </div>
        )}
        {!!error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3">
            {error}
          </div>
        )}

        <div className="mt-6 text-xs text-slate-500">
          Tips: Isi dengan variabel lingkungan backend jika tersedia. Di lingkungan ini, gunakan tombol "Preview Backend" untuk mendapatkan URL lalu tempel di sini.
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="border-t border-slate-200/70 bg-white/60 mt-8">
        <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Situs Sederhana</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-900">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-900">Syarat</a>
            <a href="#" className="hover:text-slate-900">Kontak</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
