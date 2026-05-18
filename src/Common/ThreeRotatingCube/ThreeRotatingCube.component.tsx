import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, interpolate, AbsoluteFill, useVideoConfig } from "remotion";
import * as THREE from "three";

export const ThreeRotatingCube: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const rotationY = useMemo(() => interpolate(frame, [0, 120], [0, Math.PI * 4]), [frame]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <ThreeCanvas width={width} height={height}>
        <perspectiveCamera position={[0, 0, 5]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#0891B2" />

        <group rotation={[0, rotationY, 0]}>
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
              color="#0891B2"
              metalness={0.7}
              roughness={0.2}
              envMapIntensity={1}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
            <lineBasicMaterial color="#0891B2" linewidth={2} />
          </lineSegments>
        </group>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
