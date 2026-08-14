"use client";

type EnvironmentProps = {
  enabled: boolean;
};

export function Environment({ enabled }: EnvironmentProps) {
  return (
    <>
      <color attach="background" args={[enabled ? "#f3f4f6" : "#090d1b"]} />
      <fog attach="fog" args={[enabled ? "#f3f4f6" : "#090d1b", 8, 22]} />
    </>
  );
}
