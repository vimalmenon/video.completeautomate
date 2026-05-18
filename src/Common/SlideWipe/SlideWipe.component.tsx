import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface SlideWipeProps {
  children: [React.ReactNode, React.ReactNode];
  direction?: "left" | "right";
}

export const SlideWipe: React.FC<SlideWipeProps> = ({
  children,
  direction = "right",
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const [sceneA, sceneB] = children;

  const progress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.8, damping: 12, stiffness: 100 },
  });

  const offset = progress * width;
  const sign = direction === "right" ? 1 : -1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `translateX(${-sign * offset}px)`,
        }}
      >
        {sceneA}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${sign * (width - offset)}px)`,
        }}
      >
        {sceneB}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
