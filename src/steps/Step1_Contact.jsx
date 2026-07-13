import StepCard from '../components/StepCard';
import NavButtons from '../components/NavButtons';
import ChipSelect from '../components/ChipSelect';

const PROJECT_TYPES = ['מגורים', 'מסחרי', 'תעשייתי', 'ציבורי / מוסדי', 'מלונאות', 'תשתית', 'אחר'];
const PROJECT_STAGES = [
  'רעיון ראשוני',
  'שלב תכנון',
  'שלב רישוי',
  'לפני ביצוע',
  'במהלך ביצוע',
  'בסיום ביצוע',
];

function Field({ label, children }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm outline-none focus:border-[#4175fc] transition-colors"
    />
  );
}

// ── Screen 1.1: Name & Company ──
export function Screen1_1({ data, setData, onNext, direction }) {
  const valid = data.fullName?.trim() && data.company?.trim();
  return (
    <StepCard direction={direction}>
      <h2 className="text-xl font-bold text-[#101218] mb-1">בואו נתחיל 👋</h2>
      <p className="text-sm text-gray-500 mb-6">ספרו לנו מי אתם</p>
      <Field label="שם מלא">
        <Input value={data.fullName || ''} onChange={(v) => setData({ ...data, fullName: v })} placeholder="ישראל ישראלי" />
      </Field>
      <Field label="חברה / ארגון">
        <Input value={data.company || ''} onChange={(v) => setData({ ...data, company: v })} placeholder="שם החברה" />
      </Field>
      <NavButtons onNext={onNext} nextDisabled={!valid} showBack={false} />
    </StepCard>
  );
}

// ── Screen 1.2: Phone & Email ──
export function Screen1_2({ data, setData, onNext, onBack, direction }) {
  const valid = data.phone?.trim() && data.email?.trim();
  return (
    <StepCard direction={direction}>
      <h2 className="text-xl font-bold text-[#101218] mb-1">פרטי התקשרות</h2>
      <p className="text-sm text-gray-500 mb-6">כך נוכל ליצור איתכם קשר</p>
      <Field label="טלפון">
        <Input value={data.phone || ''} onChange={(v) => setData({ ...data, phone: v })} placeholder="050-0000000" type="tel" />
      </Field>
      <Field label="אימייל">
        <Input value={data.email || ''} onChange={(v) => setData({ ...data, email: v })} placeholder="your@email.com" type="email" />
      </Field>
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!valid} />
    </StepCard>
  );
}

// ── Screen 1.3: Project type, location, size ──
export function Screen1_3({ data, setData, onNext, onBack, direction }) {
  const valid = data.projectType && data.location?.trim() && data.size?.trim();
  return (
    <StepCard direction={direction}>
      <h2 className="text-xl font-bold text-[#101218] mb-1">פרטי הפרויקט</h2>
      <p className="text-sm text-gray-500 mb-6">קצת על הפרויקט שלכם</p>
      <Field label="סוג פרויקט">
        <ChipSelect
          options={PROJECT_TYPES}
          value={data.projectType || null}
          onChange={(v) => setData({ ...data, projectType: v })}
        />
      </Field>
      <Field label="מיקום הפרויקט">
        <Input value={data.location || ''} onChange={(v) => setData({ ...data, location: v })} placeholder="עיר / אזור" />
      </Field>
      <Field label='גודל הפרויקט במ"ר'>
        <Input value={data.size || ''} onChange={(v) => setData({ ...data, size: v })} placeholder='למשל: 500 מ"ר' />
      </Field>
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!valid} />
    </StepCard>
  );
}

// ── Screen 1.4: Project stage ──
export function Screen1_4({ data, setData, onNext, onBack, direction }) {
  const valid = !!data.projectStage;
  return (
    <StepCard direction={direction}>
      <h2 className="text-xl font-bold text-[#101218] mb-1">שלב הפרויקט</h2>
      <p className="text-sm text-gray-500 mb-2">באיזה שלב נמצא הפרויקט כיום?</p>
      <ChipSelect
        options={PROJECT_STAGES}
        value={data.projectStage || null}
        onChange={(v) => setData({ ...data, projectStage: v })}
      />
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!valid} />
    </StepCard>
  );
}

// ── Screen 1.5: Service selection ──
import { SERVICES } from '../data/flowConfig';

export function Screen1_5({ data, setData, onNext, onBack, direction }) {
  const selected = data.selectedServices || [];
  const valid = selected.length > 0;

  const toggle = (id) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    setData({ ...data, selectedServices: next });
  };

  return (
    <StepCard direction={direction}>
      <h2 className="text-xl font-bold text-[#101218] mb-1">בחירת שירותים</h2>
      <p className="text-sm text-gray-500 mb-6">אילו שירותים תרצו לכלול בהצעה? (ניתן לבחור מספר)</p>
      <div className="flex flex-col gap-3">
        {SERVICES.map((svc) => {
          const isSel = selected.includes(svc.id);
          return (
            <button
              key={svc.id}
              type="button"
              onClick={() => toggle(svc.id)}
              className={`service-card ${isSel ? 'selected' : ''}`}
            >
              <span className="text-2xl">{svc.icon}</span>
              <div className="flex-1 text-right">
                <p className="font-semibold text-sm text-[#101218]">{svc.label}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSel ? 'bg-[#4175fc] border-[#4175fc]' : 'border-gray-300'}`}>
                {isSel && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!valid} nextLabel="המשך לשאלות" />
    </StepCard>
  );
}
