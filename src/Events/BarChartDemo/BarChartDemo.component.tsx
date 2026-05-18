import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { BarChart, BarDataPoint } from "../../Common/BarChart";

const barDataPointSchema = z.object({
  x: z.number(),
  y: z.number(),
  label: z.string(),
});

export const barChartDemoSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  data: z.array(barDataPointSchema).min(1).max(20),
});

type BarChartDemoProps = z.infer<typeof barChartDemoSchema>;

export const BarChartDemo: React.FC<BarChartDemoProps> = ({
  title,
  subtitle,
  data,
}) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [-10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(to bottom right, #111827, #1f2937)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateX(-50%) translateY(${titleY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#F8FAFC",
            margin: 0,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-0.5px",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.7)",
            marginTop: 8,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Chart */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          padding: 20,
          marginTop: 40,
        }}
      >
        <BarChart
          data={data as BarDataPoint[]}
          startFrame={25}
          staggerFrames={3}
        />
      </div>
    </AbsoluteFill>
  );
};
