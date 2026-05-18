import React, { useMemo } from 'react';

import { ThreeCanvas } from '@remotion/three';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  phase: number;
  color: THREE.Color;
}

export const ThreeFloatingSpheres: React.FC = () => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = [];
    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * 4;
      result.push({
        color: new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3),
        phase: Math.random() * Math.PI * 2,
        size: 0.05 + Math.random() * 0.1,
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      });
    }
    return result;
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <ThreeCanvas width={width} height={height}>
        <perspectiveCamera position={[0, 0, 6]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />

        {particles.map((p, i) => {
          const yOffset = Math.sin(frame * 0.03 + p.phase) * 0.3;
          return (
            <mesh key={i} position={[p.x, p.y + yOffset, p.z]}>
              <sphereGeometry args={[p.size, 12, 12]} />
              <meshStandardMaterial
                color={p.color}
                transparent
                opacity={0.7}
                emissive={p.color}
                emissiveIntensity={0.2}
              />
            </mesh>
          );
        })}
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
