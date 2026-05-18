import React from 'react';

import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';

const serviceSchema = z.object({
  description: z.string(),
  icon: z.string(),
  name: z.string(),
});

export const servicesShowcaseSchema = z.object({
  services: z.array(serviceSchema).min(1).max(6),
  subtitle: z.string(),
  title: z.string(),
});

type ServicesShowcaseProps = z.infer<typeof servicesShowcaseSchema>;

const cardWidth = 340;
const cardGap = 24;

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({
  services,
  subtitle,
  title,
}) => {
  const frame = useCurrentFrame();

  // Title & subtitle fade in
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{ alignItems: 'center', backgroundColor: '#0F172A', justifyContent: 'center' }}
    >
      {/* Title & Subtitle */}
      <div
        style={{
          marginBottom: 60,
          opacity: titleOpacity,
          padding: '0 60px',
          textAlign: 'center',
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1
          style={{
            color: '#F8FAFC',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 48,
            fontWeight: 800,
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: '#94A3B8',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            marginTop: 12,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Service Cards */}
      <div
        style={{
          alignItems: 'stretch',
          display: 'flex',
          gap: cardGap,
          justifyContent: 'center',
        }}
      >
        {services.map((service, i) => {
          const cardStart = 25 + i * 20;
          const opacity = interpolate(frame - cardStart, [0, 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const slideY = interpolate(frame - cardStart, [0, 15], [60, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const scale = interpolate(frame - cardStart, [0, 15], [0.9, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                alignItems: 'center',
                backgroundColor: '#1E293B',
                border: '1px solid rgba(8, 145, 178, 0.2)',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                opacity,
                padding: '32px 24px',
                textAlign: 'center',
                transform: `translateY(${slideY}px) scale(${scale})`,
                width: cardWidth,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 16,
                }}
              >
                {service.icon}
              </div>
              {/* Name */}
              <h3
                style={{
                  color: '#22D3EE',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 22,
                  fontWeight: 700,
                  margin: '0 0 8px 0',
                }}
              >
                {service.name}
              </h3>
              {/* Description */}
              <p
                style={{
                  color: '#94A3B8',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 15,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {service.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer accent line */}
      <div
        style={{
          background: 'linear-gradient(90deg, transparent, #0891B2, transparent)',
          bottom: 40,
          height: 2,
          opacity: interpolate(frame, [60, 90], [0, 0.6], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          position: 'absolute',
          width: '60%',
        }}
      />
    </AbsoluteFill>
  );
};
