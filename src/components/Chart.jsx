import React from 'react'

export default function Chart({ title = 'Monthly Revenue Trend' }) {
  // Simple beginner data points (height in percentage)
  const data = [
    { label: 'May', height: '45%', value: '$14.2k' },
    { label: 'Jun', height: '60%', value: '$18.5k' },
    { label: 'Jul', height: '50%', value: '$16.0k' },
    { label: 'Aug', height: '75%', value: '$22.8k' },
    { label: 'Sep', height: '70%', value: '$21.4k' },
    { label: 'Oct', height: '90%', value: '$24.5k' },
  ]

  return (
    <div className="bg-navy/70 border border-cream/10 p-5 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-gold font-semibold">
            Analytics
          </span>
          <h3 className="text-base font-bold text-cream mt-0.5">{title}</h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-cream/50 bg-cream/5 px-2 py-1 rounded-md border border-cream/10">
          Last 6 Months
        </span>
      </div>

      {/* Simple Pure CSS Bar Chart */}
      <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-cream/10">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
            <span className="text-[10px] font-mono text-gold opacity-0 group-hover:opacity-100 transition-opacity mb-1">
              {item.value}
            </span>
            <div
              style={{ height: item.height }}
              className="w-full max-w-[36px] bg-indigo hover:bg-gold transition-all duration-300 rounded-t-lg shadow-sm"
            />
            <span className="font-mono text-[11px] text-cream/60 mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
