import { forwardRef } from 'react';

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

// ─── Shared page shell ────────────────────────────────────────────────────────
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

const SectionLabel = ({ children }) => (
  <div style={{ fontWeight: '700', color: C.blue, fontSize: '11.5px', marginBottom: '6px' }}>
    {children}
  </div>
);

// ─── Page header (reused on terms page) ──────────────────────────────────────
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

// ─── Terms content (two pages) ───────────────────────────────────────────────
const TERMS_SECTIONS = [
  {
    heading: 'פירוט השירותים הכלולים:',
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
    heading: 'תנאי השירות — פיקוח מטעם היזם',
    body: 'בעבור השירותים המפורטים לעיל, שכר הטרחה הנדרש הינו 3.5% מעלויות הפרויקט הכוללות. חלוקה שווה של שכר הטרחה הכולל לחודשים; חשבונית תוגש בסוף כל חודש עבודה. תשלום שוטף.',
  },
  {
    heading: 'הערות',
    bullets: [
      'כלל היועצים והמתכננים שיידרשו יחתמו על הסכמים מול המזמין ויועסקו על-ידו.',
      'תכניות/העתקות יודפסו על חשבון היזם.',
      'באם הוחלט על סיום התקשרות — יש להודיע חודש מראש.',
      'הקבלן הנבחר יספק מנהל עבודה מוסמך ומהנדסי ביצוע.',
      'תכולת העבודה כוללת סיוע בקבלת טופס אכלוס/טופס 4; האחריות לאישורים אלו תהיה של הקבלן.',
    ],
  },
];

function TermsContent() {
  return (
    <>
      {TERMS_SECTIONS.map((s) => (
        <div key={s.heading} style={{ marginBottom: '18px' }}>
          <SectionLabel>{s.heading}</SectionLabel>
          {s.body && (
            <p style={{ fontSize: '10.5px', color: C.charcoal, lineHeight: '1.75', margin: 0 }}>
              {s.body}
            </p>
          )}
          {s.bullets && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {s.bullets.map((b, i) => (
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
      ))}
    </>
  );
}

function PageFooter({ right, left }) {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '8px', marginTop: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: C.gray }}>
        <span>{left}</span>
        <span>{right}</span>
      </div>
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

  return (
    <div ref={ref} dir="rtl" style={{ fontFamily: FONT, backgroundColor: C.white }}>

      {/* ══════════════════════════════════ PAGE 1 — QUOTE ══════════════════════════════════ */}
      <div style={{ ...PAGE, minHeight: '1123px' }}>

        {/* Header */}
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
          {/* Right 68%: opening text */}
          <div style={{ flex: '68' }}>
            <SectionLabel>לקוח יקר,</SectionLabel>
            <p style={{ fontSize: '10.5px', color: C.charcoal, lineHeight: '1.75', margin: 0 }}>
              תודה על פנייתכם. להלן הצעת מחיר עבור שירותי ניהול ובקרת הפרויקט באמצעות מערכת
              Syncro — ליווי מלא, מודלי BIM ואוטומציה של לוחות הזמנים, בהתאמה לצרכי הפרויקט
              שלכם. תנאי כל שירות הכלול בהצעה מפורטים בעמודים הנלווים.
            </p>
          </div>
          {/* Left 32%: company + client */}
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
        <table
          style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px', marginBottom: '18px' }}
        >
          <thead>
            <tr style={{ backgroundColor: C.charcoal, color: C.white }}>
              {['תיאור השירות', 'כמות', 'מחיר ליחידה', 'סה"כ'].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: '8px 10px',
                    fontWeight: '700',
                    textAlign: i === 0 ? 'right' : 'center',
                  }}
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
            {/* Subtotal row */}
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
          {/* Totals block */}
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

          {/* Payment terms */}
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

        {/* Signature */}
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

      {/* ══════════════════════════════════ PAGE 2 — TERMS ══════════════════════════════════ */}
      <div style={{ pageBreakBefore: 'always', ...PAGE, minHeight: '1123px' }}>
        <PageHeader title="תנאי השירות" subtitle="TERMS OF SERVICE" />
        <BlueLine />
        <TermsContent />
        <PageFooter
          right="syncro.co.il · hello@syncro.co.il · 03-0000000"
          left="SYNCRO · A TALGUY GROUP COMPANY"
        />
      </div>
    </div>
  );
});

export default QuotePDFTemplate;
