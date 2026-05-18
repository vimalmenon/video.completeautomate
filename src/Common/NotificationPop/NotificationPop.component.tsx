import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from "remotion";

interface Notification {
  title: string;
  message: string;
  icon?: string;
}

interface NotificationPopProps {
  notifications: Notification[];
}

export const NotificationPop: React.FC<NotificationPopProps> = ({
  notifications = [
    { title: "Update Available", message: "Version 2.0 is ready" },
    { title: "Download Complete", message: "File saved successfully" },
    { title: "New Message", message: "You have 3 unread messages" },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const staggerDelay = Math.round(fps * 0.5);
  const toastHeight = 90;
  const gap = 12;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 40,
      }}
    >
      {notifications.map((notif, i) => {
        const startFrame = i * staggerDelay;
        const progress = spring({
          frame: frame - startFrame,
          fps,
          from: 0,
          to: 1,
          config: { mass: 0.4, damping: 10, stiffness: 100 },
        });

        const translateX = interpolate(progress, [0, 1], [200, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 1], {
          extrapolateLeft: "clamp",
        });

        const yOffset = i * (toastHeight + gap);

        if (frame < startFrame) return null;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 40 + yOffset,
              right: 40,
              width: 320,
              minHeight: toastHeight,
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              borderRadius: 14,
              border: "1px solid rgba(8, 145, 178, 0.3)",
              padding: "16px 20px",
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              transform: `translateX(${translateX}px)`,
              opacity,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(8,145,178,0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            {notif.icon && (
              <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>
                {notif.icon}
              </span>
            )}
            {!notif.icon && (
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#0891B2",
                  flexShrink: 0,
                  marginTop: 5,
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#22D3EE",
                  fontFamily: "system-ui, sans-serif",
                  marginBottom: 4,
                }}
              >
                {notif.title}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {notif.message}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
