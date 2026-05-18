import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";

interface LogoSplitRevealProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoSplitReveal: React.FC<LogoSplitRevealProps> = ({
  logoText = "CA",
  companyName = "Complete Automate",
  tagline = "Building the future",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const splitProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 10, stiffness: 80 },
  });

  const firstHalf = logoText.length > 1 ? logoText.slice(0, Math.ceil(logoText.length / 2)) : logoText[0] || "";
  const secondHalf = logoText.length > 1 ? logoText.slice(Math.ceil(logoText.length / 2)) : "";

  const leftOffset = interpolate(splitProgress, [0, 1], [0, -60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightOffset = interpolate(splitProgress, [0, 1], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(splitProgress, [0, 0.3, 1], [0, 0.6, 1], {
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
      {/* Split Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 16,
          fontSize: "5rem",
          fontWeight: 900,
          fontFamily: "'Inter', system-ui, sans-serif",
          letterSpacing: "0.1em",
          color: "#0891B2",
          textShadow: "0 0 40px rgba(8, 145, 178, 0.3)",
        }}
      >
        <span
          style={{
            opacity,
            transform: `translateX(${leftOffset}px)`,
            display: "inline-block",
          }}
        >
          {firstHalf}
        </span>
        <span
          style={{
            opacity,
            transform: `translateX(${rightOffset}px)`,
            display: "inline-block",
          }}
        >
          {secondHalf}
        </span>
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
