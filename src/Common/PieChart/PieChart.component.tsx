import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface PieSlice {
  value: number;
  label: string;
  color: string;
}

interface PieChartProps {
  data: PieSlice[];
  chartWidth?: number;
  chartHeight?: number;
  startFrame?: number;
  staggerFrames?: number;
  title?: string;
}

export { type PieSlice };

export const PieChart: React.FC<PieChartProps> = ({
  data,
  chartWidth = 500,
  chartHeight = 500,
  startFrame = 0,
  staggerFrames = 15,
  title,
}) => {
  const frame = useCurrentFrame();
  const cx = chartWidth / 2;
  const cy = chartHeight / 2;
  const radius = Math.min(cx, cy) - 40;

  const total = data.reduce((s, d) => s + d.value, 0);
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <svg width={chartWidth} height={chartHeight}>
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
        const gap = circumference * 0.005;
        const progress = interpolate(
          frame - startFrame,
          [i * staggerFrames, 15 + i * staggerFrames],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const offset = circumference * cumulativePercent + gap / 2;
        const visibleLength = sliceLength * progress;
        cumulativePercent += slicePercent;

        const midAngle =
          (offset + visibleLength / 2) / circumference * 2 * Math.PI - Math.PI / 2;
        const labelX = cx + (radius + 30) * Math.cos(midAngle);
        const labelY = cy + (radius + 30) * Math.sin(midAngle);

        const labelOpacity = interpolate(
          frame - startFrame,
          [i * staggerFrames + 10, i * staggerFrames + 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <g key={`slice-${i}`}>
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth="50"
              strokeDasharray={`${visibleLength} ${circumference - visibleLength}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="butt"
            />
            {progress > 0.5 && (
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="13"
                fontFamily="system-ui, sans-serif"
                opacity={labelOpacity}
              >
                {slice.label} ({Math.round(slicePercent * 100)}%)
              </text>
            )}
          </g>
        );
      })}
      {/* Center circle */}
      <circle cx={cx} cy={cy} r={radius - 26} fill="#1E293B" />
      {/* Total in center */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="28"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        {total}
      </text>
    </svg>
  );
};
