import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Img,
} from "remotion";

interface GalleryItem {
  src: string;
  label: string;
}

interface GalleryGridProps {
  images: GalleryItem[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  images = [
    { src: "https://picsum.photos/seed/img1/400/300", label: "Image 1" },
    { src: "https://picsum.photos/seed/img2/400/300", label: "Image 2" },
    { src: "https://picsum.photos/seed/img3/400/300", label: "Image 3" },
    { src: "https://picsum.photos/seed/img4/400/300", label: "Image 4" },
    { src: "https://picsum.photos/seed/img5/400/300", label: "Image 5" },
    { src: "https://picsum.photos/seed/img6/400/300", label: "Image 6" },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const cols = 3;
  const gap = 12;
  const cellWidth = (width - gap * (cols + 1) - 80) / cols;
  const cellHeight = (height - gap * 2 - 80) / 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {images.slice(0, 6).map((img, i) => {
          const staggerDelay = i * 4;
          const imgSpring = spring({
            frame: frame - staggerDelay,
            fps,
            from: 0,
            to: 1,
            config: { mass: 0.5, damping: 12, stiffness: 100 },
          });

          if (frame < staggerDelay) return null;

          const scale = interpolate(imgSpring, [0, 1], [0.8, 1]);
          const opacity = interpolate(
            frame - staggerDelay,
            [0, 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const translateY = interpolate(imgSpring, [0, 1], [30, 0]);

          return (
            <div
              key={i}
              style={{
                width: cellWidth,
                height: cellHeight,
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(8, 145, 178, 0.2)",
                opacity,
                transform: `scale(${scale}) translateY(${translateY}px)`,
                position: "relative",
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
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "8px 12px",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#FFFFFF",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {img.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
