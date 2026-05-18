import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, interpolate, AbsoluteFill, useVideoConfig } from "remotion";
import * as THREE from "three";

export const ThreeGalaxy: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const rotationY = useMemo(() => interpolate(frame, [0, 600], [0, Math.PI * 0.5]), [frame]);

  const particleData = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorInside = new THREE.Color("#ffffff");
    const colorOutside = new THREE.Color(8 / 255, 145 / 255, 178 / 255);

    for (let i = 0; i < count; i++) {
      const radius = Math.pow(Math.random(), 1.5) * 5;
      const branchAngle = Math.floor(Math.random() * 4) * (Math.PI / 2);
      const randomAngleOffset = (Math.random() - 0.5) * 0.3;
      const angle = branchAngle + randomAngleOffset;

      // Logarithmic spiral
      const spiralFactor = Math.log(radius + 0.1) * 0.8;
      const finalAngle = angle + spiralFactor;

      const x = Math.cos(finalAngle) * radius;
      const z = Math.sin(finalAngle) * radius;
      const y = (Math.random() - 0.5) * 0.3 * (radius / 5);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixFactor = radius / 5;
      const c = colorInside.clone().lerp(colorOutside, mixFactor);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 0.02 + Math.random() * 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    return geometry;
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <ThreeCanvas width={width} height={height}>
        <perspectiveCamera position={[0, 1.5, 6]} />
        <ambientLight intensity={0.1} />

        <group rotation={[0.2, rotationY, 0]}>
          <points geometry={particleData}>
            <pointsMaterial
              size={0.05}
              vertexColors
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              sizeAttenuation
            />
          </points>
        </group>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
