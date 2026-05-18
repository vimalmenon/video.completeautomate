import React from 'react';

import { Easing, interpolate, useCurrentFrame } from 'remotion';

interface LetterboxRevealProps {
  children: React.ReactNode;
  startFrame?: number;
  durationInFrames?: number;
  barHeight?: number;
}

export const LetterboxReveal: React.FC<LetterboxRevealProps> = ({
  barHeight = 120,
  children,
  durationInFrames = 40,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  const topOffset = interpolate(elapsed, [0, durationInFrames], [0, -barHeight], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bottomOffset = interpolate(elapsed, [0, durationInFrames], [0, barHeight], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ inset: 0, position: 'absolute' }}>
      {children}

      {/* Top bar */}
      <div
        style={{
          backgroundColor: '#000',
          height: barHeight,
          left: 0,
          position: 'absolute',
          right: 0,
          top: topOffset,
          zIndex: 10,
        }}
      />

      {/* Bottom bar */}
      <div
        style={{
          backgroundColor: '#000',
          bottom: bottomOffset,
          height: barHeight,
          left: 0,
          position: 'absolute',
          right: 0,
          zIndex: 10,
        }}
      />
    </div>
  );
};
