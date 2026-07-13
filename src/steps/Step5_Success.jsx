import { useEffect, useState } from 'react';
import { generateQuoteDocx } from '../utils/generateDocx';

export default function Step5_Success({ data }) {
  const [phase, setPhase] = useState('generating'); // generating | ready | downloading
  const [error, setError] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = async () => {
    setPhase('downloading');
    try {
      await generateQuoteDocx(data);
      setTimeout(() => setPhase('ready'), 1000);
    } catch (e) {
      console.error(e);
      setError('אירעה שגיאה בהפקת המסמך. נסו שוב.');
      setPhase('ready');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 anim-fade px-4">
      {phase === 'generating' && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#f0f4ff] flex items-center justify-center">
            <div className="spinner" />
          </div>
          <h2 className="text-2xl font-bold text-[#101218]">מכין הצעת מחיר...</h2>
          <p className="text-gray-500 text-sm">מעבד את הנתונים שהזנתם</p>
          <div className="dot-pulse flex items-center">
            <span /><span /><span />
          </div>
        </div>
      )}

      {(phase === 'ready' || phase === 'downloading') && (
        <div className="flex flex-col items-center gap-5 text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-md">
          <div className="w-20 h-20 rounded-full bg-[#f0f4ff] flex items-center justify-center text-4xl">
            ✅
          </div>
          <h2 className="text-2xl font-bold text-[#101218]">ההצעה מוכנה!</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            ההצעה עוצבה על בסיס הנתונים שהזנתם.<br />
            לחצו להורדה כקובץ Word.
          </p>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>
          )}

          <button
            onClick={handleDownload}
            disabled={phase === 'downloading'}
            className="w-full py-3 rounded-xl bg-[#4175fc] text-white font-bold text-sm hover:bg-[#2e5fe8] shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-60"
          >
            {phase === 'downloading' ? 'מוריד...' : '⬇ הורד קובץ Word'}
          </button>

          <p className="text-xs text-gray-400">
            הקובץ יכלול את כל פרטי הפרויקט ותנאי השירות
          </p>
        </div>
      )}
    </div>
  );
}
