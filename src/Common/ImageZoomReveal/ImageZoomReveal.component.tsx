import React from 'react';

import { Img, interpolate, useCurrentFrame } from 'remotion';

interface ImageZoomRevealProps {
  src: string;
  startFrame?: number;
  durationInFrames?: number;
}

export const ImageZoomReveal: React.FC<ImageZoomRevealProps> = ({
  durationInFrames = 50,
  src,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  const progress = interpolate(elapsed, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(progress, [0, 1], [1.5, 1]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
          height: '100%',
          objectFit: 'cover',
          opacity,
          transform: `scale(${scale})`,
          width: '100%',
        }}
      />
    </div>
  );
};
