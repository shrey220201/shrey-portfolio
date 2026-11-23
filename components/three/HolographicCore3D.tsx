"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { SceneWrapper } from "./SceneWrapper";

// 1. Inner Scarlet Neural AI Core (Pulsing icosahedron)
function NeuralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !wireRef.current) return;
    const t = state.clock.getElapsedTime();
    // Smooth multidimensional rotation
    meshRef.current.rotation.x = t * 0.35;
    meshRef.current.rotation.y = t * 0.45;
    wireRef.current.rotation.x = -t * 0.25;
    wireRef.current.rotation.y = -t * 0.35;

    // Subtle breathing scale
    const s = 1 + Math.sin(t * 2.2) * 0.05;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <group>
      {/* Inner Crystal Core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.9, 2]} />
        <meshStandardMaterial
          color="#FF1744"
          emissive="#FF2A4D"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh ref={wireRef}>
        <octahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial
          color="#FF5C77"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

// 2. Concentric Gimbal Infrastructure Rings
function GimbalRings() {
  const ring1 = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Group>(null);
  const ring3 = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.2;
      ring1.current.rotation.x = Math.sin(t * 0.15) * 0.3;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -t * 0.25;
      ring2.current.rotation.z = Math.cos(t * 0.2) * 0.25;
    }
    if (ring3.current) {
      ring3.current.rotation.x = t * 0.18;
      ring3.current.rotation.y = t * 0.12;
    }
  });

  return (
    <group>
      {/* Ring 1 - Storage & Hypervisor Ring */}
      <group ref={ring1}>
        <mesh>
          <torusGeometry args={[1.45, 0.02, 16, 100]} />
          <meshStandardMaterial color="#FF2A4D" emissive="#FF1744" emissiveIntensity={0.4} metalness={0.8} />
        </mesh>
        {/* Ring Node Marker */}
        <mesh position={[1.45, 0, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Ring 2 - LangGraph Agentic Ring */}
      <group ref={ring2}>
        <mesh>
          <torusGeometry args={[1.75, 0.018, 16, 100]} />
          <meshStandardMaterial color="#E11D48" emissive="#FF2A4D" emissiveIntensity={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[-1.75, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#FF2A4D" />
        </mesh>
      </group>

      {/* Ring 3 - Outer Deterministic Guardrail Ring */}
      <group ref={ring3}>
        <mesh>
          <torusGeometry args={[2.05, 0.014, 16, 100]} />
          <meshStandardMaterial color="#9CA3AF" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[0, 2.05, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#30D158" />
        </mesh>
      </group>
    </group>
  );
}

// 3. Orbiting Data Swarm Particles
function OrbitingDataSwarm() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 90;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorScarlet = new THREE.Color("#FF2A4D");
    const colorWhite = new THREE.Color("#FFFFFF");
    const colorRuby = new THREE.Color("#E11D48");

    for (let i = 0; i < count; i++) {
      const radius = 1.2 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;

      pos[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const c = Math.random() > 0.6 ? colorWhite : Math.random() > 0.3 ? colorScarlet : colorRuby;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.12;
    pointsRef.current.rotation.x = Math.sin(t * 0.08) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 4. Interactive Mouse Tilt Wrapper
function InteractiveMouseRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    // Smooth lerp toward mouse pointer
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.6,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.4,
      0.05
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

// 5. Floating Spatial Hologram Telemetry Tags
function SpatialTelemetryTags() {
  return (
    <>
      <Html position={[-1.7, 1.2, 0]} center distanceFactor={6}>
        <div className="pointer-events-none select-none rounded-md border border-[#FF2A4D]/40 bg-black/75 px-2 py-0.5 font-mono text-[9px] font-semibold text-white backdrop-blur-md shadow-lg shadow-[#FF2A4D]/20 whitespace-nowrap animate-pulse">
          <span className="text-[#FF2A4D] font-bold">●</span> RAID 60: OPTIMAL
        </div>
      </Html>

      <Html position={[1.8, -0.9, 0]} center distanceFactor={6}>
        <div className="pointer-events-none select-none rounded-md border border-[#FF2A4D]/40 bg-black/75 px-2 py-0.5 font-mono text-[9px] font-semibold text-white backdrop-blur-md shadow-lg shadow-[#FF2A4D]/20 whitespace-nowrap">
          <span className="text-[#30D158] font-bold">●</span> CONFIDENCE: p ≥ 0.85
        </div>
      </Html>

      <Html position={[-1.4, -1.3, 0]} center distanceFactor={6}>
        <div className="pointer-events-none select-none rounded-md border border-white/20 bg-black/75 px-2 py-0.5 font-mono text-[9px] text-[#9CA3AF] backdrop-blur-md whitespace-nowrap">
          ZFS IOPS: 42.5K · 0.8ms
        </div>
      </Html>

      <Html position={[1.5, 1.4, 0]} center distanceFactor={6}>
        <div className="pointer-events-none select-none rounded-md border border-white/20 bg-black/75 px-2 py-0.5 font-mono text-[9px] text-[#9CA3AF] backdrop-blur-md whitespace-nowrap">
          10GbE SFP+ DUAL-LINK
        </div>
      </Html>
    </>
  );
}

// Main 3D Export
export function HolographicCore3D({ className = "h-full w-full" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <SceneWrapper cameraPosition={[0, 0, 4.8]} fov={42}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-5, -4, -3]} intensity={2.5} color="#FF2A4D" />
        <pointLight position={[0, 3, 2]} intensity={1.8} color="#FF1744" />

        <InteractiveMouseRig>
          <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
            <NeuralCore />
            <GimbalRings />
            <OrbitingDataSwarm />
            <SpatialTelemetryTags />
          </Float>
        </InteractiveMouseRig>
      </SceneWrapper>
    </div>
  );
}
