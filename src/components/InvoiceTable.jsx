import React from 'react'

export default function InvoiceTable({ invoices = [], onDeleteInvoice }) {
  if (invoices.length === 0) {
    return (
      <div className="bg-white border border-gray-200 p-6 rounded-xl text-center text-gray-500 text-sm shadow-sm">
        No invoices found.
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl shadow-sm overflow-x-auto">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Invoices ({invoices.length})
      </h3>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500 text-xs">
            <th className="pb-2">ID</th>
            <th className="pb-2">Client</th>
            <th className="pb-2 hidden sm:table-cell">Date</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Status</th>
            {onDeleteInvoice && <th className="pb-2 text-right">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {invoices.map((inv) => (
            <tr key={inv.id} className="hover:bg-gray-50 transition">
              <td className="py-2.5 text-xs text-gray-500">{inv.recordId || inv.id}</td>
              <td className="py-2.5 text-gray-900 font-medium">{inv.client}</td>
              <td className="py-2.5 text-gray-500 text-xs hidden sm:table-cell">{inv.date}</td>
              <td className="py-2.5 text-gray-900 font-bold">${inv.amount}</td>
              <td className="py-2.5">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    inv.status === 'Paid'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                  }`}
                >
                  {inv.status}
                </span>
              </td>
              {onDeleteInvoice && (
                <td className="py-2.5 text-right">
                  <button
                    onClick={() => onDeleteInvoice(inv.id)}
                    className="text-xs text-red-500 hover:text-red-700 px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
