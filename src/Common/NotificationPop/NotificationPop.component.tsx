import React from 'react';

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

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
    { message: 'Version 2.0 is ready', title: 'Update Available' },
    { message: 'File saved successfully', title: 'Download Complete' },
    { message: 'You have 3 unread messages', title: 'New Message' },
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
        alignItems: 'flex-end',
        backgroundColor: '#0F172A',
        justifyContent: 'flex-end',
        padding: 40,
      }}
    >
      {notifications.map((notif, i) => {
        const startFrame = i * staggerDelay;
        const progress = spring({
          config: { damping: 10, mass: 0.4, stiffness: 100 },
          fps,
          frame: frame - startFrame,
          from: 0,
          to: 1,
        });

        const translateX = interpolate(progress, [0, 1], [200, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 1], {
          extrapolateLeft: 'clamp',
        });

        const yOffset = i * (toastHeight + gap);

        if (frame < startFrame) return null;

        return (
          <div
            key={i}
            style={{
              alignItems: 'flex-start',
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(8, 145, 178, 0.3)',
              borderRadius: 14,
              bottom: 40 + yOffset,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(8,145,178,0.1)',
              display: 'flex',
              gap: 14,
              minHeight: toastHeight,
              opacity,
              padding: '16px 20px',
              position: 'absolute',
              right: 40,
              transform: `translateX(${translateX}px)`,
              width: 320,
            }}
          >
            {notif.icon && <span style={{ flexShrink: 0, fontSize: '1.4rem' }}>{notif.icon}</span>}
            {!notif.icon && (
              <div
                style={{
                  backgroundColor: '#0891B2',
                  borderRadius: '50%',
                  flexShrink: 0,
                  height: 10,
                  marginTop: 5,
                  width: 10,
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: '#22D3EE',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {notif.title}
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '0.85rem',
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
