import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";

interface CountdownTimerProps {
  from?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  from = 5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const framesPerNumber = Math.round(fps / 3);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Array.from({ length: from }, (_, i) => {
        const num = from - i;
        const startFrame = i * framesPerNumber;
        return (
          <Sequence key={num} from={startFrame} durationInFrames={framesPerNumber}>
            <CountdownNumber
              number={num}
              frame={frame - startFrame}
              fps={fps}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

interface CountdownNumberProps {
  number: number;
  frame: number;
  fps: number;
}

const CountdownNumber: React.FC<CountdownNumberProps> = ({
  number,
  frame,
  fps,
}) => {
  const scale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 8, stiffness: 120 },
  });

  const opacity = interpolate(frame, [0, fps * 0.15, fps * 0.2, fps * 0.3], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: "12rem",
          fontWeight: 900,
          color: "#0891B2",
          fontFamily: "'Impact', 'Arial Black', sans-serif",
          transform: `scale(${scale})`,
          opacity,
          textShadow: "0 0 40px rgba(8, 145, 178, 0.5), 0 0 80px rgba(8, 145, 178, 0.2)",
        }}
      >
        {number}
      </span>
    </AbsoluteFill>
  );
};
