import React from "react";
import { useCurrentFrame } from "remotion";

interface PulsingTextProps {
  text?: string;
  color?: string;
  fontSize?: string;
  minScale?: number;
  maxScale?: number;
  speed?: number;
}

export const PulsingText: React.FC<PulsingTextProps> = ({
  text = "PULSING",
  color = "#f72585",
  fontSize = "6rem",
  minScale = 1,
  maxScale = 1.15,
  speed = 8,
}) => {
  const frame = useCurrentFrame();

  const scale = 1 + Math.sin((frame / speed) * Math.PI) * ((maxScale - minScale) / 2);

  const opacity = 0.7 + Math.sin((frame / speed) * Math.PI) * 0.15;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 900,
          color,
          transform: `scale(${scale})`,
          opacity,
          fontFamily: "'Impact', 'Arial Black', sans-serif",
          textShadow: `0 0 20px ${color}60, 0 0 40px ${color}30`,
          letterSpacing: "0.05em",
        }}
      >
        {text}
      </span>
    </div>
  );
};
