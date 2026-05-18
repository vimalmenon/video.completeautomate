import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface CarouselItem {
  title: string;
  description: string;
  color: string;
}

interface RotatingCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
}

export const RotatingCarousel: React.FC<RotatingCarouselProps> = ({
  items = [{ title: "Card 1", description: "Description 1", color: "#0891B2" }],
  activeIndex = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotation = spring({
    frame: frame,
    fps,
    from: 0,
    to: 360,
    config: { mass: 0.5, damping: 12, stiffness: 70 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        perspective: 1000,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 300,
          height: 400,
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, i) => {
          const angle =
            (i - activeIndex) * (360 / Math.max(items.length, 1)) +
            rotation * 0.3;
          const isActive = i === activeIndex;

          const translateZ = interpolate(
            Math.abs(angle % 360),
            [0, 60, 180],
            [0, -200, -400],
            { extrapolateRight: "clamp" }
          );

          const opacity = interpolate(
            Math.abs(angle % 360),
            [0, 60, 180],
            [1, 0.6, 0],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: 16,
                backgroundColor: item.color,
                transform: `rotateY(${angle}deg) translateZ(${300 - translateZ}px)`,
                opacity,
                backfaceVisibility: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 24,
                boxShadow: isActive
                  ? "0 0 40px rgba(8, 145, 178, 0.4)"
                  : "0 4px 20px rgba(0,0,0,0.3)",
                border: isActive ? "2px solid rgba(255,255,255,0.3)" : "none",
              }}
            >
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontFamily: "system-ui, sans-serif",
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "system-ui, sans-serif",
                  textAlign: "center",
                }}
              >
                {item.description}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
