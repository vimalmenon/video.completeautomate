import React from 'react';

import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface FadeThroughBlackProps {
  children: [React.ReactNode, React.ReactNode];
  durationInFrames?: number;
}

export const FadeThroughBlack: React.FC<FadeThroughBlackProps> = ({
  children,
  durationInFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const [sceneA, sceneB] = children;
  const half = durationInFrames / 2;

  const aOpacity = interpolate(frame, [0, half], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bOpacity = interpolate(frame, [half, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const blackOpacity = interpolate(frame, [half - 4, half, half + 4], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <AbsoluteFill style={{ opacity: aOpacity }}>{sceneA}</AbsoluteFill>
      <AbsoluteFill
        style={{
          backgroundColor: '#0F172A',
          opacity: blackOpacity,
          zIndex: 10,
        }}
      />
      <AbsoluteFill style={{ opacity: bOpacity, zIndex: 5 }}>{sceneB}</AbsoluteFill>
    </AbsoluteFill>
  );
};
