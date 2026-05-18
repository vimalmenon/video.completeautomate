import React, { useMemo } from 'react';

import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';

interface MatrixRainProps {
  columnWidth?: number;
  charSize?: number;
  color?: string;
  fadeOpacity?: number;
}

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]|~!@#$%^&*()_+-=あいうえおかきくけこさしすせそ';

interface Column {
  x: number;
  length: number;
  speed: number;
  offset: number;
  chars: string[];
}

export const MatrixRain: React.FC<MatrixRainProps> = ({
  charSize = 16,
  color = '#00FF41',
  columnWidth = 20,
  fadeOpacity = 0.8,
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const cols = Math.ceil(width / columnWidth);
  const visibleChars = Math.ceil(height / charSize) + 2;

  const columns = useMemo<Column[]>(() => {
    const result: Column[] = [];
    for (let i = 0; i < cols; i++) {
      const colChars: string[] = [];
      const len = Math.floor(random(`len-${i}`) * 15 + 5);
      for (let j = 0; j < len + visibleChars; j++) {
        colChars.push(CHARS[Math.floor(random(`char-${i}-${j}`) * CHARS.length)]);
      }
      result.push({
        chars: colChars,
        length: len,
        offset: random(`offset-${i}`) * 200,
        speed: random(`speed-${i}`) * 1.5 + 0.5,
        x: i * columnWidth,
      });
    }
    return result;
  }, [cols, visibleChars]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', overflow: 'hidden' }}>
      {columns.map((col) => {
        const scrollPos = (frame * col.speed + col.offset) % (col.length + visibleChars);
        const startIdx = Math.floor(scrollPos);

        return (
          <div
            key={col.x}
            style={{
              height: '100%',
              left: col.x,
              overflow: 'hidden',
              position: 'absolute',
              top: 0,
              width: columnWidth,
            }}
          >
            {Array.from({ length: visibleChars + 2 }).map((_, j) => {
              const charIndex = (startIdx + j) % col.chars.length;
              const char = col.chars[charIndex];
              const yPos = j * charSize - (scrollPos % 1) * charSize;

              // Head of the column is bright, tail fades
              const distFromHead = j;
              const charOpacity = interpolate(
                distFromHead,
                [0, 2, col.length - 2, col.length],
                [1, fadeOpacity, fadeOpacity * 0.3, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              const isHead = j === 0 || j === 1;
              const charColor = isHead ? '#FFFFFF' : color;

              return (
                <span
                  key={`${col.x}-${j}`}
                  style={{
                    color: charColor,
                    display: 'block',
                    fontFamily: 'monospace',
                    fontSize: charSize,
                    height: charSize,
                    left: 2,
                    lineHeight: 1,
                    opacity: charOpacity,
                    position: 'absolute',
                    textShadow: j < 2 ? `0 0 8px ${color}` : `0 0 3px ${color}44`,
                    top: yPos,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
