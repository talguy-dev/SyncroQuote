import StepCard from '../components/StepCard';
import NavButtons from '../components/NavButtons';

export default function Step3_Closing({ data, setData, onNext, onBack, direction }) {
  return (
    <StepCard direction={direction}>
      <h2 className="text-xl font-bold text-[#101218] mb-1">שאלות סגירה</h2>
      <p className="text-sm text-gray-500 mb-6">הערות נוספות שתרצו לשתף איתנו</p>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        הערות / מידע נוסף
      </label>
      <textarea
        rows={5}
        value={data.closingRemarks || ''}
        onChange={(e) => setData({ ...data, closingRemarks: e.target.value })}
        placeholder="כל מידע נוסף שיעזור לנו להכין את ההצעה המדויקת ביותר עבורכם..."
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm outline-none focus:border-[#4175fc] transition-colors resize-none"
      />

      <NavButtons
        onNext={onNext}
        onBack={onBack}
        nextLabel="לסיכום ואישור"
      />
    </StepCard>
  );
}
