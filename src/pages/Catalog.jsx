import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import StatCard from '../components/StatCard'
import { useAppContext } from '../store/AppContext'

export default function Catalog() {
  const { user } = useAppContext()
  const [catalog, setCatalog] = useState([])
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [category, setCategory] = useState('Services')
  const [price, setPrice] = useState('')

  useEffect(() => {
    if (!user) return

    const catalogRef = collection(db, 'users', user.uid, 'catalog')
    return onSnapshot(query(catalogRef, orderBy('createdAt', 'desc')), (snapshot) => {
      setCatalog(snapshot.docs.map((catalogDoc) => ({ id: catalogDoc.id, ...catalogDoc.data() })))
      setError('')
    }, (loadError) => {
      console.error('Failed to load catalog:', loadError)
      setError('Could not load catalog. Please try again.')
    })
  }, [user])

  const handleAddItem = async (e) => {
    e.preventDefault()
    if (!name || !price) return

    try {
      await addDoc(collection(db, 'users', user.uid, 'catalog'), {
        name,
        category,
        price: Number(price),
        createdAt: serverTimestamp(),
      })
      setName('')
      setPrice('')
      setError('')
    } catch (saveError) {
      console.error('Failed to save catalog item:', saveError)
      setError('Could not save this item. Please try again.')
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'catalog', id))
      setError('')
    } catch (deleteError) {
      console.error('Failed to delete catalog item:', deleteError)
      setError('Could not delete this item. Please try again.')
    }
  }

  // Get unique categories from catalog
  const uniqueCategories = [...new Set(catalog.map((item) => item.category))]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Catalog
        </h2>
        <p className="text-sm text-gray-500">Products and services catalog</p>
      </div>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Items"
          value={catalog.length.toString()}
          subtitle={catalog.length === 0 ? 'No items yet' : 'Listed offerings'}
        />
        <StatCard
          title="Categories"
          value={`${uniqueCategories.length} ${uniqueCategories.length === 1 ? 'Category' : 'Categories'}`}
          subtitle={uniqueCategories.length === 0 ? 'None yet' : uniqueCategories.join(', ')}
        />
      </div>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Add Catalog Item
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Consulting"
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
              <option value="Services">Services</option>
              <option value="Design">Design</option>
              <option value="Support">Support</option>
              <option value="Products">Products</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              required
              className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition cursor-pointer"
        >
          + Add Item
        </button>
      </form>

      {/* Catalog Table */}
      <div className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl shadow-sm overflow-x-auto">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Catalog ({catalog.length})
        </h3>

        {catalog.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            No items added yet. Fill out the form above to add your first product or service.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs">
                <th className="pb-2">Name</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Price</th>
                <th className="pb-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {catalog.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="py-2.5 font-medium text-gray-900">{item.name}</td>
                  <td className="py-2.5 text-xs text-gray-500">{item.category}</td>
                  <td className="py-2.5 font-semibold text-gray-900">${item.price}</td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
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
