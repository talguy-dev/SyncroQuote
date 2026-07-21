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
      <span className="text-xs font-medium text-right" style={{ color: '#0D1B2A' }}>
        {value || '—'}
      </span>
    </div>
  );
}

const SERVICE_COLORS = {
  consulting:  { bg: '#FEF3E2', text: '#E8931A' },
  supervision: { bg: '#FEF3E2', text: '#E8931A' },
  management:  { bg: '#F4F3EE', text: '#0D1B2A' },
  bim:         { bg: '#F4F3EE', text: '#0D1B2A' },
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
        <div style={{ width: '40px', height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px', margin: '0 auto 18px' }} />

        <p style={{ fontWeight: '700', fontSize: '15px', color: '#0D1B2A', marginBottom: '14px', textAlign: 'right' }}>
          באיזה חלק תרצו לערוך?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

          <button
            onClick={() => handleSelect('services')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '13px 14px', borderRadius: '12px',
              border: '1.5px solid #E8931A', backgroundColor: '#FEF3E2',
              cursor: 'pointer', width: '100%', textAlign: 'right',
            }}
          >
            <span style={{ fontSize: '18px' }}>📌</span>
            <span style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: '#E8931A', textAlign: 'right' }}>
              בחירת שירותים אחרים
            </span>
          </button>

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
                      <span style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: colors.text || '#0D1B2A', textAlign: 'right' }}>
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
        style={{ backgroundColor: '#fff', boxShadow: '0 1px 8px rgba(13,27,42,0.07)', border: '1px solid rgba(13,27,42,0.1)', padding: '16px' }}
      >
        <p className="text-xs font-bold mb-2" style={{ color: '#0D1B2A' }}>פרטים כלליים</p>
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
            style={{ backgroundColor: '#fff', boxShadow: '0 1px 8px rgba(13,27,42,0.07)', border: '1px solid rgba(13,27,42,0.1)', padding: '16px' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span>{SERVICE_ICONS[svcId]}</span>
              <p className="text-xs font-bold" style={{ color: colors.text }}>
                {svc?.label}
              </p>
            </div>

            {questions.map((q) => {
              const raw = answers[q.id];
              const otherTxt = answers[`${q.id}_other`] || '';
              return (
                <Row
                  key={q.id}
                  label={q.question.length > 30 ? q.question.slice(0, 30) + '…' : q.question}
                  value={displayAnswer(raw, otherTxt)}
                />
              );
            })}
          </div>
        );
      })}

      {/* ── קבצים מצורפים ── */}
      {(data.attachments || []).length > 0 && (
        <div
          className="rounded-2xl mb-3"
          style={{ backgroundColor: '#fff', boxShadow: '0 1px 8px rgba(13,27,42,0.07)', border: '1px solid rgba(13,27,42,0.1)', padding: '16px' }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: '#0D1B2A' }}>קבצים מצורפים</p>
          {data.attachments.map((file, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5" style={{ borderBottom: i < data.attachments.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2.5A1.5 1.5 0 013.5 1h5.086A1.5 1.5 0 019.647 1.44l2.914 2.914A1.5 1.5 0 0113 5.414V11.5A1.5 1.5 0 0111.5 13h-8A1.5 1.5 0 012 11.5v-9z" stroke="#9ca3af" strokeWidth="1.2"/>
              </svg>
              <span className="text-xs" style={{ color: '#6b7280' }}>{file.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── שדות חסרים ── */}
      {hasMissing && (
        <div
          className="rounded-2xl mb-3 p-4"
          style={{ backgroundColor: '#fff5f5', border: '1px solid #fecaca' }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: '#dc2626' }}>⚠️ שדות חסרים:</p>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((m) => (
              <span key={m} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── אישור ── */}
      <div
        className="rounded-2xl mb-3 p-4"
        style={{ backgroundColor: '#fff', border: '1px solid rgba(13,27,42,0.1)', boxShadow: '0 1px 8px rgba(13,27,42,0.07)' }}
      >
        <p className="text-sm font-semibold mb-3" style={{ color: '#0D1B2A' }}>
          האם כל הפרטים תקינים?
        </p>
        <div className="flex gap-2">
          <button
            onClick={onGenerate}
            disabled={hasMissing}
            className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
            style={{
              backgroundColor: hasMissing ? '#e5e7eb' : '#E8931A',
              color: hasMissing ? '#9ca3af' : '#fff',
              cursor: hasMissing ? 'not-allowed' : 'pointer',
              minHeight: '48px',
              boxShadow: hasMissing ? 'none' : '0 4px 14px rgba(232,147,26,0.3)',
              border: 'none',
            }}
          >
            כן, הכל תקין ✓
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              border: '2px solid #e2e5ed',
              backgroundColor: '#fff',
              color: '#374151',
              minHeight: '48px',
              cursor: 'pointer',
            }}
          >
            יש לתקן
          </button>
        </div>
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
