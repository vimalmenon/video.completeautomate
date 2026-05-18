import React from 'react';

import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SplitScreenProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  splitRatio?: number;
  gap?: number;
}

export const SplitScreen: React.FC<SplitScreenProps> = ({
  gap = 4,
  leftContent,
  rightContent,
  splitRatio = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const leftSpring = spring({
    config: { damping: 12, mass: 0.5, stiffness: 100 },
    fps,
    frame,
    from: -width * 0.5,
    to: 0,
  });

  const rightSpring = spring({
    config: { damping: 12, mass: 0.5, stiffness: 100 },
    fps,
    frame,
    from: width * 0.5,
    to: 0,
  });

  const leftWidth = width * splitRatio - gap / 2;
  const rightWidth = width * (1 - splitRatio) - gap / 2;

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        display: 'flex',
        inset: 0,
        justifyContent: 'center',
        position: 'absolute',
      }}
    >
      {/* Left panel */}
      <div
        style={{
          height: '100%',
          overflow: 'hidden',
          transform: `translateX(${leftSpring}px)`,
          width: leftWidth,
        }}
      >
        {leftContent}
      </div>

      {/* Gap / divider */}
      <div
        style={{
          backgroundColor: '#0891B2',
          height: '100%',
          opacity: 0.6,
          width: gap,
        }}
      />

      {/* Right panel */}
      <div
        style={{
          height: '100%',
          overflow: 'hidden',
          transform: `translateX(${rightSpring}px)`,
          width: rightWidth,
        }}
      >
        {rightContent}
      </div>
    </div>
  );
};
