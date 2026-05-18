import React from 'react';

import { interpolate, useCurrentFrame } from 'remotion';

export interface BarDataPoint {
  x: number;
  y: number;
  label: string;
}

interface BarChartProps {
  data: BarDataPoint[];
  colors?: string[];
  chartWidth?: number;
  chartHeight?: number;
  padding?: number;
  startFrame?: number;
  staggerFrames?: number;
  barRadius?: number;
}

const defaultColors = [
  '#4361ee',
  '#3a0ca3',
  '#7209b7',
  '#f72585',
  '#4cc9f0',
  '#4895ef',
  '#560bad',
  '#b5179e',
  '#f15bb5',
  '#00b4d8',
];

export const BarChart: React.FC<BarChartProps> = ({
  barRadius = 6,
  chartHeight = 500,
  chartWidth = 900,
  colors = defaultColors,
  data,
  padding = 60,
  staggerFrames = 3,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();

  const xScale = (x: number) =>
    (x / Math.max(data.length - 1, 1)) * (chartWidth - padding * 2) + padding;
  const yScale = (y: number) => chartHeight - padding - (y / 100) * (chartHeight - padding * 2);

  const barWidth = ((chartWidth - padding * 2) / data.length) * 0.7;

  return (
    <svg width={chartWidth} height={chartHeight}>
      {/* X-axis line */}
      <line
        x1={padding}
        y1={chartHeight - padding}
        x2={chartWidth - padding}
        y2={chartHeight - padding}
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="2"
      />

      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((val) => {
        const y = yScale(val);
        return (
          <g key={`grid-${val}`}>
            <line
              x1={padding}
              y1={y}
              x2={chartWidth - padding}
              y2={y}
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="1"
            />
            <text
              x={padding - 12}
              y={y + 5}
              textAnchor="end"
              fill="rgba(255, 255, 255, 0.4)"
              fontSize="12"
            >
              {val}
            </text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {data.map((point, i) => (
        <text
          key={`x-label-${i}`}
          x={xScale(point.x)}
          y={chartHeight - padding + 25}
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.7)"
          fontSize="13"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          {point.label}
        </text>
      ))}

      {/* Bars */}
      {data.map((point, i) => {
        const barHeight = (point.y / 100) * (chartHeight - padding * 2);
        const barProgress = interpolate(
          frame - startFrame,
          [i * staggerFrames, 15 + i * staggerFrames],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const currentHeight = Math.max(0, barHeight * barProgress);
        const currentY = chartHeight - padding - currentHeight;

        const valueOpacity = interpolate(
          frame - startFrame,
          [i * staggerFrames + 12, i * staggerFrames + 18],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <g key={`bar-${i}`}>
            <rect
              x={xScale(point.x) - barWidth / 2}
              y={currentY}
              width={barWidth}
              height={currentHeight}
              fill={colors[i % colors.length]}
              rx={barRadius}
              ry={barRadius}
            />
            {/* Value label on top of bar */}
            <text
              x={xScale(point.x)}
              y={currentY - 10}
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
              opacity={valueOpacity}
            >
              {point.y}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
