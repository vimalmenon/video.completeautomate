import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Img, Easing } from "remotion";

interface ImageMaskProps {
  src: string;
  maskShape?: "circle" | "star" | "heart" | "diamond";
  startFrame?: number;
  durationInFrames?: number;
  size?: number;
}

export const ImageMask: React.FC<ImageMaskProps> = ({
  src,
  maskShape = "circle",
  startFrame = 0,
  durationInFrames = 40,
  size = 400,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const elapsed = frame - startFrame;

  const progress = interpolate(elapsed, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cx = width / 2;
  const cy = height / 2;
  const currentSize = size * progress;

  const maskId = "image-mask";

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
        <defs>
          <clipPath id={maskId}>
            {getMaskShape(maskShape, cx, cy, currentSize)}
          </clipPath>
        </defs>
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `url(#${maskId})`,
          WebkitClipPath: `url(#${maskId})`,
        }}
      >
        <Img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

function getMaskShape(
  shape: string,
  cx: number,
  cy: number,
  size: number
): React.ReactNode {
  const r = size / 2;

  switch (shape) {
    case "circle":
      return <circle cx={cx} cy={cy} r={r} />;

    case "star": {
      const points = generateStarPoints(cx, cy, r, r * 0.45, 5);
      return <polygon points={points} />;
    }

    case "diamond":
      return (
        <polygon
          points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`}
        />
      );

    case "heart": {
      const s = size * 0.35;
      return (
        <path
          d={`M ${cx} ${cy + s * 0.8}
              C ${cx - s * 1.5} ${cy - s * 0.5}, ${cx - s * 0.8} ${cy - s * 1.8}, ${cx} ${cy - s * 0.8}
              C ${cx + s * 0.8} ${cy - s * 1.8}, ${cx + s * 1.5} ${cy - s * 0.5}, ${cx} ${cy + s * 0.8} Z`}
        />
      );
    }

    default:
      return <circle cx={cx} cy={cy} r={r} />;
  }
}

function generateStarPoints(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  points: number
): string {
  const coords: string[] = [];
  const angleStep = Math.PI / points;

  for (let i = 0; i < points * 2; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const radius = i % 2 === 0 ? outerR : innerR;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    coords.push(`${x},${y}`);
  }

  return coords.join(" ");
}
