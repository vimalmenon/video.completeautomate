import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface AnimatedListProps {
  items: string[];
  itemColor?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  itemColor = '#0891B2',
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const staggerFrames = Math.round(fps * 0.2);
  const itemHeight = 56;
  const gap = 12;

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
          flexDirection: 'column',
          gap,
          width: 500,
        }}
      >
        {items.map((item, i) => {
          const startFrame = i * staggerFrames;

          const slideIn = spring({
            config: { damping: 12, mass: 0.3, stiffness: 120 },
            fps,
            frame: frame - startFrame,
            from: 0,
            to: 1,
          });

          const translateX = interpolate(slideIn, [0, 1], [-80, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const opacity = interpolate(slideIn, [0, 0.3, 1], [0, 1, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          if (frame < startFrame) return null;

          return (
            <div
              key={i}
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(8, 145, 178, 0.08)',
                border: `1px solid ${itemColor}25`,
                borderRadius: 12,
                boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                display: 'flex',
                gap: 16,
                height: itemHeight,
                opacity,
                padding: '14px 20px',
                transform: `translateX(${translateX}px)`,
                transition: 'background-color 0.2s',
              }}
            >
              {/* Icon dot */}
              <div
                style={{
                  backgroundColor: itemColor,
                  borderRadius: '50%',
                  boxShadow: `0 0 8px ${itemColor}60`,
                  flexShrink: 0,
                  height: 10,
                  width: 10,
                }}
              />
              <span
                style={{
                  color: '#FFFFFF',
                  flex: 1,
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                {item}
              </span>
              <span
                style={{
                  color: itemColor,
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '0.8rem',
                  opacity: 0.6,
                }}
              >
                {`0${i + 1}`}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
