import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface CinematicTitleProps {
  title: string;
  subtitle: string;
}

export const CinematicTitle: React.FC<CinematicTitleProps> = ({
  subtitle = 'A cinematic subtitle',
  title = 'Your Title Here',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    config: { damping: 12, mass: 0.5, stiffness: 80 },
    fps,
    frame: frame,
    from: 0,
    to: 1,
  });

  const subtitleOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleTranslateY = interpolate(titleSpring, [0, 1], [40, 0]);

  // Underline draws from center outward
  const underlineScaleX = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: '#FFFFFF',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            marginBottom: 16,
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          {title}
        </div>

        <div
          style={{
            background: 'linear-gradient(90deg, transparent, #0891B2, transparent)',
            height: 4,
            margin: '0 auto',
            marginBottom: 24,
            transform: `scaleX(${underlineScaleX})`,
            width: '80%',
          }}
        />

        <div
          style={{
            color: '#94A3B8',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 24,
            fontWeight: 400,
            letterSpacing: '0.05em',
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
