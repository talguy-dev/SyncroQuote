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

const SERVICE_META = {
  consulting:  { label: 'ייעוץ ותכנון',   qty: 1, unit: 18000 },
  supervision: { label: 'פיקוח בנייה',    qty: 6, unit: 2500  },
  management:  { label: 'ניהול פרויקט',   qty: 2, unit: 3250  },
  bim:         { label: 'ניהול מידע BIM', qty: 1, unit: 6400  },
};

const FONT = '"Assistant", "Arial Hebrew", Arial, Tahoma, sans-serif';
const fmt = (n) => `₪${Number(n).toLocaleString('he-IL')}`;

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
const ThinLine = () => (
  <div style={{ height: '1px', backgroundColor: C.border, margin: '6px 0' }} />
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

// ─── Terms data per service ───────────────────────────────────────────────────
const TERMS_DATA = {
  supervision: {
    subtitle: 'פיקוח מטעם היזם',
    sections: [
      {
        heading: 'פירוט השירותים הכלולים',
        bullets: [
          'פיקוח, תיאום ומעקב אחר עבודות הבנייה.',
          'השלמת התכנון עד קבלת תכניות עבודה מהיועצים ומהקבלנים.',
          'הפעלת מערך הבטחת האיכות ווידוא שהוגדרו בעלי התפקידים הדרושים.',
          'זימון ווידוא ביצוע פיקוח עליון ע"י המתכננים.',
          'בקרה על ביצוע בדיקות מעבדה.',
          'פיקוח הנדסי על טיב עבודות הבנייה שיבוצעו באתר.',
          'הפיקוח יהא לפי קצב ההתקדמות ותכולת הביצוע; בכל מקרה תבוצע פגישה באתר אחת לשבוע.',
          'מעקב אחר התקדמות עבודות הבנייה מול הקבלנ/ים בדרך של קיום ישיבות אתר.',
          'ניהול פניות הקבלנ/ים לקבלת הבהרות בקשר לתוכניות והמפרטים.',
          'בדיקת ואישור חשבונות שיוגשו ע"י הקבלנים.',
          'עריכת חשבונות סופיים.',
        ],
      },
      {
        heading: 'שכר טרחה',
        body: 'בעבור השירותים המפורטים לעיל, שכר הטרחה הנדרש הינו 3.5% (שלושה וחצי אחוזים) מעלויות הפרויקט הכוללות (כולל עלויות התכנון). לסכומים יתווסף מע"מ כחוק.',
      },
      {
        heading: 'אופן תשלום',
        bullets: [
          'חלוקה שווה של שכר הטרחה הכולל לחודשים, בהתאם לאומדן זמני התכנון והביצוע; חשבונית תוגש בסוף כל חודש עבודה.',
          'תשלום שוטף — מתאריך הגשת החשבון.',
          'התשלום החודשי יעודכן בהתאם להתקדמות הפרויקט ולהתכנסות לעלות הפרויקט הכוללת ולמשך הפרויקט.',
        ],
      },
      {
        heading: 'הערות',
        bullets: [
          'כלל היועצים והמתכננים שיידרשו יחתמו על הסכמים מול המזמין ויועסקו על-ידו.',
          'תכניות/העתקות יודפסו על חשבון היזם.',
          'באם הוחלט על סיום התקשרות — יש להודיע חודש מראש.',
          'הקבלן הנבחר יספק מנהל עבודה מוסמך ומהנדסי ביצוע ככל שיידרש בהסכמים.',
          'תכולת העבודה כוללת סיוע בקבלת טופס אכלוס/טופס 4; האחריות לאישורים אלו תהיה של הקבלן.',
        ],
      },
    ],
  },

  consulting: {
    subtitle: 'ייעוץ ותכנון',
    sections: [
      {
        heading: 'תיאום עבודות התכנון לפני הביצוע',
        bullets: [
          'לימוד החומר, הכרת המבנים והתשתיות.',
          'עריכת השוואות הצעות מחיר יועצים ומתכננים וגיוסם לבחירת המזמין.',
          'הכנת לוח זמנים לתכנון הפרויקט ועדכונו מעת לעת בשיתוף עם המזמין.',
          'לאחר תכנון ראשוני וקבלת אומדנים — הכנת אומדן לביצוע הפרויקט ועדכונו מעת לעת.',
          'ניהול התכנון והתיאום בין כלל יועצי ומתכנני הפרויקט, על סמך תכניות שאושרו ע"י המזמין.',
          'דיווחים על התקדמות התכנון למזמין.',
          'ניהול קבלת האישורים הדרושים לצורך קבלת היתרי בנייה.',
        ],
      },
      {
        heading: 'הכנת הצעות והתקשרות עם קבלנים',
        bullets: [
          'הכנת וניהול כתב כמויות ומפרטים טכניים ע"י כמאי והמתכננים.',
          'הכנת רשימת קבלנים פוטנציאליים וניהול סיור קבלנים והפצת חומר המכרז.',
          'ריכוז שאלות הקבלנים ומתן מענה.',
          'ניתוח הצעות הקבלנים ועריכת השוואה למזמין, וליווי המו"מ עד בחירת הקבלן הזוכה.',
        ],
      },
      {
        heading: 'פיקוח, תיאום ומעקב אחר עבודות הבנייה',
        bullets: [
          'השלמת התכנון עד קבלת תכניות עבודה מהיועצים ומהקבלנים.',
          'הפעלת מערך הבטחת האיכות וזימון פיקוח עליון ע"י המתכננים.',
          'בקרה על ביצוע בדיקות מעבדה ופיקוח הנדסי על טיב העבודות באתר.',
          'פגישת אתר אחת לשבוע ומעקב אחר התקדמות מול הקבלנ/ים.',
          'ניהול פניות הקבלנ/ים, בדיקת ואישור חשבונות ועריכת חשבונות סופיים.',
        ],
      },
      {
        heading: 'שכר טרחה',
        body: 'בעבור השירותים המפורטים לעיל, שכר הטרחה הנדרש הינו 3.5% (שלושה וחצי אחוזים) מעלויות הפרויקט הכוללות (כולל עלויות התכנון). לסכומים יתווסף מע"מ כחוק.',
      },
      {
        heading: 'אופן תשלום',
        bullets: [
          'חלוקה שווה של שכר הטרחה הכולל לחודשים, בהתאם לאומדן זמני התכנון והביצוע; חשבונית תוגש בסוף כל חודש עבודה.',
          'תשלום שוטף — מתאריך הגשת החשבון.',
          'התשלום החודשי יעודכן בהתאם להתקדמות הפרויקט ולהתכנסות לעלות הפרויקט הכוללת ולמשך הפרויקט.',
        ],
      },
      {
        heading: 'הערות',
        bullets: [
          'כלל היועצים והמתכננים שיידרשו יחתמו על הסכמים מול המזמין ויועסקו על-ידו.',
          'תכניות/העתקות יודפסו על חשבון היזם.',
          'באם הוחלט על סיום התקשרות — יש להודיע חודש מראש.',
          'הקבלן הנבחר יספק מנהל עבודה מוסמך ומהנדסי ביצוע ככל שיידרש בהסכמים.',
          'תכולת העבודה כוללת סיוע בקבלת טופס אכלוס/טופס 4; האחריות לאישורים אלו תהיה של הקבלן.',
        ],
      },
    ],
  },

  management: {
    subtitle: 'ניהול פרויקט',
    sections: [
      {
        heading: 'ניהול הפרויקט בהיבט הביצועי — ניהול "על"',
        bullets: [
          'למידת התכניות, כתבי הכמויות והמפרטים.',
          'התנהלות מול מזמין העבודה.',
          'ניהול ומעקב לוחות זמנים בשילוב עם מהנדס הביצוע / מנהל העבודה.',
          'ישיבות תיאום מול הצוות הפנימי.',
          'מעקב וליווי אחר חשבונות חלקיים וחשבון סופי.',
          'מתן מענה ופתרונות לבעיות הצפות ממנהלי העבודה / מהנדסי הביצוע בשטח.',
          'התנהלות מול מתכננים.',
          'במידת הצורך — התנהלות מול הרשויות.',
        ],
      },
      {
        heading: 'שכר טרחה',
        body: 'בעבור השירותים המפורטים לעיל, שכר הטרחה הנדרש הינו ______ ₪ לכל חודש שירות. בנוסף לשכר הטרחה החודשי הקבוע — תוספת בגובה 5% מכל חשבון חריגים שיאושר. לסכומים יתווסף מע"מ כחוק.',
      },
      {
        heading: 'אופן תשלום',
        bullets: [
          'חשבונית תישלח בכל 1 לחודש עבור אותו חודש ביצוע.',
          'התשלום יבוצע במתכונת שוטף — מתאריך החשבונית.',
        ],
      },
      {
        heading: 'הערות',
        bullets: [
          'באם הוחלט על סיום התקשרות, ע"י מי מהצדדים — יש להודיע חודש מראש.',
          'נוכחות באתר תהיה לפי צורך; בכל מקרה לא מדובר בשהייה קבועה באתר.',
          'כמאים, מתכנני לוחות זמנים ושאר יועצים חיצוניים ימומנו ע"י המזמין.',
          'ביטוחים, חתימות, ערבויות וסידורי בטיחות באתר יהיו באחריות המזמין.',
          'אין בהצעת מחיר זו לקיחת אחריות בכל הקשור לעיכובים / קנסות.',
          'המזמין יספק מנהלי עבודה, מהנדסי ביצוע וכו\'.',
        ],
      },
    ],
  },
};

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
    <div style={{ pageBreakBefore: 'always', ...PAGE, minHeight: '1123px' }}>
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

// ─── Terms section block (break-inside: avoid) ────────────────────────────────
function TermsSection({ section }) {
  return (
    <div
      style={{
        marginBottom: '16px',
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      <SectionLabel>{section.heading}</SectionLabel>
      {section.body && (
        <p style={{ fontSize: '10.5px', color: C.charcoal, lineHeight: '1.75', margin: 0 }}>
          {section.body}
        </p>
      )}
      {section.bullets && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {section.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                fontSize: '10.5px',
                color: C.charcoal,
                lineHeight: '1.75',
                paddingRight: '16px',
                position: 'relative',
              }}
            >
              <span style={{ position: 'absolute', right: 0, color: C.blue, fontWeight: '700' }}>•</span>
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Two signature lines ──────────────────────────────────────────────────────
function SignatureLines() {
  const lineStyle = {
    borderBottom: `1.5px solid ${C.charcoal}`,
    height: '40px',
    marginBottom: '8px',
  };
  const labelStyle = {
    textAlign: 'center',
    fontSize: '10px',
    color: C.gray,
    fontWeight: '600',
  };
  return (
    <div
      style={{
        marginTop: '48px',
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '28px' }}>
        <div style={{ display: 'flex', gap: '60px' }}>
          {/* right: client */}
          <div style={{ flex: 1 }}>
            <div style={lineStyle} />
            <div style={labelStyle}>חתימת הלקוח</div>
          </div>
          {/* left: engineer */}
          <div style={{ flex: 1 }}>
            <div style={lineStyle} />
            <div style={labelStyle}>מהנדס טל אביגדורי</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Single terms page per service ───────────────────────────────────────────
function TermsPage({ serviceId }) {
  const terms = TERMS_DATA[serviceId];
  if (!terms) return null;
  return (
    <div style={{ pageBreakBefore: 'always', ...PAGE, minHeight: '1123px' }}>
      <PageHeader title="תנאי השירות" subtitle={terms.subtitle} />
      <BlueLine />
      {terms.sections.map((section) => (
        <TermsSection key={section.heading} section={section} />
      ))}
      <SignatureLines />
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
const QuotePDFTemplate = forwardRef(function QuotePDFTemplate(
  { data, quoteId, dateStr, validUntilStr },
  ref,
) {
  const selectedServices = data.selectedServices || [];

  const rows = selectedServices
    .map((id) => {
      const m = SERVICE_META[id];
      if (!m) return null;
      return { id, label: m.label, qty: m.qty, unit: m.unit, total: m.qty * m.unit };
    })
    .filter(Boolean);

  const subtotal   = rows.reduce((s, r) => s + r.total, 0);
  const vat        = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + vat;

  const projectDisplay = [
    data.projectType === 'אחר' && data.projectTypeOther
      ? `אחר: ${data.projectTypeOther}`
      : data.projectType,
    data.location,
    data.size ? `${data.size} מ"ר` : null,
    data.projectStage ? `שלב: ${data.projectStage}` : null,
  ]
    .filter(Boolean)
    .join(' | ');

  const termsServices = selectedServices.filter((id) => TERMS_DATA[id]);

  return (
    <div ref={ref} dir="rtl" style={{ fontFamily: FONT, backgroundColor: C.white }}>

      {/* ══════════════════════════════════ PAGE 1 — QUOTE ══════════════════════════════════ */}
      <div style={{ ...PAGE, minHeight: '1123px' }}>

        <PageHeader title="הצעת מחיר" quoteId={quoteId} />
        <BlueLine />

        {/* Info row */}
        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden', marginBottom: '6px' }}>
          {[
            { label: 'תאריך:', value: dateStr },
            { label: 'בתוקף עד:', value: validUntilStr },
            { label: 'שם / מספר לקוח:', value: `${data.fullName || ''} | ${data.company || ''}` },
          ].map((cell, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: '7px 12px',
                borderRight: i < 2 ? `1px solid ${C.border}` : 'none',
              }}
            >
              <span style={{ fontWeight: '700', fontSize: '10px' }}>{cell.label} </span>
              <span style={{ fontSize: '10px', color: C.gray }}>{cell.value}</span>
            </div>
          ))}
        </div>

        {/* Description row */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '7px 12px', marginBottom: '14px' }}>
          <span style={{ fontWeight: '700', fontSize: '10px' }}>שם חלקות / תיאור: </span>
          <span style={{ fontSize: '10px', color: C.gray }}>{projectDisplay}</span>
        </div>

        {/* Two-column section */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
          <div style={{ flex: '68' }}>
            <SectionLabel>לקוח יקר,</SectionLabel>
            <p style={{ fontSize: '10.5px', color: C.charcoal, lineHeight: '1.75', margin: 0 }}>
              תודה על פנייתכם. להלן הצעת מחיר עבור שירותי ניהול ובקרת הפרויקט באמצעות מערכת
              Syncro — ליווי מלא, מודלי BIM ואוטומציה של לוחות הזמנים, בהתאמה לצרכי הפרויקט
              שלכם. תנאי כל שירות הכלול בהצעה מפורטים בעמודים הנלווים.
            </p>
          </div>
          <div
            style={{
              flex: '32',
              backgroundColor: C.lightGray,
              borderRadius: '8px',
              padding: '12px',
              fontSize: '10px',
            }}
          >
            <div style={{ fontWeight: '700', color: C.charcoal, marginBottom: '3px' }}>
              Syncro — Engineering Intelligence
            </div>
            <div style={{ color: C.gray }}>מבית Talguy Group</div>
            <div style={{ color: C.gray }}>03-0000000 | 00-0000000</div>
            <div style={{ color: C.gray }}>hello@syncro.co.il</div>
            <div style={{ color: C.gray, marginBottom: '8px' }}>syncro.co.il</div>
            <ThinLine />
            <div style={{ fontWeight: '700', color: C.charcoal, margin: '8px 0 3px' }}>לכבוד:</div>
            <div style={{ color: C.charcoal }}>{data.fullName}</div>
            <div style={{ color: C.gray }}>{data.company}</div>
            <div style={{ color: C.gray }}>{data.phone}</div>
            <div style={{ color: C.gray }}>{data.email}</div>
          </div>
        </div>

        {/* Orange banner */}
        <div
          style={{
            backgroundColor: C.orange,
            color: C.white,
            textAlign: 'center',
            padding: '9px 16px',
            borderRadius: '6px',
            marginBottom: '18px',
            fontWeight: '700',
            fontSize: '11px',
          }}
        >
          צוות הנדסת השירותים, הפרויקטים וכלכלת הבנייה של Syncro
        </div>

        {/* Services table */}
        <SectionLabel>פירוט שירותים</SectionLabel>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px', marginBottom: '18px' }}>
          <thead>
            <tr style={{ backgroundColor: C.charcoal, color: C.white }}>
              {['תיאור השירות', 'כמות', 'מחיר ליחידה', 'סה"כ'].map((h, i) => (
                <th
                  key={h}
                  style={{ padding: '8px 10px', fontWeight: '700', textAlign: i === 0 ? 'right' : 'center' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} style={{ backgroundColor: i % 2 === 0 ? C.white : C.lightGray }}>
                <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '600', borderBottom: `1px solid ${C.border}` }}>
                  {row.label}
                </td>
                <td style={{ padding: '8px 10px', textAlign: 'center', borderBottom: `1px solid ${C.border}` }}>
                  {row.qty}
                </td>
                <td style={{ padding: '8px 10px', textAlign: 'center', borderBottom: `1px solid ${C.border}` }}>
                  {fmt(row.unit)}
                </td>
                <td style={{ padding: '8px 10px', textAlign: 'center', borderBottom: `1px solid ${C.border}`, fontWeight: '600' }}>
                  {fmt(row.total)}
                </td>
              </tr>
            ))}
            <tr style={{ backgroundColor: C.blueBg }}>
              <td colSpan={3} style={{ padding: '8px 10px', textAlign: 'right', fontWeight: '700' }}>
                סה"כ לפני מע"מ
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'center', fontWeight: '700', color: C.blue }}>
                {fmt(subtotal)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totals + payment */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ width: '230px', flexShrink: 0 }}>
            {[
              { label: 'הנחה', pct: '0%', val: fmt(0) + ' -' },
              { label: 'מע"מ (18%)', pct: '18%', val: fmt(vat) },
            ].map((r) => (
              <div
                key={r.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px 8px',
                  borderBottom: `1px solid ${C.border}`,
                  fontSize: '10.5px',
                }}
              >
                <span style={{ color: C.gray, direction: 'ltr' }}>{r.val}</span>
                <span style={{ color: C.gray, flex: 1, textAlign: 'center' }}>{r.pct}</span>
                <span style={{ fontWeight: '600' }}>{r.label}</span>
              </div>
            ))}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '9px 10px',
                backgroundColor: C.orange,
                borderRadius: '6px',
                marginTop: '5px',
              }}
            >
              <span style={{ fontWeight: '800', color: C.white, fontSize: '13px', direction: 'ltr' }}>
                {fmt(grandTotal)}
              </span>
              <span style={{ fontWeight: '700', color: C.white, fontSize: '11px' }}>סה"כ לתשלום</span>
            </div>
          </div>

          <div style={{ flex: 1, fontSize: '10.5px' }}>
            <SectionLabel>תנאי תשלום</SectionLabel>
            <p style={{ color: C.gray, lineHeight: '1.75', margin: '0 0 10px' }}>
              30% מקדמה עם אישור ההצעה · 40% בתחילת העבודה · 30% בסיום ומסירה.
              <br />
              תנאי תשלום: שוטף + 30.
            </p>
            <SectionLabel>הערות</SectionLabel>
            <p style={{ color: C.gray, lineHeight: '1.75', margin: 0 }}>
              המחירים אינם כוללים מע"מ אלא אם צוין אחרת.
              <br />
              ההצעה בתוקף ל-30 יום ממועד הוצאתה.
            </p>
          </div>
        </div>

        {/* Page 1 footer / signature area */}
        <div style={{ marginTop: '10px', borderTop: `2px solid ${C.charcoal}`, paddingTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
            <div>
              <div style={{ color: C.gray }}>syncro.co.il · hello@syncro.co.il · 03-0000000</div>
              <div style={{ fontWeight: '700', marginTop: '3px' }}>בכבוד רב, צוות Syncro</div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: C.gray }}>SYNCRO · A TALGUY GROUP COMPANY</div>
              <div style={{ fontWeight: '700', marginTop: '3px' }}>חתימת הלקוח · אישור ההצעה</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <div
              style={{
                width: '200px',
                borderBottom: `1px solid ${C.charcoal}`,
                paddingBottom: '2px',
                textAlign: 'center',
                fontSize: '9px',
                color: C.gray,
              }}
            >
              חתימה ותאריך
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════ SUMMARY PAGE — collected form data ══════════════════════════════════ */}
      <SummaryPage data={data} />

      {/* ══════════════════════════════════ TERMS PAGES — one per service ══════════════════════════════════ */}
      {termsServices.map((id) => (
        <TermsPage key={id} serviceId={id} />
      ))}
    </div>
  );
});

export default QuotePDFTemplate;
