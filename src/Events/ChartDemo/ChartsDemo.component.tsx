import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";
import { BarChart } from "../../Common/BarChart";
import { LineChart } from "../../Common/LineChart";
import { AreaChart } from "../../Common/AreaChart";
import { ProgressBars } from "../../Common/ProgressBars";
import { CircularProgress } from "../../Common/CircularProgress";

export const chartsDemoSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

type ChartsDemoProps = z.infer<typeof chartsDemoSchema>;

const chartData = [
  { x: 0, y: 50, label: "Jan" },
  { x: 1, y: 80, label: "Feb" },
  { x: 2, y: 30, label: "Mar" },
  { x: 3, y: 70, label: "Apr" },
  { x: 4, y: 45, label: "May" },
  { x: 5, y: 90, label: "Jun" },
  { x: 6, y: 60, label: "Jul" },
  { x: 7, y: 75, label: "Aug" },
  { x: 8, y: 40, label: "Sep" },
  { x: 9, y: 85, label: "Oct" },
];

const skillData = [
  { label: "React", value: 72, color: "#4361ee" },
  { label: "TypeScript", value: 34, color: "#3a0ca3" },
  { label: "Node.js", value: 55, color: "#7209b7" },
  { label: "Python", value: 40, color: "#f72585" },
  { label: "Go", value: 20, color: "#4cc9f0" },
];

export const ChartsDemo: React.FC<ChartsDemoProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();

  const fadeIn = (start: number, dur: number) =>
    interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const bg = "linear-gradient(to bottom right, #111827, #1f2937)";

  return (
    <AbsoluteFill style={{ background: bg }}>
      {/* Bar Chart Section (0-120) */}
      <Sequence from={0} durationInFrames={120}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 28, fontWeight: 800, marginBottom: 40, fontFamily: "system-ui, sans-serif", opacity: fadeIn(0, 20) }}>
            {title}
          </h1>
          <div style={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 20, opacity: fadeIn(10, 20) }}>
            <BarChart data={chartData} startFrame={20} />
          </div>
        </div>
      </Sequence>

      {/* Line Chart Section (120-240) */}
      <Sequence from={120} durationInFrames={120}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 28, fontWeight: 800, marginBottom: 40, fontFamily: "system-ui, sans-serif", opacity: fadeIn(120, 20) }}>
            Revenue Growth
          </h1>
          <div style={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 20, opacity: fadeIn(130, 20) }}>
            <LineChart data={chartData} startFrame={140} lineColor="#f72585" dotColor="#f72585" />
          </div>
        </div>
      </Sequence>

      {/* Area Chart (240-360) */}
      <Sequence from={240} durationInFrames={120}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 28, fontWeight: 800, marginBottom: 40, fontFamily: "system-ui, sans-serif", opacity: fadeIn(240, 20) }}>
            Performance Metrics
          </h1>
          <div style={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 20, opacity: fadeIn(250, 20) }}>
            <AreaChart data={chartData} startFrame={260} lineColor="#4cc9f0" gradientStart="#4cc9f0" gradientEnd="#4cc9f0" />
          </div>
        </div>
      </Sequence>

      {/* Progress Bars (360-480) */}
      <Sequence from={360} durationInFrames={120}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 28, fontWeight: 800, marginBottom: 40, fontFamily: "system-ui, sans-serif", opacity: fadeIn(360, 20) }}>
            Skills Overview
          </h1>
          <div style={{ opacity: fadeIn(370, 20) }}>
            <ProgressBars data={skillData} startFrame={380} totalWidth={700} />
          </div>
        </div>
      </Sequence>

      {/* Circular Progress (480-600) */}
      <Sequence from={480} durationInFrames={120}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ color: "white", fontSize: 28, fontWeight: 800, marginBottom: 40, fontFamily: "system-ui, sans-serif", opacity: fadeIn(480, 20) }}>
            Completion Rate
          </h1>
          <div style={{ opacity: fadeIn(490, 20) }}>
            <CircularProgress value={71} size={300} color="#4361ee" label="Target achieved" startFrame={500} />
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
