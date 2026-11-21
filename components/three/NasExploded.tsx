"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SceneWrapper } from "./SceneWrapper";

export type RaidLevel = "RAID 0" | "RAID 1" | "RAID 5" | "RAID 6" | "RAID 10";

interface DriveInfo {
  role: "data" | "parity" | "mirror";
  label: string;
}

function getRaidDistribution(level: RaidLevel): DriveInfo[] {
  switch (level) {
    case "RAID 0":
      return [
        { role: "data", label: "Striped Data A1" },
        { role: "data", label: "Striped Data A2" },
        { role: "data", label: "Striped Data A3" },
        { role: "data", label: "Striped Data A4" },
      ];
    case "RAID 1":
      return [
        { role: "data", label: "Primary Data A" },
        { role: "mirror", label: "Mirror Copy A" },
        { role: "data", label: "Primary Data B" },
        { role: "mirror", label: "Mirror Copy B" },
      ];
    case "RAID 5":
      return [
        { role: "data", label: "Data Block D1" },
        { role: "data", label: "Data Block D2" },
        { role: "data", label: "Data Block D3" },
        { role: "parity", label: "Parity Block P" },
      ];
    case "RAID 6":
      return [
        { role: "data", label: "Data Block D1" },
        { role: "data", label: "Data Block D2" },
        { role: "parity", label: "Parity P (XOR)" },
        { role: "parity", label: "Parity Q (Reed-Solomon)" },
      ];
    case "RAID 10":
      return [
        { role: "data", label: "Stripe 1 (Data)" },
        { role: "mirror", label: "Stripe 1 (Mirror)" },
        { role: "data", label: "Stripe 2 (Data)" },
        { role: "mirror", label: "Stripe 2 (Mirror)" },
      ];
  }
}

function DriveBay({
  index,
  xOffset,
  info,
  exploded,
}: {
  index: number;
  xOffset: number;
  info: DriveInfo;
  exploded: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);

  // Target Z position: 1.0 (seated) or 2.1 (slid out in exploded view)
  const targetZ = exploded ? 1.9 + (index % 2) * 0.2 : 0.8;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        targetZ,
        0.08
      );
    }
  });

  const roleColor =
    info.role === "data"
      ? "#2997FF"
      : info.role === "parity"
      ? "#5EEAD4"
      : "#30D158";

  return (
    <group ref={meshRef} position={[xOffset, 0, 0.8]}>
      {/* Drive Caddy Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.38, 1.15, 1.5]} />
        <meshStandardMaterial
          color="#1C1F26"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Front Faceplate */}
      <mesh position={[0, 0, 0.76]}>
        <planeGeometry args={[0.36, 1.1]} />
        <meshStandardMaterial color="#121418" roughness={0.6} />
      </mesh>

      {/* Role Accent Strip (Data / Parity / Mirror indicator) */}
      <mesh position={[0, 0.35, 0.77]}>
        <planeGeometry args={[0.3, 0.08]} />
        <meshBasicMaterial color={roleColor} />
      </mesh>

      {/* Drive Release Lever */}
      <mesh position={[0, -0.4, 0.8]}>
        <boxGeometry args={[0.3, 0.1, 0.08]} />
        <meshStandardMaterial color="#2E333D" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Status LED */}
      <mesh position={[0, 0.48, 0.77]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial color="#30D158" />
      </mesh>
    </group>
  );
}

function NasModel({ raidLevel, exploded }: { raidLevel: RaidLevel; exploded: boolean }) {
  const distribution = getRaidDistribution(raidLevel);
  const xOffsets = [-0.66, -0.22, 0.22, 0.66];

  return (
    <group position={[0, 0, 0]}>
      {/* Outer NAS Enclosure */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.0, 1.5, 2.0]} />
        <meshStandardMaterial
          color="#0C0D11"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Internal Backplane Hollow */}
      <mesh position={[0, 0, 0.3]}>
        <boxGeometry args={[1.8, 1.3, 1.6]} />
        <meshStandardMaterial color="#050608" roughness={0.8} side={THREE.BackSide} />
      </mesh>

      {/* Power Button & LCD Screen */}
      <mesh position={[-0.8, 0.55, 1.01]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color="#2997FF" />
      </mesh>
      <mesh position={[0.2, 0.58, 1.01]}>
        <planeGeometry args={[0.8, 0.12]} />
        <meshBasicMaterial color="#0A2540" />
      </mesh>

      {/* 4 Hot-swappable Drive Trays */}
      {xOffsets.map((x, i) => (
        <DriveBay
          key={i}
          index={i}
          xOffset={x}
          info={distribution[i]}
          exploded={exploded}
        />
      ))}
    </group>
  );
}

export function NasExploded({
  className = "h-[380px] w-full",
}: {
  className?: string;
}) {
  const [raidLevel, setRaidLevel] = useState<RaidLevel>("RAID 5");
  const [exploded, setExploded] = useState<boolean>(true);

  const raidLevels: RaidLevel[] = ["RAID 0", "RAID 1", "RAID 5", "RAID 6", "RAID 10"];
  const distribution = getRaidDistribution(raidLevel);

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D Canvas Viewport */}
      <div className={`relative ${className}`}>
        <SceneWrapper cameraPosition={[2.2, 1.6, 4.0]} fov={40}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 5, 4]} intensity={1.5} castShadow />
          <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#5EEAD4" />
          <pointLight position={[0, 2, 2]} intensity={0.6} color="#2997FF" />

          <NasModel raidLevel={raidLevel} exploded={exploded} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
          />
        </SceneWrapper>

        {/* Floating Explode Mode Toggle */}
        <button
          type="button"
          onClick={() => setExploded(!exploded)}
          className="absolute top-3 right-3 z-10 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/90 px-3 py-1 font-mono text-[11px] text-[var(--text-primary)] backdrop-blur-md hover:border-[var(--accent)] transition-colors shadow-lg"
        >
          {exploded ? "Collapse Bays" : "Explode Bays"}
        </button>
      </div>

      {/* Interactive RAID Level Selector & Legend */}
      <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
        {/* RAID Selector Pills */}
        <div className="flex flex-wrap gap-1.5">
          {raidLevels.map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setRaidLevel(lvl)}
              className={`rounded-full px-3 py-1 font-mono text-xs transition-all ${
                raidLevel === lvl
                  ? "bg-[var(--accent)] text-white font-semibold shadow-md shadow-[var(--glow-accent)]"
                  : "border border-[var(--border)] bg-[var(--surface-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Drive Color Legend */}
        <div className="flex items-center gap-4 font-mono text-[11px] text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#2997FF]" />
            Data
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#5EEAD4]" />
            Parity (XOR)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#30D158]" />
            Mirror
          </span>
        </div>
      </div>

      {/* Real-time Bay Distribution Details */}
      <div className="w-full mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {distribution.map((d, i) => (
          <div
            key={i}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface-glass)] p-2 text-center"
          >
            <span className="font-mono text-[10px] text-[var(--text-secondary)] block">
              Bay 0{i + 1}
            </span>
            <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
