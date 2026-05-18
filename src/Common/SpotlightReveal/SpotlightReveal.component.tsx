import React from 'react';

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface SpotlightRevealProps {
  children: React.ReactNode;
  startFrame?: number;
  durationInFrames?: number;
}

export const SpotlightReveal: React.FC<SpotlightRevealProps> = ({
  children,
  durationInFrames = 45,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();
  const elapsed = frame - startFrame;

  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.sqrt(width * width + height * height) / 2;

  const radius = interpolate(elapsed, [0, durationInFrames], [0, maxRadius], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        clipPath: `circle(${radius}px at ${cx}px ${cy}px)`,
        inset: 0,
        position: 'absolute',
        WebkitClipPath: `circle(${radius}px at ${cx}px ${cy}px)`,
      }}
    >
      {children}
    </div>
  );
};
