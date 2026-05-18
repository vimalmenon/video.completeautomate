import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface ProgressStepsProps {
  steps: string[];
  currentStep?: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep = 0,
  steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
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
        alignItems: 'center',
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          position: 'relative',
          width: containerWidth,
        }}
      >
        {/* Background line */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            height: 3,
            left: circleSize / 2,
            position: 'absolute',
            right: circleSize / 2,
            top: 0,
          }}
        />

        {/* Progress line */}
        <div
          style={{
            backgroundColor: '#0891B2',
            borderRadius: 2,
            height: 3,
            left: circleSize / 2,
            position: 'absolute',
            top: 0,
            transition: 'width 0.3s',
            width: `${
              currentStep > 0 ? (currentStep / (stepCount - 1)) * (containerWidth - circleSize) : 0
            }px`,
          }}
        />

        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;

          const pulseScale = isCurrent
            ? spring({
                config: { damping: 8, mass: 0.5, stiffness: 100 },
                fps,
                frame,
                from: 1,
                to: 1.25,
              })
            : 1;

          const circleOpacity = isCompleted ? 1 : isCurrent ? 1 : 0.4;

          return (
            <div
              key={i}
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                left: i * stepWidth,
                position: 'absolute',
                top: 0,
                transform: 'translateX(-50%)',
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  backgroundColor: isCompleted
                    ? '#0891B2'
                    : isCurrent
                      ? 'rgba(8, 145, 178, 0.2)'
                      : 'transparent',
                  border: `3px solid ${isCompleted ? '#0891B2' : 'rgba(255,255,255,0.25)'}`,
                  borderRadius: '50%',
                  boxShadow: isCurrent ? '0 0 20px rgba(8, 145, 178, 0.4)' : 'none',
                  display: 'flex',
                  height: circleSize,
                  justifyContent: 'center',
                  opacity: circleOpacity,
                  transform: `scale(${pulseScale})`,
                  width: circleSize,
                }}
              >
                {isCompleted && (
                  <span
                    style={{
                      color: '#FFFFFF',
                      fontSize: '1rem',
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                )}
                {!isCompleted && !isCurrent && (
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.25)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                style={{
                  color: isCompleted ? '#22D3EE' : isCurrent ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: isCurrent ? 700 : 500,
                  marginTop: 14,
                  whiteSpace: 'nowrap',
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
