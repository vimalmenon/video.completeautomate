import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface CinematicTitleProps {
  title: string;
  subtitle: string;
}

export const CinematicTitle: React.FC<CinematicTitleProps> = ({
  title = "Your Title Here",
  subtitle = "A cinematic subtitle",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 12, stiffness: 80 },
  });

  const subtitleOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleTranslateY = interpolate(titleSpring, [0, 1], [40, 0]);

  // Underline draws from center outward
  const underlineScaleX = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-0.02em",
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            marginBottom: 16,
          }}
        >
          {title}
        </div>

        <div
          style={{
            height: 4,
            width: "80%",
            margin: "0 auto",
            background: "linear-gradient(90deg, transparent, #0891B2, transparent)",
            transform: `scaleX(${underlineScaleX})`,
            marginBottom: 24,
          }}
        />

        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: "#94A3B8",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.05em",
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
