export default function NavButtons({
  onNext,
  onBack,
  nextLabel = 'המשך',
  backLabel = 'חזרה',
  nextDisabled = false,
  showBack = true,
}) {
  return (
    <div className="flex items-center justify-between mt-6 gap-3">
      {showBack ? (
        <button
          onClick={onBack}
          className="flex-shrink-0 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            border: '2px solid #e2e5ed',
            color: '#6b7280',
            backgroundColor: '#fff',
            minHeight: '48px',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {backLabel}
        </button>
      ) : <div />}

      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
        style={{
          backgroundColor: nextDisabled ? '#e5e7eb' : '#E8931A',
          color: nextDisabled ? '#9ca3af' : '#ffffff',
          cursor: nextDisabled ? 'not-allowed' : 'pointer',
          minHeight: '48px',
          boxShadow: nextDisabled ? 'none' : '0 2px 10px rgba(232,147,26,0.25)',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {nextLabel}
      </button>
    </div>
  );
}
