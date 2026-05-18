import React, { useMemo } from 'react';

import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from 'remotion';

interface NoiseGrainProps {
  opacity?: number;
  grainSize?: number;
}

export const NoiseGrain: React.FC<NoiseGrainProps> = ({ grainSize = 3, opacity = 0.06 }) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const cols = Math.ceil(width / grainSize);
  const rows = Math.ceil(height / grainSize);

  // Deterministic noise seed per frame
  const noiseSeed = `noise-${frame}`;

  const cells = useMemo(() => {
    const result: number[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        result.push(random(`${noiseSeed}-${y}-${x}`));
      }
    }
    return result;
  }, [noiseSeed, cols, rows]);

  return (
    <AbsoluteFill
      style={{
        mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
        opacity,
        pointerEvents: 'none',
      }}
    >
      <svg width={width} height={height}>
        <defs>
          <filter id={`noise-${frame}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#noise-${frame})`} opacity={1} />
      </svg>
    </AbsoluteFill>
  );
};
