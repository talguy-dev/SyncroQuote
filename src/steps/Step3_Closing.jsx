import StepCard from '../components/StepCard';
import NavButtons from '../components/NavButtons';

export default function Step3_Closing({ data, setData, onNext, onBack, direction }) {
  return (
    <StepCard direction={direction}>
      <div className="mb-5">
        <h2 className="text-lg font-bold" style={{ color: '#101218' }}>שאלות סגירה</h2>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>הערות נוספות לצוות Syncro</p>
      </div>

      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6b7280' }}>
        הערות / מידע נוסף
      </label>
      <textarea
        rows={5}
        value={data.closingRemarks || ''}
        onChange={(e) => setData({ ...data, closingRemarks: e.target.value })}
        placeholder="כל מידע נוסף שיעזור לנו להכין את ההצעה המדויקת ביותר עבורכם..."
        className="w-full rounded-xl text-sm outline-none resize-none"
        style={{
          padding: '13px 14px',
          border: '2px solid #e2e5ed',
          backgroundColor: '#fafbff',
          fontSize: '16px',
          lineHeight: '1.5',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#4175fc'; }}
        onBlur={(e)  => { e.target.style.borderColor = '#e2e5ed'; }}
      />

      <NavButtons onNext={onNext} onBack={onBack} nextLabel="לסיכום ואישור" />
    </StepCard>
  );
}
