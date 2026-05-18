import React, { useMemo } from 'react';

import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface YouTubeShortsProps {
  speechScript?: string;
  audioUrl?: string;
  topic?: string;
  accentColor?: string;
  durationInFrames?: number;
}

/**
 * YouTubeShorts – a vertical (1080×1920) composition for YouTube Shorts.
 *
 * Splits `speechScript` by sentence boundaries, animates each segment
 * upward with a spring, dims older segments, and optionally plays an
 * audio track in sync with the text reveal.
 */
export const YouTubeShorts: React.FC<YouTubeShortsProps> = ({
  accentColor = '#0891B2',
  audioUrl,
  durationInFrames: _,
  speechScript = 'Welcome to YouTube Shorts. This is an animated text composition. Each sentence slides up with a smooth spring animation.',
  topic = 'YouTube Shorts',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split script into sentences
  const segments = useMemo(() => {
    const raw = speechScript
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    // Ensure we have at least one segment
    return raw.length > 0 ? raw : [speechScript];
  }, [speechScript]);

  // Each segment gets SEGMENT_DUR frames (at least 24), and we cap total
  const SEGMENT_DUR = Math.max(Math.round(segments.length > 0 ? 180 / segments.length : 24), 24);
  const totalDuration = segments.length * SEGMENT_DUR;

  // ---------- background gradient ----------
  const gradProgress = interpolate(frame, [0, totalDuration], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const bgGradient = `linear-gradient(
    135deg,
    ${interpolateColor(gradProgress, [0, 0.5, 1], ['#0F172A', '#131D35', '#0F172A'])},
    ${interpolateColor(gradProgress, [0, 0.5, 1], ['#1E293B', '#1A2740', '#0A0F1F'])}
  )`;

  const containerStyle: React.CSSProperties = {
    alignItems: 'center',
    background: bgGradient,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    height: 1920,
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '80px 60px',
    position: 'relative',
    width: 1080,
  };

  // ---------- topic header ----------
  const headerStyle: React.CSSProperties = {
    color: accentColor,
    fontSize: 28,
    fontWeight: 700,
    left: 0,
    letterSpacing: '0.05em',
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    top: 60,
  };

  const underlineStyle: React.CSSProperties = {
    background: accentColor,
    borderRadius: 2,
    height: 4,
    margin: '12px auto 0',
    width: 80,
  };

  // ---------- text segments ----------
  const textAreaStyle: React.CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    height: '60%',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  };

  return (
    <AbsoluteFill style={containerStyle}>
      {/* subtle animated overlay for extra depth */}
      <div
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${accentColor}15 0%, transparent 70%)`,
          inset: 0,
          pointerEvents: 'none',
          position: 'absolute',
        }}
      />

      {/* topic header */}
      <div style={headerStyle}>
        {topic}
        <div style={underlineStyle} />
      </div>

      {/* speech text */}
      <div style={textAreaStyle}>
        {segments.map((segment, i) => {
          const segStart = i * SEGMENT_DUR;
          const segEnd = segStart + SEGMENT_DUR;

          // Only render if within visible range (plus one extra for smooth exit)
          if (frame < segStart - 5 || frame > segEnd + 20) {
            return null;
          }

          // Delay the spring a bit so previous segment has time to settle
          const delay = i === 0 ? 0 : 3;
          const springVal = spring({
            config: {
              damping: 14,
              mass: 0.6,
              stiffness: 100,
            },
            fps,
            frame: frame - segStart - delay,
          });

          const translateY = interpolate(springVal, [0, 1], [80, 0]);

          // Determine segment state
          const isCurrent = frame >= segStart && frame < segEnd;
          const isPast = frame >= segEnd;
          const isFuture = frame < segStart;

          const segOpacity = isFuture
            ? 0
            : isCurrent
              ? 1
              : interpolate(frame - segEnd, [0, 20], [1, 0.35], { extrapolateRight: 'clamp' });

          const segStyle: React.CSSProperties = {
            color: isPast ? '#94A3B8' : '#FFFFFF',
            fontSize: isCurrent ? 32 : 28,
            fontWeight: isCurrent ? 600 : 400,
            lineHeight: 1.5,
            maxWidth: 900,
            opacity: isFuture ? 0 : segOpacity,
            padding: '0 20px',
            position: 'absolute',
            textAlign: 'center',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            transform: isFuture ? undefined : `translateY(${translateY}px)`,
            transition: 'none',
          };

          return (
            <div key={i} style={segStyle}>
              {segment}
            </div>
          );
        })}
      </div>

      {/* audio track */}
      {audioUrl && (
        <Sequence from={0} durationInFrames={totalDuration}>
          <Audio src={audioUrl} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

/** Tiny helper to interpolate between CSS colour strings. */
function interpolateColor(t: number, stops: number[], colors: string[]): string {
  if (t <= stops[0]) return colors[0];
  if (t >= stops[stops.length - 1]) return colors[colors.length - 1];

  let i = 0;
  for (; i < stops.length - 1; i++) {
    if (t >= stops[i] && t <= stops[i + 1]) break;
  }

  const local = (t - stops[i]) / (stops[i + 1] - stops[i]);
  const c1 = parseColor(colors[i]);
  const c2 = parseColor(colors[i + 1]);
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * local);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * local);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * local);
  return `rgb(${r},${g},${b})`;
}

function parseColor(c: string): [number, number, number] {
  const hex = c.replace('#', '');
  return [
    parseInt(hex.substring(0, 2), 16),
    parseInt(hex.substring(2, 4), 16),
    parseInt(hex.substring(4, 6), 16),
  ];
}
