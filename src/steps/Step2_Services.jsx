import { useState } from 'react';
import StepCard from '../components/StepCard';
import NavButtons from '../components/NavButtons';
import ChipSelect from '../components/ChipSelect';
import { SERVICE_QUESTIONS } from '../data/flowConfig';

function Field({ label, children }) {
  return (
    <div className="mb-2">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function Step2_Services({ data, setData, onNext, onBack, direction, serviceId, questionIndex }) {
  const questions = SERVICE_QUESTIONS[serviceId] || [];
  const q = questions[questionIndex];

  if (!q) return null;

  const updateAnswer = (val) => {
    setData({
      ...data,
      serviceAnswers: {
        ...(data.serviceAnswers || {}),
        [q.id]: val,
      },
    });
  };

  const currentVal = (data.serviceAnswers || {})[q.id];

  const serviceLabels = {
    consulting: 'ייעוץ ותכנון',
    supervision: 'פיקוח בנייה',
    management: 'ניהול פרויקט',
    bim: 'ניהול מידע BIM',
  };
  const serviceIcons = { consulting: '🏗️', supervision: '🔍', management: '📋', bim: '🧊' };

  const isValid = q.type === 'chips_with_text'
    ? !!currentVal?.option && (currentVal.option !== q.textFieldIfOption || currentVal.text?.trim())
    : !!currentVal;

  return (
    <StepCard direction={direction}>
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">{serviceIcons[serviceId]}</span>
        <span className="text-xs font-bold text-[#4175fc] bg-[#f0f4ff] px-3 py-1 rounded-full">
          {serviceLabels[serviceId]}
        </span>
        <span className="text-xs text-gray-400 mr-auto">
          שאלה {questionIndex + 1} / {questions.length}
        </span>
      </div>

      <h2 className="text-lg font-bold text-[#101218] mb-2">{q.question}</h2>

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
            <div className="mt-4">
              <Field label={q.textFieldLabel}>
                <input
                  type="text"
                  value={currentVal?.text || ''}
                  onChange={(e) => updateAnswer({ ...currentVal, text: e.target.value })}
                  placeholder={`הזינו ${q.textFieldLabel}`}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm outline-none focus:border-[#4175fc] transition-colors"
                />
              </Field>
            </div>
          )}
        </>
      )}

      <NavButtons onNext={onNext} onBack={onBack} nextDisabled={!isValid} />
    </StepCard>
  );
}
