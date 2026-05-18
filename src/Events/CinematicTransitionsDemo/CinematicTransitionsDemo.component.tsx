import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { KenBurns } from "../../Common/KenBurns";
import { ZoomPulse } from "../../Common/ZoomPulse";
import { ParallaxPan } from "../../Common/ParallaxPan";
import { CameraShake } from "../../Common/CameraShake";
import { SpotlightReveal } from "../../Common/SpotlightReveal";
import { LetterboxReveal } from "../../Common/LetterboxReveal";
import { FilmBurn } from "../../Common/FilmBurn";
import { VignettePulse } from "../../Common/VignettePulse";
import { MorphingShapes } from "../../Common/MorphingShapes";
import { FadeThroughBlack } from "../../Common/FadeThroughBlack";
import { SlideWipe } from "../../Common/SlideWipe";
import { CrossDissolve } from "../../Common/CrossDissolve";
import { ZoomThrough } from "../../Common/ZoomThrough";

export const cinematicTransitionsDemoSchema = z.object({
  text: z.string().optional().default("Cinematic"),
});

type CinematicTransitionsDemoProps = z.infer<typeof cinematicTransitionsDemoSchema>;

const placeholderUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop";

export const CinematicTransitionsDemo: React.FC<CinematicTransitionsDemoProps> = () => {
  const labelStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "system-ui, sans-serif",
    zIndex: 10,
  };

  const sectionBg: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom right, #111827, #1f2937)",
  };

  return (
    <AbsoluteFill>
      {/* KenBurns (0-50) */}
      <Sequence from={0} durationInFrames={50}>
        <KenBurns src={placeholderUrl} direction="in" startFrame={0} durationInFrames={50} />
        <div style={labelStyle}>Ken Burns Effect</div>
      </Sequence>

      {/* ZoomPulse (50-90) */}
      <Sequence from={50} durationInFrames={40}>
        <div style={sectionBg}>
          <ZoomPulse minScale={1} maxScale={1.08} speed={0.03}>
            <div style={{ color: "white", fontSize: "3rem", fontWeight: 800, fontFamily: "system-ui, sans-serif" }}>
              Zoom Pulse
            </div>
          </ZoomPulse>
          <div style={labelStyle}>Zoom Pulse</div>
        </div>
      </Sequence>

      {/* ParallaxPan (90-140) */}
      <Sequence from={90} durationInFrames={50}>
        <ParallaxPan
          layers={[
            { src: placeholderUrl, speed: 0.3 },
            { src: placeholderUrl, speed: 0.6 },
          ]}
          direction="horizontal"
        />
        <div style={labelStyle}>Parallax Pan</div>
      </Sequence>

      {/* CameraShake (140-180) */}
      <Sequence from={140} durationInFrames={40}>
        <div style={sectionBg}>
          <CameraShake shakeFrame={0} intensity={8} decayFrames={30}>
            <div style={{ color: "white", fontSize: "3rem", fontWeight: 800, fontFamily: "system-ui, sans-serif" }}>
              Camera Shake
            </div>
          </CameraShake>
          <div style={labelStyle}>Camera Shake</div>
        </div>
      </Sequence>

      {/* SpotlightReveal (180-240) */}
      <Sequence from={180} durationInFrames={60}>
        <div style={sectionBg}>
          <SpotlightReveal startFrame={0} durationInFrames={60}>
            <div style={{ color: "white", fontSize: "3rem", fontWeight: 800, fontFamily: "system-ui, sans-serif" }}>
              Spotlight
            </div>
          </SpotlightReveal>
          <div style={labelStyle}>Spotlight Reveal</div>
        </div>
      </Sequence>

      {/* LetterboxReveal (240-300) */}
      <Sequence from={240} durationInFrames={60}>
        <div style={sectionBg}>
          <LetterboxReveal startFrame={0} durationInFrames={60} barHeight={200}>
            <div style={{ color: "white", fontSize: "3rem", fontWeight: 800, fontFamily: "system-ui, sans-serif" }}>
              Letterbox
            </div>
          </LetterboxReveal>
          <div style={labelStyle}>Letterbox Reveal</div>
        </div>
      </Sequence>

      {/* FilmBurn (300-340) */}
      <Sequence from={300} durationInFrames={40}>
        <div style={{ ...sectionBg, background: "#1a0a0a" }}>
          <FilmBurn startFrame={0} durationInFrames={40}>
            <div style={{ color: "white", fontSize: "3rem", fontWeight: 800, fontFamily: "system-ui, sans-serif" }}>
              Film Burn
            </div>
          </FilmBurn>
          <div style={labelStyle}>Film Burn</div>
        </div>
      </Sequence>

      {/* VignettePulse (340-380) */}
      <Sequence from={340} durationInFrames={40}>
        <div style={sectionBg}>
          <VignettePulse startFrame={0} minOpacity={0.2} maxOpacity={0.7} speed={0.04}>
            <div style={{ color: "white", fontSize: "3rem", fontWeight: 800, fontFamily: "system-ui, sans-serif" }}>
              Vignette
            </div>
          </VignettePulse>
          <div style={labelStyle}>Vignette Pulse</div>
        </div>
      </Sequence>

      {/* MorphingShapes (380-440) */}
      <Sequence from={380} durationInFrames={60}>
        <MorphingShapes numShapes={6} colors={["#0891B2", "#06B6D4", "#22D3EE", "#67E8F9", "#0EA5E9", "#3B82F6"]} />
        <div style={labelStyle}>Morphing Shapes</div>
      </Sequence>

      {/* Transitions Section */}

      {/* FadeThroughBlack (440-500) */}
      <Sequence from={440} durationInFrames={60}>
        <FadeThroughBlack durationInFrames={60}>
          <div style={{ ...sectionBg, background: "#000" }}>
            <div style={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>Scene A</div>
          </div>
          <div style={{ ...sectionBg, background: "#111" }}>
            <div style={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>Scene B</div>
          </div>
        </FadeThroughBlack>
        <div style={labelStyle}>Fade Through Black</div>
      </Sequence>

      {/* SlideWipe (500-560) */}
      <Sequence from={500} durationInFrames={60}>
        <SlideWipe direction="left">
          <div style={{ ...sectionBg, background: "#1a1a2e" }}>
            <div style={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>Scene A</div>
          </div>
          <div style={{ ...sectionBg, background: "#16213e" }}>
            <div style={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>Scene B</div>
          </div>
        </SlideWipe>
        <div style={labelStyle}>Slide Wipe</div>
      </Sequence>

      {/* CrossDissolve (560-620) */}
      <Sequence from={560} durationInFrames={60}>
        <CrossDissolve durationInFrames={60}>
          <div style={{ ...sectionBg, background: "#0f3460" }}>
            <div style={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>Scene A</div>
          </div>
          <div style={{ ...sectionBg, background: "#533483" }}>
            <div style={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>Scene B</div>
          </div>
        </CrossDissolve>
        <div style={labelStyle}>Cross Dissolve</div>
      </Sequence>

      {/* ZoomThrough (620-680) */}
      <Sequence from={620} durationInFrames={60}>
        <ZoomThrough durationInFrames={60} peakScale={1.5}>
          <div style={{ ...sectionBg, background: "#1b1b2f" }}>
            <div style={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>Scene A</div>
          </div>
          <div style={{ ...sectionBg, background: "#24243e" }}>
            <div style={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>Scene B</div>
          </div>
        </ZoomThrough>
        <div style={labelStyle}>Zoom Through</div>
      </Sequence>
    </AbsoluteFill>
  );
};
