import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, AlignmentType, WidthType, BorderStyle, HeadingLevel,
  PageBreak, ShadingType, TableLayoutType,
} from 'docx';
import { saveAs } from 'file-saver';
import { SERVICE_PRICES } from '../data/flowConfig';

const RTL = true;

const bold = (text, size = 24, color = '101218') =>
  new TextRun({ text, bold: true, size, color, rtl: RTL });

const normal = (text, size = 22, color = '444444') =>
  new TextRun({ text, size, color, rtl: RTL });

const para = (runs, align = AlignmentType.RIGHT, spacing = 160) =>
  new Paragraph({
    children: Array.isArray(runs) ? runs : [runs],
    alignment: align,
    bidirectional: true,
    spacing: { after: spacing },
  });

const divider = () =>
  new Paragraph({
    border: { bottom: { color: 'e2e5ed', size: 6, style: BorderStyle.SINGLE } },
    spacing: { after: 160 },
    bidirectional: true,
  });

const sectionHeader = (text) =>
  new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26, color: '4175fc', rtl: RTL })],
    alignment: AlignmentType.RIGHT,
    bidirectional: true,
    spacing: { before: 240, after: 120 },
  });

function buildServicesTable(selectedServices) {
  const serviceLabels = {
    consulting: 'ייעוץ ותכנון',
    supervision: 'פיקוח בנייה',
    management: 'ניהול פרויקט',
    bim: 'ניהול מידע BIM',
  };

  const headerRow = new TableRow({
    tableHeader: true,
    children: ['סה"כ', 'מחיר ליחידה', 'כמות', 'תיאור השירות'].map((txt) =>
      new TableCell({
        children: [new Paragraph({
          children: [bold(txt, 22, 'ffffff')],
          alignment: AlignmentType.CENTER,
          bidirectional: true,
        })],
        shading: { fill: '4175fc', type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
      })
    ),
  });

  const dataRows = selectedServices.map((svc) => {
    const price = SERVICE_PRICES[svc] || 0;
    const label = serviceLabels[svc] || svc;
    return new TableRow({
      children: [
        cellText(`₪${price.toLocaleString('he-IL')}`),
        cellText(`₪${price.toLocaleString('he-IL')}`),
        cellText('1'),
        cellText(label, true),
      ],
    });
  });

  return new Table({
    rows: [headerRow, ...dataRows],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    bidirectional: true,
  });
}

function cellText(text, isLabel = false) {
  return new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text, size: 20, bold: isLabel, rtl: RTL })],
      alignment: AlignmentType.CENTER,
      bidirectional: true,
    })],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

function buildTotalsTable(selectedServices) {
  const subtotal = selectedServices.reduce((s, svc) => s + (SERVICE_PRICES[svc] || 0), 0);
  const vat = Math.round(subtotal * 0.18);
  const total = subtotal + vat;

  const rows = [
    ['סכום ביניים', `₪${subtotal.toLocaleString('he-IL')}`],
    ['הנחה', '0%'],
    ['מע"מ (18%)', `₪${vat.toLocaleString('he-IL')}`],
    ['סה"כ לתשלום', `₪${total.toLocaleString('he-IL')}`],
  ];

  return new Table({
    rows: rows.map(([label, val], i) => new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: val, bold: i === 3, size: i === 3 ? 24 : 20, color: i === 3 ? '4175fc' : '101218', rtl: RTL })],
            alignment: AlignmentType.CENTER,
            bidirectional: true,
          })],
          shading: i === 3 ? { fill: 'f0f4ff', type: ShadingType.CLEAR } : undefined,
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: label, bold: i === 3, size: i === 3 ? 24 : 20, rtl: RTL })],
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
          })],
          shading: i === 3 ? { fill: 'f0f4ff', type: ShadingType.CLEAR } : undefined,
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
        }),
      ],
    })),
    width: { size: 50, type: WidthType.PERCENTAGE },
    bidirectional: true,
  });
}

