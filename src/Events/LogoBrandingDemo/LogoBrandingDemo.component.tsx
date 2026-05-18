import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { LogoFadeReveal } from "../../Common/LogoFadeReveal";
import { LogoSpinReveal } from "../../Common/LogoSpinReveal";
import { LogoGlitchReveal } from "../../Common/LogoGlitchReveal";
import { LogoBounceDrop } from "../../Common/LogoBounceDrop";
import { LogoStrokeDraw } from "../../Common/LogoStrokeDraw";
import { LogoScaleRotate } from "../../Common/LogoScaleRotate";
import { LogoSplitReveal } from "../../Common/LogoSplitReveal";
import { LogoWatermark } from "../../Common/LogoWatermark";
import { DynamicLowerThird } from "../../Common/DynamicLowerThird";
import { CleanLowerThird } from "../../Common/CleanLowerThird";

export const logoBrandingDemoSchema = z.object({
  text: z.string().optional().default("Brand"),
});

type LogoBrandingDemoProps = z.infer<typeof logoBrandingDemoSchema>;

export const LogoBrandingDemo: React.FC<LogoBrandingDemoProps> = () => {
  const sectionBg: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom right, #0F172A, #1E293B)",
  };

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "system-ui, sans-serif",
    zIndex: 10,
  };

  return (
    <AbsoluteFill>
      {/* LogoFadeReveal (0-50) */}
      <Sequence from={0} durationInFrames={50}>
        <div style={sectionBg}>
          <LogoFadeReveal logoText="AI" companyName="CompleteAutomate" tagline="Intelligent Automation" />
          <div style={labelStyle}>Logo Fade Reveal</div>
        </div>
      </Sequence>

      {/* LogoSpinReveal (50-100) */}
      <Sequence from={50} durationInFrames={50}>
        <div style={sectionBg}>
          <LogoSpinReveal logoText="AI" companyName="CompleteAutomate" tagline="Built for Scale" />
          <div style={labelStyle}>Logo Spin Reveal</div>
        </div>
      </Sequence>

      {/* LogoGlitchReveal (100-150) */}
      <Sequence from={100} durationInFrames={50}>
        <div style={sectionBg}>
          <LogoGlitchReveal logoText="AI" companyName="CompleteAutomate" tagline="Next Level" />
          <div style={labelStyle}>Logo Glitch Reveal</div>
        </div>
      </Sequence>

      {/* LogoBounceDrop (150-200) */}
      <Sequence from={150} durationInFrames={50}>
        <div style={sectionBg}>
          <LogoBounceDrop logoText="AI" companyName="CompleteAutomate" tagline="Bounce In" />
          <div style={labelStyle}>Logo Bounce Drop</div>
        </div>
      </Sequence>

      {/* LogoStrokeDraw (200-250) */}
      <Sequence from={200} durationInFrames={50}>
        <div style={sectionBg}>
          <LogoStrokeDraw logoText="AI" companyName="CompleteAutomate" tagline="Stroke Draw" />
          <div style={labelStyle}>Logo Stroke Draw</div>
        </div>
      </Sequence>

      {/* LogoScaleRotate (250-300) */}
      <Sequence from={250} durationInFrames={50}>
        <div style={sectionBg}>
          <LogoScaleRotate logoText="AI" companyName="CompleteAutomate" tagline="Scale & Rotate" />
          <div style={labelStyle}>Logo Scale Rotate</div>
        </div>
      </Sequence>

      {/* LogoSplitReveal (300-350) */}
      <Sequence from={300} durationInFrames={50}>
        <div style={sectionBg}>
          <LogoSplitReveal logoText="AI" companyName="CompleteAutomate" tagline="Split Reveal" />
          <div style={labelStyle}>Logo Split Reveal</div>
        </div>
      </Sequence>

      {/* LogoWatermark (350-400) */}
      <Sequence from={350} durationInFrames={50}>
        <div style={sectionBg}>
          <div style={{ color: "white", fontSize: 40, fontWeight: 300, fontFamily: "system-ui, sans-serif", marginBottom: 40 }}>
            Content with watermark overlay
          </div>
          <LogoWatermark logoText="CA" position="bottom-right" />
          <div style={labelStyle}>Logo Watermark</div>
        </div>
      </Sequence>

      {/* DynamicLowerThird (400-450) */}
      <Sequence from={400} durationInFrames={50}>
        <div style={sectionBg}>
          <DynamicLowerThird name="Jane Smith" title="CEO, CompleteAutomate" />
          <div style={labelStyle}>Dynamic Lower Third</div>
        </div>
      </Sequence>

      {/* CleanLowerThird (450-500) */}
      <Sequence from={450} durationInFrames={50}>
        <div style={sectionBg}>
          <CleanLowerThird name="John Doe" title="CTO, CompleteAutomate" />
          <div style={labelStyle}>Clean Lower Third</div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
