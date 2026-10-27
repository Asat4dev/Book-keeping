import React, { useState } from 'react'
import StatCard from '../components/StatCard'

export default function Receipts() {
  // Empty state - user enters all receipts themselves
  const [receipts, setReceipts] = useState([])

  const [merchant, setMerchant] = useState('')
  const [category, setCategory] = useState('Software')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleAddReceipt = (e) => {
    e.preventDefault()
    if (!merchant || !amount) return

    setReceipts([
      {
        id: 'REC-' + Math.floor(Math.random() * 900 + 100),
        merchant,
        category,
        amount: Number(amount),
        date,
      },
      ...receipts,
    ])

    setMerchant('')
    setAmount('')
  }

  const handleDeleteReceipt = (id) => {
    setReceipts(receipts.filter((r) => r.id !== id))
  }

  const totalReceiptsAmount = receipts.reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Receipts
        </h2>
        <p className="text-sm text-gray-500">Expense proofs and vouchers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Documented"
          value={`$${totalReceiptsAmount}`}
          subtitle={`${receipts.length} expense receipts`}
        />
        <StatCard
          title="Status"
          value={receipts.length === 0 ? 'No receipts yet' : 'Logged'}
          subtitle="All records saved"
        />
      </div>

      {/* Add Receipt Form */}
      <form onSubmit={handleAddReceipt} className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Add Expense Receipt
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Merchant</label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="e.g. AWS"
              required
              className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 text-sm"
            >
              <option value="Software">Software</option>
              <option value="Hosting">Hosting</option>
              <option value="Supplies">Supplies</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              required
              className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition cursor-pointer"
        >
          + Add Receipt
        </button>
      </form>

      {/* Receipts Table */}
      <div className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl shadow-sm overflow-x-auto">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Receipts ({receipts.length})
        </h3>

        {receipts.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            No receipts added yet. Fill out the form above to log your first expense.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs">
                <th className="pb-2">ID</th>
                <th className="pb-2">Merchant</th>
                <th className="pb-2">Category</th>
                <th className="pb-2 hidden sm:table-cell">Date</th>
                <th className="pb-2 text-right">Amount</th>
                <th className="pb-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {receipts.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition">
                  <td className="py-2.5 text-xs text-gray-400">{r.id}</td>
                  <td className="py-2.5 font-medium text-gray-900">{r.merchant}</td>
                  <td className="py-2.5 text-xs text-gray-500">{r.category}</td>
                  <td className="py-2.5 text-gray-400 text-xs hidden sm:table-cell">{r.date}</td>
                  <td className="py-2.5 text-right font-semibold text-gray-900">${r.amount}</td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => handleDeleteReceipt(r.id)}
                      className="text-xs text-red-500 hover:text-red-700 px-2 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
