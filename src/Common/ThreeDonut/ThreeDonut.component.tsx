import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, interpolate, AbsoluteFill, useVideoConfig } from "remotion";
import * as THREE from "three";

export const ThreeDonut: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const rotationX = useMemo(() => interpolate(frame, [0, 240], [0, Math.PI * 2]), [frame]);
  const rotationY = useMemo(() => interpolate(frame, [0, 240], [0, Math.PI * 3]), [frame]);

  const color = useMemo(() => {
    const hue = (frame % 120) / 120;
    return new THREE.Color().setHSL(hue, 1, 0.5);
  }, [frame]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <ThreeCanvas width={width} height={height}>
        <perspectiveCamera position={[0, 0, 5]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.6} color="#0891B2" />

        <group rotation={[rotationX, rotationY, 0]}>
          <mesh>
            <torusGeometry args={[1.5, 0.5, 16, 100]} />
            <meshStandardMaterial
              color={color}
              metalness={0.6}
              roughness={0.3}
              emissive={color}
              emissiveIntensity={0.1}
            />
          </mesh>
        </group>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
