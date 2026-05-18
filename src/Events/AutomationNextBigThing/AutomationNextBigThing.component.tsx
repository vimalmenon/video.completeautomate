import React from 'react';

import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';

import { LogoWall } from '../../Common/LogoWall';
import { StatCounter } from '../../Common/StatCounter';

const logoItemSchema = z.object({
  color: z.string().optional(),
  name: z.string(),
});

export const automationNextBigThingSchema = z.object({
  logos: z.array(logoItemSchema).optional(),
  subtext: z.string(),
  text: z.string(),
});

type AutomationNextBigThingProps = z.infer<typeof automationNextBigThingSchema>;

export const AutomationNextBigThing: React.FC<AutomationNextBigThingProps> = ({
  logos,
  subtext,
  text,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const primaryColor = '#0891B2';
  const primaryLightColor = '#22D3EE';
  const backgroundColor = '#0F172A';

  const fadeIn = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const scaleIn = (start: number, end: number) =>
    interpolate(frame, [start, end], [0.8, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const baseFontSize = width / 20;

  return (
    <AbsoluteFill style={{ alignItems: 'center', backgroundColor, justifyContent: 'center' }}>
      {/* Section 1: Hero Text (0-90) */}
      <Sequence from={0} durationInFrames={90}>
        <div
          style={{
            color: primaryColor,
            fontSize: baseFontSize,
            fontWeight: 'bold',
            opacity: fadeIn(0, 30),
            padding: '0 60px',
            textAlign: 'center',
            transform: `scale(${scaleIn(0, 30)})`,
          }}
        >
          {text}
        </div>
        <div
          style={{
            color: primaryLightColor,
            fontSize: baseFontSize / 2,
            marginTop: 20,
            opacity: fadeIn(15, 45),
            textAlign: 'center',
          }}
        >
          {subtext}
        </div>
      </Sequence>

      {/* Section 2: Stats with animated counters (90-210) */}
      <Sequence from={90} durationInFrames={120}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 60,
            justifyContent: 'center',
            left: '50%',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <StatCounter value={500} label="Hours Saved" suffix="+" startFrame={90} color="#22D3EE" />
          <StatCounter
            value={50}
            label="Businesses Automated"
            suffix="+"
            startFrame={130}
            color="#0891B2"
          />
          <StatCounter
            value={98}
            label="Client Satisfaction"
            suffix="%"
            startFrame={170}
            color="#22D3EE"
          />
        </div>
      </Sequence>

      {/* Section 3: Call to Action (210-300) */}
      <Sequence from={210} durationInFrames={90}>
        <div
          style={{
            color: primaryColor,
            fontSize: baseFontSize,
            fontWeight: 'bold',
            opacity: fadeIn(210, 240),
            textAlign: 'center',
            transform: `scale(${scaleIn(210, 240)})`,
          }}
        >
          Complete Automate
        </div>
        <div
          style={{
            color: primaryLightColor,
            fontSize: baseFontSize / 2,
            marginTop: 20,
            opacity: fadeIn(225, 255),
            textAlign: 'center',
          }}
        >
          AI Automation Consulting
        </div>
      </Sequence>

      {/* Section 4: LogoWall (300-420) — only if logos provided */}
      {logos && logos.length > 0 && (
        <Sequence from={300} durationInFrames={120}>
          <div
            style={{
              left: 0,
              position: 'absolute',
              right: 0,
              textAlign: 'center',
              top: '18%',
            }}
          >
            <div
              style={{
                color: '#64748B',
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: '0.08em',
                marginBottom: 40,
                opacity: fadeIn(300, 320),
                textTransform: 'uppercase',
              }}
            >
              Trusted By
            </div>
            <LogoWall logos={logos} startFrame={310} cols={4} />
          </div>
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
