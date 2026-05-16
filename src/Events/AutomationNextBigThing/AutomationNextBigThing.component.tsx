import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

export const automationNextBigThingSchema = z.object({
  text: z.string(),
  subtext: z.string(),
});

type AutomationNextBigThingProps = z.infer<typeof automationNextBigThingSchema>;

export const AutomationNextBigThing: React.FC<AutomationNextBigThingProps> = ({ text, subtext }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const primaryColor = "#0891B2";
  const primaryLightColor = "#22D3EE";
  const backgroundColor = "#0F172A";

  const fadeIn = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const slideUp = (start: number, end: number) =>
    interpolate(frame, [start, end], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const scaleIn = (start: number, end: number) =>
    interpolate(frame, [start, end], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const baseFontSize = width / 20;

  return (
    <AbsoluteFill style={{ backgroundColor, justifyContent: "center", alignItems: "center" }}>
      {/* Section 1: Hero Text (0-90) */}
      <Sequence from={0} durationInFrames={90}>
        <div
          style={{
            fontSize: baseFontSize,
            fontWeight: "bold",
            color: primaryColor,
            opacity: fadeIn(0, 30),
            transform: `scale(${scaleIn(0, 30)})`,
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          {text}
        </div>
        <div
          style={{
            fontSize: baseFontSize / 2,
            color: primaryLightColor,
            opacity: fadeIn(15, 45),
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {subtext}
        </div>
      </Sequence>

      {/* Section 2: Stats (90-210) */}
      <Sequence from={90} durationInFrames={120}>
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontSize: baseFontSize / 1.5,
            fontWeight: "bold",
            color: primaryLightColor,
          }}
        >
          <div style={{ opacity: fadeIn(90, 110), transform: `translateY(${slideUp(90, 110)}px)` }}>
            500+ Hours Saved
          </div>
          <div
            style={{
              opacity: fadeIn(130, 150),
              transform: `translateY(${slideUp(130, 150)}px)`,
              marginTop: 24,
            }}
          >
            50+ Businesses Automated
          </div>
          <div
            style={{
              opacity: fadeIn(170, 190),
              transform: `translateY(${slideUp(170, 190)}px)`,
              marginTop: 24,
            }}
          >
            98% Client Satisfaction
          </div>
        </div>
      </Sequence>

      {/* Section 3: Call to Action (210-300) */}
      <Sequence from={210} durationInFrames={90}>
        <div
          style={{
            fontSize: baseFontSize,
            fontWeight: "bold",
            color: primaryColor,
            opacity: fadeIn(210, 240),
            transform: `scale(${scaleIn(210, 240)})`,
            textAlign: "center",
          }}
        >
          Complete Automate
        </div>
        <div
          style={{
            fontSize: baseFontSize / 2,
            color: primaryLightColor,
            opacity: fadeIn(225, 255),
            marginTop: 20,
            textAlign: "center",
          }}
        >
          AI Automation Consulting
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
