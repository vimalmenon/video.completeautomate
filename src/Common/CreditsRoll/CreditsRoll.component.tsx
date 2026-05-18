import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Easing,
} from "remotion";

interface CreditItem {
  role: string;
  name: string;
}

interface CreditsRollProps {
  credits: CreditItem[];
}

export const CreditsRoll: React.FC<CreditsRollProps> = ({
  credits = [
    { role: "Director", name: "Jane Smith" },
    { role: "Writer", name: "John Doe" },
    { role: "Producer", name: "Alice Johnson" },
    { role: "Cinematography", name: "Bob Williams" },
    { role: "Music", name: "Eva Martinez" },
    { role: "Editor", name: "Chris Brown" },
  ],
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const ITEM_HEIGHT = 80;
  const totalContentHeight = credits.length * ITEM_HEIGHT + 200;

  // Scroll from bottom to top
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Start below screen, end above screen
  const translateY = interpolate(
    progress,
    [0, 1],
    [900, -totalContentHeight],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fade out at the end (bottom)
  const bottomFadeStart = 0.75;
  const bottomOpacity = interpolate(
    progress,
    [0, 0.15],
    [1, 1],
    { extrapolateLeft: "clamp" }
  );

  // Fade at the top
  const endOpacity = interpolate(
    progress,
    [0.85, 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(bottomOpacity, endOpacity);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: `translateX(-50%) translateY(${translateY}px)`,
          width: 500,
          opacity,
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#0891B2",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Credits
          </div>
          <div
            style={{
              height: 2,
              width: 80,
              backgroundColor: "#0891B2",
              margin: "16px auto",
            }}
          />
        </div>

        {/* Credit items */}
        {credits.map((credit, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              marginBottom: 12,
              height: ITEM_HEIGHT,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#64748B",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {credit.role}
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: "#F1F5F9",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {credit.name}
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth fading */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, #0F172A, transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to top, #0F172A, transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
