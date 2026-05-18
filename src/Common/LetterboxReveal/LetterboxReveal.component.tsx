import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface LetterboxRevealProps {
  children: React.ReactNode;
  startFrame?: number;
  durationInFrames?: number;
  barHeight?: number;
}

export const LetterboxReveal: React.FC<LetterboxRevealProps> = ({
  children,
  startFrame = 0,
  durationInFrames = 40,
  barHeight = 120,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  const topOffset = interpolate(elapsed, [0, durationInFrames], [0, -barHeight], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const bottomOffset = interpolate(elapsed, [0, durationInFrames], [0, barHeight], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {children}

      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: topOffset,
          left: 0,
          right: 0,
          height: barHeight,
          backgroundColor: "#000",
          zIndex: 10,
        }}
      />

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: bottomOffset,
          left: 0,
          right: 0,
          height: barHeight,
          backgroundColor: "#000",
          zIndex: 10,
        }}
      />
    </div>
  );
};
