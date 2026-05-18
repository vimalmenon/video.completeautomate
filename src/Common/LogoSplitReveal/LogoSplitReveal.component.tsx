import React from 'react';

import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface LogoSplitRevealProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoSplitReveal: React.FC<LogoSplitRevealProps> = ({
  companyName = 'Complete Automate',
  logoText = 'CA',
  tagline = 'Building the future',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const splitProgress = spring({
    config: { damping: 10, mass: 0.5, stiffness: 80 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const firstHalf =
    logoText.length > 1 ? logoText.slice(0, Math.ceil(logoText.length / 2)) : logoText[0] || '';
  const secondHalf = logoText.length > 1 ? logoText.slice(Math.ceil(logoText.length / 2)) : '';

  const leftOffset = interpolate(splitProgress, [0, 1], [0, -60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rightOffset = interpolate(splitProgress, [0, 1], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(splitProgress, [0, 0.3, 1], [0, 0.6, 1], {
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
      {/* Split Logo */}
      <div
        style={{
          alignItems: 'center',
          color: '#0891B2',
          display: 'flex',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '5rem',
          fontWeight: 900,
          justifyContent: 'center',
          letterSpacing: '0.1em',
          marginBottom: 16,
          textShadow: '0 0 40px rgba(8, 145, 178, 0.3)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            opacity,
            transform: `translateX(${leftOffset}px)`,
          }}
        >
          {firstHalf}
        </span>
        <span
          style={{
            display: 'inline-block',
            opacity,
            transform: `translateX(${rightOffset}px)`,
          }}
        >
          {secondHalf}
        </span>
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
