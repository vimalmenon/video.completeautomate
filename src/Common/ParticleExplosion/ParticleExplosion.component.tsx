import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface ParticleExplosionProps {
  text: string;
  colors?: string[];
}

interface Particle {
  angle: number;
  distance: number;
  size: number;
  color: string;
}

export const ParticleExplosion: React.FC<ParticleExplosionProps> = ({
  colors = ['#0891B2', '#22D3EE', '#67E8F9', '#06B6D4', '#F472B6', '#A78BFA'],
  text = 'BOOM',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const explosionStart = Math.round(fps * 0.5);
  const localFrame = Math.max(0, frame - explosionStart);

  const particleCount = 40;
  const particles: Particle[] = React.useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        angle: (i / particleCount) * 360 + Math.random() * 20,
        color: colors[i % colors.length],
        distance: 150 + Math.random() * 250,
        size: 4 + Math.random() * 8,
      })),
    []
  );

  // Text scale before explosion
  const textScale = spring({
    config: { damping: 8, mass: 0.6, stiffness: 100 },
    fps,
    frame,
    from: 0,
    to: 1.2,
  });

  const textOpacity = interpolate(frame, [0, fps * 0.3, fps * 0.45], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Explosion phase
  const showExplosion = localFrame > 0;

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Center text */}
      <div
        style={{
          opacity: showExplosion
            ? interpolate(localFrame, [0, fps * 0.1], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : textOpacity,
          position: 'absolute',
          transform: `scale(${showExplosion ? 1 : textScale})`,
          zIndex: 10,
        }}
      >
        <span
          style={{
            color: '#0891B2',
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: '6rem',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textShadow: '0 0 40px rgba(8, 145, 178, 0.6), 0 0 80px rgba(8, 145, 178, 0.3)',
          }}
        >
          {text}
        </span>
      </div>

      {/* Particles */}
      {showExplosion &&
        particles.map((p, i) => {
          const pProgress = spring({
            config: { damping: 4, mass: 0.3, stiffness: 50 },
            fps,
            frame: localFrame + i * 0.5,
            from: 0,
            to: 1,
          });

          const x = Math.cos((p.angle * Math.PI) / 180) * p.distance * pProgress;
          const y = Math.sin((p.angle * Math.PI) / 180) * p.distance * pProgress;
          const particleScale = interpolate(pProgress, [0, 0.2, 1], [0, 1.5, 0.3], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const particleOpacity = interpolate(pProgress, [0, 0.2, 1], [0, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: p.color,
                borderRadius: '50%',
                boxShadow: `0 0 10px ${p.color}`,
                height: p.size,
                left: '50%',
                opacity: particleOpacity,
                position: 'absolute',
                top: '50%',
                transform: `translate(${x}px, ${y}px) scale(${particleScale})`,
                width: p.size,
              }}
            />
          );
        })}
    </AbsoluteFill>
  );
};
