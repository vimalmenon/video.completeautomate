import React from 'react';

import { Img, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface PolaroidFrameProps {
  src: string;
  caption?: string;
  startFrame?: number;
  rotation?: number;
}

export const PolaroidFrame: React.FC<PolaroidFrameProps> = ({
  caption = '',
  rotation = -3,
  src,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame - startFrame;

  const dropSpring = spring({
    config: { damping: 9, mass: 1.2, stiffness: 80 },
    fps,
    frame: elapsed,
    from: -600,
    to: 0,
  });

  const bounceSpring = spring({
    config: { damping: 5, mass: 0.5, stiffness: 200 },
    fps,
    frame: elapsed - 20,
    from: 0,
    to: 1,
  });

  const extraBounce = bounceSpring > 0.5 ? Math.sin((bounceSpring - 0.5) * Math.PI * 4) * 3 : 0;

  const polaroidWidth = 300;
  const polaroidHeight = 380;
  const imageHeight = polaroidWidth;

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
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: `
            0 4px 6px rgba(0,0,0,0.1),
            0 10px 40px rgba(0,0,0,0.3)
          `,
          height: polaroidHeight,
          opacity: elapsed < 0 ? 0 : 1,
          padding: 12,
          paddingBottom: 0,
          transform: `translateY(${dropSpring + extraBounce}px) rotate(${rotation}deg)`,
          width: polaroidWidth,
        }}
      >
        <Img
          src={src}
          style={{
            borderRadius: 1,
            height: imageHeight,
            objectFit: 'cover',
            width: '100%',
          }}
        />
        {caption && (
          <div
            style={{
              color: '#333',
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.02em',
              padding: '10px 4px 16px',
              textAlign: 'center',
            }}
          >
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
