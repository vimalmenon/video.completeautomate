import React, { useMemo } from 'react';

import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface GridPulseProps {
  gridSize?: number;
  pulseColor?: string;
  dotColor?: string;
}

export const GridPulse: React.FC<GridPulseProps> = ({
  dotColor = '#ffffff',
  gridSize = 20,
  pulseColor = '#0891B2',
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const cols = Math.ceil(width / gridSize);
  const rows = Math.ceil(height / gridSize);

  // Multiple pulse centers that radiate outward
  const pulseCenters = useMemo(() => {
    const centers = [];
    const centerCount = 3;
    for (let i = 0; i < centerCount; i++) {
      centers.push({
        period: 100 + i * 30,
        phase: i * 40,
        x: Math.cos((i / centerCount) * Math.PI * 2) * width * 0.25 + width / 2,
        y: Math.sin((i / centerCount) * Math.PI * 2) * height * 0.2 + height / 2,
      });
    }
    return centers;
  }, [width, height]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', overflow: 'hidden' }}>
      <svg width={width} height={height}>
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const cx = col * gridSize;
            const cy = row * gridSize;

            // Compute influence from each pulse center
            let totalInfluence = 0;
            for (const pc of pulseCenters) {
              const dist = Math.sqrt((cx - pc.x) ** 2 + (cy - pc.y) ** 2);
              const pulseProgress = ((frame + pc.phase) % pc.period) / pc.period;
              const pulseRadius = pulseProgress * Math.max(width, height) * 0.6;
              const influence = Math.max(0, 1 - Math.abs(dist - pulseRadius) / 100);
              totalInfluence = Math.max(totalInfluence, influence);
            }

            const dotOpacity = interpolate(totalInfluence, [0, 0.3, 0.8], [0.15, 0.6, 1], {
              easing: Easing.out(Easing.cubic),
            });
            const dotRadius = interpolate(totalInfluence, [0, 1], [1.5, 4]);

            return (
              <circle
                key={`${row}-${col}`}
                cx={cx}
                cy={cy}
                r={dotRadius}
                fill={totalInfluence > 0.3 ? pulseColor : dotColor}
                opacity={dotOpacity}
              />
            );
          })
        )}
      </svg>
    </AbsoluteFill>
  );
};
