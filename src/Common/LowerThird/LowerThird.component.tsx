import React from 'react';

import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface LowerThirdProps {
  name: string;
  title: string;
  accentColor?: string;
}

export const LowerThird: React.FC<LowerThirdProps> = ({
  accentColor = '#0891B2',
  name = 'John Doe',
  title = 'Software Engineer',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bar slides in from left
  const barSpring = spring({
    config: { damping: 14, mass: 0.4, stiffness: 90 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const barTranslateX = interpolate(barSpring, [0, 1], [-500, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Text fades in after bar arrives
  const textOpacity = interpolate(frame, [12, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textTranslateX = interpolate(frame, [12, 25], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        alignItems: 'flex-start',
        bottom: 80,
        display: 'flex',
        flexDirection: 'column',
        left: 0,
        position: 'absolute',
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          backgroundColor: accentColor,
          borderRadius: '0 3px 3px 0',
          height: 6,
          marginBottom: 8,
          transform: `translateX(${barTranslateX}px)`,
          width: 80,
        }}
      />

      {/* Name & title box */}
      <div
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          borderLeft: `4px solid ${accentColor}`,
          borderRadius: '0 8px 8px 0',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          padding: '14px 28px',
          transform: `translateX(${barTranslateX}px)`,
        }}
      >
        <div
          style={{
            color: '#FFFFFF',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.2,
            opacity: textOpacity,
            transform: `translateX(${textTranslateX}px)`,
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: accentColor,
            fontFamily: 'system-ui, sans-serif',
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: '0.03em',
            marginTop: 2,
            opacity: textOpacity,
            transform: `translateX(${textTranslateX}px)`,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
