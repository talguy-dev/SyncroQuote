import { useState } from 'react';
import StepCard from '../components/StepCard';
import NavButtons from '../components/NavButtons';
import { SERVICES, SERVICE_QUESTIONS } from '../data/flowConfig';

function validateData(data) {
  const missing = [];
  if (!data.fullName?.trim()) missing.push('שם מלא');
  if (!data.company?.trim()) missing.push('חברה');
  if (!data.phone?.trim()) missing.push('טלפון');
  if (!data.email?.trim()) missing.push('אימייל');
  if (!data.projectType) missing.push('סוג פרויקט');
  if (!data.location?.trim()) missing.push('מיקום');
  if (!data.size?.trim()) missing.push('גודל במ"ר');
  if (!data.projectStage) missing.push('שלב פרויקט');
  if (!data.selectedServices?.length) missing.push('שירותים נבחרים');
  return missing;
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 text-left">{label}</span>
      <span className="text-sm font-medium text-[#101218] text-right max-w-[60%]">{value || '—'}</span>
    </div>
  );
}

export default function Step4_Review({ data, onBack, onGenerate, direction }) {
  const [confirmed, setConfirmed] = useState(null);
  const missing = validateData(data);
  const hasMissing = missing.length > 0;

  const selectedServiceLabels = (data.selectedServices || []).map(
    (id) => SERVICES.find((s) => s.id === id)?.label || id
  );

  return (
    <StepCard direction={direction}>
      <h2 className="text-xl font-bold text-[#101218] mb-1">סיכום ואישור</h2>
      <p className="text-sm text-gray-500 mb-5">בדקו שהמידע נכון לפני הפקת ההצעה</p>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-5">
        <SummaryRow label="שם" value={data.fullName} />
        <SummaryRow label="חברה" value={data.company} />
        <SummaryRow label="טלפון" value={data.phone} />
        <SummaryRow label="אימייל" value={data.email} />
        <SummaryRow label="סוג פרויקט" value={data.projectType} />
        <SummaryRow label="מיקום" value={data.location} />
        <SummaryRow label='גודל (מ"ר)' value={data.size} />
        <SummaryRow label="שלב" value={data.projectStage} />
        <SummaryRow label="שירותים" value={selectedServiceLabels.join(' | ')} />
      </div>

      {/* Missing fields alert */}
      {hasMissing && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
          <p className="text-sm font-semibold text-red-700 mb-2">⚠️ שדות חסרים:</p>
          <ul className="list-disc list-inside text-sm text-red-600 space-y-0.5">
            {missing.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
      )}

      {/* Confirmation question */}
      {!hasMissing && (
        <div className="mb-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">האם כל הפרטים תקינים?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmed(true)}
              className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${confirmed === true ? 'border-[#4175fc] bg-[#4175fc] text-white' : 'border-gray-200 text-gray-700 hover:border-[#4175fc]'}`}
            >
              כן, הכל תקין ✓
            </button>
            <button
              onClick={() => setConfirmed(false)}
              className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${confirmed === false ? 'border-red-400 bg-red-50 text-red-600' : 'border-gray-200 text-gray-700 hover:border-red-400'}`}
            >
              יש לתקן
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-2">
        {(hasMissing || confirmed === false) && (
          <button
            onClick={onBack}
            className="w-full py-3 rounded-xl border-2 border-[#4175fc] text-[#4175fc] font-semibold text-sm hover:bg-[#f0f4ff] transition-all"
          >
            חזרה לתיקון שדות
          </button>
        )}
        {!hasMissing && confirmed === true && (
          <button
            onClick={onGenerate}
            className="w-full py-3 rounded-xl bg-[#4175fc] text-white font-bold text-sm hover:bg-[#2e5fe8] shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            הפק הצעת מחיר ↓
          </button>
        )}
        {!hasMissing && confirmed === null && (
          <NavButtons onNext={() => {}} onBack={onBack} nextDisabled nextLabel="הפק הצעת מחיר ↓" />
        )}
      </div>
    </StepCard>
  );
}
