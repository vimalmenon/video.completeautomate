import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";

interface DynamicLowerThirdProps {
  name: string;
  title: string;
}

export const DynamicLowerThird: React.FC<DynamicLowerThirdProps> = ({
  name = "John Doe",
  title = "CEO & Founder",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barSlide = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 12, stiffness: 100 },
  });

  const barWidth = interpolate(barSlide, [0, 1], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barOpacity = interpolate(barSlide, [0, 0.1, 1], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameSpr = spring({
    frame: frame - 8,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 14, stiffness: 120 },
  });

  const titleSpr = spring({
    frame: frame - 16,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 14, stiffness: 120 },
  });

  const containerSlide = interpolate(
    spring({ frame, fps, from: 0, to: 1, config: { mass: 0.5, damping: 14, stiffness: 90 } }),
    [0, 1],
    [-400, 0],
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
          padding: "24px 40px",
          marginBottom: 60,
          marginLeft: 40,
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          borderRadius: "0 12px 12px 0",
          borderLeft: "none",
          transform: `translateX(${containerSlide}px)`,
          backdropFilter: "blur(8px)",
          maxWidth: "60%",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            height: 4,
            width: barWidth,
            borderRadius: 2,
            backgroundColor: "#0891B2",
            marginBottom: 12,
            opacity: barOpacity,
            boxShadow: "0 0 16px rgba(8, 145, 178, 0.5)",
          }}
        />

        {/* Name */}
        <Sequence from={8}>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: "'Inter', system-ui, sans-serif",
              opacity: nameSpr,
              transform: `translateX(${(1 - nameSpr) * 30}px)`,
              letterSpacing: "0.02em",
              marginBottom: 4,
            }}
          >
            {name}
          </div>
        </Sequence>

        {/* Title */}
        <Sequence from={16}>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: 400,
              color: "#0891B2",
              fontFamily: "'Inter', system-ui, sans-serif",
              opacity: titleSpr,
              transform: `translateX(${(1 - titleSpr) * 30}px)`,
              letterSpacing: "0.08em",
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
