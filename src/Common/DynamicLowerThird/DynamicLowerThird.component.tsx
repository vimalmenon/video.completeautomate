import React from 'react';

import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface DynamicLowerThirdProps {
  name: string;
  title: string;
}

export const DynamicLowerThird: React.FC<DynamicLowerThirdProps> = ({
  name = 'John Doe',
  title = 'CEO & Founder',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barSlide = spring({
    config: { damping: 12, mass: 0.5, stiffness: 100 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const barWidth = interpolate(barSlide, [0, 1], [0, 300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const barOpacity = interpolate(barSlide, [0, 0.1, 1], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const nameSpr = spring({
    config: { damping: 14, mass: 0.4, stiffness: 120 },
    fps,
    frame: frame - 8,
    from: 0,
    to: 1,
  });

  const titleSpr = spring({
    config: { damping: 14, mass: 0.4, stiffness: 120 },
    fps,
    frame: frame - 16,
    from: 0,
    to: 1,
  });

  const containerSlide = interpolate(
    spring({ config: { damping: 14, mass: 0.5, stiffness: 90 }, fps, frame, from: 0, to: 1 }),
    [0, 1],
    [-400, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          borderLeft: 'none',
          borderRadius: '0 12px 12px 0',
          marginBottom: 60,
          marginLeft: 40,
          maxWidth: '60%',
          padding: '24px 40px',
          transform: `translateX(${containerSlide}px)`,
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            backgroundColor: '#0891B2',
            borderRadius: 2,
            boxShadow: '0 0 16px rgba(8, 145, 178, 0.5)',
            height: 4,
            marginBottom: 12,
            opacity: barOpacity,
            width: barWidth,
          }}
        />

        {/* Name */}
        <Sequence from={8}>
          <div
            style={{
              color: '#FFFFFF',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              marginBottom: 4,
              opacity: nameSpr,
              transform: `translateX(${(1 - nameSpr) * 30}px)`,
            }}
          >
            {name}
          </div>
        </Sequence>

        {/* Title */}
        <Sequence from={16}>
          <div
            style={{
              color: '#0891B2',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.1rem',
              fontWeight: 400,
              letterSpacing: '0.08em',
              opacity: titleSpr,
              textTransform: 'uppercase',
              transform: `translateX(${(1 - titleSpr) * 30}px)`,
            }}
          >
            {title}
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
