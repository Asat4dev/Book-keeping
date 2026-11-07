import React from 'react'

export default function StatCard({ title, value, subtitle, color = 'text-gray-900' }) {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
      <p className="text-xs text-gray-500 font-medium">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
    </div>
  )
}
