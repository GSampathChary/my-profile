"use client";

import { Text } from "@react-three/drei";

type RaiseDeviceProps = {
  onClick?: () => void;
};

export function RaiseDevice({ onClick }: RaiseDeviceProps) {
  return (
    <group position={[1.65, 0.96, 0.35]} rotation-y={-0.2} onClick={onClick}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.05, 1.2]} />
        <meshStandardMaterial color="#1d2638" roughness={0.35} metalness={0.45} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.03, 0]}>
        <boxGeometry args={[0.8, 0.02, 1.1]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 0.05, 0.42]}>
        <planeGeometry args={[0.7, 0.42]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.16} />
      </mesh>
      <Text position={[0, 0.14, 0.46]} fontSize={0.1} color="#e0f2fe" anchorX="center">
        RAISE
      </Text>
      <Text position={[0, 0.28, 0.46]} fontSize={0.05} color="#bfdbfe" anchorX="center">
        Rice AI Stress Evaluator
      </Text>
    </group>
  );
}
