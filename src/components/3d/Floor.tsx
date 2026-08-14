"use client";

export function Floor() {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Main Bright Floor Surface */}
      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Modern Woven Area Rug / Carpet Underneath Computer Desk */}
      <group position={[0, 0.015, 0.35]}>
        {/* Carpet Border */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5.2, 0.02, 3.4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
        {/* Inner Carpet Fabric Pattern */}
        <mesh receiveShadow position={[0, 0.015, 0]}>
          <boxGeometry args={[4.8, 0.01, 3.0]} />
          <meshStandardMaterial color="#334155" roughness={0.95} />
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


