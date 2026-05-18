import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { PoppingText } from "../../Common/PoppingText";
import { BubblePopText } from "../../Common/BubblePopText";
import { PulsingText } from "../../Common/PulsingText";
import { FloatingTextChip } from "../../Common/FloatingTextChip";

export const textDemoSchema = z.object({
  text: z.string().optional().default("BINGO!"),
});

type TextDemoProps = z.infer<typeof textDemoSchema>;

export const TextDemo: React.FC<TextDemoProps> = ({ text }) => {
  return (
    <AbsoluteFill style={{ background: "linear-gradient(to bottom right, #0F172A, #1E293B)", justifyContent: "center", alignItems: "center" }}>
      {/* Bubble Pop Text (0-60) */}
      <Sequence from={0} durationInFrames={60}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <BubblePopText text={text} startFrame={5} />
        </div>
      </Sequence>

      {/* Popping Scale Text (60-180) */}
      <Sequence from={60} durationInFrames={120}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <PoppingText text={text} startFrame={70} />
        </div>
      </Sequence>

      {/* Pulsing Text (180-270) */}
      <Sequence from={180} durationInFrames={90}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <PulsingText text={text} color="#f72585" fontSize="6rem" />
        </div>
      </Sequence>

      {/* Floating Text Chip (270-330) */}
      <Sequence from={270} durationInFrames={60}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <FloatingTextChip text="NEW FEATURE" startFrame={275} />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
