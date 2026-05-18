import React from 'react';

import { Img, interpolate, useCurrentFrame } from 'remotion';

interface KenBurnsProps {
  src: string;
  direction?: 'in' | 'out';
  startFrame?: number;
  durationInFrames?: number;
}

export const KenBurns: React.FC<KenBurnsProps> = ({
  direction = 'in',
  durationInFrames = 60,
  src,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  const progress = interpolate(elapsed, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale =
    direction === 'in'
      ? interpolate(progress, [0, 1], [1, 1.3])
      : interpolate(progress, [0, 1], [1.3, 1]);

  const translateX = interpolate(progress, [0, 1], [0, direction === 'in' ? -40 : 40]);
  const translateY = interpolate(progress, [0, 1], [0, -20]);

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
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          width: '100%',
        }}
      />
    </div>
  );
};
