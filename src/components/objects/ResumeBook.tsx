"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Group } from "three";
import { portfolio } from "@/data/portfolio";

type ResumeBookProps = {
  onClick?: () => void;
  onClose?: () => void;
  open?: boolean;
  lightsOn?: boolean;
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
};

export function ResumeBook({
  onClick,
  onClose,
  open = false,
  lightsOn = true,
  position = [-1.82, 1.285, -3.62],
  rotationY = -0.2,
  scale = 1
}: ResumeBookProps) {
  const coverGroupRef = useRef<Group>(null);
  const leftPageRef = useRef<Group>(null);
  const rightPageRef = useRef<Group>(null);

  // Internal animation state: "closed" | "opening" | "opened" | "closing"
  const [phase, setPhase] = useState<"closed" | "opening" | "opened" | "closing">("closed");

  useEffect(() => {
    let timer: number;
    if (open) {
      // Step 1: Camera moves to closed book slowly (user sees closed book)
      setPhase("closed");
      // Step 2: After 850ms, automatically start opening very slowly and gracefully
      timer = window.setTimeout(() => {
        setPhase("opening");
        timer = window.setTimeout(() => {
          setPhase("opened");
        }, 1400);
      }, 1200);
    } else {
      setPhase("closed");
    }
    return () => clearTimeout(timer);
  }, [open]);

  const handleClose = () => {
    // Step 4: On close click, first set phase to "closing" to slowly animate cover closed
    setPhase("closing");
    window.setTimeout(() => {
      setPhase("closed");
      // After book is completely closed (950ms), return camera to room overview
      if (onClose) {
        onClose();
      }
    }, 1350);
  };

  useFrame((_, delta) => {
    const isOpeningOrOpened = phase === "opening" || phase === "opened";
    const targetCoverRot = isOpeningOrOpened ? -Math.PI * 0.45 : 0;
    const targetLeftRot = isOpeningOrOpened ? -Math.PI * 0.4 : 0;
    const targetRightRot = isOpeningOrOpened ? Math.PI * 0.1 : 0;

    // Ultra-slow, elegant, realistic unfolding lerp speed
    if (coverGroupRef.current) {
      coverGroupRef.current.rotation.y += (targetCoverRot - coverGroupRef.current.rotation.y) * delta * 0.42;
    }
    if (leftPageRef.current) {
      leftPageRef.current.rotation.y += (targetLeftRot - leftPageRef.current.rotation.y) * delta * 0.42;
    }
    if (rightPageRef.current) {
      rightPageRef.current.rotation.y += (targetRightRot - rightPageRef.current.rotation.y) * delta * 0.42;
    }
  });

  return (
    <group position={position} rotation-y={rotationY} scale={scale} onClick={onClick}>
      {/* Folder Base */}
      <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[0.98, 0.08, 0.66]} />
        <meshStandardMaterial color="#c08457" roughness={0.7} />
      </mesh>
      {/* Folder Spine / Tab */}
      <mesh position={[-0.44, 0.04, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.66]} />
        <meshStandardMaterial color="#a16207" roughness={0.5} />
      </mesh>
      {/* Paper Edge */}
      <mesh position={[0.11, 0.07, 0.01]}>
        <boxGeometry args={[0.78, 0.014, 0.56]} />
        <meshStandardMaterial color={lightsOn ? "#fff7ed" : "#e2e8f0"} roughness={0.3} />
      </mesh>

      {/* Animated Opening Cover Group */}
      <group ref={coverGroupRef}>
        {/* Left Open Page */}
        <group ref={leftPageRef} position={[-0.12, 0.11, 0.01]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.44, 0.016, 0.56]} />
            <meshStandardMaterial color={lightsOn ? "#fff7ed" : "#1e293b"} roughness={0.35} />
          </mesh>
        </group>

        {/* Right Open Page */}
        <group ref={rightPageRef} position={[0.12, 0.11, 0.01]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.44, 0.016, 0.56]} />
            <meshStandardMaterial color={lightsOn ? "#fffdf7" : "#0f172a"} roughness={0.35} />
          </mesh>
        </group>
      </group>

      {/* In-Scene 3D Open Book Interactive Resume Details */}
      {open ? (
        <Html
          transform
          occlude
          position={[0, 0.48, 0]}
          rotation={[-Math.PI / 4, 0, 0]}
          distanceFactor={1.05}
          style={{ width: "680px", pointerEvents: "auto" }}
        >
          <div className={`relative rounded-3xl border-4 ${lightsOn ? "border-[#78350f] bg-[#451a03]" : "border-cyan-500/40 bg-slate-900/95"} p-4 shadow-2xl backdrop-blur-2xl transition-all duration-700`}>
            <div className={`grid max-h-[460px] grid-cols-2 gap-4 overflow-y-auto rounded-2xl p-5 shadow-inner scrollbar-thin ${
              lightsOn ? "bg-[#fef3c7] text-slate-900 scrollbar-thumb-amber-800/40" : "bg-slate-950 text-cyan-100 scrollbar-thumb-cyan-500/40"
            }`}>
              {/* Left Page (Biography) */}
              <div className={`border-r pr-4 ${lightsOn ? "border-amber-900/20" : "border-cyan-500/20"}`}>
                <div className={`text-[10px] uppercase tracking-[0.35em] font-bold ${lightsOn ? "text-amber-800" : "text-cyan-400"}`}>Biography</div>
                <h3 className={`mt-1.5 text-xl font-serif font-bold ${lightsOn ? "text-slate-900" : "text-white"}`}>{portfolio.profile.name}</h3>
                <p className={`mt-1 text-xs font-semibold ${lightsOn ? "text-amber-800" : "text-cyan-300"}`}>{portfolio.profile.headline}</p>
                <hr className={`my-3 ${lightsOn ? "border-amber-900/20" : "border-cyan-500/20"}`} />
                <p className={`text-xs font-serif leading-5 ${lightsOn ? "text-slate-800" : "text-slate-300"}`}>{portfolio.profile.introduction}</p>
              </div>

              {/* Right Page (Experience & Skills) */}
              <div className="pl-1">
                <div className={`text-[10px] uppercase tracking-[0.35em] font-bold ${lightsOn ? "text-amber-800" : "text-cyan-400"}`}>Experience & Core Skills</div>
                <p className={`mt-1.5 text-xs font-serif leading-5 ${lightsOn ? "text-slate-800" : "text-slate-300"}`}>{portfolio.experience.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {["AI Engineer", "Python", "Flutter", "Spring Boot", "FastAPI", "TensorFlow", "PyTorch", "OpenCV"].map((skill) => (
                    <span key={skill} className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold ${
                      lightsOn ? "bg-amber-200/90 text-amber-950" : "bg-cyan-950 border border-cyan-500/30 text-cyan-200"
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Cross Bar Close Button */}
            {onClose ? (
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition shadow-2xl transform hover:scale-105 ${
                    lightsOn ? "bg-amber-800 text-amber-100 hover:bg-amber-900" : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                  }`}
                >
                  Close Resume ✕
                </button>
              </div>
            ) : null}
          </div>
        </Html>
      ) : null}
    </group>
  );
}
