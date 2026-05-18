import React from "react";
import { spring, useCurrentFrame, useVideoConfig, Img } from "remotion";

interface PolaroidFrameProps {
  src: string;
  caption?: string;
  startFrame?: number;
  rotation?: number;
}

export const PolaroidFrame: React.FC<PolaroidFrameProps> = ({
  src,
  caption = "",
  startFrame = 0,
  rotation = -3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame - startFrame;

  const dropSpring = spring({
    frame: elapsed,
    fps,
    from: -600,
    to: 0,
    config: { mass: 1.2, damping: 9, stiffness: 80 },
  });

  const bounceSpring = spring({
    frame: elapsed - 20,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 5, stiffness: 200 },
  });

  const extraBounce = bounceSpring > 0.5 ? Math.sin((bounceSpring - 0.5) * Math.PI * 4) * 3 : 0;

  const polaroidWidth = 300;
  const polaroidHeight = 380;
  const imageHeight = polaroidWidth;

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
      <div
        style={{
          width: polaroidWidth,
          height: polaroidHeight,
          backgroundColor: "#fff",
          borderRadius: 2,
          padding: 12,
          paddingBottom: 0,
          boxShadow: `
            0 4px 6px rgba(0,0,0,0.1),
            0 10px 40px rgba(0,0,0,0.3)
          `,
          transform: `translateY(${dropSpring + extraBounce}px) rotate(${rotation}deg)`,
          opacity: elapsed < 0 ? 0 : 1,
        }}
      >
        <Img
          src={src}
          style={{
            width: "100%",
            height: imageHeight,
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
        {caption && (
          <div
            style={{
              padding: "10px 4px 16px",
              textAlign: "center",
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              color: "#333",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
