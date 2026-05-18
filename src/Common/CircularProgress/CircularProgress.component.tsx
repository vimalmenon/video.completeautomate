import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  startFrame?: number;
  showDot?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 300,
  strokeWidth = 18,
  color = "#4361ee",
  label,
  startFrame = 0,
  showDot = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = spring({
    frame: frame - startFrame,
    fps,
    from: 0,
    to: value / 100,
    config: { mass: 0.5, damping: 12, stiffness: 80 },
  });

  const dashOffset = circumference * (1 - progress);
  const displayValue = Math.round(progress * 100);

  const pulse = interpolate(
    Math.sin((frame - startFrame) / 8),
    [-1, 1],
    [1, 1.08],
    { extrapolateRight: "clamp" }
  );

  const dotAngle = ((frame - startFrame) / 60) * 2 * Math.PI;
  const dotX = cx + radius * Math.cos(dotAngle - Math.PI / 2);
  const dotY = cy + radius * Math.sin(dotAngle - Math.PI / 2);

  return (
    <svg width={size} height={size}>
      {/* Background ring */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      {/* Progress ring */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: "stroke-dashoffset 0.1s ease" }}
      />
      {/* Rotating dot */}
      {showDot && (
        <circle
          cx={dotX}
          cy={dotY}
          r={6}
          fill={color}
          opacity={0.8}
          transform={`scale(${pulse})`}
          style={{ transformOrigin: `${dotX}px ${dotY}px` }}
        />
      )}
      {/* Centre value */}
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fill="white"
        fontSize="40"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        {displayValue}%
      </text>
      {label && (
        <text
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize="14"
          fontFamily="system-ui, sans-serif"
        >
          {label}
        </text>
      )}
    </svg>
  );
};
