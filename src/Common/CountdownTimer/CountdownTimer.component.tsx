import React from 'react';

import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface CountdownTimerProps {
  from?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ from = 5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const framesPerNumber = Math.round(fps / 3);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
      }}
    >
      {Array.from({ length: from }, (_, i) => {
        const num = from - i;
        const startFrame = i * framesPerNumber;
        return (
          <Sequence key={num} from={startFrame} durationInFrames={framesPerNumber}>
            <CountdownNumber number={num} frame={frame - startFrame} fps={fps} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

interface CountdownNumberProps {
  number: number;
  frame: number;
  fps: number;
}

const CountdownNumber: React.FC<CountdownNumberProps> = ({ fps, frame, number }) => {
  const scale = spring({
    config: { damping: 8, mass: 0.5, stiffness: 120 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const opacity = interpolate(frame, [0, fps * 0.15, fps * 0.2, fps * 0.3], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          color: '#0891B2',
          fontFamily: "'Impact', 'Arial Black', sans-serif",
          fontSize: '12rem',
          fontWeight: 900,
          opacity,
          textShadow: '0 0 40px rgba(8, 145, 178, 0.5), 0 0 80px rgba(8, 145, 178, 0.2)',
          transform: `scale(${scale})`,
        }}
      >
        {number}
      </span>
    </AbsoluteFill>
  );
};
