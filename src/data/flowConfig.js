export const SERVICES = [
  { id: 'consulting', label: 'ייעוץ ותכנון', icon: '🏗️' },
  { id: 'supervision', label: 'פיקוח בנייה', icon: '🔍' },
  { id: 'management', label: 'ניהול פרויקט', icon: '📋' },
  { id: 'bim', label: 'ניהול מידע BIM', icon: '🧊' },
];

export const SERVICE_PRICES = {
  consulting: 18000,
  supervision: 15000,
  management: 15000,
  bim: 6500,
};

// Each question group = one micro-screen
export const SERVICE_QUESTIONS = {
  consulting: [
    {
      id: 'consulting_goal',
      question: 'מה מטרת הייעוץ?',
      type: 'chips',
      options: ['אופטימיזציה של תהליך', 'בחינת היתכנות', 'פתרון בעיה קיימת', 'תכנון מחדש', 'ייעוץ רגולטורי'],
    },
    {
      id: 'consulting_type',
      question: 'האם מדובר בפתרון בעיה קיימת או תכנון חדש?',
      type: 'chips',
      options: ['פתרון בעיה קיימת', 'תכנון חדש מאפס', 'שילוב של השניים'],
    },
    {
      id: 'consulting_budget',
      question: 'מהו התקציב המשוער לייעוץ?',
      type: 'chips',
      options: ['עד ₪10,000', '₪10,000 – ₪30,000', '₪30,000 – ₪80,000', 'מעל ₪80,000', 'לא ידוע'],
    },
    {
      id: 'consulting_detail',
      question: 'האם נדרשת חוות דעת בלבד או תכנון מפורט?',
      type: 'chips',
      options: ['חוות דעת בלבד', 'תכנון מפורט', 'חוות דעת + תכנון מפורט'],
    },
    {
      id: 'consulting_timeline',
      question: 'מה לוח הזמנים המצופה?',
      type: 'chips',
      options: ['דחוף – עד שבועיים', '1 – 3 חודשים', '3 – 6 חודשים', 'מעל חצי שנה', 'גמיש'],
    },
  ],

  supervision: [
    {
      id: 'supervision_electricity',
      question: 'האם יש חשמל זמין באתר?',
      type: 'chips',
      options: ['כן', 'לא', 'בתהליך חיבור'],
    },
    {
      id: 'supervision_manager_role',
      question: 'מה תפקיד מנהל הפרויקט מטעם הלקוח?',
      type: 'chips',
      options: ['יזם', 'אדריכל', 'מהנדס', 'קבלן ראשי', 'אחר'],
    },
    {
      id: 'supervision_plans',
      question: 'האם קיימות תכניות של כל המערכות?',
      type: 'chips',
      options: ['כן – מלאות', 'חלקיות', 'בתהליך הכנה', 'לא'],
    },
    {
      id: 'supervision_permit',
      question: 'האם קיים היתר בנייה?',
      type: 'chips',
      options: ['כן', 'בתהליך', 'לא'],
    },
    {
      id: 'supervision_specs',
      question: 'האם קיימים מפרטים טכניים?',
      type: 'chips',
      options: ['כן – מלאים', 'חלקיים', 'לא'],
    },
    {
      id: 'supervision_purpose',
      question: 'מה מטרת הפרויקט?',
      type: 'chips',
      options: ['מגורים', 'מסחרי', 'תעשייתי', 'ציבורי / מוסדי', 'מלונאות', 'אחר'],
    },
    {
      id: 'supervision_contract',
      question: 'האם קיים הסכם חתום עם קבלן?',
      type: 'chips',
      options: ['כן', 'לא', 'בשלבי משא ומתן'],
    },
    {
      id: 'supervision_cost_estimate',
      question: 'מה העלות המשוערת של הפרויקט?',
      type: 'chips',
      options: ['עד ₪500K', '₪500K – ₪2M', '₪2M – ₪10M', 'מעל ₪10M', 'לא ידוע'],
    },
    {
      id: 'supervision_size',
      question: 'מה גודל הפרויקט?',
      type: 'chips',
      options: ['עד 200 מ"ר', '200 – 1,000 מ"ר', '1,000 – 5,000 מ"ר', 'מעל 5,000 מ"ר'],
    },
    {
      id: 'supervision_existing_material',
      question: 'האם יש דרישות קודמות או חומר קיים?',
      type: 'chips',
      options: ['כן', 'לא', 'חלקית'],
    },
  ],

  management: [
    {
      id: 'management_licensing',
      question: 'האם הפרויקט כולל תהליך רישוי?',
      type: 'chips',
      options: ['לא נדרש', 'כן – בשלב ראשוני', 'כן – בתהליך', 'כן – הושלם'],
    },
    {
      id: 'management_includes_mgmt',
      question: 'האם הפרויקט כולל ניהול פרויקט מלא?',
      type: 'chips',
      options: ['כן – ניהול מלא', 'חלקי – ריכוז בלבד', 'לא'],
    },
    {
      id: 'management_budget',
      question: 'מהו התקציב המשוער לפרויקט?',
      type: 'chips',
      options: ['עד ₪500K', '₪500K – ₪2M', '₪2M – ₪10M', 'מעל ₪10M', 'לא ידוע'],
    },
    {
      id: 'management_has_plans',
      question: 'האם קיימות תכניות או אפיון ראשוני?',
      type: 'chips',
      options: ['כן – תכניות מלאות', 'אפיון ראשוני בלבד', 'לא'],
    },
    {
      id: 'management_contractor',
      question: 'האם יש קבלן ביצוע? אם כן, מי?',
      type: 'chips_with_text',
      options: ['טרם נבחר', 'כן – קבלן ידוע'],
      textFieldIfOption: 'כן – קבלן ידוע',
      textFieldLabel: 'שם הקבלן',
      textFieldId: 'management_contractor_name',
    },
  ],

  bim: [
    {
      id: 'bim_existing_plans',
      question: 'האם קיימות תוכניות קיימות?',
      type: 'chips',
      options: ['כן – דיגיטליות', 'כן – ידניות בלבד', 'חלקיות', 'לא'],
    },
    {
      id: 'bim_existing_models',
      question: 'האם קיימים מודלים מרחביים קיימים?',
      type: 'chips',
      options: ['כן – BIM מלא', 'כן – חלקי', 'לא'],
    },
    {
      id: 'bim_goal',
      question: 'מה מטרת שירות BIM הנדרש?',
      type: 'chips',
      options: ['מידול ראשוני', 'עדכון מודל קיים', 'תיאום בין מקצועות', 'ניהול מידע שוטף', 'הכנה לביצוע'],
    },
    {
      id: 'bim_integration',
      question: 'האם נדרש ייבוא למערכות נוספות?',
      type: 'chips',
      options: ['כן – ERP', 'כן – GIS', 'כן – מערכת ניהול אחרת', 'לא'],
    },
  ],
};
