import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { GradientShift } from "../../Common/GradientShift";
import { Starfield } from "../../Common/Starfield";
import { BokehCircles } from "../../Common/BokehCircles";
import { NoiseGrain } from "../../Common/NoiseGrain";
import { GridPulse } from "../../Common/GridPulse";
import { LiquidWave } from "../../Common/LiquidWave";
import { MatrixRain } from "../../Common/MatrixRain";
import { Particles } from "../../Common/Particles";
import { SlidingPanels } from "../../Common/SlidingPanels";

export const backgroundDemoSchema = z.object({
  text: z.string().optional().default("Backgrounds"),
});

type BackgroundDemoProps = z.infer<typeof backgroundDemoSchema>;

export const BackgroundDemo: React.FC<BackgroundDemoProps> = () => {
  const labelStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "rgba(255,255,255,0.6)",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "system-ui, sans-serif",
    zIndex: 10,
  };

  return (
    <AbsoluteFill>
      {/* GradientShift (0-50) */}
      <Sequence from={0} durationInFrames={50}>
        <GradientShift colors={["#0F172A", "#1E293B", "#0891B2", "#0EA5E9"]} />
        <div style={labelStyle}>Gradient Shift</div>
      </Sequence>

      {/* Starfield (50-120) */}
      <Sequence from={50} durationInFrames={70}>
        <Starfield numStars={200} speed={0.5} />
        <div style={labelStyle}>Starfield</div>
      </Sequence>

      {/* BokehCircles (120-180) */}
      <Sequence from={120} durationInFrames={60}>
        <BokehCircles numCircles={30} />
        <div style={labelStyle}>Bokeh Circles</div>
      </Sequence>

      {/* NoiseGrain (180-220) */}
      <Sequence from={180} durationInFrames={40}>
        <NoiseGrain />
        <div style={labelStyle}>Noise Grain</div>
      </Sequence>

      {/* GridPulse (220-270) */}
      <Sequence from={220} durationInFrames={50}>
        <GridPulse />
        <div style={labelStyle}>Grid Pulse</div>
      </Sequence>

      {/* LiquidWave (270-320) */}
      <Sequence from={270} durationInFrames={50}>
        <LiquidWave />
        <div style={labelStyle}>Liquid Wave</div>
      </Sequence>

      {/* MatrixRain (320-380) */}
      <Sequence from={320} durationInFrames={60}>
        <MatrixRain />
        <div style={labelStyle}>Matrix Rain</div>
      </Sequence>

      {/* Particles (380-440) */}
      <Sequence from={380} durationInFrames={60}>
        <Particles />
        <div style={labelStyle}>Particles</div>
      </Sequence>

      {/* SlidingPanels (440-500) */}
      <Sequence from={440} durationInFrames={60}>
        <SlidingPanels />
        <div style={labelStyle}>Sliding Panels</div>
      </Sequence>
    </AbsoluteFill>
  );
};
