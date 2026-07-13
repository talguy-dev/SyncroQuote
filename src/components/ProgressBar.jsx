export default function ProgressBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="px-5 pt-4 pb-3 shrink-0" style={{ backgroundColor: '#f4f6fb' }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold" style={{ color: '#4175fc' }}>{pct}%</span>
        <span className="text-[11px] font-medium" style={{ color: '#6b7280' }}>{label}</span>
        <span className="text-[11px]" style={{ color: '#9ca3af' }}>
          {current}/{total}
        </span>
      </div>
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: '#e5e7eb' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(to left, #4175fc, #7aa2ff)',
          }}
        />
      </div>
    </div>
  );
}
