import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import Sidebar from './Sidebar'
import Header from './Header'
import { useAppContext } from '../store/AppContext'

export default function Layout() {
  const { user } = useAppContext()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Get current active tab from url (e.g. /transactions -> transactions)
  const currentTab = location.pathname.replace('/', '') || 'dashboard'

  // Capitalize title for the header
  const pageTitle = currentTab.charAt(0).toUpperCase() + currentTab.slice(1)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={currentTab}
        onSelectTab={(tab) => {
          navigate('/' + tab)
          setSidebarOpen(false)
        }}
        onLogout={handleLogout}
        user={user}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          title={pageTitle}
          onOpenMenu={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
