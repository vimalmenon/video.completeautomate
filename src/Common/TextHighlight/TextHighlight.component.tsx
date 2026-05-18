import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface TextHighlightProps {
  text: string;
  highlightColor?: string;
}

export const TextHighlight: React.FC<TextHighlightProps> = ({
  highlightColor = '#0891B2',
  text = 'Hello World Example Text',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');
  const framesPerWord = Math.round(fps * 0.4);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
          maxWidth: 800,
          padding: 40,
        }}
      >
        {words.map((word, i) => {
          const wordStart = i * framesPerWord;
          const wordAppear = spring({
            config: { damping: 12, mass: 0.3, stiffness: 150 },
            fps,
            frame: frame - wordStart,
            from: 0,
            to: 1,
          });

          const isActive = frame >= wordStart && frame < wordStart + framesPerWord;
          const isRevealed = frame >= wordStart;

          const highlightProgress = isActive
            ? interpolate(frame - wordStart, [0, framesPerWord * 0.3], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : isRevealed
              ? 1
              : 0;

          return (
            <span
              key={i}
              style={{
                color: isActive
                  ? '#FFFFFF'
                  : isRevealed
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.15)',
                display: 'inline-block',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '3rem',
                fontWeight: 700,
                opacity: wordAppear,
                position: 'relative',
                transform: `translateY(${(1 - wordAppear) * 20}px)`,
                transition: 'color 0.15s ease',
              }}
            >
              {word}
              {/* Highlight underline bar */}
              {isRevealed && (
                <span
                  style={{
                    backgroundColor: highlightColor,
                    borderRadius: 2,
                    bottom: -4,
                    boxShadow: `0 0 12px ${highlightColor}`,
                    height: 4,
                    left: 0,
                    position: 'absolute',
                    width: `${highlightProgress * 100}%`,
                  }}
                />
              )}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
