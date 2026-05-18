import React, { useMemo } from 'react';

import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface IrisWipeProps {
  children: [React.ReactNode, React.ReactNode];
  durationInFrames?: number;
}

export const IrisWipe: React.FC<IrisWipeProps> = ({ children, durationInFrames = 60 }) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();
  const [sceneA, sceneB] = children;

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const radius = interpolate(progress, [0, 1], [0, maxRadius], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const clipPathStyle = useMemo(
    () => `circle(${radius}px at ${centerX}px ${centerY}px)`,
    [radius, centerX, centerY]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <AbsoluteFill>{sceneA}</AbsoluteFill>
      <AbsoluteFill style={{ clipPath: clipPathStyle }}>
        {sceneB}
        {/* Accent ring */}
        <svg
          width={width}
          height={height}
          style={{
            left: 0,
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
          }}
        >
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#0891B2"
            strokeWidth={2}
            opacity={interpolate(progress, [0, 0.3, 1], [0.8, 0.4, 0])}
          />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
