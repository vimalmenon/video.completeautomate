import React from "react";
import { useCurrentFrame } from "remotion";

interface ZoomPulseProps {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  speed?: number;
}

export const ZoomPulse: React.FC<ZoomPulseProps> = ({
  children,
  minScale = 1,
  maxScale = 1.08,
  speed = 30,
}) => {
  const frame = useCurrentFrame();

  const scale = minScale + Math.sin((frame / speed) * Math.PI * 2) * ((maxScale - minScale) / 2);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};
