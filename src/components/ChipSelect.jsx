export default function ChipSelect({ options, value, onChange, multi = false }) {
  const selected = multi ? (value || []) : value;

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

  return (
    <div className="flex flex-wrap gap-3 mt-4">
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
  );
}
