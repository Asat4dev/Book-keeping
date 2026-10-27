import React from 'react'

export default function Header({ onOpenMenu, title = 'Dashboard', onLogout }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-lg sm:text-xl font-bold text-gray-900">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onLogout}
          className="text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
