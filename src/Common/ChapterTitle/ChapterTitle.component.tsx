import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface ChapterTitleProps {
  chapterNumber: number;
  title: string;
}

export const ChapterTitle: React.FC<ChapterTitleProps> = ({
  chapterNumber = 1,
  title = "The Beginning",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // CHAPTER label animates in
  const labelOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelTranslateY = interpolate(frame, [0, 10], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Large number spring
  const numberSpring = spring({
    frame: frame - 5,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.6, damping: 15, stiffness: 70 },
  });

  const numberScale = interpolate(numberSpring, [0, 1], [1.5, 1]);
  const numberOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title slides up after number
  const titleOpacity = interpolate(frame, [18, 33], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleTranslateY = interpolate(frame, [18, 33], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* CHAPTER label */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#0891B2",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: labelOpacity,
            transform: `translateY(${labelTranslateY}px)`,
            marginBottom: 8,
          }}
        >
          CHAPTER
        </div>

        {/* Large number */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
            opacity: numberOpacity,
            transform: `scale(${numberScale})`,
            marginBottom: 24,
            textShadow: "0 0 40px rgba(8, 145, 178, 0.3)",
          }}
        >
          {String(chapterNumber).padStart(2, "0")}
        </div>

        {/* Decorative line */}
        <div
          style={{
            height: 3,
            width: 60,
            backgroundColor: "#0891B2",
            margin: "0 auto",
            borderRadius: 2,
            marginBottom: 24,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#E2E8F0",
            fontFamily: "system-ui, sans-serif",
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          {title}
        </div>
      </div>
    </AbsoluteFill>
  );
};
