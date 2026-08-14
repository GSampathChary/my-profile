"use client";

type BookId = "python" | "fastapi" | "tensorflow" | "flutter" | "springboot" | "postgres";

type BookshelfProps = {
  onBookSelect?: (book: BookId) => void;
  active?: boolean;
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
};

const books: Array<{ id: BookId; color: string; accent: string; x: number; height: number }> = [
  { id: "python", color: "#5c8cff", accent: "#dbeafe", x: -0.85, height: 0.94 },
  { id: "fastapi", color: "#2dd4bf", accent: "#ccfbf1", x: -0.52, height: 0.88 },
  { id: "tensorflow", color: "#f472b6", accent: "#fce7f3", x: -0.19, height: 0.92 },
  { id: "flutter", color: "#38bdf8", accent: "#e0f2fe", x: 0.14, height: 0.9 },
  { id: "springboot", color: "#a78bfa", accent: "#ede9fe", x: 0.47, height: 0.87 },
  { id: "postgres", color: "#f59e0b", accent: "#fef3c7", x: 0.8, height: 0.96 }
];

export function Bookshelf({
  onBookSelect,
  active = false,
  position = [-4.95, 1.6, -3.72],
  rotationY = 0.04,
  scale = 1
}: BookshelfProps) {
  return (
    <group position={position} rotation-y={rotationY} scale={scale}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 3.35, 0.34]} />
        <meshStandardMaterial color={active ? "#322821" : "#1e1915"} roughness={0.82} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 0.98, 0.18]}>
        <boxGeometry args={[2.32, 0.08, 0.22]} />
        <meshStandardMaterial color="#443428" roughness={0.7} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.08, 0.18]}>
        <boxGeometry args={[2.32, 0.08, 0.22]} />
        <meshStandardMaterial color="#443428" roughness={0.7} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -1.15, 0.18]}>
        <boxGeometry args={[2.32, 0.08, 0.22]} />
        <meshStandardMaterial color="#443428" roughness={0.7} />
      </mesh>

      <group position={[-0.7, 1.25, 0.2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.14, 0.3, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color="#22c55e" roughness={0.8} />
        </mesh>
      </group>

      <group position={[0.7, 1.25, 0.2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.16, 0.12, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <octahedronGeometry args={[0.15]} />
          <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.1} emissive="#eab308" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {books.map((book, index) => (
        <group
          key={book.id}
          position={[book.x, -0.65, 0.2]}
          scale={active ? 1.05 : 1}
          onClick={(event) => {
            event.stopPropagation();
            onBookSelect?.(book.id);
          }}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.26, book.height, 0.22]} />
            <meshStandardMaterial
              color={book.color}
              roughness={0.58}
              emissive={active ? book.color : "#000000"}
              emissiveIntensity={active ? 0.12 : 0}
            />
          </mesh>

          {/* Decorative spine strip instead of readable labels */}
          <mesh position={[-0.06, 0, 0.116]} castShadow>
            <boxGeometry args={[0.04, book.height * 0.82, 0.016]} />
            <meshStandardMaterial color={book.accent} roughness={0.28} metalness={0.05} />
          </mesh>

          {/* Subtle top and bottom page edges for realism */}
          <mesh position={[0.01, book.height * 0.43, 0.1]} castShadow>
            <boxGeometry args={[0.18, 0.02, 0.03]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.25} />
          </mesh>
          <mesh position={[0.01, -book.height * 0.43, 0.1]} castShadow>
            <boxGeometry args={[0.18, 0.02, 0.03]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.25} />
          </mesh>

          {/* No visible text, just a refined embossed band */}
          <mesh position={[0.03, 0, 0.124]}>
            <boxGeometry args={[0.12, book.height * 0.46, 0.012]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.16} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
