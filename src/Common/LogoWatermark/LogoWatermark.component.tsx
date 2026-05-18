import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface LogoWatermarkProps {
  logoText: string;
  position?: 'bottom-right' | 'top-left' | 'center';
}

export const LogoWatermark: React.FC<LogoWatermarkProps> = ({
  logoText = 'CA',
  position = 'bottom-right',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({
    config: { damping: 16, mass: 0.4, stiffness: 120 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const opacity = interpolate(fadeIn, [0, 1], [0, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const positionStyle: React.CSSProperties = (() => {
    switch (position) {
      case 'top-left':
        return { left: 24, top: 24 };
      case 'center':
        return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
      case 'bottom-right':
      default:
        return { bottom: 24, right: 24 };
    }
  })();

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          ...positionStyle,
          color: '#FFFFFF',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '3rem',
          fontWeight: 900,
          letterSpacing: '0.1em',
          opacity,
          textShadow: '0 0 20px rgba(8, 145, 178, 0.15)',
        }}
      >
        {logoText}
      </div>
    </AbsoluteFill>
  );
};
