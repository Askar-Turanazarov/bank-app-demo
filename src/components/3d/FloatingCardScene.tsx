import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import type { Mesh } from 'three';

function FloatingCard() {
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.15;
    }
  });

  return (
    <RoundedBox ref={ref} args={[3.2, 2, 0.08]} radius={0.12} smoothness={4}>
      <meshStandardMaterial
        color="#3d1a78"
        metalness={0.6}
        roughness={0.3}
        emissive="#7c3aed"
        emissiveIntensity={0.2}
      />
    </RoundedBox>
  );
}

export function FloatingCardScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop="always"
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#7c3aed" />
      <pointLight position={[-3, -2, 4]} intensity={0.5} color="#00C853" />
      <FloatingCard />
    </Canvas>
  );
}
