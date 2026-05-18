import React from "react";
import { interpolate, useCurrentFrame, random } from "remotion";

interface CameraShakeProps {
  children: React.ReactNode;
  shakeFrame?: number;
  intensity?: number;
  decayFrames?: number;
}

export const CameraShake: React.FC<CameraShakeProps> = ({
  children,
  shakeFrame = 10,
  intensity = 15,
  decayFrames = 30,
}) => {
  const frame = useCurrentFrame();

  if (frame < shakeFrame) {
    return <div style={{ position: "absolute", inset: 0 }}>{children}</div>;
  }

  const elapsed = frame - shakeFrame;
  const decay = interpolate(elapsed, [0, decayFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
  });

  const offsetX = (random(`x-${frame}`) - 0.5) * 2 * intensity * decay;
  const offsetY = (random(`y-${frame}`) - 0.5) * 2 * intensity * decay;
  const rotate = (random(`r-${frame}`) - 0.5) * 2 * 3 * decay;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
      }}
    >
      {children}
    </div>
  );
};
