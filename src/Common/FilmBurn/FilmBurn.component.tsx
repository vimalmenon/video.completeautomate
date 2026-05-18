import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface FilmBurnProps {
  children: React.ReactNode;
  startFrame?: number;
  durationInFrames?: number;
}

export const FilmBurn: React.FC<FilmBurnProps> = ({
  children,
  startFrame = 0,
  durationInFrames = 80,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  const burnOpacity = interpolate(
    elapsed,
    [0, durationInFrames * 0.3, durationInFrames * 0.6, durationInFrames],
    [0, 0.35, 0.15, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {children}

      {/* Warm light leak overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: burnOpacity,
          background: `
            radial-gradient(
              ellipse 120% 80% at 70% 30%,
              rgba(255, 120, 20, 0.6) 0%,
              rgba(255, 60, 10, 0.3) 30%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 80% 100% at 20% 80%,
              rgba(200, 50, 0, 0.2) 0%,
              transparent 50%
            )
          `,
          mixBlendMode: "screen",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
