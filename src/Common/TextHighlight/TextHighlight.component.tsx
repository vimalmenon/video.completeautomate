import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface TextHighlightProps {
  text: string;
  highlightColor?: string;
}

export const TextHighlight: React.FC<TextHighlightProps> = ({
  text = "Hello World Example Text",
  highlightColor = "#0891B2",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");
  const framesPerWord = Math.round(fps * 0.4);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 800,
          gap: 8,
          padding: 40,
        }}
      >
        {words.map((word, i) => {
          const wordStart = i * framesPerWord;
          const wordAppear = spring({
            frame: frame - wordStart,
            fps,
            from: 0,
            to: 1,
            config: { mass: 0.3, damping: 12, stiffness: 150 },
          });

          const isActive =
            frame >= wordStart && frame < wordStart + framesPerWord;
          const isRevealed = frame >= wordStart;

          const highlightProgress = isActive
            ? interpolate(
                frame - wordStart,
                [0, framesPerWord * 0.3],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            : isRevealed
            ? 1
            : 0;

          return (
            <span
              key={i}
              style={{
                position: "relative",
                display: "inline-block",
                fontSize: "3rem",
                fontWeight: 700,
                color: isActive
                  ? "#FFFFFF"
                  : isRevealed
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.15)",
                fontFamily: "'Inter', system-ui, sans-serif",
                transform: `translateY(${(1 - wordAppear) * 20}px)`,
                opacity: wordAppear,
                transition: "color 0.15s ease",
              }}
            >
              {word}
              {/* Highlight underline bar */}
              {isRevealed && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    width: `${highlightProgress * 100}%`,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: highlightColor,
                    boxShadow: `0 0 12px ${highlightColor}`,
                  }}
                />
              )}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
