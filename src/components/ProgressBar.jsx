export default function ProgressBar({ phases, currentPhaseId, phaseProgress, phaseMeta }) {
  const currentPhaseIdx = phases.indexOf(currentPhaseId);
  const pct = phaseProgress.total > 0
    ? Math.round((phaseProgress.current / phaseProgress.total) * 100)
    : 0;
  const currentColor = phaseMeta[currentPhaseId]?.color || '#4175fc';

  return (
    <div className="px-4 pt-3 pb-3 shrink-0" style={{ backgroundColor: '#f4f6fb' }}>
      <div className="flex items-center gap-1 mb-2.5 overflow-x-auto">
        {phases.map((phaseId, i) => {
          const meta = phaseMeta[phaseId] || {};
          const isDone = i < currentPhaseIdx;
          const isCurrent = i === currentPhaseIdx;
          return (
            <div key={phaseId} className="flex items-center gap-1 shrink-0">
              <div
                className="px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap transition-all duration-300"
                style={{
                  backgroundColor: (isDone || isCurrent) ? meta.color : '#e5e7eb',
                  color: (isDone || isCurrent) ? 'white' : '#9ca3af',
                  fontWeight: isCurrent ? 700 : 500,
                  opacity: isDone ? 0.65 : 1,
                }}
              >
                {isDone ? '✓ ' : ''}{meta.label}
              </div>
              {i < phases.length - 1 && (
                <span style={{ color: '#d1d5db', fontSize: '9px' }}>▶</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: '#e5e7eb' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%`, backgroundColor: currentColor }}
          />
        </div>
        <span className="text-[10px] font-medium" style={{ color: '#9ca3af' }}>
          {phaseProgress.current}/{phaseProgress.total}
        </span>
      </div>
    </div>
  );
}
