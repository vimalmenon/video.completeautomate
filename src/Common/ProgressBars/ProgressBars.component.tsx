import React from 'react';

import { interpolate, useCurrentFrame } from 'remotion';

interface ProgressBarItem {
  label: string;
  value: number;
  color: string;
}

interface ProgressBarsProps {
  data: ProgressBarItem[];
  startFrame?: number;
  staggerFrames?: number;
  totalWidth?: number;
  barHeight?: number;
}

export { type ProgressBarItem };

export const ProgressBars: React.FC<ProgressBarsProps> = ({
  barHeight = 28,
  data,
  staggerFrames = 8,
  startFrame = 0,
  totalWidth = 700,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        width: totalWidth,
      }}
    >
      {data.map((item, i) => {
        const delay = startFrame + i * staggerFrames;
        const progress = interpolate(frame - delay, [0, 25], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const currentWidth = totalWidth * (item.value / 100) * progress;

        const labelOpacity = interpolate(frame - delay, [0, 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const labelY = interpolate(frame - delay, [0, 10], [10, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const valueOpacity = interpolate(frame - delay, [15, 25], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div key={i}>
            {/* Label */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 6,
                opacity: labelOpacity,
                transform: `translateY(${labelY}px)`,
              }}
            >
              <span
                style={{
                  color: '#E2E8F0',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  color: item.color,
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 15,
                  fontWeight: 700,
                  opacity: valueOpacity,
                }}
              >
                {item.value}%
              </span>
            </div>
            {/* Bar track */}
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: barHeight / 2,
                height: barHeight,
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <div
                style={{
                  backgroundColor: item.color,
                  borderRadius: barHeight / 2,
                  boxShadow: `0 0 12px ${item.color}40`,
                  height: '100%',
                  transition: 'width 0.1s ease',
                  width: currentWidth,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
