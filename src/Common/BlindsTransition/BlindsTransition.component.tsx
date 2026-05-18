import React, { useMemo } from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface BlindsTransitionProps {
  children: [React.ReactNode, React.ReactNode];
  stripCount?: number;
  durationInFrames?: number;
}

export const BlindsTransition: React.FC<BlindsTransitionProps> = ({
  children,
  stripCount = 8,
  durationInFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const [sceneA, sceneB] = children;

  const stripHeight = height / stripCount;

  const strips = useMemo(() => {
    return Array.from({ length: stripCount }, (_, i) => i);
  }, [stripCount]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      {/* Background scene A */}
      <AbsoluteFill>{sceneA}</AbsoluteFill>

      {/* Blinds strips */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {strips.map((i) => {
          const delay = (i / stripCount) * durationInFrames * 0.6;
          const spr = spring({
            frame: frame - delay,
            fps,
            from: 0,
            to: 1,
            config: { mass: 0.5, damping: 15, stiffness: 120 },
          });

          return (
            <div
              key={i}
              style={{
                width: "100%",
                height: stripHeight,
                overflow: "hidden",
                transform: `scaleY(${spr})`,
                transformOrigin: "top",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height,
                  transform: `translateY(${-i * stripHeight}px)`,
                }}
              >
                {sceneB}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
