import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── tiny hook: count-up number on mount ── */
function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return value
}

/* ── Stat item with count-up ── */
function StatItem({ value, label, prefix = '', suffix = '', started }) {
  const count = useCountUp(value, 1600, started)
  return (
    <div className="text-center animate-fade-up">
      <p className="text-3xl sm:text-4xl font-extrabold text-white">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  )
}

const FEATURES = [
  {
    icon: '💳',
    title: 'Income & Expenses',
    desc: 'Log every naira in and out instantly. See your net balance update in real-time without touching a spreadsheet.',
    color: 'from-blue-500/20 to-blue-600/5',
    border: 'hover:border-blue-500/50',
  },
  {
    icon: '📄',
    title: 'Smart Invoices',
    desc: 'Create professional invoices for clients in seconds. Track payment status and never lose a bill again.',
    color: 'from-purple-500/20 to-purple-600/5',
    border: 'hover:border-purple-500/50',
  },
  {
    icon: '👥',
    title: 'Client Directory',
    desc: 'Store client contacts, billing notes, and history in one clean place. Always know who owes you.',
    color: 'from-emerald-500/20 to-emerald-600/5',
    border: 'hover:border-emerald-500/50',
  },
  {
    icon: '🧾',
    title: 'Receipt Tracking',
    desc: 'Attach proof to every expense. Audit-ready records whenever you need them.',
    color: 'from-amber-500/20 to-amber-600/5',
    border: 'hover:border-amber-500/50',
  },
  {
    icon: '📦',
    title: 'Product Catalog',
    desc: 'List your services and products with fixed prices. Reuse them on invoices with one click.',
    color: 'from-rose-500/20 to-rose-600/5',
    border: 'hover:border-rose-500/50',
  },
  {
    icon: '📊',
    title: 'Visual Analytics',
    desc: 'Watch your monthly revenue trend grow over time with clean bar charts — no data hidden.',
    color: 'from-cyan-500/20 to-cyan-600/5',
    border: 'hover:border-cyan-500/50',
  },
]

const TICKER_ITEMS = [
  '📈 Revenue Tracking',
  '📄 Invoicing',
  '👥 Client Management',
  '🧾 Receipt Logging',
  '💳 Expense Tracking',
  '📦 Product Catalog',
  '🔐 Firebase Auth',
  '⚡ Real-time Sync',
]

