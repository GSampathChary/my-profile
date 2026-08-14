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

    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "#020617");
    bg.addColorStop(0.45, "#0f172a");
    bg.addColorStop(1, "#020617");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(width * 0.5, height * 0.15, 30, width * 0.5, height * 0.15, 420);
    glow.addColorStop(0, "rgba(56, 189, 248, 0.18)");
    glow.addColorStop(1, "rgba(56, 189, 248, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    // Desktop wallpaper panes
    ctx.fillStyle = "rgba(15, 23, 42, 0.72)";
    ctx.fillRect(56, 64, 1088, 592);
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.fillRect(56, 64, 1088, 52);
    ctx.fillStyle = "rgba(248, 250, 252, 0.96)";
    ctx.fillRect(74, 80, 24, 20);
    ctx.fillRect(108, 80, 24, 20);

    // Left app rail
    ctx.fillStyle = "rgba(8, 15, 35, 0.9)";
    ctx.fillRect(90, 140, 138, 484);
    ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
    for (let i = 0; i < 5; i += 1) {
      ctx.fillRect(120, 176 + i * 78, 78, 42);
      ctx.fillStyle = i % 2 === 0 ? "rgba(167, 139, 250, 0.9)" : "rgba(45, 212, 191, 0.9)";
      ctx.fillRect(104, 176 + i * 78 + 4, 10, 34);
      ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
    }

    // Main preview card
    const cardX = 258;
    const cardY = 140;
    const cardW = 612;
    const cardH = 364;
    const card = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    card.addColorStop(0, "#0f172a");
    card.addColorStop(1, "#111827");
    ctx.fillStyle = card;
    ctx.fillRect(cardX, cardY, cardW, cardH);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.18)";
    ctx.lineWidth = 2;
    ctx.strokeRect(cardX, cardY, cardW, cardH);

    const hero = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    hero.addColorStop(0, "rgba(34, 211, 238, 0.34)");
    hero.addColorStop(0.55, "rgba(99, 102, 241, 0.12)");
    hero.addColorStop(1, "rgba(251, 191, 36, 0.12)");
    ctx.fillStyle = hero;
    ctx.fillRect(cardX + 22, cardY + 22, 280, 300);

    // Focal workspace preview
    ctx.fillStyle = "rgba(2, 6, 23, 0.82)";
    ctx.fillRect(cardX + 320, cardY + 24, 268, 170);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(cardX + 336, cardY + 38, 80, 10);
    ctx.fillRect(cardX + 336, cardY + 60, 164, 10);
    ctx.fillRect(cardX + 336, cardY + 84, 124, 10);
    ctx.fillRect(cardX + 336, cardY + 108, 196, 10);

    ctx.fillStyle = "rgba(56, 189, 248, 0.24)";
    ctx.fillRect(cardX + 332, cardY + 134, 212, 44);
    ctx.fillStyle = "rgba(167, 139, 250, 0.24)";
    ctx.fillRect(cardX + 332, cardY + 186, 212, 44);

    // Project cards grid, no readable labels
    const tileY = cardY + 220;
    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        const x = cardX + 334 + col * 82;
        const y = tileY + row * 58;
        const tileGlow = ctx.createLinearGradient(x, y, x + 72, y + 48);
        tileGlow.addColorStop(0, row === 0 ? "rgba(45, 212, 191, 0.42)" : "rgba(96, 165, 250, 0.42)");
        tileGlow.addColorStop(1, "rgba(15, 23, 42, 0.88)");
        ctx.fillStyle = tileGlow;
        ctx.fillRect(x, y, 72, 48);
        ctx.fillStyle = "rgba(255,255,255,0.14)";
        ctx.fillRect(x + 10, y + 10, 26 + col * 3, 5);
        ctx.fillRect(x + 10, y + 22, 38 + col * 4, 5);
      }
    }

    // Bottom dock
    ctx.fillStyle = "rgba(2, 6, 23, 0.92)";
    ctx.fillRect(0, height - 84, width, 84);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(176, height - 64, 848, 24);
    for (let i = 0; i < 7; i += 1) {
      const pulse = 0.16 + Math.max(Math.sin(t * 2 + i * 0.7), 0) * 0.32;
      ctx.fillStyle = `rgba(${i % 3 === 0 ? 34 : i % 3 === 1 ? 56 : 167}, ${i % 3 === 0 ? 211 : i % 3 === 1 ? 189 : 139}, ${i % 3 === 0 ? 238 : i % 3 === 1 ? 248 : 250}, ${pulse})`;
      ctx.fillRect(210 + i * 96, height - 52, 44, 28);
    }

    // Small cursor
    ctx.fillStyle = "rgba(248, 250, 252, 0.8)";
    ctx.beginPath();
    ctx.moveTo(width * 0.79, height * 0.38);
    ctx.lineTo(width * 0.81, height * 0.44);
    ctx.lineTo(width * 0.77, height * 0.42);
    ctx.closePath();
    ctx.fill();

    if (!roomPowered) {
      ctx.fillStyle = "rgba(8, 15, 35, 0.18)";
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
      const intensity = powered ? 0.7 + Math.sin(t * 2.8) * 0.12 : 0.16;
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
