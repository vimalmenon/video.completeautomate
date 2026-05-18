import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface AnimatedListProps {
  items: string[];
  itemColor?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ],
  itemColor = "#0891B2",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const staggerFrames = Math.round(fps * 0.2);
  const itemHeight = 56;
  const gap = 12;

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
          flexDirection: "column",
          gap,
          width: 500,
        }}
      >
        {items.map((item, i) => {
          const startFrame = i * staggerFrames;

          const slideIn = spring({
            frame: frame - startFrame,
            fps,
            from: 0,
            to: 1,
            config: { mass: 0.3, damping: 12, stiffness: 120 },
          });

          const translateX = interpolate(slideIn, [0, 1], [-80, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const opacity = interpolate(slideIn, [0, 0.3, 1], [0, 1, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          if (frame < startFrame) return null;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 20px",
                backgroundColor: "rgba(8, 145, 178, 0.08)",
                borderRadius: 12,
                border: `1px solid ${itemColor}25`,
                transform: `translateX(${translateX}px)`,
                opacity,
                height: itemHeight,
                boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                transition: "background-color 0.2s",
              }}
            >
              {/* Icon dot */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: itemColor,
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${itemColor}60`,
                }}
              />
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  fontFamily: "system-ui, sans-serif",
                  flex: 1,
                }}
              >
                {item}
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: itemColor,
                  fontFamily: "system-ui, sans-serif",
                  opacity: 0.6,
                }}
              >
                {`0${i + 1}`}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
