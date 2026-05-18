import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Img,
  Easing,
} from "remotion";

interface SlideItem {
  src: string;
  caption: string;
}

interface SlideshowProps {
  images: SlideItem[];
}

export const Slideshow: React.FC<SlideshowProps> = ({
  images = [
    { src: "https://picsum.photos/seed/s1/1920/1080", caption: "Mountain View" },
    { src: "https://picsum.photos/seed/s2/1920/1080", caption: "Ocean Sunset" },
    { src: "https://picsum.photos/seed/s3/1920/1080", caption: "City Lights" },
    { src: "https://picsum.photos/seed/s4/1920/1080", caption: "Forest Path" },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const DURATION_PER_SLIDE = fps * 3; // 3 seconds per slide
  const FADE_DURATION = fps * 0.5; // 0.5 second cross-fade



  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {images.map((img, i) => {
        const startFrame = i * DURATION_PER_SLIDE;
        const endFrame = (i + 1) * DURATION_PER_SLIDE;
        const fadeStart = endFrame - FADE_DURATION;

        // Opacity: fade in at start, fade out at end
        let opacity = 1;

        // Fade in
        if (frame >= startFrame && frame < startFrame + FADE_DURATION) {
          opacity = interpolate(
            frame,
            [startFrame, startFrame + FADE_DURATION],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) }
          );
        }
        // Full visibility
        else if (frame >= startFrame + FADE_DURATION && frame < fadeStart) {
          opacity = 1;
        }
        // Fade out
        else if (frame >= fadeStart && frame < endFrame) {
          opacity = interpolate(
            frame,
            [fadeStart, endFrame],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) }
          );
        } else {
          opacity = 0;
        }

        // Caption slides up
        const captionProgress = interpolate(
          frame,
          [startFrame + FADE_DURATION * 0.5, startFrame + FADE_DURATION],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const captionTranslateY = interpolate(captionProgress, [0, 1], [40, 0]);
        const captionOpacity = interpolate(
          frame,
          [startFrame + FADE_DURATION * 0.5, startFrame + FADE_DURATION],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <AbsoluteFill key={i} style={{ opacity }}>
            <Img
              src={img.src}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Dark gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "linear-gradient(to top, rgba(15,23,42,0.8), transparent)",
              }}
            />

            {/* Caption */}
            <div
              style={{
                position: "absolute",
                bottom: 60,
                left: 60,
                opacity: captionOpacity,
                transform: `translateY(${captionTranslateY}px)`,
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontFamily: "system-ui, sans-serif",
                  textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                }}
              >
                {img.caption}
              </span>
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
