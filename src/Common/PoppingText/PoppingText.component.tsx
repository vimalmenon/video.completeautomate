import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface PoppingTextProps {
  text?: string;
  colors?: string[];
  fontSize?: string;
  startFrame?: number;
}

const defaultColors = ["#1e3a8a", "#3b82f6", "#A9D6E5"];

export const PoppingText: React.FC<PoppingTextProps> = ({
  text = "BINGO!",
  colors = defaultColors,
  fontSize = "8rem",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.1em",
        perspective: "1000px",
        flexWrap: "wrap",
      }}
    >
      {text.split("").map((char, i) => {
        const delay = startFrame + i * 7;
        const colorIndex = i % colors.length;

        const opacity = spring({
          frame: frame - delay,
          fps,
          from: 0,
          to: 1,
          config: { mass: 0.3, damping: 8, stiffness: 100 },
        });

        const y = spring({
          frame: frame - delay,
          fps,
          from: -200,
          to: 0,
          config: { mass: 0.5, damping: 6, stiffness: 120 },
        });

        const scale = spring({
          frame: frame - delay,
          fps,
          from: 0,
          to: 1.2,
          config: { mass: 0.4, damping: 7, stiffness: 150 },
        });

        const bounce =
          interpolate(Math.sin((frame - delay - 15) / 10), [-1, 1], [0, 25], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }) * Math.max(0, Math.min(1, (frame - delay - 15) / 20));

        const rotation =
          interpolate(Math.sin((frame - delay - 15) / 15), [-1, 1], [-15, 15], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }) * Math.max(0, Math.min(1, (frame - delay - 15) / 20));

        const rotateY = interpolate(
          Math.sin((frame - delay) / 20), [-1, 1], [-30, 30]
        );

        const shadowBlur = interpolate(
          Math.sin((frame - delay) / 8), [-1, 1], [5, 20]
        );

        const pulse =
          1 + interpolate(Math.sin((frame - delay) / 10), [-1, 1], [0, 0.2]) *
            Math.min(1, Math.max(0, (frame - delay - 20) / 30));

        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              opacity,
              color: colors[colorIndex],
              fontSize,
              fontWeight: 900,
              margin: "0 0.05em",
              textShadow: `0 0 ${shadowBlur}px ${colors[colorIndex]}80, 
                           0 0 ${shadowBlur * 1.5}px ${colors[colorIndex]}40,
                           -2px -2px 0 #fff, 2px -2px 0 #fff, 
                           -2px 2px 0 #fff, 2px 2px 0 #fff`,
              transform: `translateY(${y - bounce}px) scale(${scale * pulse}) 
                          rotate(${rotation}deg) rotateY(${rotateY}deg)`,
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              letterSpacing: "0.05em",
              mixBlendMode: "screen",
              filter: `brightness(${1 + Math.sin((frame - delay) / 15) * 0.3})`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};
