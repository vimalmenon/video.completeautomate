import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Img,
} from "remotion";

interface MasonryItem {
  src: string;
  height: number;
}

interface MasonryGridProps {
  images: MasonryItem[];
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  images = [
    { src: "https://picsum.photos/seed/m1/400/500", height: 500 },
    { src: "https://picsum.photos/seed/m2/400/350", height: 350 },
    { src: "https://picsum.photos/seed/m3/400/450", height: 450 },
    { src: "https://picsum.photos/seed/m4/400/380", height: 380 },
    { src: "https://picsum.photos/seed/m5/400/420", height: 420 },
    { src: "https://picsum.photos/seed/m6/400/320", height: 320 },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const columns = 3;
  const gap = 12;
  const colWidth = (width - gap * (columns + 1) - 80) / columns;

  // Distribute images across columns (tallest-first simple algorithm)
  const colHeights = [0, 0, 0];
  const cols: MasonryItem[][] = [[], [], []];

  images.forEach((img) => {
    const minCol = colHeights.indexOf(Math.min(...colHeights));
    cols[minCol].push(img);
    colHeights[minCol] += img.height;
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        padding: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          gap,
          justifyContent: "center",
          height: "100%",
        }}
      >
        {cols.map((col, colIdx) => (
          <div
            key={colIdx}
            style={{
              display: "flex",
              flexDirection: "column",
              gap,
              flex: 1,
              maxWidth: colWidth,
            }}
          >
            {col.map((img, itemIdx) => {
              // Each item has a unique index for staggering
              const flatIdx =
                cols.slice(0, colIdx).reduce((sum, c) => sum + c.length, 0) +
                itemIdx;
              const staggerDelay = flatIdx * 5;

              if (frame < staggerDelay) return null;

              const itemSpring = spring({
                frame: frame - staggerDelay,
                fps,
                from: 0,
                to: 1,
                config: { mass: 0.4, damping: 14, stiffness: 100 },
              });

              const opacity = interpolate(
                frame - staggerDelay,
                [0, 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              const translateY = interpolate(itemSpring, [0, 1], [40, 0]);
              const scale = interpolate(itemSpring, [0, 1], [0.9, 1]);

              return (
                <div
                  key={itemIdx}
                  style={{
                    width: "100%",
                    height: img.height * (colWidth / 400),
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid rgba(8, 145, 178, 0.15)",
                    opacity,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    backgroundColor: "rgba(255,255,255,0.03)",
                  }}
                >
                  <Img
                    src={img.src}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
