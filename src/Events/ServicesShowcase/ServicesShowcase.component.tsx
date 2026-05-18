import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";

const serviceSchema = z.object({
  icon: z.string(),
  name: z.string(),
  description: z.string(),
});

export const servicesShowcaseSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  services: z.array(serviceSchema).min(1).max(6),
});

type ServicesShowcaseProps = z.infer<typeof servicesShowcaseSchema>;

const cardWidth = 340;
const cardGap = 24;

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({
  title,
  subtitle,
  services,
}) => {
  const frame = useCurrentFrame();

  // Title & subtitle fade in
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", justifyContent: "center", alignItems: "center" }}>
      {/* Title & Subtitle */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 60,
          padding: "0 60px",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#F8FAFC",
            margin: 0,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 20,
            color: "#94A3B8",
            marginTop: 12,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Service Cards */}
      <div
        style={{
          display: "flex",
          gap: cardGap,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {services.map((service, i) => {
          const cardStart = 25 + i * 20;
          const opacity = interpolate(
            frame - cardStart,
            [0, 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const slideY = interpolate(
            frame - cardStart,
            [0, 15],
            [60, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const scale = interpolate(
            frame - cardStart,
            [0, 15],
            [0.9, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                width: cardWidth,
                backgroundColor: "#1E293B",
                borderRadius: 16,
                border: "1px solid rgba(8, 145, 178, 0.2)",
                padding: "32px 24px",
                opacity,
                transform: `translateY(${slideY}px) scale(${scale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
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
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#22D3EE",
                  margin: "0 0 8px 0",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {service.name}
              </h3>
              {/* Description */}
              <p
                style={{
                  fontSize: 15,
                  color: "#94A3B8",
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: "system-ui, sans-serif",
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
          position: "absolute",
          bottom: 40,
          width: "60%",
          height: 2,
          background: "linear-gradient(90deg, transparent, #0891B2, transparent)",
          opacity: interpolate(frame, [60, 90], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
