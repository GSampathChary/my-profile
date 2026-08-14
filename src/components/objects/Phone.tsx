"use client";

import { useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GitFork, Link2, Mail } from "lucide-react";
import type { Group } from "three";
import { socialLinks } from "@/lib/projectLinks";

type PhoneProps = {
  onClick?: () => void;
  active?: boolean;
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
};

export function Phone({
  onClick,
  active = false,
  position = [1.02, 1.33, -3.02],
  rotationY = -0.18,
  scale = 1.02
}: PhoneProps) {
  const phoneRef = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!phoneRef.current) return;

    const bob = Math.sin(t * 2.1) * (active ? 0.015 : 0.008);
    const tilt = Math.sin(t * 1.4) * (active ? 0.06 : 0.03);

    phoneRef.current.position.y = bob;
    phoneRef.current.rotation.z = tilt;
  });

  return (
    <group position={position} rotation-y={rotationY} scale={scale} onClick={onClick}>
      <group ref={phoneRef}>
        {/* Original upright smartphone body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.23, 0.05, 0.48]} />
          <meshStandardMaterial color="#0b1220" roughness={0.34} metalness={0.62} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.01, 0]}>
          <boxGeometry args={[0.19, 0.02, 0.42]} />
          <meshStandardMaterial
            color={active ? "#0f172a" : "#020617"}
            emissive={active ? "#8b5cf6" : "#000000"}
            emissiveIntensity={active ? 0.34 : 0.08}
            roughness={0.22}
          />
        </mesh>
        <mesh position={[0, 0.135, 0.21]}>
          <boxGeometry args={[0.05, 0.01, 0.03]} />
          <meshStandardMaterial color="#111827" roughness={0.2} />
        </mesh>
        <mesh position={[-0.105, 0.0, 0.08]}>
          <boxGeometry args={[0.012, 0.05, 0.11]} />
          <meshStandardMaterial color="#1f2937" roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.022, 0.205]}>
          <boxGeometry args={[0.07, 0.006, 0.01]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.15} />
        </mesh>
        <mesh position={[0.02, -0.008, 0.202]}>
          <boxGeometry args={[0.028, 0.008, 0.014]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.18} />
        </mesh>
      </group>
      {active ? (
        <Html transform occlude position={[0, 0.035, 0.001]} distanceFactor={2.8} style={{ width: "180px" }}>
          <div className="rounded-[26px] border border-white/10 bg-slate-950/90 p-3 text-slate-100 shadow-2xl shadow-black/50">
            <div className="rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(34,211,238,0.16),rgba(15,23,42,0.96))] p-3">
              <div className="text-center text-[10px] uppercase tracking-[0.45em] text-cyan-100/70">Connect</div>
              <div className="mt-3 grid gap-2">
                <a
                  href={socialLinks.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs transition hover:bg-white/10"
                >
                  <Link2 className="h-4 w-4 text-cyan-200" />
                  LinkedIn
                </a>
                <a
                  href={socialLinks.email}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs transition hover:bg-white/10"
                >
                  <Mail className="h-4 w-4 text-cyan-200" />
                  Mail
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs transition hover:bg-white/10"
                >
                  <GitFork className="h-4 w-4 text-cyan-200" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </Html>
      ) : null}
    </group>
  );
}
