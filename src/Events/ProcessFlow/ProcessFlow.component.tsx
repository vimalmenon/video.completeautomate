import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";

const stepSchema = z.object({
  number: z.number(),
  title: z.string(),
  description: z.string(),
});

export const processFlowSchema = z.object({
  title: z.string(),
  steps: z.array(stepSchema).min(2).max(8),
});

type ProcessFlowProps = z.infer<typeof processFlowSchema>;

export const ProcessFlow: React.FC<ProcessFlowProps> = ({ title, steps }) => {
  const frame = useCurrentFrame();

  // Title fade in
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const totalWidth = 1400;
  const stepSpacing = totalWidth / (steps.length + 1);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", justifyContent: "center", alignItems: "center" }}>
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 80,
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "#F8FAFC",
            margin: 0,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {title}
        </h1>
      </div>

      {/* Flow Container */}
      <div
        style={{
          position: "relative",
          width: totalWidth,
          height: 300,
        }}
      >
        {/* Connecting line */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: stepSpacing - 10,
            width: stepSpacing * (steps.length - 1) + 20,
            height: 4,
            backgroundColor: "#1E293B",
            borderRadius: 2,
          }}
        >
          {/* Animated progress line */}
          <div
            style={{
              width: `${interpolate(
                frame - 20,
                [0, steps.length * 15],
                [0, 100],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )}%`,
              height: "100%",
              background: "linear-gradient(90deg, #0891B2, #22D3EE)",
              borderRadius: 2,
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, i) => {
          const stepX = stepSpacing * (i + 1);
          const delay = 20 + i * 15;

          const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const circleScale = interpolate(frame - delay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const circleY = interpolate(frame - delay, [0, 10], [-20, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const textOpacity = interpolate(
            frame - (delay + 8),
            [0, 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const textY = interpolate(
            frame - (delay + 8),
            [0, 12],
            [15, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: stepX - 30,
                top: 0,
                width: 60,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity,
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#0F172A",
                  border: "3px solid #0891B2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `translateY(${circleY}px) scale(${circleScale})`,
                  boxShadow: "0 0 20px rgba(8,145,178,0.3)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#22D3EE",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Title & Description */}
              <div
                style={{
                  position: "absolute",
                  top: 80,
                  width: 200,
                  textAlign: "center",
                  transform: `translateY(${textY}px)`,
                  opacity: textOpacity,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#F1F5F9",
                    marginBottom: 4,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#94A3B8",
                    lineHeight: 1.5,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
