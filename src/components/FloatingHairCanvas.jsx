import React, { useEffect, useState } from 'react';

export default function FloatingHairCanvas() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Upward fluid flow motion connected to scroll offset
  const flowOffsetY1 = (scrollY * -0.45) % 500;
  const flowOffsetY2 = (scrollY * -0.6) % 500;
  const waveSway1 = Math.sin(scrollY * 0.005) * 12;
  const waveSway2 = Math.cos(scrollY * 0.004) * 15;

  // Ultra-fine realistic hair strand paths
  const hairStrandsGroup1 = [
    { d: "M 150, 700 Q 90, 500 130, 300 T 110, -100", stroke: "#0D0A08", width: 1.2, opacity: 0.95 },
    { d: "M 155, 710 Q 95, 510 135, 310 T 115, -90", stroke: "#1C130E", width: 0.9, opacity: 0.9 },
    { d: "M 145, 690 Q 85, 490 125, 290 T 105, -110", stroke: "#2C1D15", width: 1.4, opacity: 0.85 },
    { d: "M 160, 720 Q 100, 520 140, 320 T 120, -80", stroke: "#3D271D", width: 0.8, opacity: 0.8 },
    { d: "M 140, 680 Q 80, 480 120, 280 T 100, -120", stroke: "#18100C", width: 1.1, opacity: 0.95 },
    { d: "M 152, 705 Q 92, 505 132, 305 T 112, -95", stroke: "#4A3125", width: 0.7, opacity: 0.75 },
    { d: "M 158, 715 Q 98, 515 138, 315 T 118, -85", stroke: "#0A0706", width: 1.3, opacity: 0.9 },
    { d: "M 148, 695 Q 88, 495 128, 295 T 108, -105", stroke: "#251811", width: 1.0, opacity: 0.85 },
  ];

  const hairStrandsGroup2 = [
    { d: "M 160, 750 Q 100, 550 140, 350 T 120, -50", stroke: "#0B0806", width: 1.3, opacity: 0.9 },
    { d: "M 165, 760 Q 105, 560 145, 360 T 125, -40", stroke: "#221610", width: 0.9, opacity: 0.85 },
    { d: "M 153, 735 Q 93, 535 133, 335 T 113, -65", stroke: "#382319", width: 1.1, opacity: 0.8 },
    { d: "M 158, 745 Q 98, 545 138, 345 T 118, -55", stroke: "#140D0A", width: 1.4, opacity: 0.95 },
    { d: "M 147, 725 Q 87, 525 127, 325 T 107, -75", stroke: "#472F22", width: 0.7, opacity: 0.7 },
    { d: "M 162, 755 Q 102, 555 142, 355 T 122, -45", stroke: "#1A110D", width: 1.0, opacity: 0.9 },
  ];

  return (
    <div
      className="floating-hair-side-canvas"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '150px',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 30,
        overflow: 'hidden',
        opacity: 0.85
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 160 800"
        preserveAspectRatio="none"
        style={{ filter: 'drop-shadow(-2px 4px 10px rgba(0, 0, 0, 0.4))' }}
      >
        <defs>
          <filter id="hairSheen" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Group 1: Deep Black & Brown Real Hair Lock */}
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

        {/* Group 2: Secondary Natural Brown Accent Strands */}
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
