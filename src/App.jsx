import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useAppContext } from './store/AppContext'

// Public Auth Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Layout with Sidebar and Header
import Layout from './components/Layout'

// Main App Pages
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Clients from './pages/Clients'
import Invoices from './pages/Invoices'
import Receipts from './pages/Receipts'
import Catalog from './pages/Catalog'

// Loading screen
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-500 font-medium">Loading...</p>
      </div>
    </div>
  )
}

// Inner app — reads user from context, no prop drilling
function AppRoutes() {
  const { user, loading } = useAppContext()

  if (loading) return <LoadingScreen />

  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Landing />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" replace /> : <Signup />}
      />

      {/* App Pages inside Layout (Protected) */}
      <Route
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/catalog" element={<Catalog />} />
      </Route>

      {/* Redirect any other link */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
