import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, interpolate, AbsoluteFill, useVideoConfig } from "remotion";
import * as THREE from "three";

interface ShapeConfig {
  geometry: () => THREE.BufferGeometry;
  color: string;
  phase: number;
}

export const ThreeShapes: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const groupRotation = useMemo(() => interpolate(frame, [0, 300], [0, Math.PI * 2]), [frame]);

  const shapes = useMemo<ShapeConfig[]>(() => {
    const palette = ["#0891B2", "#F472B6", "#A78BFA", "#34D399", "#FBBF24", "#F87171"];
    return [
      { geometry: () => new THREE.BoxGeometry(0.5, 0.5, 0.5), color: palette[0], phase: 0 },
      { geometry: () => new THREE.SphereGeometry(0.35, 20, 20), color: palette[1], phase: Math.PI / 3 },
      { geometry: () => new THREE.ConeGeometry(0.35, 0.6, 20), color: palette[2], phase: (2 * Math.PI) / 3 },
      { geometry: () => new THREE.CylinderGeometry(0.3, 0.3, 0.6, 20), color: palette[3], phase: Math.PI },
      { geometry: () => new THREE.TorusGeometry(0.35, 0.12, 12, 24), color: palette[4], phase: (4 * Math.PI) / 3 },
      { geometry: () => new THREE.IcosahedronGeometry(0.35), color: palette[5], phase: (5 * Math.PI) / 3 },
    ];
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <ThreeCanvas width={width} height={height}>
        <perspectiveCamera position={[0, 0, 5]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-3, -3, -3]} intensity={0.5} color="#0891B2" />

        <group rotation={[0.3, groupRotation, 0]}>
          {shapes.map((shape, i) => {
            const angle = (i / shapes.length) * Math.PI * 2;
            const radius = 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const yOffset = Math.sin(frame * 0.05 + shape.phase) * 0.4;

            return (
              <group key={i} position={[x, yOffset, z]}>
                <mesh>
                  <primitive object={shape.geometry()} />
                  <meshStandardMaterial
                    color={shape.color}
                    metalness={0.4}
                    roughness={0.3}
                    emissive={shape.color}
                    emissiveIntensity={0.1}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
