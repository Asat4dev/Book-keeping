import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/15 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
              ZB
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Zayvoo<span className="text-blue-500">Books</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-3.5 py-1.5 text-sm text-slate-300 hover:text-white transition cursor-pointer"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition cursor-pointer shadow-sm"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-blue-400">
          <span>Daily Expense & Income Tracker</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
          Manage your business money and records in one place
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
          A personal bookkeeping dashboard to track money in, money out, invoices, and client lists with ease.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition shadow-sm cursor-pointer"
          >
            Create Free Account
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg font-medium text-sm transition cursor-pointer"
          >
            Sign In to Dashboard
          </button>
        </div>

        {/* Dashboard Preview Box */}
        <div className="pt-8 max-w-2xl mx-auto">
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-5 text-left space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <span className="text-xs font-semibold text-slate-300">Sample Financial Overview</span>
              <span className="text-xs text-emerald-400">Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Current Balance</p>
                <p className="text-lg font-bold text-white mt-1">₦2,450,000</p>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Total Money In</p>
                <p className="text-lg font-bold text-emerald-400 mt-1">+₦3,800,000</p>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Total Money Out</p>
                <p className="text-lg font-bold text-rose-400 mt-1">-₦1,350,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
          <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-xl">
            <h3 className="font-semibold text-white text-sm">Income & Expenses</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Add transactions on the go and calculate your daily net balance automatically.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-xl">
            <h3 className="font-semibold text-white text-sm">Client Directory</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Store client contact info and billing notes in one organized place.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-xl">
            <h3 className="font-semibold text-white text-sm">Fast & Lightweight</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Clean React frontend connected to Firebase so your records are saved automatically.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Zayvoo Books. All rights reserved.</p>
      </footer>
    </div>
  )
}