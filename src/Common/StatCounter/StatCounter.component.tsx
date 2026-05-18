import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface StatCounterProps {
  value: number;
  label: string;
  startFrame?: number;
  suffix?: string;
  color?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  label,
  startFrame = 0,
  suffix = "",
  color = "#22D3EE",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
    },
  });

  const displayValue = Math.round(interpolate(progress, [0, 1], [0, value]));

  const opacity = interpolate(
    frame - startFrame,
    [-5, 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const y = interpolate(
    frame - startFrame,
    [0, 20],
    [30, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <span
        style={{
          fontSize: 72,
          fontWeight: 800,
          color,
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1,
        }}
      >
        {displayValue.toLocaleString()}
        {suffix}
      </span>
      <span
        style={{
          fontSize: 20,
          color: "#94A3B8",
          marginTop: 8,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
    </div>
  );
};
