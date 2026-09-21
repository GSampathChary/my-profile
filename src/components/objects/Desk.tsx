"use client";

type DeskProps = {
  position?: [number, number, number];
};

export function Desk({ position = [0, 1.22, 0.42] }: DeskProps) {
  return (
    <group position={position}>
      {/* Warm wood desk top */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[7.4, 0.12, 2.35]} />
        <meshStandardMaterial color="#633d2c" roughness={0.52} metalness={0.02} />
      </mesh>

      {/* Splayed A-frame legs give the desk the sturdy studio-workbench silhouette. */}
      {[-3.25, 3.25].flatMap((x) => [-0.72, 0.72].map((z) => (
        <mesh key={`${x}-${z}`} castShadow receiveShadow position={[x, -0.62, z]} rotation-z={x < 0 ? (z < 0 ? -0.19 : 0.19) : (z < 0 ? 0.19 : -0.19)}>
          <boxGeometry args={[0.12, 1.22, 0.12]} />
          <meshStandardMaterial color="#111318" roughness={0.5} metalness={0.8} />
        </mesh>
      )))}
      {[-3.25, 3.25].map((x) => (
        <mesh key={`brace-${x}`} castShadow receiveShadow position={[x, -0.24, 0]} rotation-x={Math.PI / 2}>
          <boxGeometry args={[0.16, 1.58, 0.08]} />
          <meshStandardMaterial color="#111318" roughness={0.5} metalness={0.8} />
        </mesh>
      ))}

      {/* Closed Book on the desk */}
      <group position={[-1.8, 0.045, -0.12]} rotation={[-0.03, 0.14, 0.04]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.92, 0.08, 0.62]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.25} />
        </mesh>
        <mesh castShadow receiveShadow position={[-0.35, 0.025, 0]}>
          <boxGeometry args={[0.08, 0.11, 0.62]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
        <mesh position={[0.14, 0.065, 0.18]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.02, 0.12]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} />
        </mesh>
      </group>

      {/* Main Keyboard centered in front of monitor */}
      <group position={[-0.1, 0.03, 0.5]} rotation={[0, 0.05, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.12, 0.045, 0.34]} />
          <meshStandardMaterial color="#0b1220" roughness={0.42} metalness={0.12} />
        </mesh>
        <mesh position={[0, 0.016, 0]}>
          <boxGeometry args={[1.02, 0.02, 0.26]} />
          <meshStandardMaterial color="#111827" roughness={0.28} />
        </mesh>
        {[
          { z: -0.075, count: 14, width: 0.042, gap: 0.006, x: -0.34, color: "#e2e8f0" },
          { z: 0, count: 13, width: 0.04, gap: 0.006, x: -0.315, color: "#cbd5e1" },
          { z: 0.075, count: 12, width: 0.043, gap: 0.007, x: -0.29, color: "#e2e8f0" }
        ].map((row) =>
          Array.from({ length: row.count }).map((_, index) => {
            const total = row.count * row.width + (row.count - 1) * row.gap;
            const start = row.x + total / -2;
            return (
              <mesh
                key={`${row.z}-${index}`}
                castShadow
                receiveShadow
                position={[start + index * (row.width + row.gap) + row.width / 2, 0.028, row.z]}
              >
                <boxGeometry args={[row.width, 0.022, 0.05]} />
                <meshStandardMaterial color={row.color} roughness={0.26} metalness={0.06} />
              </mesh>
            );
          })
        )}
        <mesh castShadow receiveShadow position={[0.31, 0.028, 0.11]}>
          <boxGeometry args={[0.2, 0.016, 0.055]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.28} />
        </mesh>
      </group>

      {/* Mouse and mouse pad */}
      <group position={[1.04, 0.025, 0.47]} rotation={[0, -0.12, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.005, 0]}>
          <cylinderGeometry args={[0.2, 0.22, 0.04, 24]} />
          <meshStandardMaterial color="#0f172a" roughness={0.34} metalness={0.08} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.02, -0.005]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.18, 24, 18]} />
          <meshStandardMaterial color="#111827" roughness={0.28} metalness={0.08} />
        </mesh>
        <mesh position={[0, 0.1, -0.01]}>
          <cylinderGeometry args={[0.012, 0.012, 0.1, 12]} />
          <meshStandardMaterial color="#334155" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.13, -0.02]}>
          <sphereGeometry args={[0.014, 10, 10]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.2} />
        </mesh>
      </group>

      {/* Rubik-style cube */}
      <group castShadow receiveShadow position={[0.66, 0.11, 0.22]} rotation={[0.22, 0.35, 0.18]}>
        <mesh>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#111827" roughness={0.56} />
        </mesh>
        {[
          { pos: [0, 0.092, 0], rot: [0, 0, 0], color: "#fef08a" },
          { pos: [0, -0.092, 0], rot: [0, Math.PI, 0], color: "#f8fafc" },
          { pos: [0, 0, 0.092], rot: [-Math.PI / 2, 0, 0], color: "#22c55e" },
          { pos: [0, 0, -0.092], rot: [Math.PI / 2, 0, 0], color: "#3b82f6" },
          { pos: [0.092, 0, 0], rot: [0, Math.PI / 2, 0], color: "#ef4444" },
          { pos: [-0.092, 0, 0], rot: [0, -Math.PI / 2, 0], color: "#f97316" }
        ].map((face) => (
          <group key={face.color} position={face.pos as [number, number, number]} rotation={face.rot as [number, number, number]}>
            <mesh>
              <planeGeometry args={[0.154, 0.154]} />
              <meshStandardMaterial color={face.color} roughness={0.24} />
            </mesh>
            {[-0.05, 0, 0.05].map((x) =>
              [-0.05, 0, 0.05].map((y) => (
                <mesh key={`${face.color}-${x}-${y}`} position={[x, y, 0.001]}>
                  <boxGeometry args={[0.036, 0.036, 0.01]} />
                  <meshStandardMaterial color="#0f172a" roughness={0.2} />
                </mesh>
              ))
            )}
          </group>
        ))}
      </group>

      {/* Coffee Mug */}
      <group position={[1.66, 0.08, 0.4]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.14, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.18} />
        </mesh>
        <mesh position={[0.08, 0.0, 0]}>
          <torusGeometry args={[0.045, 0.012, 10, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.18} />
        </mesh>
      </group>

      {/* Potted Plant Beside Desk on the floor */}
      <group position={[-3.25, -1.22, 0.82]} scale={[0.48, 0.48, 0.48]}>
        <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.38, 0.28, 0.55, 20]} />
          <meshStandardMaterial color="#d97706" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.04, 20]} />
          <meshStandardMaterial color="#451a03" roughness={0.9} />
        </mesh>
        {[-0.35, 0, 0.35].map((xOff, i) => (
          <mesh
            key={i}
            castShadow
            receiveShadow
            position={[xOff, 0.85 + (i % 2) * 0.12, (i % 2 === 0 ? -0.2 : 0.2)]}
            rotation={[0.3 - i * 0.2, 0, (i - 1) * 0.4]}
          >
            <sphereGeometry args={[0.38, 16, 16]} scale={[1.3, 0.08, 0.55]} />
            <meshStandardMaterial color="#22c55e" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
