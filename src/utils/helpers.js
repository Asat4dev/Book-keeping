// Simple currency formatter
export function formatCurrency(amount) {
  return '$' + Number(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })
}

// Simple date formatter
export function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
