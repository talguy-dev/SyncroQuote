import { useEffect, useState } from 'react';

export default function Step5_Success() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-6 py-12"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      {/* Syncro logo mark */}
      <svg width="72" height="72" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '28px' }}>
        <rect width="100" height="100" rx="20" fill="#0D1B2A" />
        <g fill="none" stroke="#E8931A" strokeWidth="6" strokeLinecap="round">
          <circle cx="50" cy="50" r="22" strokeDasharray="110.6 27.6" transform="rotate(180 50 50)" />
          <circle cx="50" cy="50" r="14.5" strokeDasharray="54.6 36.4" transform="rotate(180 50 50)" />
          <circle cx="50" cy="50" r="7" strokeDasharray="18.2 27.3" transform="rotate(180 50 50)" />
        </g>
      </svg>

      <h1
        className="text-2xl font-bold text-center mb-3"
        style={{ color: '#0D1B2A', lineHeight: 1.3 }}
      >
        תודה על מילוי הטופס!
      </h1>

      <p
        className="text-sm text-center"
        style={{ color: '#7a8a9a', lineHeight: 1.7, maxWidth: '260px' }}
      >
        צוות Syncro קיבל את הפנייה שלך
        <br />
        וייצור איתך קשר בהקדם האפשרי.
      </p>

      <div
        style={{
          marginTop: '40px',
          width: '48px',
          height: '2px',
          backgroundColor: '#E8931A',
          borderRadius: '2px',
        }}
      />
    </div>
  );
}
