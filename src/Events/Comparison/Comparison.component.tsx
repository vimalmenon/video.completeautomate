import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";

export const comparisonSchema = z.object({
  beforeTitle: z.string(),
  afterTitle: z.string(),
  beforePoints: z.array(z.string()).min(1).max(8),
  afterPoints: z.array(z.string()).min(1).max(8),
});

type ComparisonProps = z.infer<typeof comparisonSchema>;

export const Comparison: React.FC<ComparisonProps> = ({
  beforeTitle,
  afterTitle,
  beforePoints,
  afterPoints,
}) => {
  const frame = useCurrentFrame();

  // Left side opacity (before)
  const leftOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right side opacity (after) — delayed
  const rightOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const renderPoints = (
    points: string[],
    side: "before" | "after",
    baseDelay: number
  ) => {
    return points.map((point, i) => {
      const delay = baseDelay + i * 8;
      const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const x = interpolate(frame - delay, [0, 10], [side === "before" ? -20 : 20, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      return (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            marginBottom: 16,
            opacity,
            transform: `translateX(${x}px)`,
          }}
        >
          <span
            style={{
              color: side === "before" ? "#EF4444" : "#22D3EE",
              fontSize: 20,
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            {side === "before" ? "✕" : "✓"}
          </span>
          <span
            style={{
              fontSize: 16,
              color: side === "before" ? "#FCA5A5" : "#CBD5E1",
              lineHeight: 1.6,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {point}
          </span>
        </div>
      );
    });
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", display: "flex", flexDirection: "row" }}>
      {/* BEFORE Side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 40px",
          backgroundColor: "rgba(239, 68, 68, 0.03)",
          opacity: leftOpacity,
        }}
      >
        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#EF4444",
              opacity: 0.6,
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#EF4444",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            BEFORE
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#FCA5A5",
            margin: "0 0 28px 0",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {beforeTitle}
        </h2>

        {/* Points */}
        {renderPoints(beforePoints, "before", 20)}
      </div>

      {/* Vertial Divider */}
      <div
        style={{
          width: 3,
          height: "80%",
          alignSelf: "center",
          background: "linear-gradient(180deg, transparent, #0891B2, transparent)",
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          boxShadow: "0 0 12px rgba(8,145,178,0.3)",
        }}
      />

      {/* AFTER Side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 40px",
          backgroundColor: "rgba(8, 145, 178, 0.03)",
          opacity: rightOpacity,
        }}
      >
        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#22D3EE",
              opacity: 0.6,
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#22D3EE",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            AFTER
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#F8FAFC",
            margin: "0 0 28px 0",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {afterTitle}
        </h2>

        {/* Points */}
        {renderPoints(afterPoints, "after", 45)}
      </div>
    </AbsoluteFill>
  );
};
