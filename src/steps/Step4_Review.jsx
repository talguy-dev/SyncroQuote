import { useState } from 'react';
import { createPortal } from 'react-dom';
import { SERVICES, SERVICE_QUESTIONS } from '../data/flowConfig';

function validateData(data) {
  const missing = [];
  if (!data.fullName?.trim())         missing.push('שם מלא');
  if (!data.company?.trim())          missing.push('חברה');
  if (!data.phone?.trim())            missing.push('טלפון');
  if (!data.email?.trim())            missing.push('אימייל');
  if (!data.projectType)              missing.push('סוג פרויקט');
  if (data.projectType === 'אחר' && !data.projectTypeOther?.trim()) missing.push('פירוט סוג פרויקט');
  if (!data.location?.trim())         missing.push('מיקום');
  if (!data.size?.trim())             missing.push('גודל במ"ר');
  if (!data.projectStage)             missing.push('שלב פרויקט');
  if (!data.selectedServices?.length) missing.push('שירותים נבחרים');
  return missing;
}

function displayAnswer(answer, otherText) {
  if (!answer && answer !== 0) return '—';
  if (typeof answer === 'object') {
    // chips_with_text
    if (answer.option) {
      return answer.text ? `${answer.option}: ${answer.text}` : answer.option;
    }
  }
  if (answer === 'אחר' && otherText) return `אחר: ${otherText}`;
  return answer;
}

function Row({ label, value }) {
  return (
    <div
      className="flex justify-between items-start py-2"
      style={{ borderBottom: '1px solid #f3f4f6' }}
    >
      <span className="text-xs shrink-0 ml-3" style={{ color: '#9ca3af' }}>{label}</span>
      <span className="text-xs font-medium text-right" style={{ color: '#101218' }}>
        {value || '—'}
      </span>
    </div>
  );
}

const SERVICE_COLORS = {
  consulting:  { bg: '#f0f4ff', text: '#4175fc' },
  supervision: { bg: '#fff7ed', text: '#f97316' },
  management:  { bg: '#f0fdf4', text: '#16a34a' },
  bim:         { bg: '#faf5ff', text: '#9333ea' },
};

const SERVICE_ICONS = {
  consulting: '🏗️', supervision: '🔍', management: '📋', bim: '🧊',
};

