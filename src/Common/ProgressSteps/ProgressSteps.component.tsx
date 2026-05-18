import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface ProgressStepsProps {
  steps: string[];
  currentStep?: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps = ["Step 1", "Step 2", "Step 3", "Step 4"],
  currentStep = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stepCount = steps.length;
  const containerWidth = 700;
  const stepWidth = containerWidth / (stepCount - 1);
  const circleSize = 36;

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
          width: containerWidth,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Background line */}
        <div
          style={{
            position: "absolute",
            left: circleSize / 2,
            right: circleSize / 2,
            top: 0,
            height: 3,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 2,
          }}
        />

        {/* Progress line */}
        <div
          style={{
            position: "absolute",
            left: circleSize / 2,
            top: 0,
            width: `${
              currentStep > 0
                ? ((currentStep) / (stepCount - 1)) * (containerWidth - circleSize)
                : 0
            }px`,
            height: 3,
            backgroundColor: "#0891B2",
            borderRadius: 2,
            transition: "width 0.3s",
          }}
        />

        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;

          const pulseScale = isCurrent
            ? spring({
                frame,
                fps,
                from: 1,
                to: 1.25,
                config: { mass: 0.5, damping: 8, stiffness: 100 },
              })
            : 1;

          const circleOpacity = isCompleted
            ? 1
            : isCurrent
            ? 1
            : 0.4;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i * stepWidth,
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                top: 0,
              }}
            >
              <div
                style={{
                  width: circleSize,
                  height: circleSize,
                  borderRadius: "50%",
                  backgroundColor: isCompleted
                    ? "#0891B2"
                    : isCurrent
                    ? "rgba(8, 145, 178, 0.2)"
                    : "transparent",
                  border: `3px solid ${
                    isCompleted ? "#0891B2" : "rgba(255,255,255,0.25)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${pulseScale})`,
                  opacity: circleOpacity,
                  boxShadow: isCurrent
                    ? "0 0 20px rgba(8, 145, 178, 0.4)"
                    : "none",
                }}
              >
                {isCompleted && (
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1rem",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                )}
                {!isCompleted && !isCurrent && (
                  <span
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                style={{
                  marginTop: 14,
                  fontSize: "0.85rem",
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCompleted
                    ? "#22D3EE"
                    : isCurrent
                    ? "#FFFFFF"
                    : "rgba(255,255,255,0.4)",
                  fontFamily: "system-ui, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
