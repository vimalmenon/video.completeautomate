import React from 'react';

import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from 'remotion';

import {
  ThreeDonut,
  ThreeFloatingSpheres,
  ThreeGalaxy,
  ThreeGlobe,
  ThreeMorphing,
  ThreeRotatingCube,
  ThreeShapes,
  ThreeTorusKnot,
} from '../../Common';

const SEGMENT_DURATION = 75;
const SEGMENTS = [
  { Component: ThreeRotatingCube, label: 'Rotating Cube' },
  { Component: ThreeTorusKnot, label: 'Torus Knot' },
  { Component: ThreeFloatingSpheres, label: 'Floating Spheres' },
  { Component: ThreeGlobe, label: 'Globe' },
  { Component: ThreeMorphing, label: 'Morphing Shapes' },
  { Component: ThreeGalaxy, label: 'Galaxy' },
  { Component: ThreeDonut, label: 'Donut' },
  { Component: ThreeShapes, label: 'Shapes' },
];

interface LabelOverlayProps {
  label: string;
  frame: number;
}

const LabelOverlay: React.FC<LabelOverlayProps> = ({ frame, label }) => {
  const opacity = interpolate(frame, [0, 10, 60, 74], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        bottom: 40,
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        right: 0,
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      <div
        style={{
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: 8,
          display: 'inline-block',
          opacity,
          padding: '8px 24px',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export const ThreeDemo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      {SEGMENTS.map(({ Component, label }, i) => (
        <Sequence key={label} from={i * SEGMENT_DURATION} durationInFrames={SEGMENT_DURATION}>
          <Component />
          <LabelOverlay label={label} frame={frame - i * SEGMENT_DURATION} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
