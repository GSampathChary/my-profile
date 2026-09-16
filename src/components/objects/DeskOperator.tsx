"use client";

import { useLoader } from "@react-three/fiber";
import { SRGBColorSpace, TextureLoader } from "three";

type DeskOperatorProps = {
  position?: [number, number, number];
};

export function DeskOperator({ position = [0, 0, -2.25] }: DeskOperatorProps) {
  const faceTexture = useLoader(TextureLoader, "/images/sampath.png");
  faceTexture.colorSpace = SRGBColorSpace;

  return (
    <group position={position}>
      {/* Seated torso and collar */}
      <mesh castShadow receiveShadow position={[0, 1.08, 0]}>
        <boxGeometry args={[0.72, 0.9, 0.42]} />
        <meshStandardMaterial color="#0f3b57" roughness={0.62} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.57, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.18, 16]} />
        <meshStandardMaterial color="#d49a78" roughness={0.72} />
      </mesh>

      {/* Head with a visible face portrait */}
      <mesh castShadow receiveShadow position={[0, 1.92, 0]} scale={[0.31, 0.38, 0.3]}>
        <sphereGeometry args={[1, 24, 20]} />
        <meshStandardMaterial color="#c98263" roughness={0.65} />
      </mesh>
      <mesh position={[0, 1.94, 0.292]}>
        <planeGeometry args={[0.38, 0.46]} />
        <meshBasicMaterial map={faceTexture} toneMapped={false} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 2.27, 0]} scale={[0.32, 0.14, 0.3]}>
        <sphereGeometry args={[1, 20, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.72} />
      </mesh>

      {/* Arms angled forward toward the keyboard */}
      <group position={[-0.32, 1.35, -0.05]} rotation-x={-0.72} rotation-z={-0.2}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.095, 0.11, 0.58, 14]} />
          <meshStandardMaterial color="#164e63" roughness={0.68} />
        </mesh>
      </group>
      <group position={[0.32, 1.35, -0.05]} rotation-x={-0.72} rotation-z={0.2}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.095, 0.11, 0.58, 14]} />
          <meshStandardMaterial color="#164e63" roughness={0.68} />
        </mesh>
      </group>
      <mesh castShadow receiveShadow position={[-0.35, 1.04, -0.48]}>
        <sphereGeometry args={[0.105, 14, 12]} />
        <meshStandardMaterial color="#d49a78" roughness={0.72} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.35, 1.04, -0.48]}>
        <sphereGeometry args={[0.105, 14, 12]} />
        <meshStandardMaterial color="#d49a78" roughness={0.72} />
      </mesh>

      {/* Legs tucked under the desk */}
      <group position={[-0.2, 0.5, -0.08]} rotation-x={-0.28}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.15, 0.75, 14]} />
          <meshStandardMaterial color="#172554" roughness={0.76} />
        </mesh>
      </group>
      <group position={[0.2, 0.5, -0.08]} rotation-x={-0.28}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.15, 0.75, 14]} />
          <meshStandardMaterial color="#172554" roughness={0.76} />
        </mesh>
      </group>
    </group>
  );
}
