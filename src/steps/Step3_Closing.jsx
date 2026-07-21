import { useRef, useState } from 'react';
import StepCard from '../components/StepCard';
import NavButtons from '../components/NavButtons';

function FileDropzone({ files, onChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (incoming) => {
    const next = [...files];
    for (const f of incoming) {
      if (!next.find((x) => x.name === f.name && x.size === f.size)) {
        next.push(f);
      }
    }
    onChange(next);
  };

  const removeFile = (index) => {
    const next = files.filter((_, i) => i !== index);
    onChange(next);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles([...e.dataTransfer.files]);
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${dragging ? '#E8931A' : '#d1d5db'}`,
          borderRadius: '12px',
          padding: '20px 16px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: dragging ? '#FEF3E2' : '#fafaf8',
          transition: 'border-color 0.15s, background-color 0.15s',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 8px' }}>
          <path d="M12 16V8M12 8l-3 3M12 8l3 3" stroke={dragging ? '#E8931A' : '#9ca3af'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 16.5A3.5 3.5 0 017.5 20h9a3.5 3.5 0 100-7h-.5A5 5 0 004 16.5z" stroke={dragging ? '#E8931A' : '#9ca3af'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-xs font-medium" style={{ color: dragging ? '#E8931A' : '#6b7280' }}>
          גררו קבצים לכאן או לחצו להעלאה
        </p>
        <p className="text-[10px] mt-1" style={{ color: '#9ca3af' }}>
          תמונות, PDF, מסמכים — כל סוג קובץ
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => addFiles([...e.target.files])}
      />

      {/* File list */}
      {files.length > 0 && (
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {files.map((file, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 12px', borderRadius: '8px',
                backgroundColor: '#fff', border: '1px solid rgba(13,27,42,0.1)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <path d="M2.5 1.5h6l3 3v8a.5.5 0 01-.5.5h-8.5a.5.5 0 01-.5-.5v-10.5a.5.5 0 01.5-.5z" stroke="#9ca3af" strokeWidth="1.2"/>
                <path d="M8.5 1.5v3.5h3" stroke="#9ca3af" strokeWidth="1.2"/>
              </svg>
              <span className="text-xs flex-1 truncate" style={{ color: '#374151' }}>{file.name}</span>
              <span className="text-[10px]" style={{ color: '#9ca3af', flexShrink: 0 }}>
                {file.size < 1024 * 1024
                  ? `${(file.size / 1024).toFixed(0)} KB`
                  : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 1, color: '#9ca3af', flexShrink: 0 }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Step3_Closing({ data, setData, onNext, onBack, direction }) {
  return (
    <StepCard direction={direction}>
      <div className="mb-5">
        <h2 className="text-lg font-bold" style={{ color: '#0D1B2A' }}>שאלות סגירה</h2>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>הערות נוספות לצוות Syncro</p>
      </div>

      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6b7280' }}>
        הערות / מידע נוסף
      </label>
      <textarea
        rows={4}
        value={data.closingRemarks || ''}
        onChange={(e) => setData({ ...data, closingRemarks: e.target.value })}
        placeholder="כל מידע נוסף שיעזור לנו להכין את ההצעה המדויקת ביותר עבורכם..."
        className="w-full rounded-xl text-sm outline-none resize-none"
        style={{
          padding: '13px 14px',
          border: '2px solid #e2e5ed',
          backgroundColor: '#fafbff',
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '20px',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#E8931A'; }}
        onBlur={(e)  => { e.target.style.borderColor = '#e2e5ed'; }}
      />

      {/* ── קבצים מצורפים (אופציונלי) ── */}
      <label className="block text-xs font-semibold mb-2" style={{ color: '#6b7280' }}>
        קבצים מצורפים
        <span className="font-normal mr-1" style={{ color: '#9ca3af' }}>(אופציונלי)</span>
      </label>
      <FileDropzone
        files={data.attachments || []}
        onChange={(files) => setData({ ...data, attachments: files })}
      />

      <NavButtons onNext={onNext} onBack={onBack} nextLabel="לסיכום ואישור" />
    </StepCard>
  );
}
