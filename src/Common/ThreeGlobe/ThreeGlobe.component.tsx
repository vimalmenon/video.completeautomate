import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, interpolate, AbsoluteFill, useVideoConfig } from "remotion";
import * as THREE from "three";

export const ThreeGlobe: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const rotationY = useMemo(() => interpolate(frame, [0, 240], [0, Math.PI * 2]), [frame]);

  // Generate lat/lon ring geometry
  const ringPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];

    // Equator
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * 2, 0, Math.sin(theta) * 2));
    }

    // Meridians
    const meridianCount = 12;
    for (let m = 0; m < meridianCount; m++) {
      const lon = (m / meridianCount) * Math.PI * 2;
      for (let i = 0; i <= 64; i++) {
        const lat = (i / 64) * Math.PI - Math.PI / 2;
        points.push(
          new THREE.Vector3(
            Math.cos(lat) * Math.cos(lon) * 2,
            Math.sin(lat) * 2,
            Math.cos(lat) * Math.sin(lon) * 2
          )
        );
      }
    }

    // Lat circles
    const latCircleCount = 5;
    for (let l = 1; l < latCircleCount; l++) {
      const lat = (l / latCircleCount) * Math.PI - Math.PI / 2;
      const y = Math.sin(lat) * 2;
      const r = Math.cos(lat) * 2;
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
      }
    }

    return points;
  }, []);

  // Build lat/lon lines as a single BufferGeometry
  const ringGeometry = useMemo(() => {
    const positions = new Float32Array(ringPoints.length * 3);
    ringPoints.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [ringPoints]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <ThreeCanvas width={width} height={height}>
        <perspectiveCamera position={[0, 0, 6]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#0891B2" />

        <group rotation={[0, rotationY, 0]}>
          {/* Wireframe sphere */}
          <lineSegments>
            <edgesGeometry args={[new THREE.SphereGeometry(2, 32, 32)]} />
            <lineBasicMaterial color="#0891B2" opacity={0.5} transparent />
          </lineSegments>

          {/* Sphere surface - semi-transparent */}
          <mesh>
            <sphereGeometry args={[2, 32, 32]} />
            <meshPhongMaterial
              color="#0891B2"
              transparent
              opacity={0.08}
              wireframe={false}
            />
          </mesh>

          {/* Lat/Lon rings */}
          <lineSegments geometry={ringGeometry}>
            <lineBasicMaterial color="#0891B2" opacity={0.3} transparent />
          </lineSegments>
        </group>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
