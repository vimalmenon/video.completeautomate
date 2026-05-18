import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface ZoomThroughProps {
  children: [React.ReactNode, React.ReactNode];
  durationInFrames?: number;
  peakScale?: number;
}

export const ZoomThrough: React.FC<ZoomThroughProps> = ({
  children,
  durationInFrames = 60,
  peakScale = 1.5,
}) => {
  const frame = useCurrentFrame();
  const [sceneA, sceneB] = children;
  const half = durationInFrames / 2;

  const aScale = interpolate(frame, [0, half], [1, peakScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const aOpacity = interpolate(frame, [half - 4, half], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bScale = interpolate(frame, [half, durationInFrames], [peakScale, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bOpacity = interpolate(frame, [half, half + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${aScale})`,
          opacity: aOpacity,
        }}
      >
        {sceneA}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `scale(${bScale})`,
          opacity: bOpacity,
        }}
      >
        {sceneB}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
