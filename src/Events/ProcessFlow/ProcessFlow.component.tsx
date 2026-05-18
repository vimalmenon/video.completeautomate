import React from 'react';

import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';

const stepSchema = z.object({
  description: z.string(),
  number: z.number(),
  title: z.string(),
});

export const processFlowSchema = z.object({
  steps: z.array(stepSchema).min(2).max(8),
  title: z.string(),
});

type ProcessFlowProps = z.infer<typeof processFlowSchema>;

export const ProcessFlow: React.FC<ProcessFlowProps> = ({ steps, title }) => {
  const frame = useCurrentFrame();

  // Title fade in
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 20], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const totalWidth = 1400;
  const stepSpacing = totalWidth / (steps.length + 1);

  return (
    <AbsoluteFill
      style={{ alignItems: 'center', backgroundColor: '#0F172A', justifyContent: 'center' }}
    >
      {/* Title */}
      <div
        style={{
          marginBottom: 80,
          opacity: titleOpacity,
          textAlign: 'center',
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1
          style={{
            color: '#F8FAFC',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 42,
            fontWeight: 800,
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Flow Container */}
      <div
        style={{
          height: 300,
          position: 'relative',
          width: totalWidth,
        }}
      >
        {/* Connecting line */}
        <div
          style={{
            backgroundColor: '#1E293B',
            borderRadius: 2,
            height: 4,
            left: stepSpacing - 10,
            position: 'absolute',
            top: 60,
            width: stepSpacing * (steps.length - 1) + 20,
          }}
        >
          {/* Animated progress line */}
          <div
            style={{
              background: 'linear-gradient(90deg, #0891B2, #22D3EE)',
              borderRadius: 2,
              height: '100%',
              width: `${interpolate(frame - 20, [0, steps.length * 15], [0, 100], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}%`,
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, i) => {
          const stepX = stepSpacing * (i + 1);
          const delay = 20 + i * 15;

          const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const circleScale = interpolate(frame - delay, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const circleY = interpolate(frame - delay, [0, 10], [-20, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const textOpacity = interpolate(frame - (delay + 8), [0, 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const textY = interpolate(frame - (delay + 8), [0, 12], [15, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                left: stepX - 30,
                opacity,
                position: 'absolute',
                top: 0,
                width: 60,
              }}
            >
              {/* Circle */}
              <div
                style={{
                  alignItems: 'center',
                  backgroundColor: '#0F172A',
                  border: '3px solid #0891B2',
                  borderRadius: 30,
                  boxShadow: '0 0 20px rgba(8,145,178,0.3)',
                  display: 'flex',
                  height: 60,
                  justifyContent: 'center',
                  position: 'relative',
                  transform: `translateY(${circleY}px) scale(${circleScale})`,
                  width: 60,
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    color: '#22D3EE',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Title & Description */}
              <div
                style={{
                  opacity: textOpacity,
                  position: 'absolute',
                  textAlign: 'center',
                  top: 80,
                  transform: `translateY(${textY}px)`,
                  width: 200,
                }}
              >
                <div
                  style={{
                    color: '#F1F5F9',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    color: '#94A3B8',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 12,
                    lineHeight: 1.5,
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
