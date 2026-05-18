import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SplitScreenProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  splitRatio?: number;
  gap?: number;
}

export const SplitScreen: React.FC<SplitScreenProps> = ({
  leftContent,
  rightContent,
  splitRatio = 0.5,
  gap = 4,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const leftSpring = spring({
    frame,
    fps,
    from: -width * 0.5,
    to: 0,
    config: { mass: 0.5, damping: 12, stiffness: 100 },
  });

  const rightSpring = spring({
    frame,
    fps,
    from: width * 0.5,
    to: 0,
    config: { mass: 0.5, damping: 12, stiffness: 100 },
  });

  const leftWidth = width * splitRatio - gap / 2;
  const rightWidth = width * (1 - splitRatio) - gap / 2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F172A",
      }}
    >
      {/* Left panel */}
      <div
        style={{
          width: leftWidth,
          height: "100%",
          overflow: "hidden",
          transform: `translateX(${leftSpring}px)`,
        }}
      >
        {leftContent}
      </div>

      {/* Gap / divider */}
      <div
        style={{
          width: gap,
          height: "100%",
          backgroundColor: "#0891B2",
          opacity: 0.6,
        }}
      />

      {/* Right panel */}
      <div
        style={{
          width: rightWidth,
          height: "100%",
          overflow: "hidden",
          transform: `translateX(${rightSpring}px)`,
        }}
      >
        {rightContent}
      </div>
    </div>
  );
};
