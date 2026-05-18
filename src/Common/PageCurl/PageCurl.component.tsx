import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface PageCurlProps {
  children: [React.ReactNode, React.ReactNode];
  durationInFrames?: number;
}

export const PageCurl: React.FC<PageCurlProps> = ({
  children,
  durationInFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const [sceneA, sceneB] = children;

  // Page curl progress: SceneA peels from top-right corner diagonally
  const progress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.6, damping: 14, stiffness: 90 },
  });

  // Corner point moves from top-right diagonally toward bottom-left
  const cornerX = interpolate(progress, [0, 1], [width, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cornerY = interpolate(progress, [0, 1], [0, height], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Clip path for the peeling corner (triangle revealed)
  const revealedClip = `polygon(
    0 0,
    ${cornerX}px 0,
    ${cornerX}px ${cornerY}px,
    0 ${cornerY}px
  )`;

  // The folded/peeled corner visual
  const peelSize = interpolate(progress, [0, 1], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rotation = interpolate(progress, [0, 1], [0, -15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      {/* SceneB is the content underneath (revealed) */}
      <AbsoluteFill>{sceneB}</AbsoluteFill>

      {/* SceneA is the page being peeled */}
      <AbsoluteFill
        style={{
          clipPath: revealedClip,
        }}
      >
        {sceneA}

        {/* Curled corner visual */}
        <div
          style={{
            position: "absolute",
            top: cornerY - peelSize,
            left: cornerX,
            width: peelSize,
            height: peelSize,
            background:
              "linear-gradient(135deg, rgba(8,145,178,0.3) 0%, rgba(15,23,42,0.9) 100%)",
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "top left",
            borderRadius: "0 0 8px 0",
            borderLeft: "2px solid rgba(8,145,178,0.5)",
            borderBottom: "2px solid rgba(8,145,178,0.5)",
          }}
        />
      </AbsoluteFill>

      {/* Shadow on the revealed content edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: cornerX,
          height: "100%",
          background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 100%)`,
          opacity: progress,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
