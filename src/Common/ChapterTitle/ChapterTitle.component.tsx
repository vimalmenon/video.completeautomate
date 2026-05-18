import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface ChapterTitleProps {
  chapterNumber: number;
  title: string;
}

export const ChapterTitle: React.FC<ChapterTitleProps> = ({
  chapterNumber = 1,
  title = 'The Beginning',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // CHAPTER label animates in
  const labelOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const labelTranslateY = interpolate(frame, [0, 10], [-20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Large number spring
  const numberSpring = spring({
    config: { damping: 15, mass: 0.6, stiffness: 70 },
    fps,
    frame: frame - 5,
    from: 0,
    to: 1,
  });

  const numberScale = interpolate(numberSpring, [0, 1], [1.5, 1]);
  const numberOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title slides up after number
  const titleOpacity = interpolate(frame, [18, 33], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleTranslateY = interpolate(frame, [18, 33], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* CHAPTER label */}
        <div
          style={{
            color: '#0891B2',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: '0.3em',
            marginBottom: 8,
            opacity: labelOpacity,
            textTransform: 'uppercase',
            transform: `translateY(${labelTranslateY}px)`,
          }}
        >
          CHAPTER
        </div>

        {/* Large number */}
        <div
          style={{
            color: '#FFFFFF',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: 24,
            opacity: numberOpacity,
            textShadow: '0 0 40px rgba(8, 145, 178, 0.3)',
            transform: `scale(${numberScale})`,
          }}
        >
          {String(chapterNumber).padStart(2, '0')}
        </div>

        {/* Decorative line */}
        <div
          style={{
            backgroundColor: '#0891B2',
            borderRadius: 2,
            height: 3,
            margin: '0 auto',
            marginBottom: 24,
            width: 60,
          }}
        />

        {/* Title */}
        <div
          style={{
            color: '#E2E8F0',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 36,
            fontWeight: 700,
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          {title}
        </div>
      </div>
    </AbsoluteFill>
  );
};
