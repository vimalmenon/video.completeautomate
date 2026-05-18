import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface CardFlipProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}

export const CardFlip: React.FC<CardFlipProps> = ({
  frontContent = (
    <div style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: 700 }}>
      Front Side
    </div>
  ),
  backContent = (
    <div style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: 700 }}>
      Back Side
    </div>
  ),
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flipProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.6, damping: 10, stiffness: 80 },
  });

  const rotation = interpolate(flipProgress, [0, 1], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const frontOpacity = interpolate(flipProgress, [0, 0.4, 0.5], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const backRotation = rotation + 180;
  const backOpacity = interpolate(flipProgress, [0.5, 0.6, 1], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        perspective: 1200,
      }}
    >
      <div
        style={{
          width: 320,
          height: 420,
          borderRadius: 20,
          backgroundColor: "#1E293B",
          border: "1px solid rgba(8, 145, 178, 0.3)",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1E293B",
            background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
            backfaceVisibility: "hidden",
            transform: `rotateY(${rotation}deg)`,
            opacity: frontOpacity,
            padding: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {frontContent}
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1E293B",
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            backfaceVisibility: "hidden",
            transform: `rotateY(${backRotation}deg)`,
            opacity: backOpacity,
            padding: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {backContent}
        </div>
      </div>
    </AbsoluteFill>
  );
};
