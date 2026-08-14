"use client";

type ChairProps = {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
};

export function Chair({ position = [0, 0.08, -1.7], rotationY = Math.PI, scale = 1 }: ChairProps) {
  return (
    <group position={position} rotation-y={rotationY} scale={scale}>
      {/* Seat Cushion */}
      <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[0.92, 0.12, 0.88]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} />
      </mesh>
      {/* Seat Trim */}
      <mesh castShadow receiveShadow position={[0, 0.38, 0.42]}>
        <boxGeometry args={[0.92, 0.1, 0.04]} />
        <meshStandardMaterial color="#06b6d4" roughness={0.4} />
      </mesh>

      {/* Backrest */}
      <mesh castShadow receiveShadow position={[0, 0.95, -0.38]} rotation-x={-0.08}>
        <boxGeometry args={[0.84, 1.05, 0.12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      {/* Headrest Cushion */}
      <mesh castShadow receiveShadow position={[0, 1.54, -0.42]} rotation-x={-0.06}>
        <boxGeometry args={[0.62, 0.28, 0.14]} />
        <meshStandardMaterial color="#06b6d4" roughness={0.5} />
      </mesh>
      {/* Lumbar Cushion */}
      <mesh castShadow receiveShadow position={[0, 0.65, -0.32]}>
        <boxGeometry args={[0.68, 0.22, 0.1]} />
        <meshStandardMaterial color="#0284c7" roughness={0.6} />
      </mesh>

      {/* Left Armrest */}
      <group position={[-0.48, 0.62, -0.05]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.35, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.18, 0.05]}>
          <boxGeometry args={[0.12, 0.05, 0.48]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
      </group>

      {/* Right Armrest */}
      <group position={[0.48, 0.62, -0.05]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.35, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.18, 0.05]}>
          <boxGeometry args={[0.12, 0.05, 0.48]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
      </group>

      {/* Pneumatic Gas Lift */}
      <mesh castShadow receiveShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.36, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 5-star caster wheel base */}
      <group position={[0, 0.02, 0]}>
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 5;
          const x = Math.sin(angle) * 0.42;
          const z = Math.cos(angle) * 0.42;
          return (
            <group key={i} position={[x, 0, z]}>
              <mesh castShadow receiveShadow position={[-x * 0.5, 0.02, -z * 0.5]} rotation-y={angle}>
                <boxGeometry args={[0.06, 0.04, 0.42]} />
                <meshStandardMaterial color="#0f172a" roughness={0.6} />
              </mesh>
              <mesh castShadow receiveShadow position={[0, -0.01, 0]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshStandardMaterial color="#020617" roughness={0.9} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
