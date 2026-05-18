import React, { useMemo } from 'react';

import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface ClockWipeProps {
  children: [React.ReactNode, React.ReactNode];
  durationInFrames?: number;
}

export const ClockWipe: React.FC<ClockWipeProps> = ({ children, durationInFrames = 60 }) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();
  const [sceneA, sceneB] = children;

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.sqrt(width * width + height * height);

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const angleDeg = progress * 360;

  // Build SVG clip-path polygon for a pie-slice that grows clockwise
  const clipPathId = useMemo(() => `clockWipeClip-${Math.random().toString(36).slice(2, 8)}`, []);

  const polygonPoints = useMemo(() => {
    const points: string[] = [`${centerX},${centerY}`];
    const steps = Math.ceil(angleDeg);
    for (let d = 0; d <= steps; d++) {
      const rad = ((d - 90) * Math.PI) / 180;
      const x = centerX + radius * Math.cos(rad);
      const y = centerY + radius * Math.sin(rad);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  }, [angleDeg, centerX, centerY, radius]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <AbsoluteFill>{sceneA}</AbsoluteFill>
      <svg width={0} height={0}>
        <defs>
          <clipPath id={clipPathId}>
            <polygon points={polygonPoints} />
          </clipPath>
        </defs>
      </svg>
      <AbsoluteFill style={{ clipPath: `url(#${clipPathId})` }}>{sceneB}</AbsoluteFill>
    </AbsoluteFill>
  );
};
