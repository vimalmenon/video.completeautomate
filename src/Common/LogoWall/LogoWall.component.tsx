import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface LogoItem {
  name: string;
  color?: string;
}

interface LogoWallProps {
  logos: LogoItem[];
  startFrame?: number;
  cols?: number;
}

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const LogoWall: React.FC<LogoWallProps> = ({
  logos,
  startFrame = 0,
  cols = 4,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 20,
        width: "80%",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {logos.map((logo, i) => {
        const delay = startFrame + i * 5;
        const opacity = interpolate(
          frame - delay,
          [0, 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const scale = interpolate(
          frame - delay,
          [0, 15],
          [0.8, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const bgColor = logo.color || "#1E293B";
        const y = interpolate(
          frame - delay,
          [0, 20],
          [30, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 12px",
              backgroundColor: bgColor,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.06)",
              opacity,
              transform: `translateY(${y}px) scale(${scale})`,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
                color: "#22D3EE",
                marginBottom: 8,
              }}
            >
              {getInitials(logo.name)}
            </div>
            <span
              style={{
                fontSize: 12,
                color: "#CBD5E1",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              {logo.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
