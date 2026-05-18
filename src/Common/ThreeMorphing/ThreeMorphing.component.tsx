import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, AbsoluteFill, useVideoConfig } from "remotion";
import * as THREE from "three";

interface ShapeDef {
  geometry: () => THREE.BufferGeometry;
  color: THREE.Color;
  position: [number, number, number];
  rotationSpeed: [number, number, number];
}

export const ThreeMorphing: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const shapes = useMemo<ShapeDef[]>(() => {
    const palette = [
      "#0891B2", "#06B6D4", "#22D3EE", "#67E8F9",
      "#A5F3FC", "#CFFAFE",
    ];

    return [
      { geometry: () => new THREE.BoxGeometry(0.8, 0.8, 0.8), color: new THREE.Color(palette[0]), position: [-3, 0, 0], rotationSpeed: [0.02, 0.03, 0] },
      { geometry: () => new THREE.SphereGeometry(0.5, 24, 24), color: new THREE.Color(palette[1]), position: [-1.8, 0, 0], rotationSpeed: [0.03, 0.01, 0] },
      { geometry: () => new THREE.TorusGeometry(0.5, 0.2, 16, 32), color: new THREE.Color(palette[2]), position: [-0.6, 0, 0], rotationSpeed: [0.01, 0.04, 0] },
      { geometry: () => new THREE.ConeGeometry(0.5, 0.8, 24), color: new THREE.Color(palette[3]), position: [0.6, 0, 0], rotationSpeed: [0.025, 0.015, 0] },
      { geometry: () => new THREE.CylinderGeometry(0.4, 0.4, 0.8, 24), color: new THREE.Color(palette[4]), position: [1.8, 0, 0], rotationSpeed: [0.015, 0.03, 0] },
      { geometry: () => new THREE.DodecahedronGeometry(0.5), color: new THREE.Color(palette[5]), position: [3, 0, 0], rotationSpeed: [0.03, 0.02, 0] },
    ];
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <ThreeCanvas width={width} height={height}>
        <perspectiveCamera position={[0, 0, 5]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, -3, -3]} intensity={0.4} color="#0891B2" />

        {shapes.map((shape, i) => {
          const rx = frame * shape.rotationSpeed[0];
          const ry = frame * shape.rotationSpeed[1];
          return (
            <group key={i} position={shape.position} rotation={[rx, ry, 0]}>
              <mesh>
                <primitive object={shape.geometry()} />
                <meshStandardMaterial
                  color={shape.color}
                  metalness={0.4}
                  roughness={0.3}
                />
              </mesh>
            </group>
          );
        })}
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
