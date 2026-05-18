import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { StatCounter } from "../../Common/StatCounter";
import { LogoWall } from "../../Common/LogoWall";

const logoItemSchema = z.object({
  name: z.string(),
  color: z.string().optional(),
});

export const automationNextBigThingSchema = z.object({
  text: z.string(),
  subtext: z.string(),
  logos: z.array(logoItemSchema).optional(),
});

type AutomationNextBigThingProps = z.infer<typeof automationNextBigThingSchema>;

export const AutomationNextBigThing: React.FC<AutomationNextBigThingProps> = ({ text, subtext, logos }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const primaryColor = "#0891B2";
  const primaryLightColor = "#22D3EE";
  const backgroundColor = "#0F172A";

  const fadeIn = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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

      {/* Section 2: Stats with animated counters (90-210) */}
      <Sequence from={90} durationInFrames={120}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatCounter value={500} label="Hours Saved" suffix="+" startFrame={90} color="#22D3EE" />
          <StatCounter value={50} label="Businesses Automated" suffix="+" startFrame={130} color="#0891B2" />
          <StatCounter value={98} label="Client Satisfaction" suffix="%" startFrame={170} color="#22D3EE" />
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

      {/* Section 4: LogoWall (300-420) — only if logos provided */}
      {logos && logos.length > 0 && (
        <Sequence from={300} durationInFrames={120}>
          <div
            style={{
              position: "absolute",
              top: "18%",
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 40,
                opacity: fadeIn(300, 320),
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
