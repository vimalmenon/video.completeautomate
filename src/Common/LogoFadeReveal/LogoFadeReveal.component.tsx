import React from 'react';

import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface LogoFadeRevealProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoFadeReveal: React.FC<LogoFadeRevealProps> = ({
  companyName = 'Complete Automate',
  logoText = 'CA',
  tagline = 'Building the future',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpr = spring({
    config: { damping: 12, mass: 0.5, stiffness: 100 },
    fps,
    frame: frame - 0,
    from: 0,
    to: 1,
  });

  const nameSpr = spring({
    config: { damping: 14, mass: 0.4, stiffness: 120 },
    fps,
    frame: frame - 20,
    from: 0,
    to: 1,
  });

  const taglineSpr = spring({
    config: { damping: 14, mass: 0.4, stiffness: 120 },
    fps,
    frame: frame - 35,
    from: 0,
    to: 1,
  });

  const logScale = interpolate(logoSpr, [0, 1], [0.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const logOpacity = interpolate(logoSpr, [0, 0.5, 1], [0, 0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
          opacity: logOpacity,
          textShadow: '0 0 40px rgba(8, 145, 178, 0.3)',
          transform: `scale(${logScale})`,
        }}
      >
        {logoText}
      </div>

      {/* Company Name */}
      <Sequence from={20}>
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
      <Sequence from={35}>
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
