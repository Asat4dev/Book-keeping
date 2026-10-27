import React, { useState } from 'react'
import InvoiceForm from '../components/InvoiceForm'
import InvoiceTable from '../components/InvoiceTable'
import StatCard from '../components/StatCard'

export default function Invoices() {
  // Empty state - user enters all invoices themselves
  const [invoices, setInvoices] = useState([])

  const handleAddInvoice = (newInvoice) => {
    setInvoices([newInvoice, ...invoices])
  }

  const handleDeleteInvoice = (id) => {
    setInvoices(invoices.filter((inv) => inv.id !== id))
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
