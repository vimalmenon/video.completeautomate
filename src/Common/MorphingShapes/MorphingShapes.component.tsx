import React from "react";
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, random } from "remotion";

interface MorphingShapesProps {
  numShapes?: number;
  colors?: string[];
}

const defaultColors = ["#0891B2", "#06B6D4", "#22D3EE", "#67E8F9", "#0EA5E9", "#3B82F6"];

export const MorphingShapes: React.FC<MorphingShapesProps> = ({
  numShapes = 6,
  colors = defaultColors,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  const shapes = Array.from({ length: numShapes }).map((_, i) => {
    const cx = width * (0.15 + (i / numShapes) * 0.7);
    const cy = height * (0.2 + ((i * 1.3) % 1) * 0.6);
    const baseSize = 60 + (i % 5) * 30;

    const t = (frame / durationInFrames + i / numShapes) % 1;

    // Morph between shape indices
    const morphPhase = Math.sin(t * Math.PI * 2);
    const sides = Math.floor(interpolate(
      morphPhase,
      [-1, -0.33, 0.33, 1],
      [3, 4, 6, 8],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    ));

    const rotation = interpolate(frame, [0, durationInFrames], [0, 360], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const scale = 0.5 + Math.sin(t * Math.PI * 2) * 0.5;
    const opacity = 0.4 + Math.sin(t * Math.PI * 2 + 1) * 0.3;

    const points = generatePolygonPoints(cx, cy, baseSize * scale, sides, rotation);

    return { points, color: colors[i % colors.length], opacity, sides };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F172A",
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {shapes.map((shape, i) => (
          <polygon
            key={i}
            points={shape.points}
            fill={shape.color}
            opacity={shape.opacity}
          />
        ))}
      </svg>
    </div>
  );
};

function generatePolygonPoints(
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotation: number
): string {
  const points: string[] = [];
  const angleStep = (Math.PI * 2) / sides;
  const rotRad = (rotation * Math.PI) / 180;

  for (let i = 0; i < sides; i++) {
    const angle = rotRad + i * angleStep - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  return points.join(" ");
}
