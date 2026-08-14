"use client";

export function Ceiling() {
  return (
    <mesh position={[0, 5, 0]} receiveShadow>
      <boxGeometry args={[18, 0.2, 18]} />
      <meshStandardMaterial color="#f8fafc" roughness={1} />
    </mesh>
  );
}
