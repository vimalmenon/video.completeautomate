import React from 'react';

import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';

import { BarChart, BarDataPoint } from '../../Common/BarChart';

const barDataPointSchema = z.object({
  label: z.string(),
  x: z.number(),
  y: z.number(),
});

export const barChartDemoSchema = z.object({
  data: z.array(barDataPointSchema).min(1).max(20),
  subtitle: z.string(),
  title: z.string(),
});

type BarChartDemoProps = z.infer<typeof barChartDemoSchema>;

export const BarChartDemo: React.FC<BarChartDemoProps> = ({ data, subtitle, title }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 20], [-10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        background: 'linear-gradient(to bottom right, #111827, #1f2937)',
        justifyContent: 'center',
      }}
    >
      {/* Title */}
      <div
        style={{
          left: '50%',
          opacity: titleOpacity,
          position: 'absolute',
          textAlign: 'center',
          top: '8%',
          transform: `translateX(-50%) translateY(${titleY}px)`,
        }}
      >
        <h1
          style={{
            color: '#F8FAFC',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: '-0.5px',
            margin: 0,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 16,
            marginTop: 8,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Chart */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          marginTop: 40,
          padding: 20,
        }}
      >
        <BarChart data={data as BarDataPoint[]} startFrame={25} staggerFrames={3} />
      </div>
    </AbsoluteFill>
  );
};
