import React from 'react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'

export default function Dashboard({ user }) {
  const userName = user?.displayName || user?.email?.split('@')[0] || 'User'

  // Initial stats are empty ($0) so you can enter your own records
  const stats = [
    { title: 'Total Revenue', value: '$0', subtitle: 'No income recorded yet', color: 'text-emerald-600' },
    { title: 'Total Expenses', value: '$0', subtitle: '0 expense records', color: 'text-rose-600' },
    { title: 'Net Profit', value: '$0', subtitle: '$0 margin', color: 'text-blue-600' },
    { title: 'Pending Invoices', value: '0', subtitle: '0 awaiting payment', color: 'text-amber-600' },
  ]

  // Empty initial activity list
  const recentTransactions = []

  const quickLinks = [
    { title: 'Transactions', path: '/transactions', icon: '💳', desc: 'Record income & expenses' },
    { title: 'Invoices', path: '/invoices', icon: '📄', desc: 'Create and send bills' },
    { title: 'Clients', path: '/clients', icon: '👥', desc: 'Manage your client list' },
    { title: 'Receipts', path: '/receipts', icon: '🧾', desc: 'Track expense proof' },
    { title: 'Catalog', path: '/catalog', icon: '📦', desc: 'Products & service fees' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Your financial dashboard is ready. Start by adding your first transaction or invoice.
          </p>
        </div>
        <Link
          to="/transactions"
          className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition text-sm shadow-xs self-start sm:self-auto cursor-pointer"
        >
          + New Entry
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <StatCard
            key={idx}
            title={s.title}
            value={s.value}
            subtitle={s.subtitle}
            color={s.color}
          />
        ))}
      </div>

      {/* Quick Navigation Cards */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Navigation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="bg-white border border-gray-200 hover:border-blue-500 hover:shadow-md p-4 rounded-xl transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-2xl">{link.icon}</span>
                <h3 className="font-semibold text-gray-900 text-sm mt-2 group-hover:text-blue-600 transition">
                  {link.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
              </div>
              <span className="text-xs text-blue-600 font-medium mt-3 inline-block group-hover:translate-x-1 transition-transform">
                Open &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
          <Link to="/transactions" className="text-xs font-semibold text-blue-600 hover:underline">
            View All
          </Link>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="py-10 text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm font-medium text-gray-700">No activity recorded yet</p>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              Add your transactions, invoices, or clients to start populating your numbers.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Link
                to="/transactions"
                className="text-xs bg-blue-600 text-white font-medium px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
              >
                Add Transaction
              </Link>
              <Link
                to="/invoices"
                className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
              >
                Create Invoice
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{tx.desc}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
                <span
                  className={`text-sm font-bold ${
                    tx.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}