import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface BubblePopTextProps {
  text?: string;
  fontSize?: string;
  bubbleSize?: string;
  startFrame?: number;
  colors?: string[];
}

const defaultColors = ["#1e3a8a", "#3b82f6"];

export const BubblePopText: React.FC<BubblePopTextProps> = ({
  text = "HELLO",
  fontSize = "4rem",
  bubbleSize = "100px",
  startFrame = 0,
  colors = defaultColors,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {text.split("").map((char, i) => {
        const delay = startFrame + i * 5;
        const scale = spring({
          frame: frame - delay,
          fps,
          from: 0,
          to: 1,
          config: { damping: 8, mass: 0.3, stiffness: 100 },
        });

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `scale(${scale})`,
              fontSize,
              fontWeight: "bold",
              color: "white",
              border: "4px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              width: bubbleSize,
              height: bubbleSize,
              lineHeight: bubbleSize,
              textAlign: "center",
              background: `linear-gradient(45deg, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]})`,
              boxShadow: `0 4px 15px ${colors[i % colors.length]}80`,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
