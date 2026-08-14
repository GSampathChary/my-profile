"use client";

import { Text } from "@react-three/drei";

type VisitingCardProps = {
  onClick?: () => void;
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
};

export function VisitingCard({
  onClick,
  position = [-1.0, 1.35, 0.48],
  rotationY = -0.15,
  scale = 1
}: VisitingCardProps) {
  return (
    <group position={position} rotation-y={rotationY} scale={scale} onClick={onClick}>
      {/* Metallic Card Stand Base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.92, 0.03, 0.56]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Business Card Face */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.86, 0.015, 0.5]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.2} />
      </mesh>

      <Text position={[0, 0.04, 0.1]} fontSize={0.065} color="#ffffff" anchorX="center">
        GANNOJU SAMPATH CHARY
      </Text>
      <Text position={[0, 0.04, -0.04]} fontSize={0.035} color="#38bdf8" anchorX="center">
        AI & Full Stack Engineer
      </Text>

      {/* Floating Interactive Hotspot Ring */}
      <group position={[0, 0.4, 0]}>
        <mesh>
          <torusGeometry args={[0.1, 0.018, 16, 32]} />
          <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={1.5} />
        </mesh>
        <Text position={[0, 0.2, 0]} fontSize={0.09} color="#f8fafc" anchorX="center">
          🎴 GET IN TOUCH
        </Text>
      </group>
    </group>
  );
}
