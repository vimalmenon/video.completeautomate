import React from 'react';

import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface LogoStrokeDrawProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoStrokeDraw: React.FC<LogoStrokeDrawProps> = ({
  companyName = 'Complete Automate',
  logoText = 'CA',
  tagline = 'Building the future',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const drawProgress = spring({
    config: { damping: 12, mass: 0.5, stiffness: 100 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const strokeDashoffset = interpolate(drawProgress, [0, 1], [200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fillOpacity = interpolate(drawProgress, [0.5, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const nameSpr = spring({
    config: { damping: 14, mass: 0.4, stiffness: 120 },
    fps,
    frame: frame - 30,
    from: 0,
    to: 1,
  });

  const taglineSpr = spring({
    config: { damping: 14, mass: 0.4, stiffness: 120 },
    fps,
    frame: frame - 45,
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* SVG Logo Text */}
      <svg width="500" height="120" viewBox="0 0 500 120" style={{ marginBottom: 16 }}>
        <text
          x="250"
          y="80"
          textAnchor="middle"
          fontSize="90"
          fontWeight={900}
          fontFamily="'Inter', system-ui, sans-serif"
          fill={fillOpacity > 0 ? '#0891B2' : 'transparent'}
          fillOpacity={fillOpacity}
          stroke="#0891B2"
          strokeWidth={3}
          strokeDasharray="200"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {logoText}
        </text>
      </svg>

      {/* Company Name */}
      <Sequence from={30}>
        <div
          style={{
            color: '#FFFFFF',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            marginBottom: 8,
            opacity: nameSpr,
            transform: `translateY(${(1 - nameSpr) * 20}px)`,
          }}
        >
          {companyName}
        </div>
      </Sequence>

      {/* Tagline */}
      <Sequence from={45}>
        <div
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '1.1rem',
            fontWeight: 400,
            letterSpacing: '0.15em',
            opacity: taglineSpr,
            textTransform: 'uppercase',
            transform: `translateY(${(1 - taglineSpr) * 15}px)`,
          }}
        >
          {tagline}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
