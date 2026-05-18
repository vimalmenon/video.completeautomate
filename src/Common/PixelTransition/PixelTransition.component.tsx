import React from 'react';

import { interpolate, useCurrentFrame } from 'remotion';

interface PixelTransitionProps {
  gridSize?: number;
  colors?: string[];
  startFrame?: number;
  durationInFrames?: number;
  children?: React.ReactNode;
  direction?: 'left-to-right' | 'random';
}

const defaultColors = ['#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4cc9f0', '#4895ef', '#b5179e'];

export const PixelTransition: React.FC<PixelTransitionProps> = ({
  children,
  colors = defaultColors,
  direction = 'left-to-right',
  durationInFrames = 60,
  gridSize = 8,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const cols = gridSize;
  const rows = gridSize;
  const totalCells = cols * rows;

  const pixelW = 1920 / cols;
  const pixelH = 1080 / rows;

  const cells: { row: number; col: number; delay: number; color: string }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const index = r * cols + c;
      const delay =
        direction === 'random'
          ? ((index * 937 + r * 491 + c * 283) % totalCells) / totalCells
          : (r * cols + c) / totalCells;
      cells.push({
        col: c,
        color: colors[(r + c) % colors.length],
        delay,
        row: r,
      });
    }
  }

  return (
    <div
      style={{
        inset: 0,
        overflow: 'hidden',
        position: 'absolute',
      }}
    >
      {/* Content behind transition */}
      {children && <div style={{ inset: 0, position: 'absolute' }}>{children}</div>}

      {/* Pixel grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          inset: 0,
          position: 'absolute',
        }}
      >
        {cells.map((cell, i) => {
          const opacity = interpolate(
            frame - startFrame,
            [cell.delay * durationInFrames, cell.delay * durationInFrames + 8],
            [1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          const scale = interpolate(
            frame - startFrame,
            [cell.delay * durationInFrames, cell.delay * durationInFrames + 8],
            [1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={i}
              style={{
                backgroundColor: cell.color,
                height: pixelH,
                opacity,
                transform: `scale(${scale})`,
                width: pixelW,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
