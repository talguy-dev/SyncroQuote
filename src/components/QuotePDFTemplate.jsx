import { forwardRef } from 'react';
import { SERVICES, SERVICE_QUESTIONS } from '../data/flowConfig';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  blue:      '#4175fc',
  charcoal:  '#101218',
  gray:      '#6b7280',
  lightGray: '#f3f4f6',
  border:    '#e5e7eb',
  orange:    '#f97316',
  white:     '#ffffff',
  blueBg:    '#f0f4ff',
};

const FONT = '"Assistant", "Arial Hebrew", Arial, Tahoma, sans-serif';

const PAGE = {
  width: '794px',
  backgroundColor: C.white,
  fontFamily: FONT,
  direction: 'rtl',
  color: C.charcoal,
  boxSizing: 'border-box',
  padding: '36px 44px',
  fontSize: '11px',
  lineHeight: '1.6',
  position: 'relative',
};

// ─── Mini helpers ─────────────────────────────────────────────────────────────
const BlueLine = () => (
  <div style={{ height: '2px', backgroundColor: C.blue, margin: '10px 0 14px' }} />
);

const SectionLabel = ({ children, color }) => (
  <div style={{ fontWeight: '700', color: color || C.blue, fontSize: '11.5px', marginBottom: '6px' }}>
    {children}
  </div>
);

// ─── Page header ─────────────────────────────────────────────────────────────
function PageHeader({ title, subtitle, quoteId }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: '30px', fontWeight: '800', color: C.charcoal, lineHeight: 1.1 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: '11px', color: C.gray, letterSpacing: '1px', marginTop: '2px' }}>
            {subtitle}
          </div>
        )}
        {quoteId && (
          <div style={{ fontSize: '11px', color: C.gray, marginTop: '3px' }}>{quoteId}</div>
        )}
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '19px', fontWeight: '800', color: C.blue, letterSpacing: '2px' }}>
          SYNCRO
        </div>
        <div style={{ fontSize: '8.5px', color: C.gray, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Engineering Intelligence
        </div>
      </div>
    </div>
  );
}

// ─── Summary page helpers ─────────────────────────────────────────────────────
const SUMMARY_SERVICE_COLORS = {
  consulting:  { text: '#4175fc', bg: '#f0f4ff' },
  supervision: { text: '#f97316', bg: '#fff7ed' },
  management:  { text: '#16a34a', bg: '#f0fdf4' },
  bim:         { text: '#9333ea', bg: '#faf5ff' },
};
const SUMMARY_SERVICE_ICONS = {
  consulting: '🏗️', supervision: '🔍', management: '📋', bim: '🧊',
};

function resolveAnswer(answer, otherText) {
  if (!answer && answer !== 0) return '—';
  if (typeof answer === 'object' && answer.option) {
    return answer.text ? `${answer.option}: ${answer.text}` : answer.option;
  }
  if (answer === 'אחר' && otherText) return `אחר: ${otherText}`;
  return String(answer);
}

function SummaryTable({ rows, headerBg, headerText }) {
  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '10px',
        marginBottom: '14px',
        border: `1px solid ${C.border}`,
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            style={{ backgroundColor: i % 2 === 0 ? C.white : C.lightGray }}
          >
            <td
              style={{
                padding: '7px 11px',
                fontWeight: '700',
                color: headerText || C.blue,
                width: '42%',
                textAlign: 'right',
                borderBottom: `1px solid ${C.border}`,
                borderLeft: `1px solid ${C.border}`,
                backgroundColor: i % 2 === 0 ? (headerBg || C.blueBg) : undefined,
              }}
            >
              {row.label}
            </td>
            <td
              style={{
                padding: '7px 11px',
                color: C.charcoal,
                borderBottom: `1px solid ${C.border}`,
                textAlign: 'right',
              }}
            >
              {row.value || '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SummaryPage({ data }) {
  const answers       = data.serviceAnswers  || {};
  const selectedSvcs  = data.selectedServices || [];

  const projectTypeDisplay =
    data.projectType === 'אחר' && data.projectTypeOther
      ? `אחר: ${data.projectTypeOther}`
      : data.projectType;

  const serviceLabels = selectedSvcs
    .map((id) => SERVICES.find((s) => s.id === id)?.label || id)
    .join(' · ');

  const generalRows = [
    { label: 'שם',           value: data.fullName },
    { label: 'חברה',         value: data.company },
    { label: 'טלפון',        value: data.phone },
    { label: 'אימייל',       value: data.email },
    { label: 'סוג פרויקט',  value: projectTypeDisplay },
    { label: 'מיקום',        value: data.location },
    { label: 'גודל (מ"ר)',  value: data.size },
    { label: 'שלב פרויקט',  value: data.projectStage },
    { label: 'שירותים',      value: serviceLabels },
  ];

  return (
    <div style={{ ...PAGE, minHeight: '1123px' }}>
      <PageHeader title="סיכום שאלון" subtitle="פרטי הפרויקט שנאספו" />
      <BlueLine />

      {/* פרטים כלליים */}
      <SectionLabel>פרטים כלליים</SectionLabel>
      <SummaryTable rows={generalRows} />

      {/* שאלות לפי שירות */}
      {selectedSvcs
        .filter((id) => (SERVICE_QUESTIONS[id] || []).length > 0)
        .map((svcId) => {
          const svc     = SERVICES.find((s) => s.id === svcId);
          const qs      = SERVICE_QUESTIONS[svcId] || [];
          const colors  = SUMMARY_SERVICE_COLORS[svcId] || {};
          const icon    = SUMMARY_SERVICE_ICONS[svcId]   || '';

          const rows = qs.map((q) => ({
            label: q.question,
            value: resolveAnswer(answers[q.id], answers[`${q.id}_other`] || ''),
          }));

          return (
            <div key={svcId} style={{ marginBottom: '6px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                <span style={{ fontSize: '13px' }}>{icon}</span>
                <SectionLabel color={colors.text}>{svc?.label || svcId}</SectionLabel>
              </div>
              <SummaryTable
                rows={rows}
                headerBg={colors.bg}
                headerText={colors.text}
              />
            </div>
          );
        })}
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
const QuotePDFTemplate = forwardRef(function QuotePDFTemplate({ data }, ref) {
  return (
    <div ref={ref} dir="rtl" style={{ fontFamily: FONT, backgroundColor: C.white }}>
      <SummaryPage data={data} />
    </div>
  );
});

export default QuotePDFTemplate;
