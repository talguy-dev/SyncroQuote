export default function ProgressBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full px-6 pt-6 pb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-[#4175fc]">{pct}%</span>
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs text-gray-400">שלב {current} מתוך {total}</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-l from-[#4175fc] to-[#7aa2ff] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
