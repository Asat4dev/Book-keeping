import React from 'react'

// Months shown before the project launch — no real data yet
const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']

export default function Chart({ title = 'Monthly Revenue' }) {
  // Project hasn't launched yet — bars will fill in once real data exists
  const data = MONTHS.map((label) => ({ label, height: '0%', value: null }))

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Analytics</p>
          <h3 className="text-base font-bold text-gray-900 mt-0.5">{title}</h3>
        </div>
        <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
          🚀 Launching Soon
        </span>
      </div>

      {/* Bar chart area */}
      <div className="h-40 flex items-end justify-between gap-2 pb-2 border-b border-gray-100">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
            {/* Empty bar placeholder — dashed outline, no fake value */}
            <div className="w-full max-w-[36px] h-full flex items-end">
              <div className="w-full rounded-t-lg border-2 border-dashed border-gray-200 bg-gray-50"
                style={{ height: '100%' }}
              />
            </div>
            <span className="text-[11px] text-gray-400 font-medium mt-2">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Empty-state message */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          Revenue data will appear here once your project goes live.
        </p>
      </div>
    </div>
  )
}
