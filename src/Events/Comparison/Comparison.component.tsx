import React from 'react';

import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';

export const comparisonSchema = z.object({
  afterPoints: z.array(z.string()).min(1).max(8),
  afterTitle: z.string(),
  beforePoints: z.array(z.string()).min(1).max(8),
  beforeTitle: z.string(),
});

type ComparisonProps = z.infer<typeof comparisonSchema>;

export const Comparison: React.FC<ComparisonProps> = ({
  afterPoints,
  afterTitle,
  beforePoints,
  beforeTitle,
}) => {
  const frame = useCurrentFrame();

  // Left side opacity (before)
  const leftOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Right side opacity (after) — delayed
  const rightOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const renderPoints = (points: string[], side: 'before' | 'after', baseDelay: number) =>
    points.map((point, i) => {
      const delay = baseDelay + i * 8;
      const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      const x = interpolate(frame - delay, [0, 10], [side === 'before' ? -20 : 20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      return (
        <div
          key={i}
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            gap: 12,
            marginBottom: 16,
            opacity,
            transform: `translateX(${x}px)`,
          }}
        >
          <span
            style={{
              color: side === 'before' ? '#EF4444' : '#22D3EE',
              flexShrink: 0,
              fontSize: 20,
              marginTop: 2,
            }}
          >
            {side === 'before' ? '✕' : '✓'}
          </span>
          <span
            style={{
              color: side === 'before' ? '#FCA5A5' : '#CBD5E1',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            {point}
          </span>
        </div>
      );
    });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', display: 'flex', flexDirection: 'row' }}>
      {/* BEFORE Side */}
      <div
        style={{
          backgroundColor: 'rgba(239, 68, 68, 0.03)',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: leftOpacity,
          padding: '60px 40px',
        }}
      >
        {/* Label */}
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              backgroundColor: '#EF4444',
              borderRadius: 4,
              height: 8,
              opacity: 0.6,
              width: 8,
            }}
          />
          <span
            style={{
              color: '#EF4444',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            BEFORE
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            color: '#FCA5A5',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 28,
            fontWeight: 800,
            margin: '0 0 28px 0',
          }}
        >
          {beforeTitle}
        </h2>

        {/* Points */}
        {renderPoints(beforePoints, 'before', 20)}
      </div>

      {/* Vertial Divider */}
      <div
        style={{
          alignSelf: 'center',
          background: 'linear-gradient(180deg, transparent, #0891B2, transparent)',
          boxShadow: '0 0 12px rgba(8,145,178,0.3)',
          height: '80%',
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          width: 3,
        }}
      />

      {/* AFTER Side */}
      <div
        style={{
          backgroundColor: 'rgba(8, 145, 178, 0.03)',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: rightOpacity,
          padding: '60px 40px',
        }}
      >
        {/* Label */}
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              backgroundColor: '#22D3EE',
              borderRadius: 4,
              height: 8,
              opacity: 0.6,
              width: 8,
            }}
          />
          <span
            style={{
              color: '#22D3EE',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            AFTER
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            color: '#F8FAFC',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 28,
            fontWeight: 800,
            margin: '0 0 28px 0',
          }}
        >
          {afterTitle}
        </h2>

        {/* Points */}
        {renderPoints(afterPoints, 'after', 45)}
      </div>
    </AbsoluteFill>
  );
};
