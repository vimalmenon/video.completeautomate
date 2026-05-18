import React from 'react';

import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface CreditItem {
  role: string;
  name: string;
}

interface CreditsRollProps {
  credits: CreditItem[];
}

export const CreditsRoll: React.FC<CreditsRollProps> = ({
  credits = [
    { name: 'Jane Smith', role: 'Director' },
    { name: 'John Doe', role: 'Writer' },
    { name: 'Alice Johnson', role: 'Producer' },
    { name: 'Bob Williams', role: 'Cinematography' },
    { name: 'Eva Martinez', role: 'Music' },
    { name: 'Chris Brown', role: 'Editor' },
  ],
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const ITEM_HEIGHT = 80;
  const totalContentHeight = credits.length * ITEM_HEIGHT + 200;

  // Scroll from bottom to top
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    easing: Easing.linear,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Start below screen, end above screen
  const translateY = interpolate(progress, [0, 1], [900, -totalContentHeight], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out at the end (bottom)
  const bottomFadeStart = 0.75;
  const bottomOpacity = interpolate(progress, [0, 0.15], [1, 1], { extrapolateLeft: 'clamp' });

  // Fade at the top
  const endOpacity = interpolate(progress, [0.85, 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = Math.min(bottomOpacity, endOpacity);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          left: '50%',
          opacity,
          position: 'absolute',
          transform: `translateX(-50%) translateY(${translateY}px)`,
          width: 500,
        }}
      >
        {/* Title */}
        <div
          style={{
            marginBottom: 60,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#0891B2',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Credits
          </div>
          <div
            style={{
              backgroundColor: '#0891B2',
              height: 2,
              margin: '16px auto',
              width: 80,
            }}
          />
        </div>

        {/* Credit items */}
        {credits.map((credit, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: ITEM_HEIGHT,
              justifyContent: 'center',
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: '#64748B',
                fontFamily: 'system-ui, sans-serif',
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: '0.1em',
                marginBottom: 4,
                textTransform: 'uppercase',
              }}
            >
              {credit.role}
            </div>
            <div
              style={{
                color: '#F1F5F9',
                fontFamily: 'system-ui, sans-serif',
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              {credit.name}
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth fading */}
      <div
        style={{
          background: 'linear-gradient(to bottom, #0F172A, transparent)',
          height: 120,
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
      <div
        style={{
          background: 'linear-gradient(to top, #0F172A, transparent)',
          bottom: 0,
          height: 120,
          left: 0,
          position: 'absolute',
          right: 0,
        }}
      />
    </AbsoluteFill>
  );
};
