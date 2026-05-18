import React from "react";
import { interpolate, useCurrentFrame, Img } from "remotion";

interface ImageZoomRevealProps {
  src: string;
  startFrame?: number;
  durationInFrames?: number;
}

export const ImageZoomReveal: React.FC<ImageZoomRevealProps> = ({
  src,
  startFrame = 0,
  durationInFrames = 50,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  const progress = interpolate(elapsed, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [1.5, 1]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          transform: `scale(${scale})`,
          opacity,
        }}
      />
    </div>
  );
};
