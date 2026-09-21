"use client";

type FloorLampProps = {
  enabled?: boolean;
};

export function FloorLamp({ enabled = true }: FloorLampProps) {
  const glow = enabled ? 2.4 : 0.2;

  return (
    <group position={[3.38, 1.33, -3.62]} rotation-y={-0.14}>
      {/* Lamp stays beyond the tower's right edge so the RGB case is fully visible. */}
      <mesh castShadow receiveShadow position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.22, 0.25, 0.07, 24]} />
        <meshStandardMaterial color="#17191b" roughness={0.45} metalness={0.7} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.12, 0.48, 0]} rotation-z={-0.28}>
        <cylinderGeometry args={[0.026, 0.026, 0.94, 12]} />
        <meshStandardMaterial color="#252729" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.42, 0.9, 0]} rotation-z={1.02}>
        <cylinderGeometry args={[0.026, 0.026, 0.82, 12]} />
        <meshStandardMaterial color="#252729" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.52, 1.22, 0]} rotation-z={-0.9}>
        <coneGeometry args={[0.26, 0.38, 24, 1, true]} />
        <meshStandardMaterial color="#101318" roughness={0.34} metalness={0.78} side={2} />
      </mesh>
      <mesh position={[-0.58, 1.19, 0]}>
        <sphereGeometry args={[0.09, 16, 12]} />
        <meshStandardMaterial color="#fff4c7" emissive="#ffb45c" emissiveIntensity={glow} />
      </mesh>
      <pointLight position={[-0.62, 1.12, 0.14]} intensity={glow} distance={3.7} color="#ffb45c" />
    </group>
  );
}
