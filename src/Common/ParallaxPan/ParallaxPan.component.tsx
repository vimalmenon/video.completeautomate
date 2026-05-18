import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Img } from "remotion";

interface ParallaxLayer {
  src: string;
  speed: number;
}

interface ParallaxPanProps {
  layers: ParallaxLayer[];
  direction?: "horizontal" | "vertical";
  durationInFrames?: number;
}

export const ParallaxPan: React.FC<ParallaxPanProps> = ({
  layers,
  direction = "horizontal",
  durationInFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0F172A",
      }}
    >
      {layers.map((layer, i) => {
        const offset = interpolate(
          frame,
          [0, durationInFrames],
          direction === "horizontal"
            ? [0, -200 * layer.speed]
            : [0, -150 * layer.speed],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const scale = 1 + layer.speed * 0.05;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              transform: direction === "horizontal"
                ? `translateX(${offset}px) scale(${scale})`
                : `translateY(${offset}px) scale(${scale})`,
              zIndex: layers.length - i,
              opacity: 1 - i * 0.15,
            }}
          >
            <Img
              src={layer.src}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
