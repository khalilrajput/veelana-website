import React, { useEffect, useState, useRef } from 'react';

export default function FloatingHairCanvas() {
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let start = Date.now();
    const animate = () => {
      setTime(Date.now() - start);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Continuous organic wave sway + scroll upward flow
  const flowOffsetY1 = (scrollY * -0.4) % 400;
  const flowOffsetY2 = (scrollY * -0.55) % 400;
  const waveSway1 = Math.sin(time * 0.0018 + scrollY * 0.003) * 7;
  const waveSway2 = Math.cos(time * 0.0022 + scrollY * 0.004) * 9;

  // Ultra-fine realistic hair strand paths shifted inward (x=50..120) to prevent right-edge clipping
  const hairStrandsGroup1 = [
    { d: "M 110, 700 Q 60, 500 100, 300 T 80, -100", stroke: "#0D0A08", width: 1.3, opacity: 0.95 },
    { d: "M 115, 710 Q 65, 510 105, 310 T 85, -90", stroke: "#1C130E", width: 0.9, opacity: 0.9 },
    { d: "M 105, 690 Q 55, 490 95, 290 T 75, -110", stroke: "#2C1D15", width: 1.4, opacity: 0.85 },
    { d: "M 120, 720 Q 70, 520 110, 320 T 90, -80", stroke: "#3D271D", width: 0.8, opacity: 0.8 },
    { d: "M 100, 680 Q 50, 480 90, 280 T 70, -120", stroke: "#18100C", width: 1.1, opacity: 0.95 },
    { d: "M 112, 705 Q 62, 505 102, 305 T 82, -95", stroke: "#4A3125", width: 0.7, opacity: 0.75 },
    { d: "M 118, 715 Q 68, 515 108, 315 T 88, -85", stroke: "#0A0706", width: 1.3, opacity: 0.9 },
  ];

  const hairStrandsGroup2 = [
    { d: "M 120, 750 Q 70, 550 110, 350 T 90, -50", stroke: "#0B0806", width: 1.3, opacity: 0.9 },
    { d: "M 125, 760 Q 75, 560 115, 360 T 95, -40", stroke: "#221610", width: 0.9, opacity: 0.85 },
    { d: "M 113, 735 Q 63, 535 103, 335 T 83, -65", stroke: "#382319", width: 1.1, opacity: 0.8 },
    { d: "M 118, 745 Q 68, 545 108, 345 T 88, -55", stroke: "#140D0A", width: 1.4, opacity: 0.95 },
    { d: "M 107, 725 Q 57, 525 97, 325 T 77, -75", stroke: "#472F22", width: 0.7, opacity: 0.7 },
  ];

  return (
    <div
      className="floating-hair-side-canvas"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100px',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 35,
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 140 800"
        preserveAspectRatio="xMaxYMin meet"
        style={{ filter: 'drop-shadow(-2px 4px 8px rgba(0, 0, 0, 0.25))', background: 'transparent' }}
      >
        <defs>
          <filter id="hairSheen" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Group 1: Continuous Organic Moving Hair Lock */}
        <g style={{ transform: `translate3d(${waveSway1}px, ${flowOffsetY1}px, 0)` }} filter="url(#hairSheen)">
          {hairStrandsGroup1.map((s, idx) => (
            <path
              key={`g1-${idx}`}
              d={s.d}
              fill="none"
              stroke={s.stroke}
              strokeWidth={s.width}
              strokeOpacity={s.opacity}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Group 2: Secondary Waves */}
        <g style={{ transform: `translate3d(${waveSway2}px, ${flowOffsetY2}px, 0)` }} filter="url(#hairSheen)">
          {hairStrandsGroup2.map((s, idx) => (
            <path
              key={`g2-${idx}`}
              d={s.d}
              fill="none"
              stroke={s.stroke}
              strokeWidth={s.width}
              strokeOpacity={s.opacity}
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
