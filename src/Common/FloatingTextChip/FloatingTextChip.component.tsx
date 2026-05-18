import React from 'react';

import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface FloatingTextChipProps {
  text?: string;
  startFrame?: number;
  color?: string;
  bgColor?: string;
  fontSize?: string;
}

export const FloatingTextChip: React.FC<FloatingTextChipProps> = ({
  bgColor = 'rgba(8, 145, 178, 0.15)',
  color = '#22D3EE',
  fontSize = '1.2rem',
  startFrame = 0,
  text = 'NEW FEATURE',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    config: { damping: 10, mass: 0.3, stiffness: 120 },
    fps,
    frame: frame - startFrame,
    from: 0,
    to: 1,
  });

  const y = spring({
    config: { damping: 8, mass: 0.4, stiffness: 100 },
    fps,
    frame: frame - startFrame,
    from: 30,
    to: 0,
  });

  const floatY = Math.sin((frame - startFrame) / 30) * 5;

  return (
    <div
      style={{
        alignItems: 'center',
        backdropFilter: 'blur(4px)',
        backgroundColor: bgColor,
        border: `1px solid ${color}30`,
        borderRadius: 100,
        boxShadow: `0 4px 20px ${color}20`,
        display: 'inline-flex',
        gap: 8,
        opacity,
        padding: '8px 18px',
        transform: `translateY(${y + floatY}px)`,
      }}
    >
      <span
        style={{
          backgroundColor: color,
          borderRadius: 4,
          display: 'inline-block',
          height: 8,
          opacity: 0.8,
          width: 8,
        }}
      />
      <span
        style={{
          color,
          fontFamily: 'system-ui, sans-serif',
          fontSize,
          fontWeight: 700,
          letterSpacing: '0.05em',
        }}
      >
        {text}
      </span>
    </div>
  );
};
