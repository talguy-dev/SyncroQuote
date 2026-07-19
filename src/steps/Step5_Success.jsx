import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { generateQuotePdf }  from '../utils/generatePdf';
import QuotePDFTemplate      from '../components/QuotePDFTemplate';

function buildQuoteId() {
  return `HZ-${new Date().getFullYear()}-001`;
}

export default function Step5_Success({ data, onReset }) {
  const pdfRef = useRef(null);
  const [phase,   setPhase]   = useState('generating');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const quoteId = buildQuoteId();

  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 2200);
    return () => clearTimeout(t);
  }, []);

  const handlePdf = async () => {
    setLoading(true);
    setError(null);
    try {
      await generateQuotePdf(pdfRef.current, `סיכום_שאלון_${quoteId}.pdf`);
    } catch (e) {
      console.error(e);
      setError('שגיאה בהפקת PDF. נסו שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Hidden PDF template rendered directly on body ── */}
      {createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: '-820px',   // off-screen left, still in DOM with real dimensions
            width: '794px',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        >
          <QuotePDFTemplate ref={pdfRef} data={data} />
        </div>,
        document.body,
      )}

      {/* ── Visible UI ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 anim-fade">

        {/* Generating animation */}
        {phase === 'generating' && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#f0f4ff' }}
            >
              <div className="spinner" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1" style={{ color: '#101218' }}>
                מכין סיכום שאלון...
              </h2>
              <p className="text-sm" style={{ color: '#9ca3af' }}>מעבד את הנתונים</p>
            </div>
            <div className="dot-pulse flex items-center gap-1">
              <span /><span /><span />
            </div>
          </div>
        )}

        {/* Ready card */}
        {phase === 'ready' && (
          <div
            className="w-full rounded-2xl p-6 flex flex-col items-center gap-4 text-center"
            style={{
              backgroundColor: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #eaecf2',
            }}
          >
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ backgroundColor: '#f0fdf4' }}
            >
              ✅
            </div>

            {/* Title */}
            <div>
              <h2 className="text-lg font-bold mb-0.5" style={{ color: '#101218' }}>
                הסיכום מוכן!
              </h2>
              <p className="text-xs" style={{ color: '#9ca3af' }}>
                לחצו להורדת סיכום השאלון כ-PDF
              </p>
            </div>

            {/* Error */}
            {error && (
              <p
                className="text-xs w-full px-4 py-2.5 rounded-xl"
                style={{ backgroundColor: '#fff5f5', color: '#dc2626', border: '1px solid #fecaca' }}
              >
                {error}
              </p>
            )}

            {/* ── PDF button ── */}
            <button
              onClick={handlePdf}
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: loading ? '#e5e7eb' : '#4175fc',
                color:           loading ? '#9ca3af' : '#fff',
                boxShadow:       loading ? 'none' : '0 4px 14px rgba(65,117,252,0.3)',
                minHeight: '52px',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: '16px', height: '16px',
                      border: '2px solid rgba(255,255,255,0.4)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  מייצר PDF...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 13h10M8 3v7M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  הורד סיכום שאלון PDF
                </>
              )}
            </button>

            {/* Reset */}
            <button
              onClick={onReset}
              disabled={!!loading}
              className="w-full py-2.5 rounded-xl text-xs font-medium"
              style={{
                border:          '2px solid #e2e5ed',
                color:           '#9ca3af',
                backgroundColor: '#f9fafb',
                minHeight: '44px',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              + צור הצעת מחיר חדשה
            </button>
          </div>
        )}
      </div>
    </>
  );
}
