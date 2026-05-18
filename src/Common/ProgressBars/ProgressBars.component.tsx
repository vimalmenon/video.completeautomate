import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

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
  data,
  startFrame = 0,
  staggerFrames = 8,
  totalWidth = 700,
  barHeight = 28,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: totalWidth,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {data.map((item, i) => {
        const delay = startFrame + i * staggerFrames;
        const progress = interpolate(
          frame - delay,
          [0, 25],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const currentWidth = totalWidth * (item.value / 100) * progress;

        const labelOpacity = interpolate(
          frame - delay,
          [0, 10],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const labelY = interpolate(
          frame - delay,
          [0, 10],
          [10, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const valueOpacity = interpolate(
          frame - delay,
          [15, 25],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div key={i}>
            {/* Label */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                opacity: labelOpacity,
                transform: `translateY(${labelY}px)`,
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#E2E8F0",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: item.color,
                  fontFamily: "system-ui, sans-serif",
                  opacity: valueOpacity,
                }}
              >
                {item.value}%
              </span>
            </div>
            {/* Bar track */}
            <div
              style={{
                width: "100%",
                height: barHeight,
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: barHeight / 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: currentWidth,
                  height: "100%",
                  backgroundColor: item.color,
                  borderRadius: barHeight / 2,
                  transition: "width 0.1s ease",
                  boxShadow: `0 0 12px ${item.color}40`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
