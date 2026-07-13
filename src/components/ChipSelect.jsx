const OTHER_LABEL = 'אחר';

export default function ChipSelect({
  options,
  value,
  onChange,
  multi = false,
  otherValue = '',
  onOtherChange,
}) {
  const selected = multi ? (value || []) : value;
  const hasOtherOption = options.includes(OTHER_LABEL);

  const toggle = (opt) => {
    if (multi) {
      const arr = selected.includes(opt)
        ? selected.filter((x) => x !== opt)
        : [...selected, opt];
      onChange(arr);
    } else {
      onChange(opt === selected ? null : opt);
    }
  };

  const selectedIsOther = multi
    ? (selected || []).includes(OTHER_LABEL)
    : selected === OTHER_LABEL;

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = multi ? selected.includes(opt) : selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`chip ${isSelected ? 'selected' : ''}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {hasOtherOption && selectedIsOther && onOtherChange && (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="פרט..."
          autoFocus
          className="w-full rounded-xl text-sm outline-none mt-3"
          style={{
            padding: '12px 14px',
            border: '2px solid #4175fc',
            backgroundColor: '#fafbff',
            fontSize: '16px',
          }}
        />
      )}
    </div>
  );
}
