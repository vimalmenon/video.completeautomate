import React, { useMemo } from 'react';

import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from 'remotion';

interface BokehCirclesProps {
  numCircles?: number;
}

interface Circle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  phase: number;
  driftX: number;
  driftY: number;
  hue: number;
}

export const BokehCircles: React.FC<BokehCirclesProps> = ({ numCircles = 20 }) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const circles = useMemo<Circle[]>(() => {
    const result: Circle[] = [];
    for (let i = 0; i < numCircles; i++) {
      result.push({
        driftX: random(`bokeh-dx-${i}`) * 2 - 1,
        driftY: random(`bokeh-dy-${i}`) * 2 - 1,
        hue: random(`bokeh-h-${i}`) * 60 + 180,
        phase: random(`bokeh-ph-${i}`) * Math.PI * 2,
        radius: random(`bokeh-r-${i}`) * 80 + 30,
        speed: random(`bokeh-sp-${i}`) * 0.008 + 0.003,
        x: random(`bokeh-x-${i}`) * width,
        y: random(`bokeh-y-${i}`) * height,
      });
    }
    return result;
  }, [numCircles, width, height]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', overflow: 'hidden' }}>
      {circles.map((c, i) => {
        const floatY = Math.sin(frame * c.speed + c.phase) * 60;
        const floatX = Math.cos(frame * c.speed * 0.6 + c.phase * 1.3) * 40;
        const opacity = 0.05 + Math.sin(frame * c.speed * 0.5 + c.phase) * 0.04 + 0.06;
        const scale = 1 + Math.sin(frame * c.speed * 0.3 + c.phase * 2) * 0.15;

        return (
          <div
            key={i}
            style={{
              background: `radial-gradient(circle at 35% 35%, hsla(${c.hue}, 80%, 70%, ${opacity * 0.5}), hsla(${c.hue + 20}, 70%, 50%, ${opacity}))`,
              borderRadius: '50%',
              filter: `blur(${c.radius * 0.25}px)`,
              height: c.radius * scale,
              left: c.x + floatX,
              pointerEvents: 'none',
              position: 'absolute',
              top: c.y + floatY + frame * c.driftY * 0.3,
              transform: `translate(-50%, -50%)`,
              width: c.radius * scale,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
