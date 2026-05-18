import React from 'react';

import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface PoppingTextProps {
  text?: string;
  colors?: string[];
  fontSize?: string;
  startFrame?: number;
}

const defaultColors = ['#1e3a8a', '#3b82f6', '#A9D6E5'];

export const PoppingText: React.FC<PoppingTextProps> = ({
  colors = defaultColors,
  fontSize = '8rem',
  startFrame = 0,
  text = 'BINGO!',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.1em',
        justifyContent: 'center',
        perspective: '1000px',
      }}
    >
      {text.split('').map((char, i) => {
        const delay = startFrame + i * 7;
        const colorIndex = i % colors.length;

        const opacity = spring({
          config: { damping: 8, mass: 0.3, stiffness: 100 },
          fps,
          frame: frame - delay,
          from: 0,
          to: 1,
        });

        const y = spring({
          config: { damping: 6, mass: 0.5, stiffness: 120 },
          fps,
          frame: frame - delay,
          from: -200,
          to: 0,
        });

        const scale = spring({
          config: { damping: 7, mass: 0.4, stiffness: 150 },
          fps,
          frame: frame - delay,
          from: 0,
          to: 1.2,
        });

        const bounce =
          interpolate(Math.sin((frame - delay - 15) / 10), [-1, 1], [0, 25], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }) * Math.max(0, Math.min(1, (frame - delay - 15) / 20));

        const rotation =
          interpolate(Math.sin((frame - delay - 15) / 15), [-1, 1], [-15, 15], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }) * Math.max(0, Math.min(1, (frame - delay - 15) / 20));

        const rotateY = interpolate(Math.sin((frame - delay) / 20), [-1, 1], [-30, 30]);

        const shadowBlur = interpolate(Math.sin((frame - delay) / 8), [-1, 1], [5, 20]);

        const pulse =
          1 +
          interpolate(Math.sin((frame - delay) / 10), [-1, 1], [0, 0.2]) *
            Math.min(1, Math.max(0, (frame - delay - 20) / 30));

        return (
          <span
            key={i}
            style={{
              color: colors[colorIndex],
              display: 'inline-block',
              filter: `brightness(${1 + Math.sin((frame - delay) / 15) * 0.3})`,
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize,
              fontWeight: 900,
              letterSpacing: '0.05em',
              margin: '0 0.05em',
              mixBlendMode: 'screen',
              opacity,
              position: 'relative',
              textShadow: `0 0 ${shadowBlur}px ${colors[colorIndex]}80, 
                           0 0 ${shadowBlur * 1.5}px ${colors[colorIndex]}40,
                           -2px -2px 0 #fff, 2px -2px 0 #fff, 
                           -2px 2px 0 #fff, 2px 2px 0 #fff`,
              transform: `translateY(${y - bounce}px) scale(${scale * pulse}) 
                          rotate(${rotation}deg) rotateY(${rotateY}deg)`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </div>
  );
};