function EditSectionModal({ data, onClose, onNavigateTo }) {
  const selectedServices = data.selectedServices || [];

  const handleSelect = (type, serviceId) => {
    onNavigateTo({ type, serviceId });
    onClose();
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* drag handle */}
        <div style={{ width: '40px', height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px', margin: '0 auto 18px' }} />

        <p style={{ fontWeight: '700', fontSize: '15px', color: '#101218', marginBottom: '14px', textAlign: 'right' }}>
          באיזה חלק תרצו לערוך?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* פרטים כלליים */}
          <button
            onClick={() => handleSelect('general')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '13px 14px', borderRadius: '12px',
              border: '1.5px solid #e2e5ed', backgroundColor: '#fafbff',
              cursor: 'pointer', width: '100%', textAlign: 'right',
            }}
          >
            <span style={{ fontSize: '18px' }}>👤</span>
            <span style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: '#6b7280', textAlign: 'right' }}>
              פרטים כלליים
            </span>
          </button>

          {/* בחירת שירותים */}
          <button
            onClick={() => handleSelect('services')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '13px 14px', borderRadius: '12px',
              border: '1.5px solid #e2e5ed', backgroundColor: '#fafbff',
              cursor: 'pointer', width: '100%', textAlign: 'right',
            }}
          >
            <span style={{ fontSize: '18px' }}>📌</span>
            <span style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: '#4175fc', textAlign: 'right' }}>
              בחירת שירותים אחרים
            </span>
          </button>

          {/* שירות ספציפי */}
          {selectedServices.filter((id) => (SERVICE_QUESTIONS[id] || []).length > 0).length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0 2px' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', whiteSpace: 'nowrap' }}>
                  תיקון בתוך שירות נבחר
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
              </div>

              {selectedServices
                .filter((id) => (SERVICE_QUESTIONS[id] || []).length > 0)
                .map((id) => {
                  const svc = SERVICES.find((s) => s.id === id);
                  const colors = SERVICE_COLORS[id] || {};
                  return (
                    <button
                      key={id}
                      onClick={() => handleSelect('service', id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '13px 14px', borderRadius: '12px',
                        border: `1.5px solid ${colors.bg || '#e2e5ed'}`,
                        backgroundColor: colors.bg || '#fafbff',
                        cursor: 'pointer', width: '100%', textAlign: 'right',
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>{SERVICE_ICONS[id]}</span>
                      <span style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: colors.text || '#101218', textAlign: 'right' }}>
                        {svc?.label || id}
                      </span>
                    </button>
                  );
                })}
            </>
          )}
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%', marginTop: '14px', padding: '13px',
            borderRadius: '12px', border: '1.5px solid #e2e5ed',
            backgroundColor: '#fff', color: '#9ca3af',
            fontSize: '14px', fontWeight: '500', cursor: 'pointer',
          }}
        >
          ביטול
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function Step4_Review({ data, onBack, onGenerate, onNavigateTo, direction }) {
  const [confirmed, setConfirmed] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const missing = validateData(data);
  const hasMissing = missing.length > 0;
  const answers = data.serviceAnswers || {};

  const projectTypeDisplay = data.projectType === 'אחר' && data.projectTypeOther
    ? `אחר: ${data.projectTypeOther}`
    : data.projectType;

  const serviceLabels = (data.selectedServices || [])
    .map((id) => SERVICES.find((s) => s.id === id)?.label || id)
    .join(' · ');

  return (
    <div className={direction === 'forward' ? 'anim-forward' : 'anim-backward'}>

      {/* ── פרטים כלליים ── */}
      <div
        className="rounded-2xl mb-3"
        style={{ backgroundColor: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.07)', border: '1px solid #eaecf2', padding: '16px' }}
      >
        <p className="text-xs font-bold mb-2" style={{ color: '#4175fc' }}>פרטים כלליים</p>
        <Row label="שם"           value={data.fullName} />
        <Row label="חברה"         value={data.company} />
        <Row label="טלפון"        value={data.phone} />
        <Row label="אימייל"       value={data.email} />
        <Row label="סוג פרויקט"   value={projectTypeDisplay} />
        <Row label="מיקום"        value={data.location} />
        <Row label='גודל (מ"ר)'   value={data.size} />
        <Row label="שלב"          value={data.projectStage} />
        <Row label="שירותים"      value={serviceLabels} />
      </div>

      {/* ── תשובות לפי שירות ── */}
      {(data.selectedServices || []).map((svcId) => {
        const svc = SERVICES.find((s) => s.id === svcId);
        const questions = SERVICE_QUESTIONS[svcId] || [];
        const colors = SERVICE_COLORS[svcId] || {};
        if (!questions.length) return null;

        return (
          <div
            key={svcId}
            className="rounded-2xl mb-3"
            style={{ backgroundColor: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.07)', border: '1px solid #eaecf2', padding: '16px' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span>{SERVICE_ICONS[svcId]}</span>
              <p
                className="text-xs font-bold"
                style={{ color: colors.text }}
              >
                {svc?.label}
              </p>
            </div>

            {questions.map((q) => {
              const raw = answers[q.id];
              const otherTxt = answers[`${q.id}_other`] || '';
              const display = displayAnswer(raw, otherTxt);
              return (
                <Row
                  key={q.id}
                  label={q.question.length > 30 ? q.question.slice(0, 30) + '…' : q.question}
                  value={display}
                />
              );
            })}
          </div>
        );
      })}

      {/* ── שדות חסרים ── */}
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

      {/* ── אישור ── */}
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
              onClick={() => setShowEditModal(true)}
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

      {/* ── כפתורי פעולה ── */}
      <div className="flex flex-col gap-2">
        {(hasMissing || confirmed === false) && (
          <button
            onClick={() => setShowEditModal(true)}
            className="w-full py-3.5 rounded-xl text-sm font-bold"
            style={{ border: '2px solid #4175fc', color: '#4175fc', backgroundColor: '#f0f4ff', minHeight: '50px' }}
          >
            חזרה לתיקון שדות
          </button>
        )}

        {!hasMissing && confirmed === true && (
          <button
            onClick={onGenerate}
            className="w-full py-3.5 rounded-xl text-sm font-bold"
            style={{ backgroundColor: '#4175fc', color: '#fff', boxShadow: '0 4px 14px rgba(65,117,252,0.35)', minHeight: '50px' }}
          >
            הפק הצעת מחיר ↓
          </button>
        )}

        {!hasMissing && confirmed === null && (
          <button disabled className="w-full py-3.5 rounded-xl text-sm font-bold" style={{ backgroundColor: '#e5e7eb', color: '#9ca3af', minHeight: '50px', cursor: 'not-allowed' }}>
            הפק הצעת מחיר ↓
          </button>
        )}

        <button
          onClick={onBack}
          className="w-full py-2 rounded-xl text-xs font-medium"
          style={{ color: '#9ca3af', backgroundColor: 'transparent' }}
        >
          חזרה
        </button>
      </div>

      {showEditModal && (
        <EditSectionModal
          data={data}
          onClose={() => setShowEditModal(false)}
          onNavigateTo={onNavigateTo}
        />
      )}
    </div>
  );
}
