import React from 'react';

import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

import { FONT_FAMILY } from './constants';

const title: React.CSSProperties = {
  bottom: 160,
  fontFamily: FONT_FAMILY,
  fontSize: 100,
  fontWeight: 'bold',
  position: 'absolute',
  textAlign: 'center',
  width: '100%',
};

const word: React.CSSProperties = {
  display: 'inline-block',
  marginLeft: 10,
  marginRight: 10,
};

export const Title: React.FC<{
  readonly titleText: string;
  readonly titleColor: string;
}> = ({ titleColor, titleText }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const words = titleText.split(' ');

  return (
    <h1 style={title}>
      {words.map((t, i) => {
        const delay = i * 5;

        const scale = spring({
          config: {
            damping: 200,
          },
          fps: videoConfig.fps,
          frame: frame - delay,
        });

        return (
          <span
            key={t}
            style={{
              ...word,
              color: titleColor,
              transform: `scale(${scale})`,
            }}
          >
            {t}
          </span>
        );
      })}
    </h1>
  );
};
