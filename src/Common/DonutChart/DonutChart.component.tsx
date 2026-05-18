import React from 'react';

import { interpolate, useCurrentFrame } from 'remotion';

interface DonutSlice {
  value: number;
  label: string;
  color: string;
}

interface DonutChartProps {
  data: DonutSlice[];
  centreValue?: number;
  centreLabel?: string;
  chartSize?: number;
  strokeWidth?: number;
  startFrame?: number;
  staggerFrames?: number;
  title?: string;
}

export { type DonutSlice };

export const DonutChart: React.FC<DonutChartProps> = ({
  centreLabel,
  centreValue,
  chartSize = 500,
  data,
  staggerFrames = 15,
  startFrame = 0,
  strokeWidth = 40,
  title,
}) => {
  const frame = useCurrentFrame();
  const cx = chartSize / 2;
  const cy = chartSize / 2;
  const radius = (chartSize - strokeWidth) / 2 - 20;

  const total = data.reduce((s, d) => s + d.value, 0);
  const circumference = 2 * Math.PI * radius;
  const animatedValue =
    centreValue !== undefined
      ? Math.round(
          interpolate(frame - startFrame, [0, 40], [0, centreValue], { extrapolateRight: 'clamp' })
        )
      : undefined;

  let cumulativePercent = 0;

  return (
    <svg width={chartSize} height={chartSize}>
      {title && (
        <text
          x={cx}
          y={30}
          textAnchor="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="20"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          {title}
        </text>
      )}
      {data.map((slice, i) => {
        const slicePercent = slice.value / total;
        const sliceLength = circumference * slicePercent;
        const gap = circumference * 0.003;
        const progress = interpolate(
          frame - startFrame,
          [i * staggerFrames, 15 + i * staggerFrames],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const offset = circumference * cumulativePercent + gap / 2;
        const visibleLength = sliceLength * progress;
        cumulativePercent += slicePercent;

        return (
          <circle
            key={`slice-${i}`}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={slice.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${visibleLength} ${circumference - visibleLength}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        );
      })}

      {/* Legend */}
      {data.map((slice, i) => {
        const legendY = chartSize - data.length * 20 + i * 20;
        return (
          <g key={`legend-${i}`}>
            <rect x={cx - 100} y={legendY - 8} width={10} height={10} rx={2} fill={slice.color} />
            <text
              x={cx - 84}
              y={legendY + 1}
              fill="rgba(255,255,255,0.7)"
              fontSize="12"
              fontFamily="system-ui, sans-serif"
            >
              {slice.label}
            </text>
          </g>
        );
      })}

      {/* Centre value */}
      {animatedValue !== undefined && (
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fill="white"
          fontSize="36"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          {animatedValue}
          {centreLabel?.includes('%') ? '%' : ''}
        </text>
      )}
      {centreLabel && (
        <text
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize="14"
          fontFamily="system-ui, sans-serif"
        >
          {centreLabel.replace('%', '')}
        </text>
      )}
    </svg>
  );
};
