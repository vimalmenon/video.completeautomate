import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface CardFlipProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}

export const CardFlip: React.FC<CardFlipProps> = ({
  backContent = (
    <div style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 700 }}>Back Side</div>
  ),
  frontContent = (
    <div style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 700 }}>Front Side</div>
  ),
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flipProgress = spring({
    config: { damping: 10, mass: 0.6, stiffness: 80 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const rotation = interpolate(flipProgress, [0, 1], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const frontOpacity = interpolate(flipProgress, [0, 0.4, 0.5], [1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const backRotation = rotation + 180;
  const backOpacity = interpolate(flipProgress, [0.5, 0.6, 1], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        perspective: 1200,
      }}
    >
      <div
        style={{
          backgroundColor: '#1E293B',
          border: '1px solid rgba(8, 145, 178, 0.3)',
          borderRadius: 20,
          height: 420,
          position: 'relative',
          transformStyle: 'preserve-3d',
          width: 320,
        }}
      >
        {/* Front */}
        <div
          style={{
            alignItems: 'center',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            backgroundColor: '#1E293B',
            borderRadius: 20,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            display: 'flex',
            inset: 0,
            justifyContent: 'center',
            opacity: frontOpacity,
            padding: 24,
            position: 'absolute',
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {frontContent}
        </div>

        {/* Back */}
        <div
          style={{
            alignItems: 'center',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            backgroundColor: '#1E293B',
            borderRadius: 20,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            display: 'flex',
            inset: 0,
            justifyContent: 'center',
            opacity: backOpacity,
            padding: 24,
            position: 'absolute',
            transform: `rotateY(${backRotation}deg)`,
          }}
        >
          {backContent}
        </div>
      </div>
    </AbsoluteFill>
  );
};
