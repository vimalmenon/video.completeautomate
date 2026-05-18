import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface CarouselItem {
  title: string;
  description: string;
  color: string;
}

interface RotatingCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
}

export const RotatingCarousel: React.FC<RotatingCarouselProps> = ({
  activeIndex = 0,
  items = [{ color: '#0891B2', description: 'Description 1', title: 'Card 1' }],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotation = spring({
    config: { damping: 12, mass: 0.5, stiffness: 70 },
    fps,
    frame: frame,
    from: 0,
    to: 360,
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        perspective: 1000,
      }}
    >
      <div
        style={{
          height: 400,
          position: 'relative',
          transformStyle: 'preserve-3d',
          width: 300,
        }}
      >
        {items.map((item, i) => {
          const angle = (i - activeIndex) * (360 / Math.max(items.length, 1)) + rotation * 0.3;
          const isActive = i === activeIndex;

          const translateZ = interpolate(Math.abs(angle % 360), [0, 60, 180], [0, -200, -400], {
            extrapolateRight: 'clamp',
          });

          const opacity = interpolate(Math.abs(angle % 360), [0, 60, 180], [1, 0.6, 0], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                alignItems: 'center',
                backfaceVisibility: 'hidden',
                backgroundColor: item.color,
                border: isActive ? '2px solid rgba(255,255,255,0.3)' : 'none',
                borderRadius: 16,
                boxShadow: isActive
                  ? '0 0 40px rgba(8, 145, 178, 0.4)'
                  : '0 4px 20px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
                opacity,
                padding: 24,
                position: 'absolute',
                transform: `rotateY(${angle}deg) translateZ(${300 - translateZ}px)`,
                width: '100%',
              }}
            >
              <span
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: 12,
                  textAlign: 'center',
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '1rem',
                  textAlign: 'center',
                }}
              >
                {item.description}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
