import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, AlignmentType, WidthType, BorderStyle, ShadingType,
  TableLayoutType, PageBreak,
} from 'docx';
import { saveAs } from 'file-saver';
import { SERVICE_PRICES } from '../data/flowConfig';

// ─── Constants ────────────────────────────────────────────────────────────────
const RTL = true;

const COLOR = {
  orange:   'F97316',
  blue:     '4175fc',
  charcoal: '101218',
  gray:     '6B7280',
  lightBg:  'F3F4F6',
  border:   'E5E7EB',
  white:    'ffffff',
};

// ─── Service definitions (prices from PDF, qty/unit per spec) ─────────────────
const SERVICE_META = {
  consulting:  { label: 'ייעוץ ותכנון',    qty: 1, unit: 18000 },
  supervision: { label: 'פיקוח בנייה',     qty: 6, unit: 2500  },
  management:  { label: 'ניהול פרויקט',    qty: 2, unit: 3250  },
  bim:         { label: 'ניהול מידע BIM',  qty: 1, unit: 6400  },
};

// ─── Helper: no-border spec ───────────────────────────────────────────────────
const NO_BORDER = {
  top:    { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left:   { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right:  { style: BorderStyle.NONE, size: 0, color: 'auto' },
};

const THIN_BORDER = {
  top:    { style: BorderStyle.SINGLE, size: 4, color: COLOR.border },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR.border },
  left:   { style: BorderStyle.SINGLE, size: 4, color: COLOR.border },
  right:  { style: BorderStyle.SINGLE, size: 4, color: COLOR.border },
};

// ─── Primitive helpers ────────────────────────────────────────────────────────
const run = (text, opts = {}) =>
  new TextRun({ text, rtl: RTL, ...opts });

const boldRun = (text, size = 24, color = COLOR.charcoal) =>
  run(text, { bold: true, size, color });

const grayRun = (text, size = 18) =>
  run(text, { size, color: COLOR.gray });

// Single-run paragraph helper
const p = (children, align = AlignmentType.RIGHT, spacing = 120) =>
  new Paragraph({
    children: Array.isArray(children) ? children : [children],
    alignment: align,
    bidirectional: true,
    spacing: { after: spacing },
  });

const emptyPara = (after = 120) =>
  new Paragraph({ bidirectional: true, spacing: { after } });

// ─── PAGE 1, SECTION 1 — Top header table ────────────────────────────────────
function buildPageHeader(quoteId) {
  return new Table({
    rows: [
      new TableRow({
        children: [
          // LEFT cell (in RTL doc layout = visually left): SYNCRO logo
          new TableCell({
            borders: NO_BORDER,
            width: { size: 35, type: WidthType.PERCENTAGE },
            shading: { fill: COLOR.white, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 120 },
            children: [
              p(
                [run('SYNCRO', { bold: true, size: 36, color: COLOR.blue })],
                AlignmentType.LEFT,
                40
              ),
              p(
                [run('ENGINEERING INTELLIGENCE', { size: 16, color: COLOR.gray, allCaps: true })],
                AlignmentType.LEFT,
                0
              ),
            ],
          }),
          // RIGHT cell (in RTL doc layout = visually right): quote title
          new TableCell({
            borders: NO_BORDER,
            width: { size: 65, type: WidthType.PERCENTAGE },
            shading: { fill: COLOR.white, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 120, right: 200 },
            children: [
              p(
                [boldRun('הצעת מחיר', 56, COLOR.charcoal)],
                AlignmentType.RIGHT,
                40
              ),
              p(
                [run(quoteId, { size: 20, color: COLOR.gray })],
                AlignmentType.RIGHT,
                0
              ),
            ],
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: NO_BORDER,
  });
}

// ─── PAGE 1, SECTION 2 — Info row (3 cols) ───────────────────────────────────
function buildInfoRow(dateStr, validUntilStr, clientName) {
  const infoCell = (label, value) =>
    new TableCell({
      borders: THIN_BORDER,
      width: { size: 33, type: WidthType.PERCENTAGE },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [
        p(
          [run(label, { bold: true, size: 20, color: COLOR.charcoal }), run(value, { size: 20, color: COLOR.gray })],
          AlignmentType.RIGHT,
          0
        ),
      ],
    });

  return new Table({
    rows: [
      new TableRow({
        children: [
          // Visually right → left in RTL: date | valid | client
          infoCell('תאריך: ', dateStr),
          infoCell('בתוקף עד: ', validUntilStr),
          infoCell('שם / ת.ז / מספר לקוח: ', clientName),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
  });
}

// ─── PAGE 1, SECTION 3 — Description row ─────────────────────────────────────
function buildDescriptionRow(formData) {
  const value = [
    formData.projectType,
    formData.location,
    formData.size ? `${formData.size} מ"ר` : '',
    formData.projectStage ? `שלב: ${formData.projectStage}` : '',
  ]
    .filter(Boolean)
    .join(' | ');

  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: THIN_BORDER,
            width: { size: 100, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 100, left: 140, right: 140 },
            children: [
              p(
                [
                  run('שם חלקות / תיאור: ', { bold: true, size: 20, color: COLOR.charcoal }),
                  run(value, { size: 20, color: COLOR.gray }),
                ],
                AlignmentType.RIGHT,
                0
              ),
            ],
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
  });
}

// ─── PAGE 1, SECTION 4 — Two-column section ──────────────────────────────────
function buildTwoColumnSection(formData) {
  const OPENING_TEXT =
    'תודה על פנייתכם. להלן הצעת מחיר עבור שירותי ניהול ובקרת הפרויקט באמצעות מערכת Syncro - ליווי מלא, מודלי BIM ואוטומציה של לוחות הזמנים, בהתאמה לצרכי הפרויקט שלכם. תנאי כל שירות הכלול בהצעה מפורטים בעמודים הנלווים.';

  const companyInfoChildren = [
    p([run('Syncro — Engineering Intelligence', { bold: true, size: 20, color: COLOR.charcoal })], AlignmentType.RIGHT, 60),
    p([run('מבית Talguy Group', { size: 18, color: COLOR.gray })], AlignmentType.RIGHT, 60),
    p([run('03-0000000 | 00-0000000', { size: 18, color: COLOR.gray })], AlignmentType.RIGHT, 40),
    p([run('hello@syncro.co.il', { size: 18, color: COLOR.gray })], AlignmentType.RIGHT, 40),
    p([run('syncro.co.il', { size: 18, color: COLOR.gray })], AlignmentType.RIGHT, 120),
    p([run(`לכבוד: ${formData.fullName || ''}`, { size: 20, color: COLOR.charcoal })], AlignmentType.RIGHT, 40),
    p([run(formData.company || '', { size: 18, color: COLOR.gray })], AlignmentType.RIGHT, 40),
    p([run(formData.phone || '', { size: 18, color: COLOR.gray })], AlignmentType.RIGHT, 40),
    p([run(formData.email || '', { size: 18, color: COLOR.gray })], AlignmentType.RIGHT, 0),
  ];

  return new Table({
    rows: [
      new TableRow({
        children: [
          // LEFT (info sidebar)
          new TableCell({
            borders: NO_BORDER,
            width: { size: 30, type: WidthType.PERCENTAGE },
            shading: { fill: 'F9FAFB', type: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 180, right: 180 },
            children: companyInfoChildren,
          }),
          // RIGHT (opening text)
          new TableCell({
            borders: NO_BORDER,
            width: { size: 70, type: WidthType.PERCENTAGE },
            margins: { top: 160, bottom: 160, left: 180, right: 180 },
            children: [
              p([run(OPENING_TEXT, { size: 20, color: COLOR.charcoal })], AlignmentType.RIGHT, 0),
            ],
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: NO_BORDER,
  });
}

// ─── PAGE 1, SECTION 5 — Orange banner ───────────────────────────────────────
function buildOrangeBanner() {
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: NO_BORDER,
            width: { size: 100, type: WidthType.PERCENTAGE },
            shading: { fill: COLOR.orange, type: ShadingType.CLEAR },
            margins: { top: 140, bottom: 140, left: 200, right: 200 },
            children: [
              p(
                [run('צוות הנדסת השירותים, הפרויקטים וכלכלת הבנייה של Syncro', { bold: true, size: 22, color: COLOR.white })],
                AlignmentType.CENTER,
                0
              ),
            ],
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
  });
}

// ─── PAGE 1, SECTION 6 — Services table ──────────────────────────────────────
function buildServicesTable(selectedServices) {
  // Header row — charcoal background, white text
  const HEADERS = ['תיאור השירות', 'כמות', 'מחיר ליחידה', 'סה"כ'];
  const COL_WIDTHS = [40, 15, 22, 23]; // percentages

  const headerRow = new TableRow({
    tableHeader: true,
    children: HEADERS.map((txt, i) =>
      new TableCell({
        borders: NO_BORDER,
        width: { size: COL_WIDTHS[i], type: WidthType.PERCENTAGE },
        shading: { fill: COLOR.charcoal, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 140, right: 140 },
        children: [
          p([run(txt, { bold: true, size: 20, color: COLOR.white })], AlignmentType.CENTER, 0),
        ],
      })
    ),
  });

  let subtotal = 0;

  const dataRows = selectedServices.map((svc, idx) => {
    const meta  = SERVICE_META[svc] || { label: svc, qty: 1, unit: SERVICE_PRICES[svc] || 0 };
    const total = meta.qty * meta.unit;
    subtotal   += total;
    const rowFill = idx % 2 === 1 ? 'F9FAFB' : COLOR.white;

    const makeCell = (text, align = AlignmentType.CENTER, bold = false) =>
      new TableCell({
        borders: THIN_BORDER,
        shading: { fill: rowFill, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p([run(text, { size: 20, bold, color: COLOR.charcoal })], align, 0)],
      });

    return new TableRow({
      children: [
        makeCell(meta.label, AlignmentType.RIGHT, true),
        makeCell(String(meta.qty)),
        makeCell(`₪${meta.unit.toLocaleString('he-IL')}`),
        makeCell(`₪${total.toLocaleString('he-IL')}`),
      ],
    });
  });

  // Subtotal row
  const subtotalRow = new TableRow({
    children: [
      new TableCell({
        borders: THIN_BORDER,
        columnSpan: 3,
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p([run('סה"כ לפני מע"מ', { bold: true, size: 20, color: COLOR.charcoal })], AlignmentType.RIGHT, 0)],
      }),
      new TableCell({
        borders: THIN_BORDER,
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p([run(`₪${subtotal.toLocaleString('he-IL')}`, { bold: true, size: 20, color: COLOR.charcoal })], AlignmentType.CENTER, 0)],
      }),
    ],
  });

  return { table: new Table({
    rows: [headerRow, ...dataRows, subtotalRow],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    bidirectional: true,
  }), subtotal };
}

// ─── PAGE 2, SECTION 1 — Totals table ────────────────────────────────────────
function buildTotalsTable(subtotal) {
  const vat   = Math.round(subtotal * 0.18);
  const final = subtotal + vat;

  const rows = [
    { label: 'הנחה',        pct: '0%',  amount: `₪0-`,                          orange: false },
    { label: 'מע"מ',        pct: '18%', amount: `₪${vat.toLocaleString('he-IL')}`, orange: false },
    { label: 'סה"כ לתשלום', pct: '',    amount: `₪${final.toLocaleString('he-IL')}`, orange: true  },
  ];

  return { table: new Table({
    rows: rows.map(({ label, pct, amount, orange }) =>
      new TableRow({
        children: [
          new TableCell({
            borders: THIN_BORDER,
            width: { size: 40, type: WidthType.PERCENTAGE },
            shading: orange ? { fill: COLOR.orange, type: ShadingType.CLEAR } : undefined,
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [p([run(label, { bold: orange, size: orange ? 24 : 20, color: orange ? COLOR.white : COLOR.charcoal })], AlignmentType.RIGHT, 0)],
          }),
          new TableCell({
            borders: THIN_BORDER,
            width: { size: 20, type: WidthType.PERCENTAGE },
            shading: orange ? { fill: COLOR.orange, type: ShadingType.CLEAR } : undefined,
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [p([run(pct, { size: orange ? 24 : 20, color: orange ? COLOR.white : COLOR.gray })], AlignmentType.CENTER, 0)],
          }),
          new TableCell({
            borders: THIN_BORDER,
            width: { size: 40, type: WidthType.PERCENTAGE },
            shading: orange ? { fill: COLOR.orange, type: ShadingType.CLEAR } : undefined,
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [p([run(amount, { bold: orange, size: orange ? 24 : 20, color: orange ? COLOR.white : COLOR.charcoal })], AlignmentType.CENTER, 0)],
          }),
        ],
      })
    ),
    width: { size: 55, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    bidirectional: true,
  }), finalTotal: final };
}

// ─── PAGE 2, SECTION 2 — Totals + payment side-by-side ───────────────────────
function buildPage2MainSection(subtotal) {
  const { table: totalsTable } = buildTotalsTable(subtotal);

  const paymentText =
    '30% מקדמה עם אישור ההצעה · 40% בתחילת העבודה · 30% בסיום ומסירה. תנאי תשלום: שוטף + 30.';

  return new Table({
    rows: [
      new TableRow({
        children: [
          // LEFT side: payment terms text
          new TableCell({
            borders: NO_BORDER,
            width: { size: 45, type: WidthType.PERCENTAGE },
            margins: { top: 160, bottom: 160, left: 180, right: 180 },
            children: [
              p([run('תנאי תשלום', { bold: true, size: 22, color: COLOR.charcoal })], AlignmentType.RIGHT, 80),
              p([run(paymentText, { size: 20, color: COLOR.gray })], AlignmentType.RIGHT, 0),
            ],
          }),
          // RIGHT side: totals table
          new TableCell({
            borders: NO_BORDER,
            width: { size: 55, type: WidthType.PERCENTAGE },
            margins: { top: 160, bottom: 160, left: 180, right: 180 },
            children: [totalsTable],
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: NO_BORDER,
  });
}

// ─── Page footer table ────────────────────────────────────────────────────────
function buildFooter() {
  return new Table({
    rows: [
      new TableRow({
        children: [
          // LEFT
          new TableCell({
            borders: NO_BORDER,
            width: { size: 50, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 100, left: 0, right: 180 },
            children: [
              p(
                [run('בכבוד רב, צוות Syncro | syncro.co.il · hello@syncro.co.il · 03-0000000', { size: 18, color: COLOR.gray })],
                AlignmentType.LEFT,
                0
              ),
            ],
          }),
          // RIGHT
          new TableCell({
            borders: NO_BORDER,
            width: { size: 50, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 100, left: 180, right: 0 },
            children: [
              p(
                [run('חתימת הלקוח · אישור ההצעה | SYNCRO · A TALGUY GROUP COMPANY', { size: 18, color: COLOR.gray })],
                AlignmentType.RIGHT,
                0
              ),
            ],
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: NO_BORDER,
  });
}

// ─── PAGE 3 — Terms header (same style as page 1 header) ─────────────────────
function buildTermsHeader() {
  return new Table({
    rows: [
      new TableRow({
        children: [
          // LEFT: SYNCRO wordmark
          new TableCell({
            borders: NO_BORDER,
            width: { size: 35, type: WidthType.PERCENTAGE },
            margins: { top: 120, bottom: 120, left: 200, right: 120 },
            children: [
              p([run('SYNCRO', { bold: true, size: 28, color: COLOR.blue })], AlignmentType.LEFT, 40),
              p([run('TERMS OF SERVICE', { size: 16, color: COLOR.gray, allCaps: true })], AlignmentType.LEFT, 0),
            ],
          }),
          // RIGHT: title
          new TableCell({
            borders: NO_BORDER,
            width: { size: 65, type: WidthType.PERCENTAGE },
            margins: { top: 120, bottom: 120, left: 120, right: 200 },
            children: [
              p([boldRun('תנאי השירות', 44, COLOR.charcoal)], AlignmentType.RIGHT, 0),
            ],
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: NO_BORDER,
  });
}

// ─── Terms content paragraphs ─────────────────────────────────────────────────
function buildTermsContent() {
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
      bullets: [],
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

  const result = [];

  for (const section of TERMS_SECTIONS) {
    // Section heading
    result.push(
      new Paragraph({
        children: [run(section.heading, { bold: true, size: 22, color: COLOR.blue })],
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        spacing: { before: 280, after: 120 },
      })
    );

    if (section.body) {
      result.push(p([run(section.body, { size: 20, color: COLOR.charcoal })], AlignmentType.RIGHT, 120));
    }

    for (const bullet of section.bullets) {
      result.push(
        new Paragraph({
          children: [run(`• ${bullet}`, { size: 20, color: COLOR.charcoal })],
          alignment: AlignmentType.RIGHT,
          bidirectional: true,
          spacing: { after: 100 },
          indent: { right: 200 },
        })
      );
    }
  }

  return result;
}

// ─── Separator line ───────────────────────────────────────────────────────────
function buildSeparator() {
  return new Paragraph({
    border: { bottom: { color: COLOR.border, size: 6, style: BorderStyle.SINGLE } },
    spacing: { after: 160 },
    bidirectional: true,
  });
}

// ─── Main export ──────────────────────────────────────────────────────────────
export async function generateQuoteDocx(formData) {
  const now          = new Date();
  const dateStr      = now.toLocaleDateString('he-IL');
  const validUntil   = new Date(now);
  validUntil.setDate(validUntil.getDate() + 30);
  const validUntilStr = validUntil.toLocaleDateString('he-IL');
  const year         = now.getFullYear();
  const quoteId      = `HZ-${year}-001`;

  const selectedServices = formData.selectedServices || [];
  const clientName       = [formData.fullName, formData.company].filter(Boolean).join(' | ');

  // Build services table (also returns subtotal)
  const { table: servicesTable, subtotal } = buildServicesTable(selectedServices);

  const doc = new Document({
    sections: [
      {
        properties: { bidi: true },
        children: [
          // ══════════════════════════════════════════════
          //  PAGE 1 — QUOTE
          // ══════════════════════════════════════════════

          // 1. Top header bar
          buildPageHeader(quoteId),
          emptyPara(120),

          // 2. Info row
          buildInfoRow(dateStr, validUntilStr, clientName),
          emptyPara(80),

          // 3. Description row
          buildDescriptionRow(formData),
          emptyPara(160),

          // 4. Two-column: opening text + company/client info
          buildTwoColumnSection(formData),
          emptyPara(160),

          // 5. Orange banner
          buildOrangeBanner(),
          emptyPara(200),

          // 6. Services table
          servicesTable,
          emptyPara(320),

          // ══════════════════════════════════════════════
          //  PAGE 2 — TOTALS + FOOTER
          // ══════════════════════════════════════════════
          new Paragraph({ children: [new PageBreak()], bidirectional: true }),

          // Totals + payment terms side by side
          buildPage2MainSection(subtotal),
          emptyPara(200),

          // Notes
          new Paragraph({
            children: [run('הערות', { bold: true, size: 22, color: COLOR.charcoal })],
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            spacing: { before: 200, after: 80 },
          }),
          p(
            [run('המחירים אינם כוללים מע"מ אלא אם צוין אחרת. ההצעה בתוקף ל-30 יום ממועד הוצאתה.', { size: 20, color: COLOR.gray })],
            AlignmentType.RIGHT,
            0
          ),

          emptyPara(300),

          // Footer separator + footer table
          buildSeparator(),
          buildFooter(),

          // ══════════════════════════════════════════════
          //  PAGE 3 — TERMS OF SERVICE
          // ══════════════════════════════════════════════
          new Paragraph({ children: [new PageBreak()], bidirectional: true }),

          // Terms header (mirrors page 1 header)
          buildTermsHeader(),
          emptyPara(120),
          buildSeparator(),

          // Terms body
          ...buildTermsContent(),

          emptyPara(200),
          buildSeparator(),
          buildFooter(),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `הצעת_מחיר_${quoteId}.docx`);
}
