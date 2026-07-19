const VIDEO_SRC = '/סרטון תדמית רקע.mp4';

export default function IntroScreen({ onStart }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#101218',
      }}
    >
      {/* ── Background video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* ── Gradient overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(16,18,24,0.55) 0%, rgba(16,18,24,0.2) 45%, rgba(16,18,24,0.88) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 24px 44px',
          direction: 'rtl',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
          <div
            style={{
              fontSize: '26px',
              fontWeight: '800',
              color: '#fff',
              letterSpacing: '3px',
              lineHeight: 1,
            }}
          >
            SYNCRO
          </div>
          <div
            style={{
              fontSize: '9.5px',
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontWeight: '500',
            }}
          >
            Engineering Intelligence
          </div>
        </div>

        {/* Bottom block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Tagline */}
          <div>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#fff',
                lineHeight: '1.25',
                marginBottom: '10px',
                textAlign: 'right',
              }}
            >
              הצעת מחיר<br />מותאמת לפרויקט שלך
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.72)',
                textAlign: 'right',
                lineHeight: '1.65',
                fontWeight: '400',
              }}
            >
              תהליך מהיר ופשוט — ממלאים, אנחנו מכינים
            </p>
          </div>

          {/* CTA button */}
          <button
            onClick={onStart}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '16px',
              backgroundColor: '#4175fc',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 28px rgba(65,117,252,0.5)',
              minHeight: '56px',
              textAlign: 'center',
              letterSpacing: '0.3px',
            }}
          >
            בואו נתחיל ←
          </button>
        </div>
      </div>
    </div>
  );
}
