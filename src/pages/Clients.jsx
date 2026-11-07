import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import StatCard from '../components/StatCard'
import { useAppContext } from '../store/AppContext'

export default function Clients() {
  const { user } = useAppContext()
  const [clients, setClients] = useState([])
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (!user) return

    const clientsRef = collection(db, 'users', user.uid, 'clients')
    return onSnapshot(query(clientsRef, orderBy('createdAt', 'desc')), (snapshot) => {
      setClients(snapshot.docs.map((clientDoc) => ({ id: clientDoc.id, ...clientDoc.data() })))
      setError('')
    }, (loadError) => {
      console.error('Failed to load clients:', loadError)
      setError('Could not load clients. Please try again.')
    })
  }, [user])

  const handleAddClient = async (e) => {
    e.preventDefault()
    if (!name || !email) return

    try {
      await addDoc(collection(db, 'users', user.uid, 'clients'), {
        name,
        email,
        phone: phone || 'N/A',
        status: 'Active',
        createdAt: serverTimestamp(),
      })
      setName('')
      setEmail('')
      setPhone('')
      setError('')
    } catch (saveError) {
      console.error('Failed to save client:', saveError)
      setError('Could not save this client. Please try again.')
    }
  }

  const handleDeleteClient = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'clients', id))
      setError('')
    } catch (deleteError) {
      console.error('Failed to delete client:', deleteError)
      setError('Could not delete this client. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Clients
        </h2>
        <p className="text-sm text-gray-500">Manage client contacts and accounts</p>
      </div>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Clients"
          value={clients.length.toString()}
          subtitle={clients.length === 0 ? "No registered clients yet" : "Registered accounts"}
        />
        <StatCard
          title="Status"
          value={clients.length === 0 ? "0 Active" : `${clients.length} Active`}
          subtitle="All accounts good"
        />
      </div>

      {/* Add Client Form */}
      <form onSubmit={handleAddClient} className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Add New Client
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apex Corp"
              required
              className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
              className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 555-0123"
              className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition cursor-pointer"
        >
          + Add Client
        </button>
      </form>

      {/* Client List */}
      <div className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl shadow-sm overflow-x-auto">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Clients List ({clients.length})
        </h3>

        {clients.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            No clients added yet. Fill out the form above to add your first client.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs">
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2 hidden sm:table-cell">Phone</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition">
                  <td className="py-2.5 font-medium text-gray-900">{client.name}</td>
                  <td className="py-2.5 text-gray-500 text-xs">{client.email}</td>
                  <td className="py-2.5 text-gray-400 text-xs hidden sm:table-cell">{client.phone}</td>
                  <td className="py-2.5">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-green-50 text-green-700 border border-green-200">
                      {client.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => handleDeleteClient(client.id)}
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
