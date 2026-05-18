import React from 'react';

import { useCurrentFrame } from 'remotion';

interface ZoomPulseProps {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  speed?: number;
}

export const ZoomPulse: React.FC<ZoomPulseProps> = ({
  children,
  maxScale = 1.08,
  minScale = 1,
  speed = 30,
}) => {
  const frame = useCurrentFrame();

  const scale = minScale + Math.sin((frame / speed) * Math.PI * 2) * ((maxScale - minScale) / 2);

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        inset: 0,
        justifyContent: 'center',
        position: 'absolute',
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};
