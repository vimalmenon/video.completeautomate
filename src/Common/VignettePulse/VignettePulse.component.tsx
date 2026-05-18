import React from 'react';

import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface VignettePulseProps {
  children: React.ReactNode;
  startFrame?: number;
  minOpacity?: number;
  maxOpacity?: number;
  speed?: number;
}

export const VignettePulse: React.FC<VignettePulseProps> = ({
  children,
  maxOpacity = 0.7,
  minOpacity = 0.3,
  speed = 24,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();
  const elapsed = frame - startFrame;

  const pulse = interpolate(
    Math.sin((elapsed / speed) * Math.PI * 2),
    [-1, 1],
    [minOpacity, maxOpacity]
  );

  return (
    <div style={{ inset: 0, position: 'absolute' }}>
      {children}

      <div
        style={{
          background: `radial-gradient(
            ellipse ${width * 0.4}px ${height * 0.4}px at 50% 50%,
            transparent 0%,
            rgba(0, 0, 0, ${pulse}) 100%
          )`,
          inset: 0,
          pointerEvents: 'none',
          position: 'absolute',
          zIndex: 5,
        }}
      />
    </div>
  );
};
