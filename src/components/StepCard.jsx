import { useEffect, useRef } from 'react';

export default function StepCard({ children, direction = 'forward' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove('anim-forward', 'anim-backward');
    void el.offsetWidth;
    el.classList.add(direction === 'forward' ? 'anim-forward' : 'anim-backward');
  }, [direction]);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-xl mx-auto"
    >
      {children}
    </div>
  );
}
