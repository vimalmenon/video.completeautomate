import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";

interface LogoBounceDropProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoBounceDrop: React.FC<LogoBounceDropProps> = ({
  logoText = "CA",
  companyName = "Complete Automate",
  tagline = "Building the future",
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const dropSpring = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 1.2, damping: 8, stiffness: 70 },
  });

  const dropY = interpolate(dropSpring, [0, 1], [-height / 2 - 100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(
    dropSpring,
    [0, 0.7, 0.85, 0.95, 1],
    [0.8, 1.15, 0.92, 1.05, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(
    dropSpring,
    [0, 0.05, 1],
    [0, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
      {/* Logo */}
      <div
        style={{
          fontSize: "5rem",
          fontWeight: 900,
          color: "#0891B2",
          fontFamily: "'Inter', system-ui, sans-serif",
          opacity,
          transform: `translateY(${dropY}px) scale(${scale})`,
          textShadow: "0 0 40px rgba(8, 145, 178, 0.3)",
          letterSpacing: "0.1em",
          marginBottom: 16,
        }}
      >
        {logoText}
      </div>

      {/* Company Name */}
      <Sequence from={25}>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "'Inter', system-ui, sans-serif",
            opacity: nameSpr,
            transform: `translateY(${(1 - nameSpr) * 20}px)`,
            letterSpacing: "0.05em",
            marginBottom: 8,
          }}
        >
          {companyName}
        </div>
      </Sequence>

      {/* Tagline */}
      <Sequence from={40}>
        <div
          style={{
            fontSize: "1.1rem",
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'Inter', system-ui, sans-serif",
            opacity: taglineSpr,
            transform: `translateY(${(1 - taglineSpr) * 15}px)`,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {tagline}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
