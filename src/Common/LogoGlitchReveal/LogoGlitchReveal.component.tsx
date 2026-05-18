import React from 'react';

import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface LogoGlitchRevealProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoGlitchReveal: React.FC<LogoGlitchRevealProps> = ({
  companyName = 'Complete Automate',
  logoText = 'CA',
  tagline = 'Building the future',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const settleProgress = spring({
    config: { damping: 15, mass: 0.5, stiffness: 100 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const opacity = interpolate(settleProgress, [0, 0.05, 0.95, 1], [0, 0.7, 0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glitchActive = frame < 30;

  const redOffset = glitchActive
    ? interpolate(Math.abs(random(`red-${Math.floor(frame / 3)}`)), [0, 1], [0, 8], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }) * (random(`rdir-${frame}`) > 0.5 ? 1 : -1)
    : 0;

  const cyanOffset = glitchActive
    ? interpolate(Math.abs(random(`cyan-${Math.floor(frame / 3)}`)), [0, 1], [0, 8], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }) * (random(`cdir-${frame}`) > 0.5 ? 1 : -1)
    : 0;

  const glitchVisible = glitchActive && random(`glitch-${Math.floor(frame / 2)}`) > 0.4;

  const nameOpacity = spring({
    config: { damping: 14, mass: 0.4, stiffness: 120 },
    fps,
    frame: frame - 20,
    from: 0,
    to: 1,
  });

  const taglineOpacity = spring({
    config: { damping: 14, mass: 0.4, stiffness: 120 },
    fps,
    frame: frame - 35,
    from: 0,
    to: 1,
  });

  const baseStyle: React.CSSProperties = {
    color: '#0891B2',
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: '5rem',
    fontWeight: 900,
    letterSpacing: '0.1em',
    marginBottom: 16,
    position: 'absolute',
    textShadow: '0 0 40px rgba(8, 145, 178, 0.3)',
  };

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ marginBottom: 16, position: 'relative' }}>
        {/* Main clean logo */}
        <div
          style={{
            ...baseStyle,
            opacity,
            position: 'relative',
            transform: `scale(${settleProgress})`,
            zIndex: 3,
          }}
        >
          {logoText}
        </div>

        {/* Red channel (glitch) */}
        {glitchVisible && (
          <div
            style={{
              ...baseStyle,
              color: '#FF0000',
              left: redOffset,
              opacity: 0.6,
              position: 'absolute',
              textShadow: '0 0 20px #FF0000',
              top: 0,
              zIndex: 2,
            }}
          >
            {logoText}
          </div>
        )}

        {/* Cyan channel (glitch) */}
        {glitchVisible && (
          <div
            style={{
              ...baseStyle,
              color: '#00FFFF',
              left: cyanOffset,
              opacity: 0.6,
              position: 'absolute',
              textShadow: '0 0 20px #00FFFF',
              top: 0,
              zIndex: 1,
            }}
          >
            {logoText}
          </div>
        )}
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
          opacity: nameOpacity,
          transform: `translateY(${(1 - nameOpacity) * 20}px)`,
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
          opacity: taglineOpacity,
          textTransform: 'uppercase',
          transform: `translateY(${(1 - taglineOpacity) * 15}px)`,
        }}
      >
        {tagline}
      </div>
    </AbsoluteFill>
  );
};
