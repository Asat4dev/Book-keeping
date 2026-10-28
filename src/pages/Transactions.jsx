import React, { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../firebase'
import TransactionForm from '../components/TransactionForm'
import TransactionTable from '../components/TransactionTable'
import StatCard from '../components/StatCard'
import { useAppContext } from '../store/AppContext'

export default function Transactions() {
  const { user } = useAppContext()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  // Real-time listener — loads and stays in sync with Firestore
  useEffect(() => {
    if (!user) return

    const txRef = collection(db, 'users', user.uid, 'transactions')
    const q = query(txRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
      setTransactions(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  const handleAddTransaction = async (newTx) => {
    if (!user) return
    try {
      const txRef = collection(db, 'users', user.uid, 'transactions')
      await addDoc(txRef, {
        ...newTx,
        createdAt: serverTimestamp(),
      })
    } catch (err) {
      console.error('Failed to save transaction:', err)
    }
  }

  const handleDeleteTransaction = async (id) => {
    if (!user) return
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'transactions', id))
    } catch (err) {
      console.error('Failed to delete transaction:', err)
    }
  }

  const totalIncome = transactions
    .filter((tx) => tx.type === 'Income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalExpense = transactions
    .filter((tx) => tx.type === 'Expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading transactions...</p>
        </div>
      </div>
    )
  }

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
          value={`$${totalIncome.toLocaleString()}`}
          subtitle="Money in"
          color="text-emerald-600"
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpense.toLocaleString()}`}
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
