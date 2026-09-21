"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { CanvasTexture, LinearFilter, SRGBColorSpace, type MeshStandardMaterial } from "three";

type ComputerProps = {
  onClick?: () => void;
  powered?: boolean;
  active?: boolean;
  showVideos?: boolean;
  position?: [number, number, number];
};

function VideoScreen() {
  const videoId = "c1rBk7XAlj0";

  return (
    <Html transform position={[0, 0, 0.061]} distanceFactor={1.28} style={{ width: "304px", height: "164px", pointerEvents: "none" }}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1`}
        title="Portfolio workstation video"
        allow="autoplay; encrypted-media; picture-in-picture"
        loading="eager"
        tabIndex={-1}
        className="h-full w-full border-0 bg-black"
      />
    </Html>
  );
}

export function Computer({
  onClick,
  powered = true,
  active = false,
  showVideos = true,
  position = [-0.2, 1.28, 0.05]
}: ComputerProps) {
  const { gl } = useThree();
  const screenMatRef = useRef<MeshStandardMaterial>(null);
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenTextureRef = useRef<CanvasTexture | null>(null);
  const [screenTexture, setScreenTexture] = useState<CanvasTexture | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fanRefs = useRef<Array<MeshStandardMaterial | null>>([]);
  const lastScreenDrawRef = useRef(0);
  const screenFocused = active || isHovered;

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 960;
    screenCanvasRef.current = canvas;

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    screenTextureRef.current = texture;
    setScreenTexture(texture);

    return () => {
      texture.dispose();
      screenTextureRef.current = null;
      screenCanvasRef.current = null;
    };
  }, []);


  const drawScreen = (ctx: CanvasRenderingContext2D, t: number, roomPowered: boolean) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "#020617");
    bg.addColorStop(0.38, "#3b0764");
    bg.addColorStop(0.7, "#0f172a");
    bg.addColorStop(1, "#020617");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(width * 0.52, height * 0.22, 20, width * 0.52, height * 0.22, 560);
    glow.addColorStop(0, "rgba(251, 191, 36, 0.46)");
    glow.addColorStop(0.25, "rgba(248, 113, 113, 0.26)");
    glow.addColorStop(0.55, "rgba(59, 130, 246, 0.18)");
    glow.addColorStop(1, "rgba(59, 130, 246, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    const frameX = 62;
    const frameY = 58;
    const frameW = 1076;
    const frameH = 576;
    const frame = ctx.createLinearGradient(frameX, frameY, frameX + frameW, frameY + frameH);
    frame.addColorStop(0, "rgba(2, 6, 23, 0.92)");
    frame.addColorStop(0.5, "rgba(17, 24, 39, 0.96)");
    frame.addColorStop(1, "rgba(7, 12, 25, 0.92)");
    ctx.fillStyle = frame;
    ctx.fillRect(frameX, frameY, frameW, frameH);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 2;
    ctx.strokeRect(frameX, frameY, frameW, frameH);

    if (screenFocused) {
      const panelX = frameX + 32;
      const panelY = frameY + 30;
      const panelW = frameW - 64;
      const panelH = frameH - 60;

      const panel = ctx.createLinearGradient(panelX, panelY, panelX + panelW, panelY + panelH);
      panel.addColorStop(0, "rgba(3, 7, 18, 0.95)");
      panel.addColorStop(0.5, "rgba(15, 23, 42, 0.96)");
      panel.addColorStop(1, "rgba(4, 11, 30, 0.94)");
      ctx.fillStyle = panel;
      ctx.fillRect(panelX, panelY, panelW, panelH);
      ctx.strokeStyle = "rgba(125, 211, 252, 0.24)";
      ctx.lineWidth = 2;
      ctx.strokeRect(panelX, panelY, panelW, panelH);

      const accent = ctx.createLinearGradient(panelX, panelY, panelX + 360, panelY);
      accent.addColorStop(0, "#22d3ee");
      accent.addColorStop(0.5, "#38bdf8");
      accent.addColorStop(1, "#fbbf24");
      ctx.fillStyle = accent;
      ctx.fillRect(panelX, panelY, 360, 8);

      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(panelX + 34, panelY + 34, 300, 110);
      ctx.fillRect(panelX + 34, panelY + 158, 300, 110);

      ctx.fillStyle = "#ffffff";
      ctx.font = "700 28px sans-serif";
      ctx.fillText("VISTARA AI", panelX + 52, panelY + 74);
      ctx.font = "600 16px sans-serif";
      ctx.fillStyle = "rgba(186, 230, 253, 0.95)";
      ctx.fillText("PVC interior design assistant", panelX + 52, panelY + 104);
      ctx.fillStyle = "rgba(224, 242, 254, 0.92)";
      ctx.font = "500 14px sans-serif";
      ctx.fillText("Hover and click stay crisp while the monitor is active.", panelX + 52, panelY + 130);

      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.fillRect(panelX + 374, panelY + 34, panelW - 408, 234);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.strokeRect(panelX + 374, panelY + 34, panelW - 408, 234);

      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = "700 18px sans-serif";
      ctx.fillText("Live Demo", panelX + 398, panelY + 74);
      ctx.font = "500 13px sans-serif";
      ctx.fillStyle = "rgba(203, 213, 225, 0.95)";
      ctx.fillText("Frontend", panelX + 398, panelY + 110);
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("https://vistara-ai-pvc-interior-studio-xi.vercel.app/", panelX + 398, panelY + 134);

      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = "700 18px sans-serif";
      ctx.fillText("Backend API", panelX + 398, panelY + 176);
      ctx.font = "500 13px sans-serif";
      ctx.fillStyle = "rgba(203, 213, 225, 0.95)";
      ctx.fillText("Render", panelX + 398, panelY + 212);
      ctx.fillStyle = "#34d399";
      ctx.fillText("https://vistaraai-pvc-interior-studio.onrender.com", panelX + 398, panelY + 236);

      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(panelX + 34, panelY + 292, panelW - 68, 148);
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 20px sans-serif";
      ctx.fillText("Featured project", panelX + 54, panelY + 328);
      ctx.font = "500 14px sans-serif";
      ctx.fillStyle = "rgba(191, 219, 254, 0.92)";
      ctx.fillText("Open VistaraAI first, then switch to the other projects from the portfolio.", panelX + 54, panelY + 356);
      ctx.fillStyle = "rgba(56, 189, 248, 0.18)";
      ctx.fillRect(panelX + 54, panelY + 382, 220, 42);
      ctx.fillStyle = "#e0f2fe";
      ctx.font = "600 13px sans-serif";
      ctx.fillText("Sharp monitor view enabled", panelX + 70, panelY + 409);
    } else {
      // Fast action streaks
      for (let i = 0; i < 18; i += 1) {
        const y = 120 + i * 28 + Math.sin(t * 3.6 + i * 0.45) * 16;
        const len = 240 + Math.max(Math.sin(t * 2 + i) * 120, 0);
        const alpha = 0.04 + Math.max(Math.sin(t * 4.5 + i * 0.3), 0) * 0.18;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(60 + i * 8, y);
        ctx.lineTo(60 + i * 8 + len, y - 120);
        ctx.stroke();
      }

      // Hero action scene
      const sceneX = frameX + 48;
      const sceneY = frameY + 40;
      const sceneW = 980;
      const sceneH = 390;
      const scene = ctx.createLinearGradient(sceneX, sceneY, sceneX + sceneW, sceneY + sceneH);
      scene.addColorStop(0, "#0b1021");
      scene.addColorStop(0.45, "#1d4ed8");
      scene.addColorStop(1, "#f59e0b");
      ctx.fillStyle = scene;
      ctx.fillRect(sceneX, sceneY, sceneW, sceneH);

      const explosion = ctx.createRadialGradient(sceneX + sceneW * 0.58, sceneY + sceneH * 0.38, 18, sceneX + sceneW * 0.58, sceneY + sceneH * 0.38, 260);
      explosion.addColorStop(0, "rgba(255,255,255,0.96)");
      explosion.addColorStop(0.2, "rgba(252, 211, 77, 0.94)");
      explosion.addColorStop(0.42, "rgba(251, 146, 60, 0.72)");
      explosion.addColorStop(1, "rgba(251, 146, 60, 0)");
      ctx.fillStyle = explosion;
      ctx.fillRect(sceneX, sceneY, sceneW, sceneH);

      // Speedline trail
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(sceneX + 40, sceneY + sceneH - 40);
      ctx.lineTo(sceneX + 210, sceneY + 250);
      ctx.lineTo(sceneX + 410, sceneY + 190);
      ctx.stroke();

      // Hero vehicle silhouette
      ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
      ctx.beginPath();
      ctx.moveTo(sceneX + 120, sceneY + sceneH - 70);
      ctx.lineTo(sceneX + 210, sceneY + sceneH - 120);
      ctx.lineTo(sceneX + 340, sceneY + sceneH - 118);
      ctx.lineTo(sceneX + 420, sceneY + sceneH - 72);
      ctx.lineTo(sceneX + 350, sceneY + sceneH - 38);
      ctx.lineTo(sceneX + 150, sceneY + sceneH - 40);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,0.82)";
      ctx.fillRect(sceneX + 230, sceneY + sceneH - 106, 18, 10);
      ctx.fillRect(sceneX + 275, sceneY + sceneH - 106, 18, 10);

      // Action hero / villain silhouettes
      ctx.fillStyle = "rgba(2, 6, 23, 0.95)";
      ctx.beginPath();
      ctx.arc(sceneX + sceneW * 0.72, sceneY + sceneH * 0.48, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(sceneX + sceneW * 0.71, sceneY + sceneH * 0.48, 20, 78);
      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      ctx.fillRect(sceneX + sceneW * 0.14, sceneY + sceneH * 0.45, 28, 120);

      // HUD overlays
      ctx.fillStyle = "rgba(2, 6, 23, 0.64)";
      ctx.fillRect(frameX + 22, frameY + 20, 230, 74);
      ctx.fillStyle = "rgba(248, 250, 252, 0.96)";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("ACTION REEL", frameX + 40, frameY + 50);
      ctx.font = "600 14px sans-serif";
      ctx.fillStyle = "rgba(191, 219, 254, 0.95)";
      ctx.fillText("Ultra bright cinematic playback", frameX + 40, frameY + 74);

      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.fillRect(frameX + 862, frameY + 20, 190, 74);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(frameX + 900, frameY + 57, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.moveTo(frameX + 895, frameY + 49);
      ctx.lineTo(frameX + 895, frameY + 65);
      ctx.lineTo(frameX + 909, frameY + 57);
      ctx.closePath();
      ctx.fill();

      // Bottom action timeline
      ctx.fillStyle = "rgba(2, 6, 23, 0.94)";
      ctx.fillRect(frameX, frameY + frameH - 84, frameW, 84);
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(frameX + 54, frameY + frameH - 56, frameW - 108, 10);
      const sweep = (Math.sin(t * 2.8) + 1) * 0.5;
      ctx.fillStyle = "rgba(248, 250, 252, 0.9)";
      ctx.fillRect(frameX + 54, frameY + frameH - 56, (frameW - 108) * sweep, 10);
      for (let i = 0; i < 6; i += 1) {
        ctx.fillStyle = i % 2 === 0 ? "rgba(251, 191, 36, 0.88)" : "rgba(59, 130, 246, 0.88)";
        ctx.fillRect(frameX + 66 + i * 170, frameY + frameH - 42, 58, 18);
      }

      // Bright pulse near the action center
      const pulse = ctx.createRadialGradient(sceneX + sceneW * 0.56, sceneY + sceneH * 0.44, 6, sceneX + sceneW * 0.56, sceneY + sceneH * 0.44, 120);
      pulse.addColorStop(0, "rgba(255,255,255,0.9)");
      pulse.addColorStop(0.3, "rgba(255,255,255,0.42)");
      pulse.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = pulse;
      ctx.fillRect(sceneX + sceneW * 0.48, sceneY + sceneH * 0.3, 180, 180);
    }

    if (!roomPowered) {
      ctx.fillStyle = "rgba(8, 15, 35, 0.08)";
      ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (screenTextureRef.current && t - lastScreenDrawRef.current >= 1 / 30) {
      const canvas = screenCanvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        drawScreen(ctx, t, powered);
        screenTextureRef.current.needsUpdate = true;
        lastScreenDrawRef.current = t;
      }
    }

    if (screenMatRef.current) {
      const intensity = powered ? (screenFocused ? 1.42 : 1.15 + Math.sin(t * 2.8) * 0.16) : 0.18;
      screenMatRef.current.emissiveIntensity = intensity;
    }

    fanRefs.current.forEach((mat, i) => {
      if (mat) {
        const hue = (t * 58 + i * 42) % 360;
        mat.color.setHSL(hue / 360, 0.92, 0.56);
        mat.emissive.setHSL(hue / 360, 0.92, 0.56);
        mat.emissiveIntensity = 1.9 + Math.sin(t * 8 + i) * 0.55;
      }
    });
  });

  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={(event) => {
        event.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setIsHovered(false);
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
    >
      {/* Three matching widescreen panels form the reference's uninterrupted monitor wall. */}
      {[
        { x: -1.27, y: 0.54, rotation: 0.13, central: false },
        { x: 0, y: 0.57, rotation: 0, central: true },
        { x: 1.27, y: 0.54, rotation: -0.13, central: false }
      ].map((monitor) => (
        <group key={monitor.x} position={[monitor.x, monitor.y, 0]} rotation-y={monitor.rotation}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.34, 0.76, 0.095]} />
            <meshStandardMaterial color="#090b10" roughness={0.26} metalness={0.78} />
          </mesh>
          <mesh position={[0, 0, 0.053]}>
            <planeGeometry args={[1.24, 0.67]} />
            <meshStandardMaterial
              ref={monitor.central ? screenMatRef : undefined}
              map={screenTexture ?? undefined}
              color={powered ? "#ffffff" : "#0b1220"}
              emissive="#ffffff"
              emissiveIntensity={powered ? 1.1 : 0.06}
              roughness={0.12}
              toneMapped={false}
            />
          </mesh>
          {showVideos ? <VideoScreen /> : null}
          <mesh castShadow receiveShadow position={[0, -0.58, -0.025]}>
            <boxGeometry args={[0.07, 0.42, 0.07]} />
            <meshStandardMaterial color="#111827" metalness={0.84} roughness={0.28} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, -0.79, 0.08]}>
            <boxGeometry args={[0.42, 0.045, 0.3]} />
            <meshStandardMaterial color="#111827" metalness={0.84} roughness={0.28} />
          </mesh>
        </group>
      ))}

      {/* Full-height tempered-glass PC tower with three visible RGB intake fans. */}
      <group position={[2.48, 0.72, -0.18]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.7, 1.36, 0.88]} />
          <meshStandardMaterial color="#08090c" roughness={0.22} metalness={0.82} />
        </mesh>
        <mesh position={[-0.356, 0, 0]}>
          <boxGeometry args={[0.018, 1.22, 0.76]} />
          <meshStandardMaterial color="#29253a" emissive="#7c3aed" emissiveIntensity={0.32} transparent opacity={0.5} roughness={0.08} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.7, -0.05]} rotation-x={Math.PI / 2}>
          <boxGeometry args={[0.56, 0.12, 0.02]} />
          <meshStandardMaterial color="#151922" metalness={0.85} roughness={0.28} />
        </mesh>
        {[-0.38, 0, 0.38].map((yPos, index) => (
          <group key={`front-fan-${yPos}`} position={[0, yPos, 0.451]} rotation-x={Math.PI / 2}>
            <mesh>
              <torusGeometry args={[0.145, 0.022, 12, 36]} />
              <meshStandardMaterial ref={(el) => { fanRefs.current[index] = el; }} color="#ec4899" emissive="#ec4899" emissiveIntensity={2.6} roughness={0.22} />
            </mesh>
            <mesh position={[0, 0, 0.008]}>
              <circleGeometry args={[0.11, 28]} />
              <meshStandardMaterial color="#130d22" emissive="#4c1d95" emissiveIntensity={0.8} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, -0.72, 0]} castShadow>
          <boxGeometry args={[0.76, 0.09, 0.96]} />
          <meshStandardMaterial color="#10131a" metalness={0.78} roughness={0.34} />
        </mesh>
        <pointLight position={[0, 0, 0.55]} intensity={1.8} distance={2.1} color="#ec4899" />
      </group>

      {/* Keyboard */}
      <group position={[-0.12, 0.12, 0.58]} rotation={[0, 0.04, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.92, 0.042, 0.3]} />
          <meshStandardMaterial color="#0b1220" roughness={0.44} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.86, 0.018, 0.24]} />
          <meshStandardMaterial color="#111827" roughness={0.28} />
        </mesh>
        {[
          { z: -0.07, count: 13, width: 0.036, gap: 0.006, x: -0.31, color: "#e2e8f0" },
          { z: 0, count: 12, width: 0.036, gap: 0.006, x: -0.285, color: "#cbd5e1" },
          { z: 0.07, count: 11, width: 0.038, gap: 0.007, x: -0.26, color: "#e2e8f0" }
        ].map((row) =>
          Array.from({ length: row.count }).map((_, index) => {
            const total = row.count * row.width + (row.count - 1) * row.gap;
            const start = row.x + total / -2;
            return (
              <mesh
                key={`${row.z}-${index}`}
                castShadow
                receiveShadow
                position={[start + index * (row.width + row.gap) + row.width / 2, 0.027, row.z]}
              >
                <boxGeometry args={[row.width, 0.02, 0.048]} />
                <meshStandardMaterial color={row.color} roughness={0.24} metalness={0.06} />
              </mesh>
            );
          })
        )}
      </group>

      {/* Mouse */}
      <group position={[0.78, 0.12, 0.58]} rotation={[0, -0.12, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.16, 0.05, 0.26]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}
