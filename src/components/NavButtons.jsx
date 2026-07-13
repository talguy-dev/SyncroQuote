export default function NavButtons({ onNext, onBack, nextLabel = 'המשך', backLabel = 'חזרה', nextDisabled = false, showBack = true }) {
  return (
    <div className="flex items-center justify-between mt-8 gap-4">
      {showBack ? (
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-[#4175fc] hover:text-[#4175fc] transition-all"
        >
          {backLabel}
        </button>
      ) : <div />}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`px-8 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm
          ${nextDisabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-[#4175fc] text-white hover:bg-[#2e5fe8] hover:shadow-md active:scale-95'
          }`}
      >
        {nextLabel}
      </button>
    </div>
  );
}
