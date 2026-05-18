import React, { useMemo } from 'react';

import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from 'remotion';

interface StarfieldProps {
  numStars?: number;
  speed?: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
}

export const Starfield: React.FC<StarfieldProps> = ({ numStars = 200, speed = 0.5 }) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const stars = useMemo<Star[]>(() => {
    const result: Star[] = [];
    for (let i = 0; i < numStars; i++) {
      result.push({
        brightness: random(`star-bright-${i}`) * 0.8 + 0.2,
        size: random(`star-size-${i}`) * 2 + 0.5,
        x: random(`star-x-${i}`),
        y: random(`star-y-${i}`),
        z: random(`star-z-${i}`) * 0.99 + 0.01,
      });
    }
    return result;
  }, [numStars]);

  // Comet
  const cometActive = frame % 300 < 60;
  const cometProgress = (frame % 300) / 300;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', overflow: 'hidden' }}>
      {stars.map((star, i) => {
        // Move z closer over time
        const zOffset = frame * speed * 0.002;
        let zAdjusted = star.z + zOffset;
        if (zAdjusted > 1) zAdjusted = star.z; // reset loop

        const scale = 1 / zAdjusted;
        const px = (star.x - 0.5) * scale * width * 0.5 + width / 2;
        const py = (star.y - 0.5) * scale * height * 0.5 + height / 2;
        const size = star.size * scale * 0.03;

        // Fade out when near edges
        const edgeFade = Math.min(1, Math.min(px, width - px, py, height - py) / 50);

        const opacity = star.brightness * Math.min(1, scale * 0.5) * edgeFade;
        const hue = 200 + star.brightness * 60;

        return (
          <div
            key={i}
            style={{
              backgroundColor: `hsl(${hue}, 80%, ${70 + star.brightness * 30}%)`,
              borderRadius: '50%',
              boxShadow: size > 3 ? `0 0 ${size * 2}px rgba(255,255,255,0.3)` : 'none',
              height: size,
              left: px,
              opacity,
              position: 'absolute',
              top: py,
              width: size,
            }}
          />
        );
      })}

      {/* Comet */}
      {cometActive && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            boxShadow: '0 0 8px #ffffff, 0 0 20px #0891B2',
            height: 3,
            left: (cometProgress * 2 - 0.5) * width,
            opacity: 1,
            position: 'absolute',
            top: (cometProgress * 2 - 0.3) * height * 0.5,
            width: 3,
          }}
        />
      )}
      {cometActive && (
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(8,145,178,0) 0%, rgba(8,145,178,0.4) 60%, rgba(255,255,255,0.8) 100%)',
            height: 2,
            left: (cometProgress * 2 - 0.5) * width,
            opacity: Math.sin(cometProgress * Math.PI),
            position: 'absolute',
            top: (cometProgress * 2 - 0.3) * height * 0.5,
            transform: `rotate(${-30 + cometProgress * 20}deg)`,
            transformOrigin: 'right center',
            width: 80,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
