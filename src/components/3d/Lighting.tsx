"use client";

type LightingProps = {
  enabled: boolean;
};

export function Lighting({ enabled }: LightingProps) {
  return (
    <>
      <ambientLight intensity={enabled ? 0.95 : 0.32} color={enabled ? "#ffffff" : "#fef3c7"} />
      <hemisphereLight
        color={enabled ? "#f8fafc" : "#facc15"}
        groundColor={enabled ? "#dbeafe" : "#431407"}
        intensity={enabled ? 0.55 : 0.26}
      />
      <directionalLight
        position={[4, 7, 3]}
        intensity={enabled ? 1.95 : 0.42}
        color={enabled ? "#ffffff" : "#fde68a"}
        castShadow
      />
      <pointLight position={[-2.4, 1.8, 1.2]} intensity={enabled ? 0.68 : 1.0} color={enabled ? "#ffffff" : "#fbbf24"} />
      <pointLight position={[2.5, 1.7, 1.1]} intensity={enabled ? 0.62 : 0.92} color={enabled ? "#c7f9ff" : "#fde68a"} />
      <spotLight
        position={[0, 4.8, -0.5]}
        angle={0.45}
        penumbra={0.6}
        intensity={enabled ? 1.45 : 0.9}
        color={enabled ? "#ffffff" : "#facc15"}
        castShadow
      />
    </>
  );
}
