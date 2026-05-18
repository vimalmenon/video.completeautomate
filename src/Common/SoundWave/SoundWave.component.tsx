import React from 'react';

import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface SoundWaveProps {
  numBars?: number;
  barColor?: string;
}

export const SoundWave: React.FC<SoundWaveProps> = ({ barColor = '#0891B2', numBars = 40 }) => {
  const frame = useCurrentFrame();

  const bars = Array.from({ length: numBars }, (_, i) => {
    const phase = (i / numBars) * Math.PI * 4;
    const phase2 = (i / numBars) * Math.PI * 7;

    // Multi-frequency sin wave for organic look
    const value =
      Math.sin(frame * 0.08 + phase) * 0.4 +
      Math.sin(frame * 0.12 + phase2) * 0.3 +
      Math.sin(frame * 0.05 + i * 0.3) * 0.3;

    // Normalize to 0-1 range
    const normalized = (value + 1) / 2;

    // Add some base size variation
    const baseSize = 0.15 + (i / numBars) * 0.1;

    return {
      height: Math.max(0.05, normalized * 0.85 + baseSize),
      index: i,
    };
  });

  const barWidth = Math.max(4, 600 / numBars);
  const gap = Math.max(1, barWidth * 0.3);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap,
          height: 300,
          justifyContent: 'center',
        }}
      >
        {bars.map((bar, i) => {
          const maxHeight = 200;
          const barHeight = bar.height * maxHeight;

          const opacity = interpolate(bar.height, [0.05, 0.5, 1], [0.2, 0.8, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const hueShift = (i / numBars) * 30;

          return (
            <div
              key={i}
              style={{
                backgroundColor: barColor,
                borderRadius: barWidth / 2,
                boxShadow: bar.height > 0.7 ? `0 0 12px ${barColor}` : 'none',
                filter: `brightness(${0.6 + bar.height * 0.6}) hue-rotate(${hueShift}deg)`,
                height: barHeight,
                opacity,
                transformOrigin: 'bottom center',
                width: barWidth,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
