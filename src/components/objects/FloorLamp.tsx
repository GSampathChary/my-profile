"use client";

type FloorLampProps = {
  enabled?: boolean;
  onToggle?: () => void;
};

export function FloorLamp({ enabled = true, onToggle }: FloorLampProps) {
  const glow = enabled ? 2.8 : 0.05;

  return (
    <group position={[-3.62, 0, -2.06]} rotation-y={0.24} onClick={onToggle}>
      {/* A freestanding lamp at the front-left desk corner, clearly inside the room composition. */}
      <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.3, 0.36, 0.12, 28]} />
        <meshStandardMaterial color="#17191b" roughness={0.45} metalness={0.7} />
      </mesh>
      {/* Clickable illuminated rocker at the base. */}
      <mesh position={[0, 0.13, 0.27]} castShadow>
        <boxGeometry args={[0.12, 0.06, 0.025]} />
        <meshStandardMaterial color={enabled ? "#fef3c7" : "#334155"} emissive={enabled ? "#f59e0b" : "#000000"} emissiveIntensity={enabled ? 1.8 : 0} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.05, 0.84, 0]} rotation-z={-0.08}>
        <cylinderGeometry args={[0.032, 0.032, 1.55, 14]} />
        <meshStandardMaterial color="#252729" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.2, 1.58, 0]} rotation-z={0.82}>
        <cylinderGeometry args={[0.028, 0.028, 0.84, 14]} />
        <meshStandardMaterial color="#252729" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.52, 1.88, 0]} rotation-z={-0.82}>
        <coneGeometry args={[0.31, 0.44, 28, 1, true]} />
        <meshStandardMaterial color="#101318" roughness={0.34} metalness={0.78} side={2} />
      </mesh>
      <mesh position={[-0.57, 1.84, 0]}>
        <sphereGeometry args={[0.12, 16, 12]} />
        <meshStandardMaterial color="#fff4c7" emissive="#ffb45c" emissiveIntensity={glow} />
      </mesh>
      <pointLight position={[-0.62, 1.75, 0.16]} intensity={glow} distance={5} color="#ffb45c" castShadow />
    </group>
  );
}
