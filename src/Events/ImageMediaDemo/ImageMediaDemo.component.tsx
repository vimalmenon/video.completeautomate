import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { SplitScreen } from "../../Common/SplitScreen";
import { PhotoStack } from "../../Common/PhotoStack";
import { ImageZoomReveal } from "../../Common/ImageZoomReveal";
import { PolaroidFrame } from "../../Common/PolaroidFrame";
import { ImageReveal } from "../../Common/ImageReveal";
import { ImageMask } from "../../Common/ImageMask";

export const imageMediaDemoSchema = z.object({
  text: z.string().optional().default("Media"),
});

type ImageMediaDemoProps = z.infer<typeof imageMediaDemoSchema>;

const placeholderUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
const placeholderUrl2 = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop";
const placeholderUrl3 = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop";

export const ImageMediaDemo: React.FC<ImageMediaDemoProps> = () => {
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
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "system-ui, sans-serif",
    zIndex: 10,
  };

  return (
    <AbsoluteFill>
      {/* SplitScreen (0-60) */}
      <Sequence from={0} durationInFrames={60}>
        <div style={sectionBg}>
          <SplitScreen
            leftContent={
              <div style={{ color: "white", fontSize: 24, fontWeight: 700, fontFamily: "system-ui, sans-serif" }}>
                Left Panel
              </div>
            }
            rightContent={
              <div style={{ color: "#22D3EE", fontSize: 24, fontWeight: 700, fontFamily: "system-ui, sans-serif" }}>
                Right Panel
              </div>
            }
            splitRatio={0.5}
          />
          <div style={labelStyle}>Split Screen</div>
        </div>
      </Sequence>

      {/* PhotoStack (60-120) */}
      <Sequence from={60} durationInFrames={60}>
        <div style={sectionBg}>
          <PhotoStack
            images={[
              { src: placeholderUrl, label: "Photo 1" },
              { src: placeholderUrl2, label: "Photo 2" },
              { src: placeholderUrl3, label: "Photo 3" },
            ]}
            startFrame={0}
          />
          <div style={labelStyle}>Photo Stack</div>
        </div>
      </Sequence>

      {/* ImageZoomReveal (120-170) */}
      <Sequence from={120} durationInFrames={50}>
        <div style={sectionBg}>
          <ImageZoomReveal src={placeholderUrl} startFrame={0} durationInFrames={50} />
          <div style={labelStyle}>Image Zoom Reveal</div>
        </div>
      </Sequence>

      {/* PolaroidFrame (170-220) */}
      <Sequence from={170} durationInFrames={50}>
        <div style={sectionBg}>
          <PolaroidFrame src={placeholderUrl2} caption="Summer vibes" startFrame={0} rotation={-3} />
          <div style={labelStyle}>Polaroid Frame</div>
        </div>
      </Sequence>

      {/* ImageReveal (220-270) */}
      <Sequence from={220} durationInFrames={50}>
        <div style={sectionBg}>
          <ImageReveal src={placeholderUrl3} startFrame={0} durationInFrames={40} direction="left" />
          <div style={labelStyle}>Image Reveal</div>
        </div>
      </Sequence>

      {/* ImageMask (270-330) */}
      <Sequence from={270} durationInFrames={60}>
        <div style={sectionBg}>
          <ImageMask src={placeholderUrl} maskShape="circle" startFrame={0} durationInFrames={50} size={300} />
          <div style={labelStyle}>Image Mask</div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
