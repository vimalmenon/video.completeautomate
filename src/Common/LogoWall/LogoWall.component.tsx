import React from 'react';

import { interpolate, useCurrentFrame } from 'remotion';

interface LogoItem {
  name: string;
  color?: string;
}

interface LogoWallProps {
  logos: LogoItem[];
  startFrame?: number;
  cols?: number;
}

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const LogoWall: React.FC<LogoWallProps> = ({ cols = 4, logos, startFrame = 0 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: 'grid',
        gap: 20,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        margin: '0 auto',
        maxWidth: 1200,
        width: '80%',
      }}
    >
      {logos.map((logo, i) => {
        const delay = startFrame + i * 5;
        const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const scale = interpolate(frame - delay, [0, 15], [0.8, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const bgColor = logo.color || '#1E293B';
        const y = interpolate(frame - delay, [0, 20], [30, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              alignItems: 'center',
              backgroundColor: bgColor,
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              opacity,
              padding: '16px 12px',
              transform: `translateY(${y}px) scale(${scale})`,
            }}
          >
            <div
              style={{
                alignItems: 'center',
                backgroundColor: '#0F172A',
                borderRadius: 24,
                color: '#22D3EE',
                display: 'flex',
                fontSize: 16,
                fontWeight: 700,
                height: 48,
                justifyContent: 'center',
                marginBottom: 8,
                width: 48,
              }}
            >
              {getInitials(logo.name)}
            </div>
            <span
              style={{
                color: '#CBD5E1',
                fontSize: 12,
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              {logo.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
