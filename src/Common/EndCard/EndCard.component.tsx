import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface EndCardProps {
  channelName: string;
  subscribeText: string;
}

export const EndCard: React.FC<EndCardProps> = ({
  channelName = "CompleteAutomate",
  subscribeText = "Subscribe for more",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stagger springs
  const thanksSpring = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.5, damping: 12, stiffness: 80 },
  });

  const thanksTranslateY = interpolate(thanksSpring, [0, 1], [60, 0]);
  const thanksOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const channelOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const channelTranslateY = interpolate(frame, [15, 30], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button spring
  const ctaSpring = spring({
    frame: frame - 20,
    fps,
    from: 0,
    to: 1,
    config: { mass: 0.3, damping: 10, stiffness: 120 },
  });

  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1]);
  const ctaOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse effect on CTA
  const pulse = Math.sin((frame * Math.PI * 2) / 60) * 0.04 + 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        {/* Thanks text */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 300,
            color: "#94A3B8",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.05em",
            opacity: thanksOpacity,
            transform: `translateY(${thanksTranslateY}px)`,
            marginBottom: 16,
          }}
        >
          Thanks for Watching
        </div>

        {/* Channel name */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "system-ui, sans-serif",
            opacity: channelOpacity,
            transform: `translateY(${channelTranslateY}px)`,
            marginBottom: 40,
          }}
        >
          {channelName}
        </div>

        {/* CTA Button */}
        <div
          style={{
            display: "inline-block",
            padding: "16px 48px",
            backgroundColor: "#0891B2",
            borderRadius: 50,
            opacity: ctaOpacity,
            transform: `scale(${ctaScale * pulse})`,
            boxShadow: "0 0 30px rgba(8, 145, 178, 0.3)",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            {subscribeText}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
