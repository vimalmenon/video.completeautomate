import React, { useMemo } from 'react';

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

interface LiquidWaveProps {
  waveCount?: number;
  baseColor?: string;
  opacity?: number;
}

export const LiquidWave: React.FC<LiquidWaveProps> = ({
  baseColor = '#0891B2',
  opacity = 0.25,
  waveCount = 4,
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const waves = useMemo(
    () =>
      Array.from({ length: waveCount }).map((_, i) => {
        const amplitude = 20 + i * 12;
        const frequency = 0.004 + i * 0.0015;
        const speed = 0.02 + i * 0.008;
        const phase = i * 1.8;
        const verticalOffset = (height / (waveCount + 1)) * (i + 1);
        const waveHue = 190 + i * 15;
        return {
          amplitude,
          frequency,
          phase,
          speed,
          verticalOffset,
          waveHue,
        };
      }),
    [waveCount, height]
  );

  const generatePath = (wave: (typeof waves)[0], yOffset: number): string => {
    const points = 120;
    let path = '';
    for (let p = 0; p <= points; p++) {
      const x = (p / points) * width;
      const y =
        wave.verticalOffset +
        yOffset +
        Math.sin(x * wave.frequency + frame * wave.speed + wave.phase) * wave.amplitude * 1.0 +
        Math.sin(x * wave.frequency * 2.3 + frame * wave.speed * 0.7 + wave.phase * 1.5) *
          wave.amplitude *
          0.4 +
        Math.sin(x * wave.frequency * 0.5 + frame * wave.speed * 1.3 + wave.phase * 0.3) *
          wave.amplitude *
          0.3;
      if (p === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }
    // Close the path down and back
    path += ` L ${width} ${height + 50} L 0 ${height + 50} Z`;
    return path;
  };

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <svg width={width} height={height}>
        {waves.map((wave, i) => {
          const path = generatePath(wave, -i * 30);
          return (
            <path
              key={i}
              d={path}
              fill={`hsla(${wave.waveHue}, 80%, 55%, ${opacity - i * 0.04})`}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
