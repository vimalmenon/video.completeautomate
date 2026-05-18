import React from 'react';

import { Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface ImageRevealProps {
  src: string;
  startFrame?: number;
  durationInFrames?: number;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  direction = 'left',
  durationInFrames = 40,
  src,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  const progress = interpolate(elapsed, [0, durationInFrames], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  let clipRect: string;
  switch (direction) {
    case 'left':
      clipRect = `inset(0 ${(1 - progress) * 100}% 0 0)`;
      break;
    case 'right':
      clipRect = `inset(0 0 0 ${(1 - progress) * 100}%)`;
      break;
    case 'top':
      clipRect = `inset(0 0 ${(1 - progress) * 100}% 0)`;
      break;
    case 'bottom':
      clipRect = `inset(${(1 - progress) * 100}% 0 0 0)`;
      break;
  }

  return (
    <div
      style={{
        backgroundColor: '#0F172A',
        inset: 0,
        overflow: 'hidden',
        position: 'absolute',
      }}
    >
      <Img
        src={src}
        style={{
          clipPath: clipRect,
          height: '100%',
          objectFit: 'cover',
          WebkitClipPath: clipRect,
          width: '100%',
        }}
      />
    </div>
  );
};
