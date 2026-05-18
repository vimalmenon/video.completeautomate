import React from 'react';

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

interface GradientShiftProps {
  colors?: string[];
}

export const GradientShift: React.FC<GradientShiftProps> = ({
  colors = ['#0F172A', '#1E293B', '#0891B2', '#0EA5E9'],
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const gradients = colors.map((color, i) => {
    const speed = 0.003 + i * 0.001;
    const angle = (i / colors.length) * Math.PI * 2;
    const driftX = Math.sin(frame * speed + i * 1.5) * width * 0.3;
    const driftY = Math.cos(frame * speed * 0.7 + i * 2.0) * height * 0.3;
    const cx = width / 2 + driftX;
    const cy = height / 2 + driftY;
    const radius = Math.max(width, height) * (0.7 + Math.sin(frame * speed * 0.5) * 0.3);

    return `radial-gradient(circle at ${cx}px ${cy}px, ${color}00 0%, ${color}66 ${radius * 0.3}px, ${color}00 ${radius}px)`;
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors[0],
        backgroundImage: gradients.join(', '),
        transition: 'background-image 0.05s linear',
      }}
    />
  );
};
