'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

export interface Cluster {
  label: string;
  color: string;
  center: [number, number, number];
  count: number;
  spread: number;
}

export const CLUSTERS: Cluster[] = [
  { label: 'CHEST PAIN', color: '#ea3943', center: [2.4, 0.8, 0], count: 320, spread: 0.9 },
  { label: 'SEPSIS', color: '#ffb000', center: [-2.2, 1.1, 0.6], count: 300, spread: 0.85 },
  { label: 'STROKE', color: '#2dd4bf', center: [0.2, -2.0, -0.8], count: 280, spread: 0.8 },
  { label: 'RESP. DISTRESS', color: '#16c784', center: [-1.6, -1.2, 1.6], count: 260, spread: 0.75 },
  { label: 'TRAUMA', color: '#7e8ca0', center: [1.8, -0.6, 1.8], count: 240, spread: 0.95 },
];

// Simple seeded PRNG (mulberry32) — stable point positions, no Math.random in render.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function PointsCloud() {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(42);
    const total = CLUSTERS.reduce((a, c) => a + c.count, 0);
    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    let i = 0;
    for (const cluster of CLUSTERS) {
      const c = new THREE.Color(cluster.color);
      for (let n = 0; n < cluster.count; n += 1) {
        // gaussian-ish via sum of uniforms
        const gx = (rand() + rand() + rand() - 1.5) * cluster.spread;
        const gy = (rand() + rand() + rand() - 1.5) * cluster.spread;
        const gz = (rand() + rand() + rand() - 1.5) * cluster.spread;
        pos[i * 3] = cluster.center[0] + gx;
        pos[i * 3 + 1] = cluster.center[1] + gy;
        pos[i * 3 + 2] = cluster.center[2] + gz;
        const shade = 0.6 + rand() * 0.4;
        col[i * 3] = c.r * shade;
        col[i * 3 + 1] = c.g * shade;
        col[i * 3 + 2] = c.b * shade;
        i += 1;
      }
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Labels() {
  return (
    <>
      {CLUSTERS.map((c) => (
        <Html key={c.label} position={c.center} center distanceFactor={10} zIndexRange={[10, 0]}>
          <div
            className="pointer-events-none whitespace-nowrap border px-1.5 py-0.5 font-mono text-[9px] tracking-wider"
            style={{ color: c.color, borderColor: c.color, background: 'rgba(8,11,17,0.7)' }}
          >
            {c.label}
          </div>
        </Html>
      ))}
    </>
  );
}

export default function PointCloud() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <PointsCloud />
      <Labels />
      <OrbitControls enablePan={false} enableZoom autoRotate={false} minDistance={4} maxDistance={14} />
    </Canvas>
  );
}
