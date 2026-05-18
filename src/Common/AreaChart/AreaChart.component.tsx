import React from 'react';

import { interpolate, useCurrentFrame } from 'remotion';

interface AreaDataPoint {
  x: number;
  y: number;
  label: string;
}

interface AreaChartProps {
  data: AreaDataPoint[];
  chartWidth?: number;
  chartHeight?: number;
  padding?: number;
  startFrame?: number;
  lineColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  durationInFrames?: number;
}

export { type AreaDataPoint };

export const AreaChart: React.FC<AreaChartProps> = ({
  chartHeight = 500,
  chartWidth = 900,
  data,
  durationInFrames = 60,
  gradientEnd = '#4361ee00',
  gradientStart = '#4361ee',
  lineColor = '#4361ee',
  padding = 60,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();

  const xScale = (x: number) =>
    (x / Math.max(data.length - 1, 1)) * (chartWidth - padding * 2) + padding;
  const yScale = (y: number) => chartHeight - padding - (y / 100) * (chartHeight - padding * 2);

  const linePoints = data.map((d) => `${xScale(d.x)},${yScale(d.y)}`).join(' ');
  const areaPoints =
    `${xScale(data[0].x)},${chartHeight - padding} ` +
    data.map((d) => `${xScale(d.x)},${yScale(d.y)}`).join(' ') +
    ` ${xScale(data[data.length - 1].x)},${chartHeight - padding}`;

  const clipWidth = interpolate(frame - startFrame, [0, durationInFrames], [0, chartWidth], {
    extrapolateRight: 'clamp',
  });

  return (
    <svg width={chartWidth} height={chartHeight}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradientStart} stopOpacity="0.6" />
          <stop offset="100%" stopColor={gradientEnd} stopOpacity="0.05" />
        </linearGradient>
        <clipPath id="areaClip">
          <rect x={0} y={0} width={clipWidth} height={chartHeight} />
        </clipPath>
      </defs>

      {/* Grid */}
      {[0, 25, 50, 75, 100].map((val) => (
        <line
          key={`g-${val}`}
          x1={padding}
          y1={yScale(val)}
          x2={chartWidth - padding}
          y2={yScale(val)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      {[0, 25, 50, 75, 100].map((val) => (
        <text
          key={`y-${val}`}
          x={padding - 15}
          y={yScale(val) + 5}
          textAnchor="end"
          fill="rgba(255,255,255,0.5)"
          fontSize="12"
          fontFamily="system-ui, sans-serif"
        >
          {val}
        </text>
      ))}

      {/* Area fill */}
      <polygon points={areaPoints} fill="url(#areaGrad)" clipPath="url(#areaClip)" />

      {/* Line */}
      <polyline
        points={linePoints}
        fill="none"
        stroke={lineColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#areaClip)"
      />

      {/* X-axis */}
      <line
        x1={padding}
        y1={chartHeight - padding}
        x2={chartWidth - padding}
        y2={chartHeight - padding}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
      />
      {data.map((p, i) => (
        <text
          key={`x-${i}`}
          x={xScale(p.x)}
          y={chartHeight - padding + 25}
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize="13"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          {p.label}
        </text>
      ))}

      {/* Dots */}
      {data.map((p, i) => {
        const dotOpacity = interpolate(frame - startFrame, [5 + i * 6, 10 + i * 6], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <circle
            key={`dot-${i}`}
            cx={xScale(p.x)}
            cy={yScale(p.y)}
            r={4}
            fill="white"
            stroke={lineColor}
            strokeWidth="2"
            opacity={dotOpacity}
          />
        );
      })}
    </svg>
  );
};
