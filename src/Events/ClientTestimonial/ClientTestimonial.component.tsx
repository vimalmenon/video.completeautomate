import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";

export const clientTestimonialSchema = z.object({
  quote: z.string().min(1).max(500),
  author: z.string(),
  role: z.string(),
  company: z.string(),
  rating: z.number().min(1).max(5),
});

type ClientTestimonialProps = z.infer<typeof clientTestimonialSchema>;

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const ClientTestimonial: React.FC<ClientTestimonialProps> = ({
  quote,
  author,
  role,
  company,
  rating,
}) => {
  const frame = useCurrentFrame();

  // Background gradient
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Accent circles */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: 200,
          background: "radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%)",
          opacity: bgOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: 150,
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          opacity: bgOpacity,
        }}
      />

      {/* Card */}
      <div
        style={{
          background: "rgba(30, 41, 59, 0.8)",
          backdropFilter: "blur(8px)",
          borderRadius: 24,
          border: "1px solid rgba(8, 145, 178, 0.15)",
          padding: "48px 56px",
          maxWidth: 800,
          width: "80%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Stars */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const starDelay = 10 + i * 4;
            const starOpacity = interpolate(
              frame - starDelay,
              [0, 8],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const starScale = interpolate(
              frame - starDelay,
              [0, 8],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const isFilled = i < rating || (i === Math.floor(rating) && rating % 1 !== 0);

            return (
              <span
                key={i}
                style={{
                  fontSize: 28,
                  opacity: starOpacity * (isFilled ? 1 : 0.3),
                  transform: `scale(${starScale})`,
                  display: "inline-block",
                }}
              >
                {isFilled ? "★" : "☆"}
              </span>
            );
          })}
        </div>

        {/* Quote text with typewriter effect */}
        <div
          style={{
            fontSize: 22,
            color: "#E2E8F0",
            lineHeight: 1.7,
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 48,
              color: "#0891B2",
              opacity: 0.5,
              marginRight: 8,
              lineHeight: 0,
              verticalAlign: "-20px",
            }}
          >
            "
          </span>
          {quote.slice(
            0,
            Math.floor(
              interpolate(frame - 10, [0, 60], [0, quote.length], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            )
          )}
        </div>

        {/* Author info */}
        <div
          style={{
            opacity: interpolate(frame - 80, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame - 80, [0, 15], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              background: "linear-gradient(135deg, #0891B2, #22D3EE)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              color: "#0F172A",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {getInitials(author)}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", fontFamily: "system-ui, sans-serif" }}>
              {author}
            </div>
            <div style={{ fontSize: 13, color: "#94A3B8", fontFamily: "system-ui, sans-serif" }}>
              {role}, {company}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
