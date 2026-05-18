import React, { useMemo } from 'react';

import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SlidingPanelsProps {
  panels?: number;
  colors?: string[];
  gap?: number;
}

export const SlidingPanels: React.FC<SlidingPanelsProps> = ({
  colors = ['#0891B2', '#0EA5E9', '#06B6D4', '#22D3EE'],
  gap = 4,
  panels = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  // Calculate grid layout to roughly fit N panels
  const gridCols = Math.ceil(Math.sqrt(panels));
  const gridRows = Math.ceil(panels / gridCols);
  const cellWidth = (width - (gridCols - 1) * gap) / gridCols;
  const cellHeight = (height - (gridRows - 1) * gap) / gridRows;

  // Panel placements: staggered clockwise from edges
  const placements = useMemo(() => {
    const result: {
      col: number;
      row: number;
      edge: 'left' | 'right' | 'top' | 'bottom';
      delay: number;
    }[] = [];
    for (let i = 0; i < panels; i++) {
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);
      const edgeIdx = i % 4;
      const edge: 'left' | 'right' | 'top' | 'bottom' =
        edgeIdx === 0 ? 'left' : edgeIdx === 1 ? 'right' : edgeIdx === 2 ? 'top' : 'bottom';
      result.push({
        col,
        delay: i * 5,
        edge,
        row,
      });
    }
    return result;
  }, [panels, gridCols]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', overflow: 'hidden' }}>
      {placements.map((p, i) => {
        const color = colors[i % colors.length];

        const spr = spring({
          config: {
            damping: 12,
            mass: 0.5,
            stiffness: 80,
          },
          fps,
          frame: frame - p.delay,
        });

        const x = p.col * (cellWidth + gap);
        const y = p.row * (cellHeight + gap);

        // Calculate translate based on edge
        let translateX = 0;
        let translateY = 0;
        switch (p.edge) {
          case 'left':
            translateX = -(1 - spr) * cellWidth;
            translateY = 0;
            break;
          case 'right':
            translateX = (1 - spr) * cellWidth;
            translateY = 0;
            break;
          case 'top':
            translateX = 0;
            translateY = -(1 - spr) * cellHeight;
            break;
          case 'bottom':
            translateX = 0;
            translateY = (1 - spr) * cellHeight;
            break;
        }

        return (
          <div
            key={i}
            style={{
              backgroundColor: color,
              borderRadius: 8,
              boxShadow: `0 0 20px ${color}44`,
              height: cellHeight,
              left: x + translateX,
              opacity: spr,
              position: 'absolute',
              top: y + translateY,
              transform: `scale(${0.8 + spr * 0.2})`,
              width: cellWidth,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
