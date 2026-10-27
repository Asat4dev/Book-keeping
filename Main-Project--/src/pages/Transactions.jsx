import React, { useState } from 'react'
import TransactionForm from '../components/TransactionForm'
import TransactionTable from '../components/TransactionTable'
import StatCard from '../components/StatCard'

export default function Transactions() {
  // Empty state - user enters all transactions themselves
  const [transactions, setTransactions] = useState([])

  const handleAddTransaction = (newTx) => {
    setTransactions([newTx, ...transactions])
  }

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id))
  }

  const totalIncome = transactions
    .filter((tx) => tx.type === 'Income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalExpense = transactions
    .filter((tx) => tx.type === 'Expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Transactions
        </h2>
        <p className="text-sm text-gray-500">Track income and expenses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Income"
          value={`$${totalIncome}`}
          subtitle="Money in"
          color="text-emerald-600"
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpense}`}
          subtitle="Money out"
          color="text-rose-600"
        />
      </div>

      {/* Form */}
      <TransactionForm onAddTransaction={handleAddTransaction} />

      {/* Table */}
      <TransactionTable
        transactions={transactions}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  )
}
