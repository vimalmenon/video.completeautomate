import React from 'react';

import { Img, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface PhotoStackImage {
  src: string;
  label?: string;
}

interface PhotoStackProps {
  images: PhotoStackImage[];
  startFrame?: number;
}

export const PhotoStack: React.FC<PhotoStackProps> = ({ images, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;
  const imgWidth = width * 0.3;
  const imgHeight = height * 0.4;

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        display: 'flex',
        inset: 0,
        justifyContent: 'center',
        position: 'absolute',
      }}
    >
      {images.map((img, i) => {
        const delay = i * 10;
        const s = spring({
          config: { damping: i === 0 ? 10 : 12, mass: 0.6, stiffness: 100 },
          fps,
          frame: frame - startFrame - delay,
          from: 0,
          to: 1,
        });

        const rotation = (random(`rot-${i}`) - 0.5) * 20;
        const offsetX = (random(`x-${i}`) - 0.5) * 80;
        const offsetY = (random(`y-${i}`) - 0.5) * 60;

        const scale = s;
        const translateY = (1 - s) * 30;
        const opacity = s;

        return (
          <div
            key={i}
            style={{
              borderRadius: 4,
              boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
              height: imgHeight,
              left: centerX - imgWidth / 2 + offsetX,
              opacity,
              overflow: 'hidden',
              position: 'absolute',
              top: centerY - imgHeight / 2 + offsetY,
              transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotation * s}deg)`,
              width: imgWidth,
              zIndex: images.length - i,
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
            {img.label && (
              <div
                style={{
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  bottom: 0,
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  left: 0,
                  padding: '8px 12px',
                  position: 'absolute',
                  right: 0,
                }}
              >
                {img.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
