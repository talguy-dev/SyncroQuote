import { useState } from 'react';
import StepCard from '../components/StepCard';
import { SERVICES } from '../data/flowConfig';

function validateData(data) {
  const missing = [];
  if (!data.fullName?.trim())       missing.push('שם מלא');
  if (!data.company?.trim())        missing.push('חברה');
  if (!data.phone?.trim())          missing.push('טלפון');
  if (!data.email?.trim())          missing.push('אימייל');
  if (!data.projectType)            missing.push('סוג פרויקט');
  if (!data.location?.trim())       missing.push('מיקום');
  if (!data.size?.trim())           missing.push('גודל במ"ר');
  if (!data.projectStage)           missing.push('שלב פרויקט');
  if (!data.selectedServices?.length) missing.push('שירותים נבחרים');
  return missing;
}

function Row({ label, value }) {
  return (
    <div
      className="flex justify-between items-start py-2.5"
      style={{ borderBottom: '1px solid #f3f4f6' }}
    >
      <span className="text-xs" style={{ color: '#9ca3af' }}>{label}</span>
      <span className="text-xs font-medium text-right max-w-[58%]" style={{ color: '#101218' }}>
        {value || '—'}
      </span>
    </div>
  );
}

export default function Step4_Review({ data, onBack, onGenerate, direction }) {
  const [confirmed, setConfirmed] = useState(null);
  const missing = validateData(data);
  const hasMissing = missing.length > 0;

  const serviceLabels = (data.selectedServices || [])
    .map((id) => SERVICES.find((s) => s.id === id)?.label || id)
    .join(' · ');

  return (
    <div className={direction === 'forward' ? 'anim-forward' : 'anim-backward'}>
      {/* Summary card */}
      <div
        className="rounded-2xl mb-3"
        style={{
          backgroundColor: '#fff',
          boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
          border: '1px solid #eaecf2',
          padding: '18px',
        }}
      >
        <h2 className="text-base font-bold mb-3" style={{ color: '#101218' }}>סיכום הפרויקט</h2>
        <Row label="שם"        value={data.fullName} />
        <Row label="חברה"      value={data.company} />
        <Row label="טלפון"     value={data.phone} />
        <Row label="אימייל"    value={data.email} />
        <Row label="סוג"       value={data.projectType} />
        <Row label="מיקום"     value={data.location} />
        <Row label='גודל (מ"ר)' value={data.size} />
        <Row label="שלב"       value={data.projectStage} />
        <Row label="שירותים"   value={serviceLabels} />
      </div>

      {/* Missing fields */}
      {hasMissing && (
        <div
          className="rounded-2xl mb-3 p-4"
          style={{ backgroundColor: '#fff5f5', border: '1px solid #fecaca' }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: '#dc2626' }}>⚠️ שדות חסרים:</p>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((m) => (
              <span
                key={m}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation */}
      {!hasMissing && (
        <div
          className="rounded-2xl mb-3 p-4"
          style={{ backgroundColor: '#fff', border: '1px solid #eaecf2' }}
        >
          <p className="text-sm font-semibold mb-3" style={{ color: '#101218' }}>
            האם כל הפרטים תקינים?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmed(true)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                border: `2px solid ${confirmed === true ? '#4175fc' : '#e2e5ed'}`,
                backgroundColor: confirmed === true ? '#4175fc' : '#fff',
                color: confirmed === true ? '#fff' : '#374151',
                minHeight: '44px',
              }}
            >
              כן, הכל תקין ✓
            </button>
            <button
              onClick={() => setConfirmed(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                border: `2px solid ${confirmed === false ? '#ef4444' : '#e2e5ed'}`,
                backgroundColor: confirmed === false ? '#fff5f5' : '#fff',
                color: confirmed === false ? '#dc2626' : '#374151',
                minHeight: '44px',
              }}
            >
              יש לתקן
            </button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        {(hasMissing || confirmed === false) && (
          <button
            onClick={onBack}
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-all"
            style={{
              border: '2px solid #4175fc',
              color: '#4175fc',
              backgroundColor: '#f0f4ff',
              minHeight: '50px',
            }}
          >
            חזרה לתיקון שדות
          </button>
        )}

        {!hasMissing && confirmed === true && (
          <button
            onClick={onGenerate}
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-all"
            style={{
              backgroundColor: '#4175fc',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(65,117,252,0.35)',
              minHeight: '50px',
            }}
          >
            הפק הצעת מחיר ↓
          </button>
        )}

        {!hasMissing && confirmed === null && (
          <button
            className="w-full py-3.5 rounded-xl text-sm font-bold"
            style={{ backgroundColor: '#e5e7eb', color: '#9ca3af', minHeight: '50px', cursor: 'not-allowed' }}
            disabled
          >
            הפק הצעת מחיר ↓
          </button>
        )}

        <button
          onClick={onBack}
          className="w-full py-2.5 rounded-xl text-xs font-medium"
          style={{ color: '#9ca3af', backgroundColor: 'transparent' }}
        >
          חזרה
        </button>
      </div>
    </div>
  );
}
