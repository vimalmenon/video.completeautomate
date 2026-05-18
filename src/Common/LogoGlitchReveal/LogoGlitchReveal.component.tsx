import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Easing,
  random,
} from "remotion";

interface LogoGlitchRevealProps {
  logoText: string;
  companyName: string;
  tagline: string;
}

export const LogoGlitchReveal: React.FC<LogoGlitchRevealProps> = ({
  logoText = "CA",
  companyName = "Complete Automate",
  tagline = "Building the future",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const settleProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(settleProgress, [0, 0.05, 0.95, 1], [0, 0.7, 0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glitchActive = frame < 30;

  const redOffset = glitchActive
    ? interpolate(
        Math.abs(random(`red-${Math.floor(frame / 3)}`)),
        [0, 1],
        [0, 8],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      ) *
      (random(`rdir-${frame}`) > 0.5 ? 1 : -1)
    : 0;

  const cyanOffset = glitchActive
    ? interpolate(
        Math.abs(random(`cyan-${Math.floor(frame / 3)}`)),
        [0, 1],
        [0, 8],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      ) *
      (random(`cdir-${frame}`) > 0.5 ? 1 : -1)
    : 0;

  const glitchVisible =
    glitchActive && random(`glitch-${Math.floor(frame / 2)}`) > 0.4;

  const nameOpacity = spring({
    frame: frame - 20,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 14, stiffness: 120 },
  });

  const taglineOpacity = spring({
    frame: frame - 35,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 14, stiffness: 120 },
  });

  const baseStyle: React.CSSProperties = {
    fontSize: "5rem",
    fontWeight: 900,
    color: "#0891B2",
    fontFamily: "'Inter', system-ui, sans-serif",
    letterSpacing: "0.1em",
    position: "absolute",
    textShadow: "0 0 40px rgba(8, 145, 178, 0.3)",
    marginBottom: 16,
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", marginBottom: 16 }}>
        {/* Main clean logo */}
        <div
          style={{
            ...baseStyle,
            position: "relative",
            zIndex: 3,
            opacity,
            transform: `scale(${settleProgress})`,
          }}
        >
          {logoText}
        </div>

        {/* Red channel (glitch) */}
        {glitchVisible && (
          <div
            style={{
              ...baseStyle,
              position: "absolute",
              top: 0,
              left: redOffset,
              color: "#FF0000",
              zIndex: 2,
              opacity: 0.6,
              textShadow: "0 0 20px #FF0000",
            }}
          >
            {logoText}
          </div>
        )}

        {/* Cyan channel (glitch) */}
        {glitchVisible && (
          <div
            style={{
              ...baseStyle,
              position: "absolute",
              top: 0,
              left: cyanOffset,
              color: "#00FFFF",
              zIndex: 1,
              opacity: 0.6,
              textShadow: "0 0 20px #00FFFF",
            }}
          >
            {logoText}
          </div>
        )}
      </div>

      {/* Company Name */}
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#FFFFFF",
          fontFamily: "'Inter', system-ui, sans-serif",
          opacity: nameOpacity,
          transform: `translateY(${(1 - nameOpacity) * 20}px)`,
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
          opacity: taglineOpacity,
          transform: `translateY(${(1 - taglineOpacity) * 15}px)`,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {tagline}
      </div>
    </AbsoluteFill>
  );
};
