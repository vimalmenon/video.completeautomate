import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface LogoWatermarkProps {
  logoText: string;
  position?: "bottom-right" | "top-left" | "center";
}

export const LogoWatermark: React.FC<LogoWatermarkProps> = ({
  logoText = "CA",
  position = "bottom-right",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 16, stiffness: 120 },
  });

  const opacity = interpolate(fadeIn, [0, 1], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const positionStyle: React.CSSProperties = (() => {
    switch (position) {
      case "top-left":
        return { top: 24, left: 24 };
      case "center":
        return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
      case "bottom-right":
      default:
        return { bottom: 24, right: 24 };
    }
  })();

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          ...positionStyle,
          fontSize: "3rem",
          fontWeight: 900,
          color: "#FFFFFF",
          fontFamily: "'Inter', system-ui, sans-serif",
          opacity,
          letterSpacing: "0.1em",
          textShadow: "0 0 20px rgba(8, 145, 178, 0.15)",
        }}
      >
        {logoText}
      </div>
    </AbsoluteFill>
  );
};
