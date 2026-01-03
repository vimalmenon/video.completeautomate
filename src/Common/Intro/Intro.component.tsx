import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
interface IntroProps {
  text?: string;
}

export const introSchema = z.object({
  text: z.string(),
});

export const Intro: React.FC<IntroProps> = ({ text = "Welcome to CompleteAutomate" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Characters per frame (adjust speed: higher = faster)
  const charsPerFrame = 0.5;
  const displayedChars = Math.floor(frame * charsPerFrame);
  const displayedText = text.slice(0, displayedChars);

  // Fade in effect
  const opacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        fontSize: 48,
        fontWeight: "bold",
        color: "#000",
        backgroundColor: "#fff",
        opacity,
      }}
    >
      {displayedText}
      <span style={{ animation: "blink 0.7s infinite" }}>|</span>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.1%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}