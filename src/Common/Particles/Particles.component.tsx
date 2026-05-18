import React, { useMemo } from 'react';

import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface ParticlesProps {
  count?: number;
  connectDistance?: number;
  particleColor?: string;
  lineColor?: string;
  particleSize?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  size: number;
}

export const Particles: React.FC<ParticlesProps> = ({
  connectDistance = 120,
  count = 60,
  lineColor = '#0891B2',
  particleColor = '#0891B2',
  particleSize = 3,
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = random(`part-a-${i}`) * Math.PI * 2;
      const speed = random(`part-sp-${i}`) * 0.5 + 0.2;
      result.push({
        phase: random(`part-ph-${i}`) * Math.PI * 2,
        size: random(`part-sz-${i}`) * particleSize + 1,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        x: random(`part-x-${i}`) * width,
        y: random(`part-y-${i}`) * height,
      });
    }
    return result;
  }, [count, width, height, particleSize]);

  // Update particle positions based on frame
  const updatedParticles = useMemo(
    () =>
      particles.map((p, i) => {
        // Gentle drifting motion over time
        const driftX =
          Math.sin(frame * 0.005 + p.phase) * 0.3 + Math.sin(frame * 0.012 + p.phase * 1.5) * 0.2;
        const driftY =
          Math.cos(frame * 0.007 + p.phase * 0.7) * 0.3 +
          Math.cos(frame * 0.01 + p.phase * 2) * 0.2;

        let x = p.x + p.vx * Math.sin(frame * 0.003 + p.phase) * 5 + driftX * 2;
        let y = p.y + p.vy * Math.cos(frame * 0.004 + p.phase * 0.5) * 5 + driftY * 2;

        // Wrap around edges
        if (x < 0) x += width;
        if (x > width) x -= width;
        if (y < 0) y += height;
        if (y > height) y -= height;

        const pulse = Math.sin(frame * 0.03 + p.phase) * 0.3 + 0.7;

        return { ...p, currentSize: p.size * pulse, x, y };
      }),
    [particles, frame, width, height]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', overflow: 'hidden' }}>
      <svg width={width} height={height}>
        {/* Connection lines */}
        {updatedParticles.map((a, i) =>
          updatedParticles.slice(i + 1).map((b, j) => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > connectDistance) return null;

            const lineOpacity = interpolate(dist, [0, connectDistance], [0.3, 0], {
              easing: Easing.out(Easing.quad),
            });

            return (
              <line
                key={`${i}-${j}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={lineColor}
                strokeOpacity={lineOpacity}
                strokeWidth={0.5}
              />
            );
          })
        )}

        {/* Particle dots */}
        {updatedParticles.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.currentSize}
            fill={particleColor}
            opacity={0.6 + Math.sin(frame * 0.03 + p.phase) * 0.2}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
