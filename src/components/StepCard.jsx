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
      className="rounded-2xl w-full"
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 8px rgba(13,27,42,0.07)',
        border: '1px solid rgba(13,27,42,0.1)',
        padding: '22px 18px',
      }}
    >
      {children}
    </div>
  );
}
