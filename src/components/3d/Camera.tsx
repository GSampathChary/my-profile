"use client";

import { useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

type CameraProps = {
  mobile?: boolean;
  focus?: SceneFocus;
};

export type SceneFocus = "overview" | "computer" | "resume" | "phone" | "contact" | "technologies" | "projects";

const CAMERA_PRESETS: Record<SceneFocus, { position: [number, number, number]; target: [number, number, number] }> = {
  overview: {
    position: [0, 2.8, 8.15],
    target: [0, 1.58, 0]
  },
  resume: {
    position: [-1.55, 2.1, 1.55],
    target: [-1.85, 1.34, -3.55]
  },
  computer: {
    position: [0.15, 2.0, 1.8],
    target: [-0.1, 1.18, -3.43]
  },
  projects: {
    // Rotated straight to user from a comfortable unzoomed distance (facing right wall perpendicular)
    position: [-0.4, 2.1, 0.0],
    target: [4.42, 2.1, 0.0]
  },
  phone: {
    position: [0.65, 2.0, 1.9],
    target: [0.88, 1.27, -3.16]
  },
  contact: {
    position: [-1.25, 2.0, 1.95],
    target: [-1.52, 1.27, -3.12]
  },
  technologies: {
    position: [-4.0, 1.9, 1.55],
    target: [-3.55, 1.52, -3.05]
  }
};

export function Camera({ mobile, focus = "overview" }: CameraProps) {
  const cameraRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);

  const projectsPhaseRef = useRef<number>(0);
  const phaseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (focus === "projects") {
      projectsPhaseRef.current = 0;
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      phaseTimerRef.current = window.setTimeout(() => {
        projectsPhaseRef.current = 1;
      }, 700);
    } else {
      projectsPhaseRef.current = 0;
    }

    if (focus === "overview") {
      cameraRef.current?.position?.set(...CAMERA_PRESETS.overview.position);
      controlsRef.current?.target?.set(...CAMERA_PRESETS.overview.target);
      controlsRef.current?.update?.();
    }

    controlsRef.current?.update();
  }, [focus]);

  useFrame((_, delta) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!camera || !controls) {
      return;
    }

    const isFreeOrbit = focus === "overview";

    if (!isFreeOrbit) {
      let targetPos = CAMERA_PRESETS[focus].position;
      let targetLook = CAMERA_PRESETS[focus].target;

      if (focus === "projects" && projectsPhaseRef.current === 0) {
        targetPos = [0, 2.0, 4.2];
        targetLook = [0, 1.4, -2.0];
      }

      const targetPosition = new Vector3(...targetPos);
      const targetLookAt = new Vector3(...targetLook);

      // Slow, elegant lerp speed for smooth realistic movement (ultra-gentle for resume zoom)
      const speedFactor = focus === "resume" ? 0.045 : focus === "technologies" ? 0.04 : focus === "phone" || focus === "contact" ? 0.05 : 0.0008;
      const lerpFactor = 1 - Math.pow(speedFactor, delta);

      camera.position.lerp(targetPosition, lerpFactor);
      controls.target.lerp(targetLookAt, lerpFactor);
      camera.lookAt(controls.target);
      controls.update();
      return;
    }

    camera.lookAt(controls.target);
    controls.update();
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={CAMERA_PRESETS.overview.position} fov={39} />
      <OrbitControls
        ref={controlsRef}
        target={CAMERA_PRESETS.overview.target}
        enableRotate
        enableZoom
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minPolarAngle={0.18}
        maxPolarAngle={Math.PI - 0.18}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        minDistance={5.6}
        maxDistance={12.8}
        rotateSpeed={0.82}
        zoomSpeed={0.95}
      />
    </>
  );
}
