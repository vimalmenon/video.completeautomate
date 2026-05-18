import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, interpolate, AbsoluteFill, useVideoConfig } from "remotion";
import * as THREE from "three";

export const ThreeTorusKnot: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const rotationX = useMemo(() => interpolate(frame, [0, 120], [0, Math.PI * 3]), [frame]);
  const rotationY = useMemo(() => interpolate(frame, [0, 120], [0, Math.PI * 5]), [frame]);

  const color = useMemo(() => {
    const t = (frame % 120) / 120;
    return new THREE.Color().setHSL(0.55 + t * 0.15, 1, 0.5);
  }, [frame]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <ThreeCanvas width={width} height={height}>
        <perspectiveCamera position={[0, 0, 5]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#0891B2" />

        <group rotation={[rotationX, rotationY, 0]}>
          <mesh>
            <torusKnotGeometry args={[1, 0.3, 100, 16]} />
            <meshPhongMaterial
              color={color}
              shininess={80}
              specular={new THREE.Color("#0891B2")}
            />
          </mesh>
        </group>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
