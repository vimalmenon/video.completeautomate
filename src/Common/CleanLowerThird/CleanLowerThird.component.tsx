import React from 'react';

import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface CleanLowerThirdProps {
  name: string;
  title: string;
}

export const CleanLowerThird: React.FC<CleanLowerThirdProps> = ({
  name = 'John Doe',
  title = 'CEO & Founder',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSlide = spring({
    config: { damping: 16, mass: 0.4, stiffness: 100 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const translateX = interpolate(containerSlide, [0, 1], [-60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const containerOpacity = interpolate(containerSlide, [0, 0.3, 1], [0, 0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const nameSpr = spring({
    config: { damping: 18, mass: 0.3, stiffness: 150 },
    fps,
    frame: frame - 5,
    from: 0,
    to: 1,
  });

  const titleSpr = spring({
    config: { damping: 18, mass: 0.3, stiffness: 150 },
    fps,
    frame: frame - 12,
    from: 0,
    to: 1,
  });

  const underlineWidth = interpolate(
    spring({
      config: { damping: 16, mass: 0.3, stiffness: 120 },
      fps,
      frame: frame - 5,
      from: 0,
      to: 1,
    }),
    [0, 1],
    [0, 60],
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
          marginBottom: 60,
          marginLeft: 40,
          opacity: containerOpacity,
          padding: '20px 32px',
          transform: `translateX(${translateX}px)`,
        }}
      >
        {/* Name */}
        <Sequence from={5}>
          <div
            style={{
              color: '#FFFFFF',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.8rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              marginBottom: 4,
              opacity: nameSpr,
              transform: `translateY(${(1 - nameSpr) * 12}px)`,
            }}
          >
            {name}
          </div>
        </Sequence>

        {/* Subtle underline */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: 1,
            height: 2,
            marginBottom: 6,
            marginTop: 4,
            width: underlineWidth,
          }}
        />

        {/* Title */}
        <Sequence from={12}>
          <div
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.95rem',
              fontWeight: 400,
              letterSpacing: '0.06em',
              opacity: titleSpr,
              textTransform: 'uppercase',
              transform: `translateY(${(1 - titleSpr) * 10}px)`,
            }}
          >
            {title}
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
