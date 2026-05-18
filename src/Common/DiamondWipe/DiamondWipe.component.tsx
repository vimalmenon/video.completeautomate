import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface DiamondWipeProps {
  children: [React.ReactNode, React.ReactNode];
  durationInFrames?: number;
}

export const DiamondWipe: React.FC<DiamondWipeProps> = ({
  children,
  durationInFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const [sceneA, sceneB] = children;

  const centerX = width / 2;
  const centerY = height / 2;
  const maxDist = Math.sqrt(
    centerX * centerX + centerY * centerY
  );

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const size = interpolate(progress, [0, 1], [0, maxDist], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const clipPathStyle = useMemo(
    () =>
      `polygon(
        ${centerX}px ${centerY - size}px,
        ${centerX + size}px ${centerY}px,
        ${centerX}px ${centerY + size}px,
        ${centerX - size}px ${centerY}px
      )`,
    [size, centerX, centerY]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A" }}>
      <AbsoluteFill>{sceneA}</AbsoluteFill>
      <AbsoluteFill style={{ clipPath: clipPathStyle }}>
        {sceneB}
      </AbsoluteFill>
      {/* Accent diamond border */}
      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        <polygon
          points={`${centerX},${centerY - size} ${centerX + size},${centerY} ${centerX},${centerY + size} ${centerX - size},${centerY}`}
          fill="none"
          stroke="#0891B2"
          strokeWidth={2}
          opacity={interpolate(progress, [0, 0.5, 1], [0.8, 0.3, 0])}
        />
      </svg>
    </AbsoluteFill>
  );
};
