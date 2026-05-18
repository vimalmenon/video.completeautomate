import React from 'react';

import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from 'remotion';
import { z } from 'zod';

import { AnimatedList } from '../../Common/AnimatedList';
import { CardFlip } from '../../Common/CardFlip';
import { CountdownTimer } from '../../Common/CountdownTimer';
import { NotificationPop } from '../../Common/NotificationPop';
import { ParticleExplosion } from '../../Common/ParticleExplosion';
import { ProgressSteps } from '../../Common/ProgressSteps';
import { RotatingCarousel } from '../../Common/RotatingCarousel';
import { SoundWave } from '../../Common/SoundWave';
import { TextHighlight } from '../../Common/TextHighlight';

export const contentAnimationDemoSchema = z.object({
  text: z.string().optional().default('BINGO!'),
});

type ContentAnimationDemoProps = z.infer<typeof contentAnimationDemoSchema>;

export const ContentAnimationDemo: React.FC<ContentAnimationDemoProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const bg = 'linear-gradient(to bottom right, #0F172A, #1E293B)';

  const fadeIn = (start: number, dur: number) =>
    interpolate(frame, [start, start + dur], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  return (
    <AbsoluteFill style={{ background: bg }}>
      {/* Countdown Timer (0-30) */}
      <Sequence from={0} durationInFrames={30}>
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
          <h1
            style={{
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 20,
              opacity: fadeIn(0, 10),
            }}
          >
            Countdown Timer
          </h1>
          <CountdownTimer from={3} />
        </div>
      </Sequence>

      {/* RotatingCarousel (30-90) */}
      <Sequence from={30} durationInFrames={60}>
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
          <h1
            style={{
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 20,
              opacity: fadeIn(30, 10),
            }}
          >
            Rotating Carousel
          </h1>
          <RotatingCarousel
            items={[
              { color: '#0891B2', description: 'Amazing capability', title: 'Feature A' },
              { color: '#7C3AED', description: 'Powerful tooling', title: 'Feature B' },
              { color: '#F59E0B', description: 'Seamless integration', title: 'Feature C' },
            ]}
          />
        </div>
      </Sequence>

      {/* NotificationPop (90-150) */}
      <Sequence from={90} durationInFrames={60}>
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
          <h1
            style={{
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 20,
              opacity: fadeIn(90, 10),
            }}
          >
            Notification Pop
          </h1>
          <div style={{ height: 300, width: 400 }}>
            <NotificationPop
              notifications={[
                { message: 'Version 3.0 released', title: 'New Update' },
                { message: 'Build succeeded', title: 'Task Complete' },
                { message: 'New user registered', title: 'Alert' },
              ]}
            />
          </div>
        </div>
      </Sequence>

      {/* ProgressSteps (150-190) */}
      <Sequence from={150} durationInFrames={40}>
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
          <h1
            style={{
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 20,
              opacity: fadeIn(150, 10),
            }}
          >
            Progress Steps
          </h1>
          <ProgressSteps steps={['Plan', 'Build', 'Test', 'Deploy']} currentStep={2} />
        </div>
      </Sequence>

      {/* TextHighlight (190-240) */}
      <Sequence from={190} durationInFrames={50}>
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
          <h1
            style={{
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 20,
              opacity: fadeIn(190, 10),
            }}
          >
            Text Highlight
          </h1>
          <TextHighlight text={text} highlightColor="#f72585" />
        </div>
      </Sequence>

      {/* CardFlip (240-290) */}
      <Sequence from={240} durationInFrames={50}>
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
          <h1
            style={{
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 20,
              opacity: fadeIn(240, 10),
            }}
          >
            Card Flip
          </h1>
          <CardFlip
            frontContent={
              <div style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 700 }}>
                Front Side
              </div>
            }
            backContent={
              <div style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 700 }}>Back Side</div>
            }
          />
        </div>
      </Sequence>

      {/* ParticleExplosion (290-350) */}
      <Sequence from={290} durationInFrames={60}>
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
          <h1
            style={{
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 20,
              opacity: fadeIn(290, 10),
            }}
          >
            Particle Explosion
          </h1>
          <ParticleExplosion text="BOOM" />
        </div>
      </Sequence>

      {/* SoundWave (350-420) */}
      <Sequence from={350} durationInFrames={70}>
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
          <h1
            style={{
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 20,
              opacity: fadeIn(350, 10),
            }}
          >
            Sound Wave
          </h1>
          <SoundWave numBars={30} barColor="#22D3EE" />
        </div>
      </Sequence>

      {/* AnimatedList (420-480) */}
      <Sequence from={420} durationInFrames={60}>
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
          <h1
            style={{
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 20,
              opacity: fadeIn(420, 10),
            }}
          >
            Animated List
          </h1>
          <AnimatedList
            items={[
              'Plan architecture',
              'Develop features',
              'Write tests',
              'Deploy to production',
              'Monitor performance',
            ]}
            itemColor="#7C3AED"
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
