import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface VignettePulseProps {
  children: React.ReactNode;
  startFrame?: number;
  minOpacity?: number;
  maxOpacity?: number;
  speed?: number;
}

export const VignettePulse: React.FC<VignettePulseProps> = ({
  children,
  startFrame = 0,
  minOpacity = 0.3,
  maxOpacity = 0.7,
  speed = 24,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const elapsed = frame - startFrame;

  const pulse = interpolate(
    Math.sin((elapsed / speed) * Math.PI * 2),
    [-1, 1],
    [minOpacity, maxOpacity]
  );

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {children}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(
            ellipse ${width * 0.4}px ${height * 0.4}px at 50% 50%,
            transparent 0%,
            rgba(0, 0, 0, ${pulse}) 100%
          )`,
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </div>
  );
};
