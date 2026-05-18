import React, { useMemo } from 'react';

import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface BlindsTransitionProps {
  children: [React.ReactNode, React.ReactNode];
  stripCount?: number;
  durationInFrames?: number;
}

export const BlindsTransition: React.FC<BlindsTransitionProps> = ({
  children,
  durationInFrames = 60,
  stripCount = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const [sceneA, sceneB] = children;

  const stripHeight = height / stripCount;

  const strips = useMemo(() => Array.from({ length: stripCount }, (_, i) => i), [stripCount]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', overflow: 'hidden' }}>
      {/* Background scene A */}
      <AbsoluteFill>{sceneA}</AbsoluteFill>

      {/* Blinds strips */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {strips.map((i) => {
          const delay = (i / stripCount) * durationInFrames * 0.6;
          const spr = spring({
            config: { damping: 15, mass: 0.5, stiffness: 120 },
            fps,
            frame: frame - delay,
            from: 0,
            to: 1,
          });

          return (
            <div
              key={i}
              style={{
                height: stripHeight,
                overflow: 'hidden',
                transform: `scaleY(${spr})`,
                transformOrigin: 'top',
                width: '100%',
              }}
            >
              <div
                style={{
                  height,
                  transform: `translateY(${-i * stripHeight}px)`,
                  width: '100%',
                }}
              >
                {sceneB}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
