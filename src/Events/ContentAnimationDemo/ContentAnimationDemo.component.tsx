import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";
import { CountdownTimer } from "../../Common/CountdownTimer";
import { RotatingCarousel } from "../../Common/RotatingCarousel";
import { NotificationPop } from "../../Common/NotificationPop";
import { ProgressSteps } from "../../Common/ProgressSteps";
import { TextHighlight } from "../../Common/TextHighlight";
import { CardFlip } from "../../Common/CardFlip";
import { ParticleExplosion } from "../../Common/ParticleExplosion";
import { SoundWave } from "../../Common/SoundWave";
import { AnimatedList } from "../../Common/AnimatedList";

export const contentAnimationDemoSchema = z.object({
  text: z.string().optional().default("BINGO!"),
});

type ContentAnimationDemoProps = z.infer<typeof contentAnimationDemoSchema>;

export const ContentAnimationDemo: React.FC<ContentAnimationDemoProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const bg = "linear-gradient(to bottom right, #0F172A, #1E293B)";

  const fadeIn = (start: number, dur: number) =>
    interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: bg }}>
      {/* Countdown Timer (0-30) */}
      <Sequence from={0} durationInFrames={30}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 20, fontFamily: "system-ui, sans-serif", opacity: fadeIn(0, 10) }}>
            Countdown Timer
          </h1>
          <CountdownTimer from={3} />
        </div>
      </Sequence>

      {/* RotatingCarousel (30-90) */}
      <Sequence from={30} durationInFrames={60}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 20, fontFamily: "system-ui, sans-serif", opacity: fadeIn(30, 10) }}>
            Rotating Carousel
          </h1>
          <RotatingCarousel
            items={[
              { title: "Feature A", description: "Amazing capability", color: "#0891B2" },
              { title: "Feature B", description: "Powerful tooling", color: "#7C3AED" },
              { title: "Feature C", description: "Seamless integration", color: "#F59E0B" },
            ]}
          />
        </div>
      </Sequence>

      {/* NotificationPop (90-150) */}
      <Sequence from={90} durationInFrames={60}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 20, fontFamily: "system-ui, sans-serif", opacity: fadeIn(90, 10) }}>
            Notification Pop
          </h1>
          <div style={{ width: 400, height: 300 }}>
            <NotificationPop
              notifications={[
                { title: "New Update", message: "Version 3.0 released" },
                { title: "Task Complete", message: "Build succeeded" },
                { title: "Alert", message: "New user registered" },
              ]}
            />
          </div>
        </div>
      </Sequence>

      {/* ProgressSteps (150-190) */}
      <Sequence from={150} durationInFrames={40}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 20, fontFamily: "system-ui, sans-serif", opacity: fadeIn(150, 10) }}>
            Progress Steps
          </h1>
          <ProgressSteps
            steps={["Plan", "Build", "Test", "Deploy"]}
            currentStep={2}
          />
        </div>
      </Sequence>

      {/* TextHighlight (190-240) */}
      <Sequence from={190} durationInFrames={50}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 20, fontFamily: "system-ui, sans-serif", opacity: fadeIn(190, 10) }}>
            Text Highlight
          </h1>
          <TextHighlight text={text} highlightColor="#f72585" />
        </div>
      </Sequence>

      {/* CardFlip (240-290) */}
      <Sequence from={240} durationInFrames={50}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 20, fontFamily: "system-ui, sans-serif", opacity: fadeIn(240, 10) }}>
            Card Flip
          </h1>
          <CardFlip
            frontContent={
              <div style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: 700 }}>
                Front Side
              </div>
            }
            backContent={
              <div style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: 700 }}>
                Back Side
              </div>
            }
          />
        </div>
      </Sequence>

      {/* ParticleExplosion (290-350) */}
      <Sequence from={290} durationInFrames={60}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 20, fontFamily: "system-ui, sans-serif", opacity: fadeIn(290, 10) }}>
            Particle Explosion
          </h1>
          <ParticleExplosion text="BOOM" />
        </div>
      </Sequence>

      {/* SoundWave (350-420) */}
      <Sequence from={350} durationInFrames={70}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 20, fontFamily: "system-ui, sans-serif", opacity: fadeIn(350, 10) }}>
            Sound Wave
          </h1>
          <SoundWave numBars={30} barColor="#22D3EE" />
        </div>
      </Sequence>

      {/* AnimatedList (420-480) */}
      <Sequence from={420} durationInFrames={60}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 20, fontFamily: "system-ui, sans-serif", opacity: fadeIn(420, 10) }}>
            Animated List
          </h1>
          <AnimatedList
            items={["Plan architecture", "Develop features", "Write tests", "Deploy to production", "Monitor performance"]}
            itemColor="#7C3AED"
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
