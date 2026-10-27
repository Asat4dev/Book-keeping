import React from 'react'

export default function TransactionTable({ transactions = [], onDeleteTransaction }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white border border-gray-200 p-6 rounded-xl text-center text-gray-500 text-sm shadow-sm">
        No transactions recorded yet.
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl shadow-sm overflow-x-auto">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Transactions ({transactions.length})
      </h3>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500 text-xs">
            <th className="pb-2">Date</th>
            <th className="pb-2">Description</th>
            <th className="pb-2">Type</th>
            <th className="pb-2 text-right">Amount</th>
            {onDeleteTransaction && <th className="pb-2 text-right">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50 transition">
              <td className="py-2.5 text-xs text-gray-500">{tx.date}</td>
              <td className="py-2.5 text-gray-900 font-medium">{tx.description}</td>
              <td className="py-2.5">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    tx.type === 'Income'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {tx.type}
                </span>
              </td>
              <td
                className={`py-2.5 text-right font-semibold text-xs ${
                  tx.type === 'Income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {tx.type === 'Income' ? '+' : '-'} ${tx.amount}
              </td>
              {onDeleteTransaction && (
                <td className="py-2.5 text-right">
                  <button
                    onClick={() => onDeleteTransaction(tx.id)}
                    className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition"
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
