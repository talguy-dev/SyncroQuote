import { useCallback, useEffect, useRef, useState } from 'react';

const VIDEO_SRC = '/סרטון תדמית רקע.mp4';

export default function IntroScreen({ onStart }) {
  const videoRef   = useRef(null);
  const [zoomScale, setZoomScale] = useState(1);   // cover-equivalent scale
  const [zoomedOut, setZoomedOut] = useState(false);

  // Once video metadata is known, calculate the scale that makes objectFit:contain look like objectFit:cover
  const handleLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const cw = v.parentElement?.clientWidth  || window.innerWidth;
    const ch = v.parentElement?.clientHeight || window.innerHeight;
    const coverScale   = Math.max(cw / v.videoWidth, ch / v.videoHeight);
    const containScale = Math.min(cw / v.videoWidth, ch / v.videoHeight);
    setZoomScale(coverScale / containScale);
  }, []);

  // Zoom out in the last 2 s; snap back instantly when the video loops
  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const nearEnd = v.currentTime >= v.duration - 2;
    setZoomedOut((prev) => {
      if (prev === nearEnd) return prev;
      return nearEnd;
    });
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.addEventListener('loadedmetadata', handleLoadedMetadata);
    v.addEventListener('timeupdate',     handleTimeUpdate);
    return () => {
      v.removeEventListener('loadedmetadata', handleLoadedMetadata);
      v.removeEventListener('timeupdate',     handleTimeUpdate);
    };
  }, [handleLoadedMetadata, handleTimeUpdate]);

  const scale = zoomedOut ? 1 : zoomScale;

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
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
          // Animate the zoom-out; snap back instantly on loop
          transition: zoomedOut ? 'transform 1.5s ease-in-out' : 'none',
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
