import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface CrossDissolveProps {
  children: [React.ReactNode, React.ReactNode];
  durationInFrames?: number;
}

export const CrossDissolve: React.FC<CrossDissolveProps> = ({
  children,
  durationInFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const [sceneA, sceneB] = children;

  const aOpacity = interpolate(frame, [0, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bOpacity = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A" }}>
      <AbsoluteFill style={{ opacity: aOpacity }}>{sceneA}</AbsoluteFill>
      <AbsoluteFill style={{ opacity: bOpacity }}>{sceneB}</AbsoluteFill>
    </AbsoluteFill>
  );
};
