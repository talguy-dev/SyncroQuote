import StepCard from '../components/StepCard';
import NavButtons from '../components/NavButtons';
import ChipSelect from '../components/ChipSelect';
import { SERVICES } from '../data/flowConfig';

const PROJECT_TYPES = ['מגורים', 'מסחרי', 'תעשייתי', 'ציבורי / מוסדי', 'מלונאות', 'תשתית', 'אחר'];
const PROJECT_STAGES = [
  'רעיון ראשוני',
  'שלב תכנון',
  'שלב רישוי',
  'לפני ביצוע',
  'במהלך ביצוע',
  'בסיום ביצוע',
];

function Label({ children }) {
  return (
    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6b7280' }}>
      {children}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text', maxLength, inputMode }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      inputMode={inputMode}
      className="w-full rounded-xl text-sm outline-none transition-all"
      style={{
        padding: '13px 14px',
        border: '2px solid #e2e5ed',
        backgroundColor: '#fafbff',
        minHeight: '48px',
        fontSize: '16px', // prevents iOS zoom
      }}
      onFocus={(e) => { e.target.style.borderColor = '#4175fc'; }}
      onBlur={(e)  => { e.target.style.borderColor = '#e2e5ed'; }}
    />
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function StepHeading({ title, sub }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold" style={{ color: '#101218' }}>{title}</h2>
      {sub && <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{sub}</p>}
    </div>
  );
}

// ── 1.1 ──────────────────────────────────────────────────────────────────────
export function Screen1_1({ data, setData, onNext, direction }) {
  const valid = data.fullName?.trim() && data.company?.trim();
  return (
    <StepCard direction={direction}>
      <StepHeading title="בואו נתחיל 👋" sub="ספרו לנו מי אתם" />
      <Field label="שם מלא">
        <TextInput value={data.fullName || ''} onChange={(v) => setData({ ...data, fullName: v })} placeholder="ישראל ישראלי" />
      </Field>
      <Field label="חברה / ארגון">
        <TextInput value={data.company || ''} onChange={(v) => setData({ ...data, company: v })} placeholder="שם החברה" />
      </Field>
      <NavButtons onNext={onNext} nextDisabled={!valid} showBack={false} />
    </StepCard>
  );
}

// ── 1.2 ──────────────────────────────────────────────────────────────────────
export function Screen1_2({ data, setData, onNext, onBack, direction }) {
  const valid = data.phone?.trim() && data.email?.trim();
  return (
    <StepCard direction={direction}>
      <StepHeading title="פרטי התקשרות" sub="כך נוכל ליצור איתכם קשר" />
      <Field label="טלפון">
        <TextInput
          value={data.phone || ''}
          onChange={(v) => {
            const digits = v.replace(/\D/g, '').slice(0, 10);
            setData({ ...data, phone: digits });
          }}
          placeholder="0500000000"
          type="text"
          inputMode="numeric"
          maxLength={10}
        />
      </Field>
      <Field label="אימייל">
        <TextInput value={data.email || ''} onChange={(v) => setData({ ...data, email: v })} placeholder="your@email.com" type="email" />
      </Field>
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!valid} />
    </StepCard>
  );
}

// ── 1.3 ──────────────────────────────────────────────────────────────────────
export function Screen1_3({ data, setData, onNext, onBack, direction }) {
  const typeIsOther = data.projectType === 'אחר';
  const valid =
    data.projectType &&
    (!typeIsOther || data.projectTypeOther?.trim()) &&
    data.location?.trim() &&
    data.size?.trim();

  return (
    <StepCard direction={direction}>
      <StepHeading title="פרטי הפרויקט" />
      <Field label="סוג פרויקט">
        <ChipSelect
          options={PROJECT_TYPES}
          value={data.projectType || null}
          onChange={(v) => setData({ ...data, projectType: v, projectTypeOther: '' })}
          otherValue={data.projectTypeOther || ''}
          onOtherChange={(v) => setData({ ...data, projectTypeOther: v })}
        />
      </Field>
      <Field label="מיקום הפרויקט">
        <TextInput value={data.location || ''} onChange={(v) => setData({ ...data, location: v })} placeholder="עיר / אזור" />
      </Field>
      <Field label='גודל במ"ר'>
        <TextInput value={data.size || ''} onChange={(v) => setData({ ...data, size: v })} placeholder='למשל: 500' />
      </Field>
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!valid} />
    </StepCard>
  );
}

// ── 1.4 ──────────────────────────────────────────────────────────────────────
export function Screen1_4({ data, setData, onNext, onBack, direction }) {
  const valid = !!data.projectStage;
  return (
    <StepCard direction={direction}>
      <StepHeading title="שלב הפרויקט" sub="באיזה שלב נמצא הפרויקט כיום?" />
      <ChipSelect
        options={PROJECT_STAGES}
        value={data.projectStage || null}
        onChange={(v) => setData({ ...data, projectStage: v })}
      />
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!valid} />
    </StepCard>
  );
}

// ── 1.5 ──────────────────────────────────────────────────────────────────────
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
      <StepHeading title="בחירת שירותים" sub="ניתן לבחור מספר שירותים" />
      <div className="flex flex-col gap-2.5">
        {SERVICES.map((svc) => {
          const isSel = selected.includes(svc.id);
          return (
            <button
              key={svc.id}
              type="button"
              onClick={() => toggle(svc.id)}
              className={`service-card ${isSel ? 'selected' : ''}`}
            >
              <span className="text-xl shrink-0">{svc.icon}</span>
              <span
                className="flex-1 text-right text-sm font-semibold"
                style={{ color: '#101218' }}
              >
                {svc.label}
              </span>
              <span
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                style={{
                  backgroundColor: isSel ? '#4175fc' : 'transparent',
                  borderColor: isSel ? '#4175fc' : '#d1d5db',
                }}
              >
                {isSel && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!valid} nextLabel="המשך לשאלות" />
    </StepCard>
  );
}
