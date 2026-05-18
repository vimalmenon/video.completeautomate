import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import {
  ThreeRotatingCube,
  ThreeTorusKnot,
  ThreeFloatingSpheres,
  ThreeGlobe,
  ThreeMorphing,
  ThreeGalaxy,
  ThreeDonut,
  ThreeShapes,
} from "../../Common";

const SEGMENT_DURATION = 75;
const SEGMENTS = [
  { Component: ThreeRotatingCube, label: "Rotating Cube" },
  { Component: ThreeTorusKnot, label: "Torus Knot" },
  { Component: ThreeFloatingSpheres, label: "Floating Spheres" },
  { Component: ThreeGlobe, label: "Globe" },
  { Component: ThreeMorphing, label: "Morphing Shapes" },
  { Component: ThreeGalaxy, label: "Galaxy" },
  { Component: ThreeDonut, label: "Donut" },
  { Component: ThreeShapes, label: "Shapes" },
];

interface LabelOverlayProps {
  label: string;
  frame: number;
}

const LabelOverlay: React.FC<LabelOverlayProps> = ({ label, frame }) => {
  const opacity = interpolate(frame, [0, 10, 60, 74], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 24px",
          borderRadius: 8,
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          opacity,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 18,
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.05em",
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
    <AbsoluteFill style={{ backgroundColor: "#0F172A" }}>
      {SEGMENTS.map(({ Component, label }, i) => (
        <Sequence
          key={label}
          from={i * SEGMENT_DURATION}
          durationInFrames={SEGMENT_DURATION}
        >
          <Component />
          <LabelOverlay label={label} frame={frame - i * SEGMENT_DURATION} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
