import { useState } from 'react'

export function useAppStore() {
  const [entries, setEntries] = useState([
    { id: 1, note: 'Initial Deposit', amount: 500, type: 'in', date: '2026-10-18' },
    { id: 2, note: 'Office Supplies', amount: 50, type: 'out', date: '2026-10-19' },
  ])

  function addEntry(newEntry) {
    setEntries([newEntry, ...entries])
  }

  function deleteEntry(id) {
    setEntries(entries.filter((e) => e.id !== id))
  }

  return { entries, addEntry, deleteEntry }
}