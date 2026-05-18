import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface WaterRippleProps {
  children: [React.ReactNode, React.ReactNode];
  durationInFrames?: number;
  rippleCount?: number;
}

export const WaterRipple: React.FC<WaterRippleProps> = ({
  children,
  durationInFrames = 60,
  rippleCount = 3,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const [sceneA, sceneB] = children;

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.sqrt(
    centerX * centerX + centerY * centerY
  );

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ripples = useMemo(() => {
    return Array.from({ length: rippleCount }, (_, i) => {
      const delay = (i / rippleCount) * 0.4;
      return { index: i, delay };
    });
  }, [rippleCount]);

  const clipPathId = useMemo(
    () => `waterRippleClip-${Math.random().toString(36).slice(2, 8)}`,
    []
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <AbsoluteFill>{sceneA}</AbsoluteFill>
      <svg width={0} height={0}>
        <defs>
          <clipPath id={clipPathId}>
            {ripples.map((r) => {
              const p = Math.max(
                0,
                Math.min(1, (progress - r.delay) / (1 - r.delay))
              );
              const radius = maxRadius * p;
              const opacity = interpolate(p, [0, 0.6, 1], [0, 1, 0.3]);
              return (
                <circle
                  key={r.index}
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="white"
                  opacity={opacity}
                />
              );
            })}
          </clipPath>
        </defs>
      </svg>
      <AbsoluteFill style={{ clipPath: `url(#${clipPathId})` }}>
        {sceneB}
        {/* Ripple rings overlay */}
        <svg
          width={width}
          height={height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        >
          {ripples.map((r) => {
            const p = Math.max(
              0,
              Math.min(1, (progress - r.delay) / (1 - r.delay))
            );
            const radius = maxRadius * p;
            const opacity = interpolate(p, [0, 0.4, 1], [0, 0.6, 0]);
            const strokeW = interpolate(p, [0, 1], [4, 1]);
            return (
              <circle
                key={r.index}
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="#0891B2"
                strokeWidth={strokeW}
                opacity={opacity}
              />
            );
          })}
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
