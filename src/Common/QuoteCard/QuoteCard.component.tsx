import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface QuoteCardProps {
  quote: string;
  author: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  author = 'Steve Jobs',
  quote = 'The only way to do great work is to love what you do.',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Opening quote mark
  const quoteMarkSpring = spring({
    config: { damping: 12, mass: 0.4, stiffness: 90 },
    fps,
    frame,
    from: 0,
    to: 1,
  });

  const quoteMarkScale = interpolate(quoteMarkSpring, [0, 1], [1.5, 1]);
  const quoteMarkOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Quote text appears character by character (word by word approximation)
  const textOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textTranslateY = interpolate(frame, [10, 35], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Author attribution
  const authorOpacity = interpolate(frame, [30, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const authorTranslateX = interpolate(frame, [30, 48], [-20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Decorative line
  const lineScale = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          maxWidth: 800,
          textAlign: 'center',
        }}
      >
        {/* Opening quote mark */}
        <div
          style={{
            color: '#0891B2',
            fontFamily: 'Georgia, serif',
            fontSize: 80,
            lineHeight: 0.6,
            marginBottom: 12,
            opacity: quoteMarkOpacity,
            transform: `scale(${quoteMarkScale})`,
          }}
        >
          "
        </div>

        {/* Quote text */}
        <div
          style={{
            color: '#E2E8F0',
            fontFamily: 'Georgia, serif',
            fontSize: 32,
            fontStyle: 'italic',
            fontWeight: 500,
            lineHeight: 1.5,
            marginBottom: 28,
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          {quote}
        </div>

        {/* Decorative line */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              backgroundColor: '#0891B2',
              borderRadius: 1,
              height: 2,
              transform: `scaleX(${lineScale})`,
              width: 40,
            }}
          />
          <div
            style={{
              backgroundColor: '#0891B2',
              borderRadius: '50%',
              height: 6,
              width: 6,
            }}
          />
          <div
            style={{
              backgroundColor: '#0891B2',
              borderRadius: 1,
              height: 2,
              transform: `scaleX(${lineScale})`,
              width: 40,
            }}
          />
        </div>

        {/* Author */}
        <div
          style={{
            color: '#94A3B8',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '0.05em',
            opacity: authorOpacity,
            textTransform: 'uppercase',
            transform: `translateX(${authorTranslateX}px)`,
          }}
        >
          — {author}
        </div>
      </div>
    </AbsoluteFill>
  );
};
