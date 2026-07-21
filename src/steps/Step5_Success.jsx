export default function Step5_Success({ uploadState, uploadError, onRetry }) {
  if (uploadState === 'uploading') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 anim-fade">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: '#FEF3E2' }}
        >
          <div className="spinner" />
        </div>
        <h2 className="text-lg font-bold mb-1 text-center" style={{ color: '#0D1B2A' }}>
          שולח לדרייב...
        </h2>
        <p className="text-sm text-center" style={{ color: '#7a8a9a' }}>
          מעלה את הסיכום והקבצים
        </p>
        <div className="dot-pulse flex items-center gap-1 mt-4">
          <span /><span /><span />
        </div>
      </div>
    );
  }

  if (uploadState === 'error') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 anim-fade">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-3xl"
          style={{ backgroundColor: '#fff5f5' }}
        >
          ⚠️
        </div>
        <h2 className="text-lg font-bold mb-2 text-center" style={{ color: '#0D1B2A' }}>
          שגיאה בשליחה
        </h2>
        {uploadError && (
          <p className="text-xs text-center mb-5 px-4 py-2.5 rounded-xl w-full"
            style={{ backgroundColor: '#fff5f5', color: '#dc2626', border: '1px solid #fecaca' }}>
            {uploadError}
          </p>
        )}
        <button
          onClick={onRetry}
          className="w-full py-3.5 rounded-xl text-sm font-bold"
          style={{
            backgroundColor: '#E8931A', color: '#fff',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(232,147,26,0.3)',
            minHeight: '50px',
          }}
        >
          נסה שוב
        </button>
      </div>
    );
  }

  // done
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 anim-fade">
      <svg width="72" height="72" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '28px' }}>
        <rect width="100" height="100" rx="20" fill="#0D1B2A" />
        <g fill="none" stroke="#E8931A" strokeWidth="6" strokeLinecap="round">
          <circle cx="50" cy="50" r="22" strokeDasharray="110.6 27.6" transform="rotate(180 50 50)" />
          <circle cx="50" cy="50" r="14.5" strokeDasharray="54.6 36.4" transform="rotate(180 50 50)" />
          <circle cx="50" cy="50" r="7" strokeDasharray="18.2 27.3" transform="rotate(180 50 50)" />
        </g>
      </svg>

      <h1 className="text-2xl font-bold text-center mb-3" style={{ color: '#0D1B2A', lineHeight: 1.3 }}>
        תודה על מילוי הטופס!
      </h1>

      <p className="text-sm text-center" style={{ color: '#7a8a9a', lineHeight: 1.7, maxWidth: '260px' }}>
        צוות Syncro קיבל את הפנייה שלך
        <br />
        וייצור איתך קשר בהקדם האפשרי.
      </p>

      <div style={{ marginTop: '40px', width: '48px', height: '2px', backgroundColor: '#E8931A', borderRadius: '2px' }} />
    </div>
  );
}
