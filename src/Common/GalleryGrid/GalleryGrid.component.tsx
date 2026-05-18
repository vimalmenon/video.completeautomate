import React from 'react';

import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface GalleryItem {
  src: string;
  label: string;
}

interface GalleryGridProps {
  images: GalleryItem[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  images = [
    { label: 'Image 1', src: 'https://picsum.photos/seed/img1/400/300' },
    { label: 'Image 2', src: 'https://picsum.photos/seed/img2/400/300' },
    { label: 'Image 3', src: 'https://picsum.photos/seed/img3/400/300' },
    { label: 'Image 4', src: 'https://picsum.photos/seed/img4/400/300' },
    { label: 'Image 5', src: 'https://picsum.photos/seed/img5/400/300' },
    { label: 'Image 6', src: 'https://picsum.photos/seed/img6/400/300' },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const cols = 3;
  const gap = 12;
  const cellWidth = (width - gap * (cols + 1) - 80) / cols;
  const cellHeight = (height - gap * 2 - 80) / 2;

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {images.slice(0, 6).map((img, i) => {
          const staggerDelay = i * 4;
          const imgSpring = spring({
            config: { damping: 12, mass: 0.5, stiffness: 100 },
            fps,
            frame: frame - staggerDelay,
            from: 0,
            to: 1,
          });

          if (frame < staggerDelay) return null;

          const scale = interpolate(imgSpring, [0, 1], [0.8, 1]);
          const opacity = interpolate(frame - staggerDelay, [0, 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const translateY = interpolate(imgSpring, [0, 1], [30, 0]);

          return (
            <div
              key={i}
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(8, 145, 178, 0.2)',
                borderRadius: 12,
                height: cellHeight,
                opacity,
                overflow: 'hidden',
                position: 'relative',
                transform: `scale(${scale}) translateY(${translateY}px)`,
                width: cellWidth,
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
              <div
                style={{
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  bottom: 0,
                  left: 0,
                  padding: '8px 12px',
                  position: 'absolute',
                  right: 0,
                }}
              >
                <span
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {img.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
