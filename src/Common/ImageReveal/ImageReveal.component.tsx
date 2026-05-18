import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Img, Easing } from "remotion";

interface ImageRevealProps {
  src: string;
  startFrame?: number;
  durationInFrames?: number;
  direction?: "left" | "right" | "top" | "bottom";
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  startFrame = 0,
  durationInFrames = 40,
  direction = "left",
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  const progress = interpolate(elapsed, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  let clipRect: string;
  switch (direction) {
    case "left":
      clipRect = `inset(0 ${(1 - progress) * 100}% 0 0)`;
      break;
    case "right":
      clipRect = `inset(0 0 0 ${(1 - progress) * 100}%)`;
      break;
    case "top":
      clipRect = `inset(0 0 ${(1 - progress) * 100}% 0)`;
      break;
    case "bottom":
      clipRect = `inset(${(1 - progress) * 100}% 0 0 0)`;
      break;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0F172A",
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          clipPath: clipRect,
          WebkitClipPath: clipRect,
        }}
      />
    </div>
  );
};
