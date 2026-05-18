import React from "react";
import { spring, useCurrentFrame, useVideoConfig, Img, random } from "remotion";

interface PhotoStackImage {
  src: string;
  label?: string;
}

interface PhotoStackProps {
  images: PhotoStackImage[];
  startFrame?: number;
}

export const PhotoStack: React.FC<PhotoStackProps> = ({
  images,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;
  const imgWidth = width * 0.3;
  const imgHeight = height * 0.4;

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
      {images.map((img, i) => {
        const delay = i * 10;
        const s = spring({
          frame: frame - startFrame - delay,
          fps,
          from: 0,
          to: 1,
          config: { mass: 0.6, damping: i === 0 ? 10 : 12, stiffness: 100 },
        });

        const rotation = (random(`rot-${i}`) - 0.5) * 20;
        const offsetX = (random(`x-${i}`) - 0.5) * 80;
        const offsetY = (random(`y-${i}`) - 0.5) * 60;

        const scale = s;
        const translateY = (1 - s) * 30;
        const opacity = s;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: centerX - imgWidth / 2 + offsetX,
              top: centerY - imgHeight / 2 + offsetY,
              width: imgWidth,
              height: imgHeight,
              transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotation * s}deg)`,
              opacity,
              zIndex: images.length - i,
              boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
              borderRadius: 4,
              overflow: "hidden",
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
            {img.label && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "8px 12px",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {img.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
