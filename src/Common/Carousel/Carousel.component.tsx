import React from 'react';

import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface CarouselItem {
  src: string;
  label: string;
}

interface CarouselProps {
  images: CarouselItem[];
}

export const Carousel: React.FC<CarouselProps> = ({
  images = [
    { label: 'Sunrise', src: 'https://picsum.photos/seed/c1/600/400' },
    { label: 'Waterfall', src: 'https://picsum.photos/seed/c2/600/400' },
    { label: 'Desert', src: 'https://picsum.photos/seed/c3/600/400' },
    { label: 'Aurora', src: 'https://picsum.photos/seed/c4/600/400' },
    { label: 'Canyon', src: 'https://picsum.photos/seed/c5/600/400' },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const CARD_WIDTH = 320;
  const CARD_HEIGHT = 220;
  const OVERLAP = 60;
  const SLIDE_DURATION = fps * 3; // 3 seconds per slide
  const TOTAL_DURATION = images.length * SLIDE_DURATION;

  // Total width the carousel spans
  const totalWidth = images.length * (CARD_WIDTH - OVERLAP) + OVERLAP;

  // Auto-scroll progress (0 to 1 over the whole composition duration)
  const progress = interpolate(frame % TOTAL_DURATION, [0, TOTAL_DURATION], [0, 1], {
    easing: Easing.ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Target center index moves smoothly
  const targetIndex = progress * (images.length - 1);
  const centerIndex = targetIndex;

  // Center offset to keep current item in the middle
  const centerOffset = centerIndex * (CARD_WIDTH - OVERLAP) + CARD_WIDTH / 2 - width / 2;

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: CARD_HEIGHT + 100,
          left: '50%',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: totalWidth + 200,
        }}
      >
        {images.map((img, i) => {
          // Distance from current center index
          const distance = i - centerIndex;
          const absDistance = Math.abs(distance);

          // Position: slide from the center offset
          const xPos = i * (CARD_WIDTH - OVERLAP) - centerOffset + (width / 2 - CARD_WIDTH / 2);

          // Scale: current is 1, others are smaller
          const scale = interpolate(absDistance, [0, 1, 3], [1, 0.8, 0.6], {
            extrapolateRight: 'clamp',
          });

          // Opacity: current is fully visible, edges fade
          const opacity = interpolate(absDistance, [0, 1, 2.5], [1, 0.9, 0.3], {
            extrapolateRight: 'clamp',
          });

          // Y offset: current is centered, others slightly lower
          const yOffset = interpolate(absDistance, [0, 2], [0, 20], {
            extrapolateRight: 'clamp',
          });

          // Entrance spring
          const entryDelay = i * 3;
          const entrySpring = spring({
            config: { damping: 14, mass: 0.5, stiffness: 80 },
            fps,
            frame: frame - entryDelay,
            from: 0,
            to: 1,
          });

          if (frame < entryDelay) return null;

          const entryScale = interpolate(entrySpring, [0, 1], [0.7, 1]);
          const entryOpacity = interpolate(frame - entryDelay, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
          });

          // Active glow
          const isCenter = absDistance < 0.5;
          const glowOpacity = isCenter ? Math.sin((frame * Math.PI * 2) / 40) * 0.15 + 0.15 : 0;

          return (
            <div
              key={i}
              style={{
                border: isCenter
                  ? '2px solid rgba(8, 145, 178, 0.6)'
                  : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                boxShadow: isCenter
                  ? `0 0 30px rgba(8, 145, 178, ${glowOpacity + 0.2})`
                  : '0 4px 16px rgba(0,0,0,0.3)',
                height: CARD_HEIGHT,
                left: xPos,
                opacity: opacity * entryOpacity,
                overflow: 'hidden',
                position: 'absolute',
                top: '50%',
                transform: `translateY(${-CARD_HEIGHT / 2 + yOffset}px) scale(${scale * entryScale})`,
                transition: 'box-shadow 0.1s ease',
                width: CARD_WIDTH,
              }}
            >
              <Img
                src={img.src}
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  width: '100%',
                }}
              />

              {/* Gradient overlay */}
              <div
                style={{
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  bottom: 0,
                  left: 0,
                  padding: '12px 16px',
                  position: 'absolute',
                  right: 0,
                }}
              >
                <span
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 16,
                    fontWeight: 700,
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {img.label}
                </span>
              </div>

              {/* Active glow overlay */}
              {isCenter && (
                <div
                  style={{
                    boxShadow: 'inset 0 0 40px rgba(8, 145, 178, 0.15)',
                    inset: 0,
                    pointerEvents: 'none',
                    position: 'absolute',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
