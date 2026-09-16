"use client";

export function Floor() {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Main Bright Floor Surface */}
      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#5a3829" roughness={0.7} metalness={0.02} />
      </mesh>

      <group position={[0, 0.012, 0]}>
        {Array.from({ length: 13 }).map((_, index) => (
          <mesh key={`floor-plank-${index}`} position={[0, 0, -8.2 + index * 1.36]} receiveShadow>
            <boxGeometry args={[17.6, 0.012, 0.025]} />
            <meshStandardMaterial color="#2f1b16" roughness={0.82} />
          </mesh>
        ))}
        {Array.from({ length: 9 }).map((_, index) => (
          <mesh key={`floor-joint-${index}`} position={[-7.4 + index * 1.85, 0, 0]} receiveShadow>
            <boxGeometry args={[0.025, 0.014, 17.6]} />
            <meshStandardMaterial color="#3b231b" roughness={0.86} />
          </mesh>
        ))}
      </group>

      {/* Modern Woven Area Rug / Carpet Underneath Computer Desk */}
      <group position={[0, 0.015, 0.35]}>
        {/* Carpet Border */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5.2, 0.02, 3.4]} />
          <meshStandardMaterial color="#271814" roughness={0.78} />
        </mesh>
        {/* Inner Carpet Fabric Pattern */}
        <mesh receiveShadow position={[0, 0.015, 0]}>
          <boxGeometry args={[4.8, 0.01, 3.0]} />
          <meshStandardMaterial color="#38221b" roughness={0.95} />
        </mesh>
      </group>

      {/* Skirting / Baseboards along back and side walls */}
      <mesh position={[0, 0.15, -4.42]} castShadow receiveShadow>
        <boxGeometry args={[17.8, 0.3, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>
      <mesh position={[-8.9, 0.15, 0]} rotation-y={Math.PI / 2} castShadow receiveShadow>
        <boxGeometry args={[17.8, 0.3, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>
      <mesh position={[8.9, 0.15, 0]} rotation-y={Math.PI / 2} castShadow receiveShadow>
        <boxGeometry args={[17.8, 0.3, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>
    </group>
  );
}

