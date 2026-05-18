import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface PixelTransitionProps {
  gridSize?: number;
  colors?: string[];
  startFrame?: number;
  durationInFrames?: number;
  children?: React.ReactNode;
  direction?: "left-to-right" | "random";
}

const defaultColors = [
  "#4361ee", "#3a0ca3", "#7209b7", "#f72585",
  "#4cc9f0", "#4895ef", "#b5179e",
];

export const PixelTransition: React.FC<PixelTransitionProps> = ({
  gridSize = 8,
  colors = defaultColors,
  startFrame = 0,
  durationInFrames = 60,
  children,
  direction = "left-to-right",
}) => {
  const frame = useCurrentFrame();
  const cols = gridSize;
  const rows = gridSize;
  const totalCells = cols * rows;

  const pixelW = 1920 / cols;
  const pixelH = 1080 / rows;

  const cells: { row: number; col: number; delay: number; color: string }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const index = r * cols + c;
      const delay = direction === "random"
        ? ((index * 937 + r * 491 + c * 283) % totalCells) / totalCells
        : (r * cols + c) / totalCells;
      cells.push({
        row: r,
        col: c,
        delay,
        color: colors[(r + c) % colors.length],
      });
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      {/* Content behind transition */}
      {children && (
        <div style={{ position: "absolute", inset: 0 }}>{children}</div>
      )}

      {/* Pixel grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {cells.map((cell, i) => {
          const opacity = interpolate(
            frame - startFrame,
            [cell.delay * durationInFrames, cell.delay * durationInFrames + 8],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const scale = interpolate(
            frame - startFrame,
            [cell.delay * durationInFrames, cell.delay * durationInFrames + 8],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                backgroundColor: cell.color,
                opacity,
                transform: `scale(${scale})`,
                width: pixelW,
                height: pixelH,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
