import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface EndCardProps {
  channelName: string;
  subscribeText: string;
}

export const EndCard: React.FC<EndCardProps> = ({
  channelName = 'CompleteAutomate',
  subscribeText = 'Subscribe for more',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stagger springs
  const thanksSpring = spring({
    config: { damping: 12, mass: 0.5, stiffness: 80 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const thanksTranslateY = interpolate(thanksSpring, [0, 1], [60, 0]);
  const thanksOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const channelOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const channelTranslateY = interpolate(frame, [15, 30], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CTA button spring
  const ctaSpring = spring({
    config: { damping: 10, mass: 0.3, stiffness: 120 },
    fps,
    frame: frame - 20,
    from: 0,
    to: 1,
  });

  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1]);
  const ctaOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulse effect on CTA
  const pulse = Math.sin((frame * Math.PI * 2) / 60) * 0.04 + 1;

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        {/* Thanks text */}
        <div
          style={{
            color: '#94A3B8',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 48,
            fontWeight: 300,
            letterSpacing: '0.05em',
            marginBottom: 16,
            opacity: thanksOpacity,
            transform: `translateY(${thanksTranslateY}px)`,
          }}
        >
          Thanks for Watching
        </div>

        {/* Channel name */}
        <div
          style={{
            color: '#FFFFFF',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 56,
            fontWeight: 900,
            marginBottom: 40,
            opacity: channelOpacity,
            transform: `translateY(${channelTranslateY}px)`,
          }}
        >
          {channelName}
        </div>

        {/* CTA Button */}
        <div
          style={{
            backgroundColor: '#0891B2',
            borderRadius: 50,
            boxShadow: '0 0 30px rgba(8, 145, 178, 0.3)',
            display: 'inline-block',
            opacity: ctaOpacity,
            padding: '16px 48px',
            transform: `scale(${ctaScale * pulse})`,
          }}
        >
          <span
            style={{
              color: '#FFFFFF',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.02em',
            }}
          >
            {subscribeText}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
