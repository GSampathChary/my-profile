"use client";

type FloorLampProps = {
  enabled?: boolean;
};

export function FloorLamp({ enabled = true }: FloorLampProps) {
  const glow = enabled ? 1.8 : 0.35;

  return (
    <group position={[3.65, 0, -3.65]}>
      <mesh castShadow receiveShadow position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.32, 0.38, 0.08, 24]} />
        <meshStandardMaterial color="#17191b" roughness={0.45} metalness={0.7} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 2.8, 12]} />
        <meshStandardMaterial color="#252729" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 2.75, 0]} rotation-z={-0.12}>
        <coneGeometry args={[0.34, 0.58, 24, 1, true]} />
        <meshStandardMaterial color="#d7a35a" roughness={0.52} side={2} />
      </mesh>
      <mesh position={[0, 2.58, 0]}>
        <sphereGeometry args={[0.1, 16, 12]} />
        <meshStandardMaterial color="#fff1c2" emissive="#ffb45c" emissiveIntensity={glow} />
      </mesh>
      <pointLight position={[0, 2.55, 0]} intensity={glow} distance={4.5} color="#ffb45c" />
    </group>
  );
}
