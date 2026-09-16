"use client";

type WallsProps = {
  lightsOn?: boolean;
  projectsMode?: boolean;
};

export function Walls({ lightsOn = true, projectsMode = false }: WallsProps) {
  const wallColor = projectsMode ? "#fafafa" : lightsOn ? "#687174" : "#292526";
  const sideWallColor = projectsMode ? "#ffffff" : lightsOn ? "#596164" : "#211e1e";
  const backGlow = lightsOn ? "#000000" : "#d9468f";
  const sideGlow = lightsOn ? "#000000" : "#facc15";
  const glowIntensity = lightsOn ? 0 : 0.5;

  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 2.8, -4.5]} castShadow receiveShadow>
        <boxGeometry args={[18, 5.6, 0.2]} />
        <meshStandardMaterial
          color={wallColor}
          roughness={0.76}
          emissive={backGlow}
          emissiveIntensity={glowIntensity}
        />
      </mesh>

      {/* Left wall */}
      <mesh position={[-8.9, 2.8, 0]} castShadow receiveShadow rotation-y={Math.PI / 2}>
        <boxGeometry args={[18, 5.6, 0.2]} />
        <meshStandardMaterial
          color={sideWallColor}
          roughness={0.76}
          emissive={sideGlow}
          emissiveIntensity={glowIntensity}
        />
      </mesh>

      {/* Right wall */}
      <mesh position={[8.9, 2.8, 0]} castShadow receiveShadow rotation-y={Math.PI / 2}>
        <boxGeometry args={[18, 5.6, 0.2]} />
        <meshStandardMaterial
          color={sideWallColor}
          roughness={0.76}
          emissive={sideGlow}
          emissiveIntensity={glowIntensity}
        />
      </mesh>

      <group>
        <mesh position={[0, 0.12, -4.36]}>
          <boxGeometry args={[17.8, 0.22, 0.08]} />
          <meshStandardMaterial color="#3f4547" roughness={0.86} />
        </mesh>
        <mesh position={[0, 5.35, -4.36]}>
          <boxGeometry args={[17.8, 0.08, 0.06]} />
          <meshStandardMaterial color={lightsOn ? "#8f999b" : "#4b4140"} roughness={0.9} />
        </mesh>
      </group>

      {!lightsOn && !projectsMode ? (
        <>
          <pointLight position={[-3.8, 2.7, -3.7]} intensity={2.1} distance={5.5} color="#ec4899" />
          <pointLight position={[3.8, 2.3, -3.4]} intensity={1.8} distance={5.5} color="#facc15" />
          <pointLight position={[0, 4.6, -2.7]} intensity={1.1} distance={4.5} color="#f472b6" />
        </>
      ) : null}

      {!projectsMode ? (
        <group position={[8.78, 3.2, 0]} rotation-y={-Math.PI / 2}>
          {/* Frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.6, 2.6, 0.14]} />
            <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0, 0.02]}>
            <boxGeometry args={[3.4, 2.4, 0.08]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[3.18, 2.18]} />
            <meshStandardMaterial
              color={lightsOn ? "#bfe8ff" : "#1c2453"}
              emissive={lightsOn ? "#8bbcf5" : "#312e81"}
              emissiveIntensity={lightsOn ? 0.8 : 0.4}
              roughness={0.08}
              metalness={0.08}
              transparent
              opacity={0.94}
            />
          </mesh>
          <mesh position={[-0.01, 0, 0.05]}>
            <boxGeometry args={[0.06, 2.2, 0.02]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[3.2, 0.06, 0.02]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>

          {/* Distant skyline silhouette for a more realistic window */}
          <mesh position={[0, -0.42, 0.06]}>
            <boxGeometry args={[3.12, 0.7, 0.01]} />
            <meshStandardMaterial color="#0f172a" transparent opacity={0.28} />
          </mesh>
          <mesh position={[-0.85, -0.15, 0.07]}>
            <boxGeometry args={[0.4, 1.0, 0.01]} />
            <meshStandardMaterial color="#1e293b" transparent opacity={0.2} />
          </mesh>
          <mesh position={[0.1, -0.05, 0.07]}>
            <boxGeometry args={[0.55, 1.2, 0.01]} />
            <meshStandardMaterial color="#0f172a" transparent opacity={0.22} />
          </mesh>
          <mesh position={[1.0, -0.2, 0.07]}>
            <boxGeometry args={[0.48, 0.9, 0.01]} />
            <meshStandardMaterial color="#111827" transparent opacity={0.2} />
          </mesh>
        </group>
      ) : null}
    </group>
  );
}