export async function generateQuoteDocx(formData) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('he-IL');
  const validUntil = new Date(now);
  validUntil.setDate(validUntil.getDate() + 30);
  const validUntilStr = validUntil.toLocaleDateString('he-IL');
  const year = now.getFullYear();
  const quoteId = `HZ-${year}-001`;

  const selectedServices = formData.selectedServices || [];

  const TERMS_TEXT = [
    'פירוט השירותים הכלולים:',
    '• פיקוח, תיאום ומעקב אחר עבודות הבנייה.',
    '• השלמת התכנון עד קבלת תכניות עבודה מהיועצים ומהקבלנים.',
    '• הפעלת מערך הבטחת האיכות ווידוא שהוגדרו בעלי התפקידים הדרושים.',
    '• זימון ווידוא ביצוע פיקוח עליון ע"י המתכננים.',
    '• בקרה על ביצוע בדיקות מעבדה.',
    '• פיקוח הנדסי על טיב עבודות הבנייה שיבוצעו באתר.',
    '• הפיקוח יהא לפי קצב ההתקדמות ותכולת הביצוע; בכל מקרה תבוצע פגישה באתר אחת לשבוע.',
    '• מעקב אחר התקדמות עבודות הבנייה מול הקבלנ/ים בדרך של קיום ישיבות אתר.',
    '• ניהול פניות הקבלנ/ים לקבלת הבהרות בקשר לתוכניות והמפרטים.',
    '• בדיקת ואישור חשבונות שיוגשו ע"י הקבלנים.',
    '• עריכת חשבונות סופיים.',
  ];

  const doc = new Document({
    sections: [
      {
        properties: { bidi: true },
        children: [
          // === PAGE 1: QUOTE ===

          // Title
          new Paragraph({
            children: [new TextRun({ text: 'SYNCRO - ENGINEERING INTELLIGENCE', bold: true, size: 36, color: '4175fc', rtl: RTL })],
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            spacing: { after: 80 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'מבית Talguy Group', size: 22, color: '777777', rtl: RTL })],
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            spacing: { after: 240 },
          }),

          divider(),

          // Header meta
          para([bold('תאריך: ', 20), normal(dateStr, 20)]),
          para([bold('מספר הצעה: ', 20), normal(quoteId, 20)]),
          para([bold('בתוקף עד: ', 20), normal(validUntilStr, 20)]),
          para([bold('פרויקט: ', 20), normal(`${formData.projectType || ''} | ${formData.location || ''}`, 20)]),

          divider(),

          // Company info
          sectionHeader('פרטי החברה'),
          para([normal('Syncro - Engineering Intelligence, מבית Talguy Group', 20)]),
          para([normal('03-0000000 | 00-0000000 | hello@syncro.co.il | syncro.co.il', 20)]),

          divider(),

          // Client info
          sectionHeader('פרטי הלקוח'),
          para([bold('לכבוד: ', 20), normal(`${formData.fullName || ''} | ${formData.company || ''}`, 20)]),
          para([bold('טלפון: ', 20), normal(formData.phone || '', 20)]),
          para([bold('אימייל: ', 20), normal(formData.email || '', 20)]),

          divider(),

          // Opening
          sectionHeader('תיאור הצעת המחיר'),
          para([normal(
            'תודה על פנייתכם. להלן הצעת מחיר עבור שירותי ניהול ובקרת הפרויקט באמצעות מערכת Syncro - ליווי מלא, מודלי BIM ואוטומציה של לוחות הזמנים, בהתאמה לצרכי הפרויקט שלכם. תנאי כל שירות הכלול בהצעה מפורטים בעמודים הנלווים.',
            20
          )]),

          new Paragraph({ spacing: { after: 240 }, bidirectional: true }),

          // Services table
          sectionHeader('פירוט שירותים'),
          buildServicesTable(selectedServices),

          new Paragraph({ spacing: { after: 240 }, bidirectional: true }),

          // Totals
          sectionHeader('סיכום עלויות'),
          buildTotalsTable(selectedServices),

          new Paragraph({ spacing: { after: 320 }, bidirectional: true }),

          divider(),

          // Payment & footer
          sectionHeader('תנאי תשלום'),
          para([normal('30% מקדמה עם אישור ההצעה — 40% בתחילת העבודה — 30% בסיום ומסירה. תנאי תשלום: שוטף + 30.', 20)]),

          sectionHeader('הערות'),
          para([normal('המחירים אינם כוללים מע"מ אלא אם צוין אחרת. ההצעה בתוקף ל-30 יום ממועד הוצאתה.', 20)]),

          new Paragraph({ spacing: { after: 480 }, bidirectional: true }),

          // Signature
          new Paragraph({
            children: [normal('___________________________', 22)],
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
          }),
          para([normal('חתימת הלקוח — אישור ההצעה', 20)]),

          new Paragraph({ spacing: { after: 320 }, bidirectional: true }),
          para([bold('בכבוד רב, צוות Syncro', 22, '4175fc')]),

          // === PAGE 2: TERMS ===
          new Paragraph({
            children: [new PageBreak()],
            bidirectional: true,
          }),

          new Paragraph({
            children: [new TextRun({ text: 'תנאי שירות', bold: true, size: 32, color: '4175fc', rtl: RTL })],
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            spacing: { after: 320 },
          }),

          divider(),

          ...TERMS_TEXT.map((line) =>
            new Paragraph({
              children: [new TextRun({ text: line, size: 20, bold: line.endsWith(':'), rtl: RTL })],
              alignment: AlignmentType.RIGHT,
              bidirectional: true,
              spacing: { after: 120 },
            })
          ),

          new Paragraph({ spacing: { after: 240 }, bidirectional: true }),

          sectionHeader('תנאי השירות — פיקוח מטעם היזם'),
          para([normal(
            'בעבור השירותים המפורטים לעיל, שכר הטרחה הנדרש הינו 3.5% מעלויות הפרויקט הכוללות. חלוקה שווה של שכר הטרחה הכולל לחודשים; חשבונית תוגש בסוף כל חודש עבודה. תשלום שוטף.',
            20
          )]),

          sectionHeader('הערות'),
          ...[
            '• כלל היועצים והמתכננים שיידרשו יחתמו על הסכמים מול המזמין ויועסקו על-ידו.',
            '• תכניות/העתקות יודפסו על חשבון היזם.',
            '• באם הוחלט על סיום התקשרות — יש להודיע חודש מראש.',
            '• הקבלן הנבחר יספק מנהל עבודה מוסמך ומהנדסי ביצוע.',
            '• תכולת העבודה כוללת סיוע בקבלת טופס אכלוס/טופס 4; האחריות לאישורים אלו תהיה של הקבלן.',
          ].map((line) =>
            new Paragraph({
              children: [new TextRun({ text: line, size: 20, rtl: RTL })],
              alignment: AlignmentType.RIGHT,
              bidirectional: true,
              spacing: { after: 120 },
            })
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `הצעת_מחיר_${quoteId}.docx`);
}
