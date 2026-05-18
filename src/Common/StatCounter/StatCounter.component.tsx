import React from 'react';

import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface StatCounterProps {
  value: number;
  label: string;
  startFrame?: number;
  suffix?: string;
  color?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  color = '#22D3EE',
  label,
  startFrame = 0,
  suffix = '',
  value,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    config: {
      damping: 12,
      mass: 0.5,
    },
    fps,
    frame: frame - startFrame,
  });

  const displayValue = Math.round(interpolate(progress, [0, 1], [0, value]));

  const opacity = interpolate(frame - startFrame, [-5, 5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const y = interpolate(frame - startFrame, [0, 20], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <span
        style={{
          color,
          fontFamily: 'system-ui, sans-serif',
          fontSize: 72,
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {displayValue.toLocaleString()}
        {suffix}
      </span>
      <span
        style={{
          color: '#94A3B8',
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: '0.05em',
          marginTop: 8,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
};
