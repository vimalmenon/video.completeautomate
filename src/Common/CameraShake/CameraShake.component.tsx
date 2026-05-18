import React from 'react';

import { interpolate, random, useCurrentFrame } from 'remotion';

interface CameraShakeProps {
  children: React.ReactNode;
  shakeFrame?: number;
  intensity?: number;
  decayFrames?: number;
}

export const CameraShake: React.FC<CameraShakeProps> = ({
  children,
  decayFrames = 30,
  intensity = 15,
  shakeFrame = 10,
}) => {
  const frame = useCurrentFrame();

  if (frame < shakeFrame) {
    return <div style={{ inset: 0, position: 'absolute' }}>{children}</div>;
  }

  const elapsed = frame - shakeFrame;
  const decay = interpolate(elapsed, [0, decayFrames], [1, 0], {
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const offsetX = (random(`x-${frame}`) - 0.5) * 2 * intensity * decay;
  const offsetY = (random(`y-${frame}`) - 0.5) * 2 * intensity * decay;
  const rotate = (random(`r-${frame}`) - 0.5) * 2 * 3 * decay;

  return (
    <div
      style={{
        inset: 0,
        position: 'absolute',
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
      }}
    >
      {children}
    </div>
  );
};
