import React from 'react'

export default function Sidebar({ isOpen, onClose, activeTab, onSelectTab, onLogout, user }) {

  // The list of pages in the sidebar menu
  const menuItems = [
    { id: 'dashboard',    label: 'Dashboard',    icon: '📊' },
    { id: 'invoices',     label: 'Invoices',     icon: '📄' },
    { id: 'transactions', label: 'Transactions', icon: '💳' },
    { id: 'clients',      label: 'Clients',      icon: '👥' },
    { id: 'catalog',      label: 'Catalog',      icon: '📦' },
    { id: 'receipts',     label: 'Receipts',     icon: '🧾' },
  ]

  return (
    <>
      {/* Mobile backdrop — clicking it closes the sidebar */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar panel */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-60
        bg-white border-r border-gray-200
        flex flex-col justify-between
        transition-transform
        md:static md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* Top: logo + nav links */}
        <div>
          {/* Logo row */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <span className="font-bold text-lg text-gray-900">
              My <span className="text-blue-600">Finance</span>
            </span>
            {/* Close button (mobile only) */}
            <button
              type="button"
              onClick={onClose}
              className="md:hidden text-gray-500 hover:text-gray-800 p-1 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Nav links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id)  // switch tab
                    onClose()             // close sidebar on mobile
                  }}
                  className={`
                    w-full flex items-center gap-3
                    px-3 py-2.5 rounded-lg text-sm text-left transition
                    ${isActive
                      ? 'bg-blue-600 text-white font-medium shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                  `}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Bottom: user info + logout */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-left text-xs">
            {/* Show user name/email from the store, or fallback text */}
            <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
            <p className="text-gray-500">{user?.email || ''}</p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="text-xs bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 rounded transition font-medium"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
