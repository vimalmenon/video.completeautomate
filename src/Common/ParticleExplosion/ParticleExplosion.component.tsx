import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

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
  text = "BOOM",
  colors = ["#0891B2", "#22D3EE", "#67E8F9", "#06B6D4", "#F472B6", "#A78BFA"],
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
        distance: 150 + Math.random() * 250,
        size: 4 + Math.random() * 8,
        color: colors[i % colors.length],
      })),
    []
  );

  // Text scale before explosion
  const textScale = spring({
    frame,
    fps,
    from: 0,
    to: 1.2,
    config: { mass: 0.6, damping: 8, stiffness: 100 },
  });

  const textOpacity = interpolate(frame, [0, fps * 0.3, fps * 0.45], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Explosion phase
  const showExplosion = localFrame > 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Center text */}
      <div
        style={{
          position: "absolute",
          transform: `scale(${showExplosion ? 1 : textScale})`,
          opacity: showExplosion
            ? interpolate(localFrame, [0, fps * 0.1], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : textOpacity,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: "6rem",
            fontWeight: 900,
            color: "#0891B2",
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            textShadow: "0 0 40px rgba(8, 145, 178, 0.6), 0 0 80px rgba(8, 145, 178, 0.3)",
            letterSpacing: "0.08em",
          }}
        >
          {text}
        </span>
      </div>

      {/* Particles */}
      {showExplosion &&
        particles.map((p, i) => {
          const pProgress = spring({
            frame: localFrame + i * 0.5,
            fps,
            from: 0,
            to: 1,
            config: { mass: 0.3, damping: 4, stiffness: 50 },
          });

          const x = Math.cos((p.angle * Math.PI) / 180) * p.distance * pProgress;
          const y = Math.sin((p.angle * Math.PI) / 180) * p.distance * pProgress;
          const particleScale = interpolate(pProgress, [0, 0.2, 1], [0, 1.5, 0.3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const particleOpacity = interpolate(
            pProgress,
            [0, 0.2, 1],
            [0, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                backgroundColor: p.color,
                transform: `translate(${x}px, ${y}px) scale(${particleScale})`,
                opacity: particleOpacity,
                boxShadow: `0 0 10px ${p.color}`,
              }}
            />
          );
        })}
    </AbsoluteFill>
  );
};
