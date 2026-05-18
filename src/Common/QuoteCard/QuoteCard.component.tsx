import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface QuoteCardProps {
  quote: string;
  author: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote = "The only way to do great work is to love what you do.",
  author = "Steve Jobs",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Opening quote mark
  const quoteMarkSpring = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.4, damping: 12, stiffness: 90 },
  });

  const quoteMarkScale = interpolate(quoteMarkSpring, [0, 1], [1.5, 1]);
  const quoteMarkOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Quote text appears character by character (word by word approximation)
  const textOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textTranslateY = interpolate(frame, [10, 35], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Author attribution
  const authorOpacity = interpolate(frame, [30, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const authorTranslateX = interpolate(frame, [30, 48], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative line
  const lineScale = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          maxWidth: 800,
          textAlign: "center",
        }}
      >
        {/* Opening quote mark */}
        <div
          style={{
            fontSize: 80,
            color: "#0891B2",
            fontFamily: "Georgia, serif",
            lineHeight: 0.6,
            opacity: quoteMarkOpacity,
            transform: `scale(${quoteMarkScale})`,
            marginBottom: 12,
          }}
        >
          "
        </div>

        {/* Quote text */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: "#E2E8F0",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            lineHeight: 1.5,
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            marginBottom: 28,
          }}
        >
          {quote}
        </div>

        {/* Decorative line */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              height: 2,
              width: 40,
              backgroundColor: "#0891B2",
              borderRadius: 1,
              transform: `scaleX(${lineScale})`,
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#0891B2",
            }}
          />
          <div
            style={{
              height: 2,
              width: 40,
              backgroundColor: "#0891B2",
              borderRadius: 1,
              transform: `scaleX(${lineScale})`,
            }}
          />
        </div>

        {/* Author */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#94A3B8",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            opacity: authorOpacity,
            transform: `translateX(${authorTranslateX}px)`,
          }}
        >
          — {author}
        </div>
      </div>
    </AbsoluteFill>
  );
};
