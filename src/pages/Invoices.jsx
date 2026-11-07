import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import InvoiceForm from '../components/InvoiceForm'
import InvoiceTable from '../components/InvoiceTable'
import StatCard from '../components/StatCard'
import { useAppContext } from '../store/AppContext'

export default function Invoices() {
  const { user } = useAppContext()
  const [invoices, setInvoices] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return

    const invoicesRef = collection(db, 'users', user.uid, 'invoices')
    return onSnapshot(query(invoicesRef, orderBy('createdAt', 'desc')), (snapshot) => {
      setInvoices(snapshot.docs.map((invoiceDoc) => ({ id: invoiceDoc.id, ...invoiceDoc.data() })))
      setError('')
    }, (loadError) => {
      console.error('Failed to load invoices:', loadError)
      setError('Could not load invoices. Please try again.')
    })
  }, [user])

  const handleAddInvoice = async (newInvoice) => {
    const { id: recordId, ...invoiceData } = newInvoice
    try {
      await addDoc(collection(db, 'users', user.uid, 'invoices'), {
        ...invoiceData,
        recordId,
        createdAt: serverTimestamp(),
      })
      setError('')
    } catch (saveError) {
      console.error('Failed to save invoice:', saveError)
      setError('Could not save this invoice. Please try again.')
    }
  }

  const handleDeleteInvoice = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'invoices', id))
      setError('')
    } catch (deleteError) {
      console.error('Failed to delete invoice:', deleteError)
      setError('Could not delete this invoice. Please try again.')
    }
  }

  const totalBilled = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const pendingAmount = invoices
    .filter((inv) => inv.status === 'Pending')
    .reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Invoices
        </h2>
        <p className="text-sm text-gray-500">Manage client billing and invoices</p>
      </div>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Invoiced"
          value={`$${totalBilled}`}
          subtitle={`${invoices.length} total issued`}
          color="text-gray-900"
        />
        <StatCard
          title="Pending Invoices"
          value={`$${pendingAmount}`}
          subtitle="Awaiting client payment"
          color="text-yellow-600"
        />
      </div>

      {/* Form */}
      <InvoiceForm onAddInvoice={handleAddInvoice} />

      {/* Table */}
      <InvoiceTable
        invoices={invoices}
        onDeleteInvoice={handleDeleteInvoice}
      />
    </div>
  )
}
