import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface LogoSpinRevealProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoSpinReveal: React.FC<LogoSpinRevealProps> = ({
  companyName = 'Complete Automate',
  logoText = 'CA',
  tagline = 'Building the future',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spinProgress = spring({
    config: { damping: 12, mass: 0.6, stiffness: 90 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const rotateY = interpolate(spinProgress, [0, 1], [360, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(spinProgress, [0, 0.1, 0.8, 1], [0, 0.6, 0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(spinProgress, [0, 1], [0.5, 1], {
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
        perspective: 1400,
      }}
    >
      {/* Spinning Logo */}
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
          transform: `rotateY(${rotateY}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {logoText}
      </div>

      {/* Company Name */}
      <div
        style={{
          color: '#FFFFFF',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          marginBottom: 8,
          opacity: nameSpr,
          transform: nameSpr > 0 ? `translateY(${(1 - nameSpr) * 20}px)` : undefined,
        }}
      >
        {companyName}
      </div>

      {/* Tagline */}
      <div
        style={{
          color: 'rgba(255,255,255,0.6)',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '1.1rem',
          fontWeight: 400,
          letterSpacing: '0.15em',
          opacity: taglineSpr,
          textTransform: 'uppercase',
          transform: taglineSpr > 0 ? `translateY(${(1 - taglineSpr) * 15}px)` : undefined,
        }}
      >
        {tagline}
      </div>
    </AbsoluteFill>
  );
};