export default function Landing() {
  const navigate = useNavigate()
  const statsRef = useRef(null)
  const [statsStarted, setStatsStarted] = useState(false)

  /* Start count-up when stats section enters viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true) },
      { threshold: 0.4 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#060b18] text-white flex flex-col overflow-x-hidden selection:bg-blue-500 selection:text-white">

      {/* ── Animated background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-700/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-[30%] right-[-8%] w-[400px] h-[400px] bg-purple-700/15 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[-5%] left-[20%] w-[500px] h-[500px] bg-indigo-700/15 rounded-full blur-[130px] animate-float" style={{ animationDelay: '2s' }} />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Header ── */}
      <header className="border-b border-white/5 bg-[#060b18]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 animate-fade-in">
            <div className="relative">
              <div className="animate-pulse-ring absolute inset-0 rounded-xl bg-blue-500 opacity-40" />
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/30">
                ZB
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight">
              Zayvoo<span className="text-blue-400">Books</span>
            </span>
          </div>

          <nav className="flex items-center gap-3 animate-fade-in delay-100">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-4 py-1.5 text-sm text-slate-300 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all duration-200 cursor-pointer"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30 cursor-pointer hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
            >
              Get Started →
            </button>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <main className="relative z-10 flex-1">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 text-center">

          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300 font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Business Finance Made Simple — Launching Soon
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            <span className="text-white">Manage your business</span>
            <br />
            <span className="shimmer-text">money & records</span>
            <br />
            <span className="text-white">in one place.</span>
          </h1>

          {/* Sub-headline */}
          <p className="animate-fade-up delay-200 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed mb-10">
            A personal bookkeeping dashboard built for small business owners — track income, expenses, invoices, and clients with zero complexity.
          </p>

          {/* CTA buttons */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="group w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all duration-200 shadow-xl shadow-blue-600/30 cursor-pointer hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
            >
              Create Free Account
              <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </div>

          {/* ── Animated Dashboard Preview ── */}
          <div className="animate-fade-up delay-400 relative mx-auto max-w-2xl">
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-3xl" />

            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl text-left space-y-5 overflow-hidden">
              {/* Spinning ring decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-dashed border-blue-500/20 animate-spin-slow" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border border-dashed border-purple-500/20 animate-spin-slow" style={{ animationDirection: 'reverse' }} />

              {/* Preview header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-xs text-slate-400 font-medium">ZayvooBooks Dashboard</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              {/* Stat mini-cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Balance', value: '₦2,450,000', color: 'text-white' },
                  { label: 'Money In', value: '+₦3,800,000', color: 'text-emerald-400' },
                  { label: 'Money Out', value: '-₦1,350,000', color: 'text-rose-400' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <p className="text-[11px] text-slate-400">{item.label}</p>
                    <p className={`text-sm font-bold mt-1 ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Mini bar chart */}
              <div>
                <p className="text-[11px] text-slate-500 mb-2 font-medium uppercase tracking-widest">Monthly Overview</p>
                <div className="h-20 flex items-end gap-2">
                  {[35, 55, 45, 70, 60, 85].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-y-105 origin-bottom"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${0.5 + i * 0.1}s`,
                        }}
                      />
                      <span className="text-[9px] text-slate-500 mt-1">
                        {['J', 'F', 'M', 'A', 'M', 'J'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent row */}
              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px]">💳</div>
                  <span className="text-slate-400">Acme Corp — Invoice #004</span>
                </div>
                <span className="text-emerald-400 font-semibold">+₦180,000</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ticker ── */}
        <div className="border-y border-white/5 bg-white/[0.02] py-3 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="text-sm text-slate-500 font-medium mx-8">{item}</span>
            ))}
          </div>
        </div>

        {/* ── Stats Banner ── */}
        <section ref={statsRef} className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-gradient-to-br from-blue-600/15 to-indigo-600/10 border border-blue-500/20 rounded-2xl p-8 sm:p-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <StatItem prefix="" value={500} suffix="+" label="Businesses Ready" started={statsStarted} />
            <StatItem prefix="₦" value={10} suffix="M+" label="Tracked Monthly" started={statsStarted} />
            <StatItem value={6} suffix=" Modules" label="All-in-one tools" started={statsStarted} />
            <StatItem value={100} suffix="%" label="Free to Start" started={statsStarted} />
          </div>
        </section>

        {/* ── Features Grid ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2 animate-fade-up">Everything you need</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white animate-fade-up delay-100">
              Built for real business owners
            </h2>
            <p className="text-slate-400 mt-3 max-w-md mx-auto text-sm animate-fade-up delay-200">
              Six powerful modules. One clean dashboard. No accounting degree required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`card-glow group relative bg-white/[0.03] border border-white/10 ${f.border} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden animate-fade-up`}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                {/* gradient bg on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                <div className="relative z-10">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 text-center">
          <div className="relative bg-gradient-to-br from-blue-600/20 to-indigo-600/10 border border-blue-500/20 rounded-3xl p-10 sm:p-14 overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to take control<br />of your finances?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
                Join business owners who are already managing their books smarter. It's completely free.
              </p>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all duration-200 shadow-2xl shadow-blue-600/40 cursor-pointer hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
              >
                Start for Free — No Credit Card
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-[10px] text-white">ZB</div>
            <span>© {new Date().getFullYear()} ZayvooBooks. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer transition">Privacy</span>
            <span className="hover:text-slate-300 cursor-pointer transition">Terms</span>
            <span className="hover:text-slate-300 cursor-pointer transition">Contact</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
