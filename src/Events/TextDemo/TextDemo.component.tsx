import React from 'react';

import { AbsoluteFill, Sequence } from 'remotion';
import { z } from 'zod';

import { BubblePopText } from '../../Common/BubblePopText';
import { FloatingTextChip } from '../../Common/FloatingTextChip';
import { PoppingText } from '../../Common/PoppingText';
import { PulsingText } from '../../Common/PulsingText';

export const textDemoSchema = z.object({
  text: z.string().optional().default('BINGO!'),
});

type TextDemoProps = z.infer<typeof textDemoSchema>;

export const TextDemo: React.FC<TextDemoProps> = ({ text }) => (
  <AbsoluteFill
    style={{
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, #0F172A, #1E293B)',
      justifyContent: 'center',
    }}
  >
    {/* Bubble Pop Text (0-60) */}
    <Sequence from={0} durationInFrames={60}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          inset: 0,
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <BubblePopText text={text} startFrame={5} />
      </div>
    </Sequence>

    {/* Popping Scale Text (60-180) */}
    <Sequence from={60} durationInFrames={120}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          inset: 0,
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <PoppingText text={text} startFrame={70} />
      </div>
    </Sequence>

    {/* Pulsing Text (180-270) */}
    <Sequence from={180} durationInFrames={90}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          inset: 0,
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <PulsingText text={text} color="#f72585" fontSize="6rem" />
      </div>
    </Sequence>

    {/* Floating Text Chip (270-330) */}
    <Sequence from={270} durationInFrames={60}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          inset: 0,
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <FloatingTextChip text="NEW FEATURE" startFrame={275} />
      </div>
    </Sequence>
  </AbsoluteFill>
);
