import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Easing,
} from "remotion";

interface LogoScaleRotateProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoScaleRotate: React.FC<LogoScaleRotateProps> = ({
  logoText = "CA",
  companyName = "Complete Automate",
  tagline = "Building the future",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entranceProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 10, stiffness: 85 },
  });

  const scale = interpolate(entranceProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rotation = interpolate(entranceProgress, [0, 1], [360, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(entranceProgress, [0, 0.1, 0.9, 1], [0, 0.7, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameSpr = spring({
    frame: frame - 25,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 14, stiffness: 120 },
  });

  const taglineSpr = spring({
    frame: frame - 40,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 14, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Spinning & Scaling Logo */}
      <div
        style={{
          fontSize: "5rem",
          fontWeight: 900,
          color: "#0891B2",
          fontFamily: "'Inter', system-ui, sans-serif",
          opacity,
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          textShadow: "0 0 40px rgba(8, 145, 178, 0.3)",
          letterSpacing: "0.1em",
          marginBottom: 16,
        }}
      >
        {logoText}
      </div>

      {/* Company Name */}
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#FFFFFF",
          fontFamily: "'Inter', system-ui, sans-serif",
          opacity: nameSpr,
          transform: nameSpr > 0 ? `translateY(${(1 - nameSpr) * 20}px)` : undefined,
          letterSpacing: "0.05em",
          marginBottom: 8,
        }}
      >
        {companyName}
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: "1.1rem",
          fontWeight: 400,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "'Inter', system-ui, sans-serif",
          opacity: taglineSpr,
          transform: taglineSpr > 0 ? `translateY(${(1 - taglineSpr) * 15}px)` : undefined,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {tagline}
      </div>
    </AbsoluteFill>
  );
};
