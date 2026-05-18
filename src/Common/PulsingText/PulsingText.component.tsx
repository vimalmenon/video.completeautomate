import React from 'react';

import { useCurrentFrame } from 'remotion';

interface PulsingTextProps {
  text?: string;
  color?: string;
  fontSize?: string;
  minScale?: number;
  maxScale?: number;
  speed?: number;
}

export const PulsingText: React.FC<PulsingTextProps> = ({
  color = '#f72585',
  fontSize = '6rem',
  maxScale = 1.15,
  minScale = 1,
  speed = 8,
  text = 'PULSING',
}) => {
  const frame = useCurrentFrame();

  const scale = 1 + Math.sin((frame / speed) * Math.PI) * ((maxScale - minScale) / 2);

  const opacity = 0.7 + Math.sin((frame / speed) * Math.PI) * 0.15;

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          color,
          fontFamily: "'Impact', 'Arial Black', sans-serif",
          fontSize,
          fontWeight: 900,
          letterSpacing: '0.05em',
          opacity,
          textShadow: `0 0 20px ${color}60, 0 0 40px ${color}30`,
          transform: `scale(${scale})`,
        }}
      >
        {text}
      </span>
    </div>
  );
};
