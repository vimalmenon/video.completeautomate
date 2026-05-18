import React from 'react';

import { Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface ParallaxLayer {
  src: string;
  speed: number;
}

interface ParallaxPanProps {
  layers: ParallaxLayer[];
  direction?: 'horizontal' | 'vertical';
  durationInFrames?: number;
}

export const ParallaxPan: React.FC<ParallaxPanProps> = ({
  direction = 'horizontal',
  durationInFrames = 60,
  layers,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        backgroundColor: '#0F172A',
        inset: 0,
        overflow: 'hidden',
        position: 'absolute',
      }}
    >
      {layers.map((layer, i) => {
        const offset = interpolate(
          frame,
          [0, durationInFrames],
          direction === 'horizontal' ? [0, -200 * layer.speed] : [0, -150 * layer.speed],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const scale = 1 + layer.speed * 0.05;

        return (
          <div
            key={i}
            style={{
              inset: 0,
              opacity: 1 - i * 0.15,
              position: 'absolute',
              transform:
                direction === 'horizontal'
                  ? `translateX(${offset}px) scale(${scale})`
                  : `translateY(${offset}px) scale(${scale})`,
              zIndex: layers.length - i,
            }}
          >
            <Img
              src={layer.src}
              style={{
                height: '100%',
                objectFit: 'cover',
                width: '100%',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
