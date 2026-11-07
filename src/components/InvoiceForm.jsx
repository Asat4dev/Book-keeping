import React, { useState } from 'react'

export default function InvoiceForm({ onAddInvoice }) {
  const [client, setClient] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('Pending')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!client || !amount) return

    onAddInvoice({
      id: 'INV-' + Math.floor(Math.random() * 900 + 100),
      client,
      amount: Number(amount),
      status,
      date,
    })

    setClient('')
    setAmount('')
    setStatus('Pending')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Add New Invoice
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-700 mb-1 font-medium">Client Name</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="e.g. Acme Corp"
            required
            className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
          />
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
          <label className="block text-xs text-gray-700 mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 text-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
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
        + Add Invoice
      </button>
    </form>
  )
}
