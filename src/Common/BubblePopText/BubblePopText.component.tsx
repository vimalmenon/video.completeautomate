import React from 'react';

import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface BubblePopTextProps {
  text?: string;
  fontSize?: string;
  bubbleSize?: string;
  startFrame?: number;
  colors?: string[];
}

const defaultColors = ['#1e3a8a', '#3b82f6'];

export const BubblePopText: React.FC<BubblePopTextProps> = ({
  bubbleSize = '100px',
  colors = defaultColors,
  fontSize = '4rem',
  startFrame = 0,
  text = 'HELLO',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: 'center',
      }}
    >
      {text.split('').map((char, i) => {
        const delay = startFrame + i * 5;
        const scale = spring({
          config: { damping: 8, mass: 0.3, stiffness: 100 },
          fps,
          frame: frame - delay,
          from: 0,
          to: 1,
        });

        return (
          <span
            key={i}
            style={{
              background: `linear-gradient(45deg, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]})`,
              border: '4px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              boxShadow: `0 4px 15px ${colors[i % colors.length]}80`,
              color: 'white',
              display: 'inline-block',
              fontSize,
              fontWeight: 'bold',
              height: bubbleSize,
              lineHeight: bubbleSize,
              textAlign: 'center',
              transform: `scale(${scale})`,
              width: bubbleSize,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
