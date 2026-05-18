import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";

interface LogoFadeRevealProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoFadeReveal: React.FC<LogoFadeRevealProps> = ({
  logoText = "CA",
  companyName = "Complete Automate",
  tagline = "Building the future",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpr = spring({
    frame: frame - 0,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 12, stiffness: 100 },
  });

  const nameSpr = spring({
    frame: frame - 20,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 14, stiffness: 120 },
  });

  const taglineSpr = spring({
    frame: frame - 35,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 14, stiffness: 120 },
  });

  const logScale = interpolate(logoSpr, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logOpacity = interpolate(logoSpr, [0, 0.5, 1], [0, 0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
          opacity: logOpacity,
          transform: `scale(${logScale})`,
          textShadow: "0 0 40px rgba(8, 145, 178, 0.3)",
          letterSpacing: "0.1em",
          marginBottom: 16,
        }}
      >
        {logoText}
      </div>

      {/* Company Name */}
      <Sequence from={20}>
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
      <Sequence from={35}>
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
