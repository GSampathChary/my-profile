"use client";

type LampProps = {
  onToggle?: () => void;
  enabled?: boolean;
};

export function Lamp({ onToggle, enabled = true }: LampProps) {
  return (
    <group position={[3.82, 2.58, -4.36]} onClick={onToggle}>
      {/* Subtle wall shadow so the switch feels mounted instead of floating */}
      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[0.44, 0.64, 0.02]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.18} />
      </mesh>

      {/* Wall plate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.58, 0.05]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.32} metalness={0.06} />
      </mesh>

      {/* Top screw */}
      <mesh position={[0, 0.19, 0.03]} castShadow>
        <cylinderGeometry args={[0.016, 0.016, 0.012, 18]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Bottom screw */}
      <mesh position={[0, -0.19, 0.03]} castShadow>
        <cylinderGeometry args={[0.016, 0.016, 0.012, 18]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Rocker switch */}
      <mesh position={[0, 0, 0.036]} castShadow receiveShadow rotation-x={enabled ? -0.14 : 0.14}>
        <boxGeometry args={[0.16, 0.28, 0.05]} />
        <meshStandardMaterial color="#dbe4ee" roughness={0.18} metalness={0.05} />
      </mesh>

      {/* Pressed side / highlight */}
      <mesh position={[0, enabled ? 0.055 : -0.055, 0.058]} castShadow>
        <boxGeometry args={[0.1, 0.08, 0.012]} />
        <meshStandardMaterial color="#ffffff" roughness={0.12} />
      </mesh>

      {/* Tiny indicator strip */}
      <mesh position={[0.058, 0, 0.058]}>
        <boxGeometry args={[0.014, 0.2, 0.008]} />
        <meshStandardMaterial
          color={enabled ? "#38bdf8" : "#94a3b8"}
          emissive={enabled ? "#38bdf8" : "#000000"}
          emissiveIntensity={enabled ? 0.65 : 0}
        />
      </mesh>
    </group>
  );
}
