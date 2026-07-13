import { useEffect, useState } from 'react';
import { generateQuoteDocx } from '../utils/generateDocx';

export default function Step5_Success({ data, onReset }) {
  const [phase, setPhase] = useState('generating');
  const [error, setError]  = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 2400);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = async () => {
    setPhase('downloading');
    setError(null);
    try {
      await generateQuoteDocx(data);
      setTimeout(() => setPhase('ready'), 800);
    } catch (e) {
      console.error(e);
      setError('אירעה שגיאה בהפקת המסמך. אנא נסו שוב.');
      setPhase('ready');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 anim-fade">
      {phase === 'generating' && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#f0f4ff' }}
          >
            <div className="spinner" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1" style={{ color: '#101218' }}>מכין הצעת מחיר...</h2>
            <p className="text-sm" style={{ color: '#9ca3af' }}>מעבד את הנתונים</p>
          </div>
          <div className="dot-pulse flex items-center gap-1">
            <span /><span /><span />
          </div>
        </div>
      )}

      {(phase === 'ready' || phase === 'downloading') && (
        <div
          className="w-full rounded-2xl p-6 flex flex-col items-center gap-5 text-center"
          style={{
            backgroundColor: '#fff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #eaecf2',
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: '#f0fdf4' }}
          >
            ✅
          </div>

          <div>
            <h2 className="text-lg font-bold mb-1" style={{ color: '#101218' }}>ההצעה מוכנה!</h2>
            <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              לחצו להורדת קובץ Word מעוצב
            </p>
          </div>

          {error && (
            <p
              className="text-xs w-full px-4 py-2.5 rounded-xl"
              style={{ backgroundColor: '#fff5f5', color: '#dc2626', border: '1px solid #fecaca' }}
            >
              {error}
            </p>
          )}

          <button
            onClick={handleDownload}
            disabled={phase === 'downloading'}
            className="w-full py-4 rounded-xl text-sm font-bold transition-all"
            style={{
              backgroundColor: phase === 'downloading' ? '#e5e7eb' : '#4175fc',
              color: phase === 'downloading' ? '#9ca3af' : '#fff',
              boxShadow: phase === 'downloading' ? 'none' : '0 4px 14px rgba(65,117,252,0.35)',
              minHeight: '52px',
              cursor: phase === 'downloading' ? 'not-allowed' : 'pointer',
            }}
          >
            {phase === 'downloading' ? 'מוריד...' : '⬇ הורד קובץ Word'}
          </button>

          <p className="text-xs" style={{ color: '#9ca3af' }}>
            הקובץ כולל הצעת מחיר + תנאי שירות מלאים
          </p>

          <button
            onClick={onReset}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              border: '2px solid #e2e5ed',
              color: '#6b7280',
              backgroundColor: '#f9fafb',
              minHeight: '48px',
            }}
          >
            + צור הצעת מחיר חדשה
          </button>
        </div>
      )}
    </div>
  );
}
