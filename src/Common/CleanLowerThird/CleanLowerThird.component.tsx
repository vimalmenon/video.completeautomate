import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";

interface CleanLowerThirdProps {
  name: string;
  title: string;
}

export const CleanLowerThird: React.FC<CleanLowerThirdProps> = ({
  name = "John Doe",
  title = "CEO & Founder",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerSlide = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 16, stiffness: 100 },
  });

  const translateX = interpolate(containerSlide, [0, 1], [-60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerOpacity = interpolate(containerSlide, [0, 0.3, 1], [0, 0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameSpr = spring({
    frame: frame - 5,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.3, damping: 18, stiffness: 150 },
  });

  const titleSpr = spring({
    frame: frame - 12,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.3, damping: 18, stiffness: 150 },
  });

  const underlineWidth = interpolate(
    spring({ frame: frame - 5, fps, from: 0, to: 1, config: { mass: 0.3, damping: 16, stiffness: 120 } }),
    [0, 1],
    [0, 60],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          padding: "20px 32px",
          marginBottom: 60,
          marginLeft: 40,
          opacity: containerOpacity,
          transform: `translateX(${translateX}px)`,
        }}
      >
        {/* Name */}
        <Sequence from={5}>
          <div
            style={{
              fontSize: "1.8rem",
              fontWeight: 600,
              color: "#FFFFFF",
              fontFamily: "'Inter', system-ui, sans-serif",
              opacity: nameSpr,
              transform: `translateY(${(1 - nameSpr) * 12}px)`,
              letterSpacing: "0.02em",
              marginBottom: 4,
            }}
          >
            {name}
          </div>
        </Sequence>

        {/* Subtle underline */}
        <div
          style={{
            height: 2,
            width: underlineWidth,
            borderRadius: 1,
            backgroundColor: "rgba(255,255,255,0.3)",
            marginBottom: 6,
            marginTop: 4,
          }}
        />

        {/* Title */}
        <Sequence from={12}>
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Inter', system-ui, sans-serif",
              opacity: titleSpr,
              transform: `translateY(${(1 - titleSpr) * 10}px)`,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
