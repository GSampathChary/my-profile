"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, LinearFilter, SRGBColorSpace, type MeshStandardMaterial } from "three";

type ComputerProps = {
  onClick?: () => void;
  powered?: boolean;
  active?: boolean;
  position?: [number, number, number];
};

export function Computer({
  onClick,
  powered = true,
  position = [-0.2, 1.28, 0.05]
}: ComputerProps) {
  const screenMatRef = useRef<MeshStandardMaterial>(null);
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenTextureRef = useRef<CanvasTexture | null>(null);
  const [screenTexture, setScreenTexture] = useState<CanvasTexture | null>(null);
  const fanRefs = useRef<Array<MeshStandardMaterial | null>>([]);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 720;
    screenCanvasRef.current = canvas;

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.generateMipmaps = false;
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

    if (!roomPowered) {
      ctx.fillStyle = "rgba(8, 15, 35, 0.08)";
      ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (screenTextureRef.current) {
      const canvas = screenCanvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        drawScreen(ctx, t, powered);
        screenTextureRef.current.needsUpdate = true;
      }
    }

    if (screenMatRef.current) {
      const intensity = powered ? 1.15 + Math.sin(t * 2.8) * 0.16 : 0.18;
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
    <group position={position} onClick={onClick}>
      {/* Monitor frame */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[1.92, 1.05, 0.12]} />
        <meshStandardMaterial color="#0b1329" roughness={0.34} metalness={0.72} />
      </mesh>

      {/* Screen */}
      <mesh castShadow receiveShadow position={[0, 0.62, 0.085]}>
        <planeGeometry args={[1.78, 0.9]} />
        <meshStandardMaterial
          ref={screenMatRef}
          map={screenTexture ?? undefined}
          emissive="#ffffff"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Bezel */}
      <mesh castShadow receiveShadow position={[0, 0.62, 0.074]}>
        <boxGeometry args={[1.88, 1.0, 0.018]} />
        <meshStandardMaterial
          color="#020617"
          emissive={powered ? "#0f172a" : "#1f2937"}
          emissiveIntensity={0.22}
          roughness={0.3}
          metalness={0.45}
        />
      </mesh>

      {/* Stand */}
      <mesh castShadow receiveShadow position={[0, 0.18, 0.02]}>
        <boxGeometry args={[0.48, 0.06, 0.38]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.34, -0.02]}>
        <boxGeometry args={[0.12, 0.54, 0.12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Tower */}
      <group position={[1.35, 0.57, -0.1]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.48, 0.92, 0.82]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.8} />
        </mesh>

        <mesh position={[0, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.24, 0.26, 0.08, 32]} />
          <meshStandardMaterial color="#0f172a" emissive="#22c55e" emissiveIntensity={0.45} roughness={0.5} />
        </mesh>
        <pointLight position={[0, -0.52, 0]} intensity={1.4} distance={1.4} color="#22c55e" />

        <mesh position={[-0.24, 0, 0]}>
          <boxGeometry args={[0.02, 0.84, 0.76]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.25} roughness={0.1} />
        </mesh>

        {[-0.15, 0.15].map((yPos, idx) => (
          <group key={`front-${idx}`} position={[0, yPos, 0.41]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.085, 0.085, 0.022, 32]} />
              <meshStandardMaterial
                ref={(el) => {
                  fanRefs.current[idx] = el;
                }}
                color="#ec4899"
                emissive="#ec4899"
                emissiveIntensity={2.2}
                roughness={0.25}
              />
            </mesh>
          </group>
        ))}

        {[-0.2, 0.2].flatMap((yPos, yI) =>
          [-0.2, 0.2].map((zPos, zI) => {
            const idx = 2 + yI * 2 + zI;
            return (
              <group key={`right-${idx}`} position={[0.25, yPos, zPos]} rotation={[0, 0, Math.PI / 2]}>
                <mesh>
                  <cylinderGeometry args={[0.075, 0.075, 0.02, 32]} />
                  <meshStandardMaterial
                    ref={(el) => {
                      fanRefs.current[idx] = el;
                    }}
                    color="#3b82f6"
                    emissive="#3b82f6"
                    emissiveIntensity={2.2}
                    roughness={0.25}
                  />
                </mesh>
              </group>
            );
          })
        )}

        {[-0.2, 0.2].flatMap((yPos, yI) =>
          [-0.2, 0.2].map((zPos, zI) => {
            const idx = 6 + yI * 2 + zI;
            return (
              <group key={`left-${idx}`} position={[-0.25, yPos, zPos]} rotation={[0, 0, Math.PI / 2]}>
                <mesh>
                  <cylinderGeometry args={[0.075, 0.075, 0.02, 32]} />
                  <meshStandardMaterial
                    ref={(el) => {
                      fanRefs.current[idx] = el;
                    }}
                    color="#10b981"
                    emissive="#10b981"
                    emissiveIntensity={2.2}
                    roughness={0.25}
                  />
                </mesh>
              </group>
            );
          })
        )}
      </group>

      {/* Keyboard */}
      <group position={[-0.15, 0.12, 0.48]} rotation={[0, 0.04, 0]}>
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
      <group position={[0.55, 0.12, 0.52]} rotation={[0, -0.12, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.003, 0]}>
          <cylinderGeometry args={[0.085, 0.1, 0.04, 20]} />
          <meshStandardMaterial color="#0f172a" roughness={0.34} metalness={0.08} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.018, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.085, 20, 16]} />
          <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.08} />
        </mesh>
      </group>
    </group>
  );
}
