import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

interface LowerThirdProps {
  name: string;
  title: string;
  accentColor?: string;
}

export const LowerThird: React.FC<LowerThirdProps> = ({
  name = "John Doe",
  title = "Software Engineer",
  accentColor = "#0891B2",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bar slides in from left
  const barSpring = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 14, stiffness: 90 },
  });

  const barTranslateX = interpolate(barSpring, [0, 1], [-500, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text fades in after bar arrives
  const textOpacity = interpolate(frame, [12, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textTranslateX = interpolate(frame, [12, 25], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          height: 6,
          width: 80,
          backgroundColor: accentColor,
          borderRadius: "0 3px 3px 0",
          transform: `translateX(${barTranslateX}px)`,
          marginBottom: 8,
        }}
      />

      {/* Name & title box */}
      <div
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          padding: "14px 28px",
          borderRadius: "0 8px 8px 0",
          borderLeft: `4px solid ${accentColor}`,
          transform: `translateX(${barTranslateX}px)`,
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "system-ui, sans-serif",
            opacity: textOpacity,
            transform: `translateX(${textTranslateX}px)`,
            lineHeight: 1.2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: accentColor,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.03em",
            opacity: textOpacity,
            transform: `translateX(${textTranslateX}px)`,
            marginTop: 2,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
