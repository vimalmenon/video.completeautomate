import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";

interface LogoStrokeDrawProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoStrokeDraw: React.FC<LogoStrokeDrawProps> = ({
  logoText = "CA",
  companyName = "Complete Automate",
  tagline = "Building the future",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const drawProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 12, stiffness: 100 },
  });

  const strokeDashoffset = interpolate(
    drawProgress,
    [0, 1],
    [200, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fillOpacity = interpolate(
    drawProgress,
    [0.5, 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const nameSpr = spring({
    frame: frame - 30,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 14, stiffness: 120 },
  });

  const taglineSpr = spring({
    frame: frame - 45,
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
      {/* SVG Logo Text */}
      <svg
        width="500"
        height="120"
        viewBox="0 0 500 120"
        style={{ marginBottom: 16 }}
      >
        <text
          x="250"
          y="80"
          textAnchor="middle"
          fontSize="90"
          fontWeight={900}
          fontFamily="'Inter', system-ui, sans-serif"
          fill={fillOpacity > 0 ? "#0891B2" : "transparent"}
          fillOpacity={fillOpacity}
          stroke="#0891B2"
          strokeWidth={3}
          strokeDasharray="200"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {logoText}
        </text>
      </svg>

      {/* Company Name */}
      <Sequence from={30}>
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
      <Sequence from={45}>
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
