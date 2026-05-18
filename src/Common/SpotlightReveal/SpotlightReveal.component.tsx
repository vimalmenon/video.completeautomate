import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

interface SpotlightRevealProps {
  children: React.ReactNode;
  startFrame?: number;
  durationInFrames?: number;
}

export const SpotlightReveal: React.FC<SpotlightRevealProps> = ({
  children,
  startFrame = 0,
  durationInFrames = 45,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const elapsed = frame - startFrame;

  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.sqrt(width * width + height * height) / 2;

  const radius = interpolate(elapsed, [0, durationInFrames], [0, maxRadius], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        clipPath: `circle(${radius}px at ${cx}px ${cy}px)`,
        WebkitClipPath: `circle(${radius}px at ${cx}px ${cy}px)`,
      }}
    >
      {children}
    </div>
  );
};
