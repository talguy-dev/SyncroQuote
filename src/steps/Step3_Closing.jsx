import { useRef, useState } from 'react';
import StepCard from '../components/StepCard';
import NavButtons from '../components/NavButtons';

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2.5 1.5h6l3 3v8a.5.5 0 01-.5.5h-8.5a.5.5 0 01-.5-.5v-10.5a.5.5 0 01.5-.5z" stroke="#9ca3af" strokeWidth="1.2"/>
      <path d="M8.5 1.5v3.5h3" stroke="#9ca3af" strokeWidth="1.2"/>
    </svg>
  );
}

function formatSize(bytes) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function SlotDropzone({ slotIndex, files, onFilesChange, onRemoveSlot, isOnly }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (incoming) => {
    const next = [...files];
    for (const f of incoming) {
      if (!next.find((x) => x.name === f.name && x.size === f.size)) next.push(f);
    }
    onFilesChange(slotIndex, next);
  };

  const removeFile = (i) => {
    onFilesChange(slotIndex, files.filter((_, idx) => idx !== i));
  };

  return (
    <div
      style={{
        border: '1px solid rgba(13,27,42,0.1)',
        borderRadius: '14px',
        backgroundColor: '#fff',
        boxShadow: '0 1px 6px rgba(13,27,42,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px',
          borderBottom: '1px solid rgba(13,27,42,0.07)',
          backgroundColor: '#fafaf8',
        }}
      >
        <span className="text-xs font-semibold" style={{ color: '#6b7280' }}>
          מסמך {slotIndex + 1}
        </span>
        {!isOnly && (
          <button
            onClick={() => onRemoveSlot(slotIndex)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#9ca3af', fontSize: '16px', lineHeight: 1, padding: '2px 4px',
            }}
            title="הסר"
          >
            ✕
          </button>
        )}
      </div>

      {/* Drop area */}
      <div style={{ padding: '12px' }}>
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles([...e.dataTransfer.files]); }}
          style={{
            border: `2px dashed ${dragging ? '#E8931A' : '#d1d5db'}`,
            borderRadius: '10px',
            padding: '16px 12px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: dragging ? '#FEF3E2' : '#fafaf8',
            transition: 'border-color 0.15s, background-color 0.15s',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 6px' }}>
            <path d="M12 16V8M12 8l-3 3M12 8l3 3" stroke={dragging ? '#E8931A' : '#9ca3af'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 16.5A3.5 3.5 0 017.5 20h9a3.5 3.5 0 100-7h-.5A5 5 0 004 16.5z" stroke={dragging ? '#E8931A' : '#9ca3af'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-xs" style={{ color: dragging ? '#E8931A' : '#6b7280' }}>
            גרור או לחץ להעלאה
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
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {files.map((file, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '7px 10px', borderRadius: '8px',
                  backgroundColor: '#EFF1F5',
                }}
              >
                <FileIcon />
                <span className="text-xs flex-1 truncate" style={{ color: '#374151' }}>{file.name}</span>
                <span className="text-[10px]" style={{ color: '#9ca3af', flexShrink: 0 }}>
                  {formatSize(file.size)}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', flexShrink: 0, lineHeight: 1, padding: '2px' }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Step3_Closing({ data, setData, onNext, onBack, direction }) {
  const slots = data.documentSlots?.length ? data.documentSlots : [[]];

  const updateSlots = (next) => setData({ ...data, documentSlots: next });

  const handleFilesChange = (slotIndex, files) => {
    const next = slots.map((s, i) => (i === slotIndex ? files : s));
    updateSlots(next);
  };

  const addSlot = () => updateSlots([...slots, []]);

  const removeSlot = (slotIndex) => {
    updateSlots(slots.filter((_, i) => i !== slotIndex));
  };

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
        className="w-full rounded-xl outline-none resize-none"
        style={{
          padding: '13px 14px',
          border: '2px solid #e2e5ed',
          backgroundColor: '#fafbff',
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '22px',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#E8931A'; }}
        onBlur={(e)  => { e.target.style.borderColor = '#e2e5ed'; }}
      />

      {/* ── קבצים מצורפים ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <label className="text-xs font-semibold" style={{ color: '#6b7280' }}>
          קבצים מצורפים
          <span className="font-normal mr-1" style={{ color: '#9ca3af' }}>(אופציונלי)</span>
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {slots.map((files, i) => (
          <SlotDropzone
            key={i}
            slotIndex={i}
            files={files}
            onFilesChange={handleFilesChange}
            onRemoveSlot={removeSlot}
            isOnly={slots.length === 1}
          />
        ))}
      </div>

      {/* הוסף מסמך */}
      <button
        onClick={addSlot}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          width: '100%', marginTop: '10px', padding: '11px',
          borderRadius: '12px',
          border: '2px dashed #E8931A',
          backgroundColor: 'transparent',
          color: '#E8931A',
          fontSize: '13px', fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEF3E2'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span>
        הוסף מסמך
      </button>

      <NavButtons onNext={onNext} onBack={onBack} nextLabel="לסיכום ואישור" />
    </StepCard>
  );
}
