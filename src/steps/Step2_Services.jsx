import StepCard from '../components/StepCard';
import NavButtons from '../components/NavButtons';
import ChipSelect from '../components/ChipSelect';
import { SERVICE_QUESTIONS } from '../data/flowConfig';

const SERVICE_META = {
  consulting:  { label: 'ייעוץ ותכנון',   icon: '🏗️', color: '#f0f4ff', badge: '#4175fc' },
  supervision: { label: 'פיקוח בנייה',    icon: '🔍', color: '#fff7ed', badge: '#f97316' },
  management:  { label: 'ניהול פרויקט',   icon: '📋', color: '#f0fdf4', badge: '#16a34a' },
  bim:         { label: 'ניהול מידע BIM', icon: '🧊', color: '#faf5ff', badge: '#9333ea' },
};

export default function Step2_Services({ data, setData, onNext, onBack, direction, serviceId, questionIndex }) {
  const questions = SERVICE_QUESTIONS[serviceId] || [];
  const q = questions[questionIndex];
  if (!q) return null;

  const meta = SERVICE_META[serviceId] || {};
  const answers = data.serviceAnswers || {};
  const currentVal = answers[q.id];

  const updateAnswer = (val) => {
    setData({ ...data, serviceAnswers: { ...answers, [q.id]: val } });
  };

  const isValid = q.type === 'chips_with_text'
    ? !!currentVal?.option && (currentVal.option !== q.textFieldIfOption || currentVal.text?.trim())
    : !!currentVal;

  return (
    <StepCard direction={direction}>
      {/* Service badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: meta.color, color: meta.badge }}
        >
          {meta.icon} {meta.label}
        </span>
        <span className="text-xs" style={{ color: '#9ca3af' }}>
          {questionIndex + 1} / {questions.length}
        </span>
      </div>

      <h2 className="text-base font-bold mb-1" style={{ color: '#101218', lineHeight: '1.4' }}>
        {q.question}
      </h2>

      {q.type === 'chips' && (
        <ChipSelect
          options={q.options}
          value={currentVal || null}
          onChange={updateAnswer}
        />
      )}

      {q.type === 'chips_with_text' && (
        <>
          <ChipSelect
            options={q.options}
            value={currentVal?.option || null}
            onChange={(opt) => updateAnswer({ option: opt, text: currentVal?.text || '' })}
          />
          {currentVal?.option === q.textFieldIfOption && (
            <div className="mt-3">
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6b7280' }}>
                {q.textFieldLabel}
              </label>
              <input
                type="text"
                value={currentVal?.text || ''}
                onChange={(e) => updateAnswer({ ...currentVal, text: e.target.value })}
                placeholder={`הזינו ${q.textFieldLabel}`}
                className="w-full rounded-xl text-sm outline-none"
                style={{
                  padding: '13px 14px',
                  border: '2px solid #e2e5ed',
                  backgroundColor: '#fafbff',
                  fontSize: '16px',
                }}
              />
            </div>
          )}
        </>
      )}

      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!isValid} />
    </StepCard>
  );
}
