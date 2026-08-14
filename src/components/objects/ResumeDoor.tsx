"use client";

import { Text } from "@react-three/drei";

type DoorProps = {
  label: string;
  position: [number, number, number];
  onClick?: () => void;
  accent?: string;
  open?: boolean;
};

function Door({ label, position, accent = "#f5c26b", onClick, open = false }: DoorProps) {
  return (
    <group position={position} onClick={onClick}>
      <group position={[-0.6, 0, 0]} rotation-y={open ? -1.08 : 0}>
        <mesh castShadow receiveShadow position={[0.6, 0, 0]}>
          <boxGeometry args={[1.2, 2.5, 0.12]} />
          <meshStandardMaterial color={open ? "#2c3b5e" : "#1f2940"} roughness={0.8} />
        </mesh>
        <mesh position={[0.6, 0, 0.08]} castShadow receiveShadow>
          <boxGeometry args={[1.08, 2.3, 0.02]} />
          <meshStandardMaterial color="#101827" roughness={0.4} />
        </mesh>
        <mesh position={[1.05, 0, 0.12]} castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.24, 16]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} />
        </mesh>
        <Text position={[0.6, 1.05, 0.12]} fontSize={0.12} color="#f8fafc" anchorX="center">
          {label}
        </Text>
      </group>
    </group>
  );
}

export function ResumeDoor(props: Omit<DoorProps, "label">) {
  return <Door label="RESUME" {...props} />;
}
