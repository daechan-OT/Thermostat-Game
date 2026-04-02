// GaugeToggle — switches between arc and bar gauge views
export default function GaugeToggle({ view, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${view === 'arc' ? 'bar' : 'arc'} gauge`}
      className="flex items-center gap-1 px-3 py-1.5 rounded-pill border-2 text-sm font-body font-semibold transition-all"
      style={{
        borderColor: '#930018',
        backgroundColor: 'transparent',
        color: '#930018',
        borderRadius: '999px',
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      {view === 'arc' ? (
        // Bar icon
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <rect x="0" y="0" width="18" height="3" rx="1.5" fill="#930018" />
          <rect x="0" y="5.5" width="13" height="3" rx="1.5" fill="#930018" />
          <rect x="0" y="11" width="9" height="3" rx="1.5" fill="#930018" />
        </svg>
      ) : (
        // Arc icon
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path
            d="M1 13 A8 8 0 0 1 17 13"
            stroke="#930018"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <line x1="9" y1="13" x2="9" y2="6" stroke="#930018" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      <span className="text-xs">{view === 'arc' ? 'Bar' : 'Arc'}</span>
    </button>
  )
}
