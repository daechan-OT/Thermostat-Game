// AutoplayButton — pill toggle; active = red filled, inactive = outlined
export default function AutoplayButton({ active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={active ? 'Disable autoplay' : 'Enable autoplay'}
      className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold transition-all"
      style={{
        borderRadius: '999px',
        border: '2px solid #930018',
        backgroundColor: active ? '#930018' : 'transparent',
        color: active ? '#fff' : '#930018',
        fontFamily: '"DM Sans", system-ui, sans-serif',
        minWidth: 72,
        justifyContent: 'center',
      }}
    >
      <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
        <path d="M0 0L10 6L0 12V0Z" />
      </svg>
      <span className="text-xs">Auto</span>
    </button>
  )
}
