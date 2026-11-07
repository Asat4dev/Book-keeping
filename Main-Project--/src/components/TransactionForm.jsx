import React, { useState } from 'react'

export default function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Income')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description || !amount) return

    onAddTransaction({
      description,
      type,
      amount: Number(amount),
      date,
    })

    setDescription('')
    setAmount('')
    setType('Income')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Add New Transaction
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-700 mb-1 font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Website Payment"
            required
            className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-700 mb-1 font-medium">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 text-sm"
          >
            <option value="Income">Income (+)</option>
            <option value="Expense">Expense (-)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-700 mb-1 font-medium">Amount ($)</label>
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
          <label className="block text-xs text-gray-700 mb-1 font-medium">Date</label>
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
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition shadow-sm cursor-pointer"
      >
        + Add Transaction
      </button>
    </form>
  )
}
