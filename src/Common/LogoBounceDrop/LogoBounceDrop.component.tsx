import React from 'react';

import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface LogoBounceDropProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoBounceDrop: React.FC<LogoBounceDropProps> = ({
  companyName = 'Complete Automate',
  logoText = 'CA',
  tagline = 'Building the future',
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const dropSpring = spring({
    config: { damping: 8, mass: 1.2, stiffness: 70 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const dropY = interpolate(dropSpring, [0, 1], [-height / 2 - 100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(dropSpring, [0, 0.7, 0.85, 0.95, 1], [0.8, 1.15, 0.92, 1.05, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(dropSpring, [0, 0.05, 1], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const nameSpr = spring({
    config: { damping: 14, mass: 0.4, stiffness: 120 },
    fps,
    frame: frame - 25,
    from: 0,
    to: 1,
  });

  const taglineSpr = spring({
    config: { damping: 14, mass: 0.4, stiffness: 120 },
    fps,
    frame: frame - 40,
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
      {/* Logo */}
      <div
        style={{
          color: '#0891B2',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '5rem',
          fontWeight: 900,
          letterSpacing: '0.1em',
          marginBottom: 16,
          opacity,
          textShadow: '0 0 40px rgba(8, 145, 178, 0.3)',
          transform: `translateY(${dropY}px) scale(${scale})`,
        }}
      >
        {logoText}
      </div>

      {/* Company Name */}
      <Sequence from={25}>
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
      <Sequence from={40}>
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
