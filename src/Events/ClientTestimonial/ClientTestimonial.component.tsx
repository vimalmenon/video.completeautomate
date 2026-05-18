import React from 'react';

import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';

export const clientTestimonialSchema = z.object({
  author: z.string(),
  company: z.string(),
  quote: z.string().min(1).max(500),
  rating: z.number().min(1).max(5),
  role: z.string(),
});

type ClientTestimonialProps = z.infer<typeof clientTestimonialSchema>;

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();

export const ClientTestimonial: React.FC<ClientTestimonialProps> = ({
  author,
  company,
  quote,
  rating,
  role,
}) => {
  const frame = useCurrentFrame();

  // Background gradient
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        justifyContent: 'center',
      }}
    >
      {/* Accent circles */}
      <div
        style={{
          background: 'radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%)',
          borderRadius: 200,
          height: 400,
          opacity: bgOpacity,
          position: 'absolute',
          right: -100,
          top: -100,
          width: 400,
        }}
      />
      <div
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
          borderRadius: 150,
          bottom: -80,
          height: 300,
          left: -80,
          opacity: bgOpacity,
          position: 'absolute',
          width: 300,
        }}
      />

      {/* Card */}
      <div
        style={{
          backdropFilter: 'blur(8px)',
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(8, 145, 178, 0.15)',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          maxWidth: 800,
          padding: '48px 56px',
          width: '80%',
        }}
      >
        {/* Stars */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const starDelay = 10 + i * 4;
            const starOpacity = interpolate(frame - starDelay, [0, 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const starScale = interpolate(frame - starDelay, [0, 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const isFilled = i < rating || (i === Math.floor(rating) && rating % 1 !== 0);

            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  fontSize: 28,
                  opacity: starOpacity * (isFilled ? 1 : 0.3),
                  transform: `scale(${starScale})`,
                }}
              >
                {isFilled ? '★' : '☆'}
              </span>
            );
          })}
        </div>

        {/* Quote text with typewriter effect */}
        <div
          style={{
            color: '#E2E8F0',
            fontFamily: 'Georgia, serif',
            fontSize: 22,
            fontStyle: 'italic',
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              color: '#0891B2',
              fontSize: 48,
              lineHeight: 0,
              marginRight: 8,
              opacity: 0.5,
              verticalAlign: '-20px',
            }}
          >
            "
          </span>
          {quote.slice(
            0,
            Math.floor(
              interpolate(frame - 10, [0, 60], [0, quote.length], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            )
          )}
        </div>

        {/* Author info */}
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 16,
            opacity: interpolate(frame - 80, [0, 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateY(${interpolate(frame - 80, [0, 15], [20, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px)`,
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background: 'linear-gradient(135deg, #0891B2, #22D3EE)',
              borderRadius: 24,
              color: '#0F172A',
              display: 'flex',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 18,
              fontWeight: 700,
              height: 48,
              justifyContent: 'center',
              width: 48,
            }}
          >
            {getInitials(author)}
          </div>
          <div>
            <div
              style={{
                color: '#F1F5F9',
                fontFamily: 'system-ui, sans-serif',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {author}
            </div>
            <div style={{ color: '#94A3B8', fontFamily: 'system-ui, sans-serif', fontSize: 13 }}>
              {role}, {company}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
