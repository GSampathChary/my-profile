"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Ceiling } from "./Ceiling";
import { Camera, type SceneFocus } from "./Camera";
import { Environment } from "./Environment";
import { Floor } from "./Floor";
import { Lighting } from "./Lighting";
import { Walls } from "./Walls";
import { WallProjectsGrid } from "@/components/3d/WallProjectsGrid";
import { Bookshelf } from "@/components/objects/Bookshelf";
import { Chair } from "@/components/objects/Chair";
import { Computer } from "@/components/objects/Computer";
import { Desk } from "@/components/objects/Desk";
import { Lamp } from "@/components/objects/Lamp";
import { Phone } from "@/components/objects/Phone";
import { ResumeBook } from "@/components/objects/ResumeBook";
import { VisitingCard } from "@/components/objects/VisitingCard";
import type { Project } from "@/types/project";

type RoomProps = {
  lightsOn: boolean;
  mobile: boolean;
  focus: SceneFocus;
  projectsVisible: boolean;
  resumeVisible: boolean;
  projects: Project[];
  selectedProjectId: string | null;
  onToggleLight: () => void;
  onOpenComputer: () => void;
  onOpenResume: () => void;
  onOpenPhone: () => void;
  onOpenContact: () => void;
  onCloseProjects: () => void;
  onSelectProject: (projectId: string) => void;
  onBookSelect: (book: string) => void;
};

export function Room({
  lightsOn,
  mobile,
  focus,
  projectsVisible,
  resumeVisible,
  projects,
  selectedProjectId,
  onToggleLight,
  onOpenComputer,
  onOpenResume,
  onOpenPhone,
  onOpenContact,
  onCloseProjects,
  onSelectProject,
  onBookSelect
}: RoomProps) {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-slate-950">
      <Canvas shadows dpr={mobile ? [1, 1.15] : [1, 1.5]}>
        <Suspense fallback={null}>
          <Environment enabled={lightsOn} />
          <Camera mobile={mobile} focus={focus} />
          <Lighting enabled={lightsOn} />
          <group>
            <Floor />
            <Walls lightsOn={lightsOn} projectsMode={focus === "projects"} />
            <Ceiling />

            <mesh position={[0, 4.18, -4.42]}>
              <boxGeometry args={[6.9, 1.35, 0.05]} />
              <meshStandardMaterial
                color={lightsOn ? "#090d16" : "#1f1404"}
                emissive={lightsOn ? "#06b6d4" : "#facc15"}
                emissiveIntensity={lightsOn ? 0.08 : 0.18}
                roughness={0.4}
                metalness={0.6}
              />
            </mesh>

            <Text position={[0, 4.24, -4.34]} fontSize={0.34} color="#ffffff" anchorX="center" anchorY="middle">
              GANNOJU SAMPATH CHARY
            </Text>
            <Text position={[0, 3.85, -4.34]} fontSize={0.13} color="#38bdf8" anchorX="center" anchorY="middle">
              AI Engineer / Full Stack Developer / Python
            </Text>
            <Text position={[0, 3.56, -4.34]} fontSize={0.095} color="#94a3b8" anchorX="center" anchorY="middle">
              gsampathchary.dev
            </Text>
            <pointLight position={[0.2, 4.08, -4.05]} intensity={lightsOn ? 1.7 : 2.4} color="#ff4fd8" distance={8} />
            <pointLight position={[-0.95, 4.05, -4.05]} intensity={lightsOn ? 1.1 : 1.8} color="#ef4444" distance={8} />
            <pointLight position={[0.35, 1.25, 0.75]} intensity={lightsOn ? 0.95 : 1.95} color="#38bdf8" distance={8} />
            <pointLight position={[1.5, 1.0, 0.65]} intensity={lightsOn ? 0.4 : 0.85} color="#22c55e" distance={5} />

            {focus !== "projects" ? (
              <>
                <Desk position={[0, 1.22, -3.45]} />
                <Chair position={[0, 0.08, -1.55]} rotationY={Math.PI} scale={1.03} />
                <Lamp enabled={lightsOn} onToggle={onToggleLight} />
                <Computer
                  position={[-0.1, 1.14, -3.43]}
                  powered={lightsOn}
                  active={focus === "computer"}
                  onClick={onOpenComputer}
                />
                <Bookshelf
                  active={focus === "technologies"}
                  onBookSelect={onBookSelect}
                  position={[-3.55, 1.52, -3.05]}
                  rotationY={0.08}
                  scale={0.9}
                />
                {resumeVisible ? (
                  <ResumeBook
                    open={focus === "resume"}
                    onClick={onOpenResume}
                    onClose={onCloseProjects}
                    lightsOn={lightsOn}
                    position={[-1.82, 1.295, -3.63]}
                    rotationY={-0.22}
                    scale={1}
                  />
                ) : null}
                <Phone active={focus === "phone"} onClick={onOpenPhone} position={[1.18, 1.34, -3.02]} rotationY={-0.18} scale={1.0} />
                <VisitingCard onClick={onOpenContact} position={[-1.52, 1.27, -3.12]} rotationY={-0.12} scale={0.95} />
              </>
            ) : null}
            <WallProjectsGrid
              projects={projects}
              selectedProjectId={selectedProjectId}
              active={focus === "projects"}
              visible={projectsVisible}
              onClose={onCloseProjects}
              onSelectProject={onSelectProject}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
