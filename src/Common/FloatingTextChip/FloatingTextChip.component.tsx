import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface FloatingTextChipProps {
  text?: string;
  startFrame?: number;
  color?: string;
  bgColor?: string;
  fontSize?: string;
}

export const FloatingTextChip: React.FC<FloatingTextChipProps> = ({
  text = "NEW FEATURE",
  startFrame = 0,
  color = "#22D3EE",
  bgColor = "rgba(8, 145, 178, 0.15)",
  fontSize = "1.2rem",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - startFrame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.3, damping: 10, stiffness: 120 },
  });

  const y = spring({
    frame: frame - startFrame,
    fps,
    from: 30,
    to: 0,
    config: { mass: 0.4, damping: 8, stiffness: 100 },
  });

  const floatY = Math.sin((frame - startFrame) / 30) * 5;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 18px",
        backgroundColor: bgColor,
        borderRadius: 100,
        border: `1px solid ${color}30`,
        opacity,
        transform: `translateY(${y + floatY}px)`,
        boxShadow: `0 4px 20px ${color}20`,
        backdropFilter: "blur(4px)",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: color,
          display: "inline-block",
          opacity: 0.8,
        }}
      />
      <span
        style={{
          fontSize,
          fontWeight: 700,
          color,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "0.05em",
        }}
      >
        {text}
      </span>
    </div>
  );
};
