import React from 'react';

import { interpolate, useCurrentFrame } from 'remotion';

interface LineChartDataPoint {
  x: number;
  y: number;
  label: string;
}

interface LineChartProps {
  data: LineChartDataPoint[];
  chartWidth?: number;
  chartHeight?: number;
  padding?: number;
  startFrame?: number;
  lineColor?: string;
  dotColor?: string;
  durationInFrames?: number;
}

export { type LineChartDataPoint };

export const LineChart: React.FC<LineChartProps> = ({
  chartHeight = 500,
  chartWidth = 900,
  data,
  dotColor = '#f72585',
  durationInFrames = 60,
  lineColor = '#4361ee',
  padding = 70,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();

  const xScale = (x: number) =>
    (x / Math.max(data.length - 1, 1)) * (chartWidth - padding * 2) + padding;
  const yScale = (y: number) => chartHeight - padding - (y / 100) * (chartHeight - padding * 2);

  const pointsStr = data.map((d) => `${xScale(d.x)},${yScale(d.y)}`).join(' ');

  let totalLength = 0;
  for (let i = 1; i < data.length; i++) {
    const dx = xScale(data[i].x) - xScale(data[i - 1].x);
    const dy = yScale(data[i].y) - yScale(data[i - 1].y);
    totalLength += Math.sqrt(dx * dx + dy * dy);
  }

  const dashOffset = interpolate(frame - startFrame, [0, durationInFrames], [totalLength, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <svg width={chartWidth} height={chartHeight}>
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((val) => (
        <line
          key={`grid-${val}`}
          x1={padding}
          y1={yScale(val)}
          x2={chartWidth - padding}
          y2={yScale(val)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      {/* Y-axis labels */}
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
      {/* X-axis line */}
      <line
        x1={padding}
        y1={chartHeight - padding}
        x2={chartWidth - padding}
        y2={chartHeight - padding}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
      />
      {/* Y-axis line */}
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={chartHeight - padding}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
      />
      {/* X-axis labels */}
      {data.map((point, i) => (
        <text
          key={`x-${i}`}
          x={xScale(point.x)}
          y={chartHeight - padding + 25}
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize="13"
          fontWeight="500"
          fontFamily="system-ui, sans-serif"
        >
          {point.label}
        </text>
      ))}
      {/* Animated line */}
      <polyline
        points={pointsStr}
        fill="none"
        stroke={lineColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
      />
      {/* Data dots */}
      {data.map((point, i) => {
        const pointProgress = interpolate(frame - startFrame, [5 + i * 6, 10 + i * 6], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <circle
            key={`dot-${i}`}
            cx={xScale(point.x)}
            cy={yScale(point.y)}
            r={5 * pointProgress}
            fill={dotColor}
            stroke="white"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
};
