"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { SceneWrapper } from "./SceneWrapper";

/* =========================================================================
   1. SWITCH UNIT (Top 1U) - 24 Gigabit Ethernet Ports + SFP Fiber
   ========================================================================= */
function SwitchUnit({ position }: { position: [number, number, number] }) {
  const ports = useMemo(() => {
    const list: { x: number; y: number; ledColor: string; speed: number }[] = [];
    // 2 rows of 12 RJ45 ports
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 12; col++) {
        const x = -0.65 + col * 0.1;
        const y = row === 0 ? 0.04 : -0.04;
        // Orange, Green, and Yellow active port LEDs
        const colors = ["#30D158", "#FF9F0A", "#FFD60A", "#30D158"];
        const ledColor = colors[(col + row * 3) % colors.length];
        list.push({ x, y, ledColor, speed: 4 + (col % 5) * 2 });
      }
    }
    return list;
  }, []);

  return (
    <group position={position}>
      {/* 1U Switch Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.68, 0.22, 1.55]} />
        <meshStandardMaterial color="#111318" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Front Faceplate */}
      <mesh position={[0, 0, 0.78]}>
        <planeGeometry args={[1.66, 0.2]} />
        <meshStandardMaterial color="#1A1D24" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* RJ45 Port Block Housing */}
      <mesh position={[-0.1, 0, 0.785]}>
        <boxGeometry args={[1.25, 0.14, 0.02]} />
        <meshStandardMaterial color="#0A0B0E" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Port Activity LEDs (Green, Orange, Yellow) */}
      {ports.map((p, i) => (
        <mesh key={i} position={[p.x, p.y + 0.045, 0.795]}>
          <boxGeometry args={[0.025, 0.015, 0.01]} />
          <meshBasicMaterial color={p.ledColor} />
        </mesh>
      ))}

      {/* SFP+ Fiber Uplink Cages (Dual ports on the right) */}
      <group position={[0.62, 0, 0.788]}>
        <mesh>
          <boxGeometry args={[0.18, 0.12, 0.02]} />
          <meshStandardMaterial color="#303540" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Fiber Status LEDs: Amber/Orange + Green */}
        <mesh position={[-0.04, 0.03, 0.015]}>
          <sphereGeometry args={[0.016, 8, 8]} />
          <meshBasicMaterial color="#FF9F0A" />
        </mesh>
        <mesh position={[0.04, 0.03, 0.015]}>
          <sphereGeometry args={[0.016, 8, 8]} />
          <meshBasicMaterial color="#30D158" />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================================
   2. FIREWALL / SECURITY APPLIANCE (1U) - Orange Accent Stripe + Status
   ========================================================================= */
function FirewallUnit({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 1U Appliance Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.68, 0.22, 1.55]} />
        <meshStandardMaterial color="#13161C" roughness={0.4} metalness={0.75} />
      </mesh>

      {/* Front Faceplate */}
      <mesh position={[0, 0, 0.78]}>
        <planeGeometry args={[1.66, 0.2]} />
        <meshStandardMaterial color="#1E222A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Signature Crisp Orange Security Accent Line */}
      <mesh position={[0, -0.06, 0.784]}>
        <planeGeometry args={[1.5, 0.018]} />
        <meshBasicMaterial color="#FF7A00" />
      </mesh>

      {/* Ventilation Honeycomb Slot Array */}
      <mesh position={[-0.25, 0.02, 0.782]}>
        <planeGeometry args={[0.8, 0.07]} />
        <meshStandardMaterial color="#090B0E" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Firewall Status Cluster: PWR (Green), STATUS (Orange), VPN (Blue) */}
      <group position={[0.55, 0.02, 0.786]}>
        {/* PWR */}
        <mesh position={[-0.1, 0, 0]}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshBasicMaterial color="#30D158" />
        </mesh>
        {/* STATUS (Orange / Inspection active) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshBasicMaterial color="#FF9F0A" />
        </mesh>
        {/* VPN / Tunnel (Blue) */}
        <mesh position={[0.1, 0, 0]}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshBasicMaterial color="#2997FF" />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================================
   3. ENTERPRISE VIRTUALISATION SERVER (2U) - VMware / Hyper-V Host
   ========================================================================= */
function ServerUnit({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 2U Chassis Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.68, 0.44, 1.6]} />
        <meshStandardMaterial color="#161820" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* Front Bezel Faceplate */}
      <mesh position={[0, 0, 0.805]}>
        <planeGeometry args={[1.66, 0.42]} />
        <meshStandardMaterial color="#1C2028" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Power Button & Diagnostic Cluster */}
      <group position={[-0.72, 0.1, 0.81]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
          <meshStandardMaterial color="#333842" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Power LED Ring (Cool Blue) */}
        <mesh position={[0, 0, 0.012]}>
          <ringGeometry args={[0.02, 0.03, 16]} />
          <meshBasicMaterial color="#2997FF" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 6 Front SFF 2.5" Hot-Swap NVMe Drive Bays */}
      {[-0.45, -0.27, -0.09, 0.09, 0.27, 0.45].map((x, idx) => (
        <group key={idx} position={[x, -0.05, 0.812]}>
          {/* Drive Caddy Tray */}
          <mesh>
            <boxGeometry args={[0.15, 0.24, 0.02]} />
            <meshStandardMaterial color="#232732" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Release latch handle */}
          <mesh position={[0, -0.08, 0.012]}>
            <boxGeometry args={[0.12, 0.03, 0.01]} />
            <meshStandardMaterial color="#3A404D" roughness={0.3} metalness={0.9} />
          </mesh>
          {/* Drive Status LED (Green) */}
          <mesh position={[-0.035, 0.08, 0.012]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color="#30D158" />
          </mesh>
          {/* Drive Activity LED (Orange / Amber) */}
          <mesh position={[0.035, 0.08, 0.012]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color={idx % 2 === 0 ? "#FF9F0A" : "#FF7A00"} />
          </mesh>
        </group>
      ))}

      {/* Server Health Diagnostic Bar (Amber/Yellow LED) */}
      <mesh position={[0.66, 0.1, 0.81]}>
        <boxGeometry args={[0.08, 0.03, 0.01]} />
        <meshBasicMaterial color="#FFD60A" />
      </mesh>
    </group>
  );
}

/* =========================================================================
   4. QNAP ENTERPRISE NAS (3U) - 8 Hot-Swap Bays & Storage Indicators
   ========================================================================= */
function QnapNasUnit({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 3U NAS Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.68, 0.65, 1.62]} />
        <meshStandardMaterial color="#14171E" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* Front Bezel */}
      <mesh position={[0, 0, 0.815]}>
        <planeGeometry args={[1.66, 0.63]} />
        <meshStandardMaterial color="#181B22" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* QNAP Brand Accent Plate (Sleek brushed panel on left) */}
      <group position={[-0.65, 0, 0.82]}>
        <mesh>
          <boxGeometry args={[0.24, 0.54, 0.015]} />
          <meshStandardMaterial color="#222630" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Status LED Cluster */}
        <mesh position={[0, 0.2, 0.01]}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshBasicMaterial color="#30D158" />
        </mesh>
        {/* Storage Health LED (Orange) */}
        <mesh position={[0, 0.13, 0.01]}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshBasicMaterial color="#FF9F0A" />
        </mesh>
        {/* Network LED (Teal) */}
        <mesh position={[0, 0.06, 0.01]}>
          <sphereGeometry args={[0.016, 10, 10]} />
          <meshBasicMaterial color="#5EEAD4" />
        </mesh>
        {/* USB 3.2 One-Touch Copy Port Accent */}
        <mesh position={[0, -0.15, 0.01]}>
          <boxGeometry args={[0.06, 0.03, 0.01]} />
          <meshStandardMaterial color="#2997FF" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* 8 Vertical 3.5" Enterprise NAS Drive Bays */}
      {[-0.38, -0.26, -0.14, -0.02, 0.1, 0.22, 0.34, 0.46].map((x, idx) => (
        <group key={idx} position={[x + 0.12, 0, 0.822]}>
          {/* Drive Tray */}
          <mesh>
            <boxGeometry args={[0.1, 0.52, 0.02]} />
            <meshStandardMaterial color="#262A34" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Locking Lever Handle */}
          <mesh position={[0, -0.18, 0.012]}>
            <boxGeometry args={[0.08, 0.06, 0.01]} />
            <meshStandardMaterial color="#3D4350" roughness={0.3} metalness={0.85} />
          </mesh>
          {/* NAS Bay Power LED (Green) */}
          <mesh position={[0, 0.22, 0.012]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color="#30D158" />
          </mesh>
          {/* NAS Bay Activity LED (Orange / Amber blinking) */}
          <mesh position={[0, 0.17, 0.012]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color={idx % 3 === 0 ? "#FF7A00" : "#FF9F0A"} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* =========================================================================
   5. RACK UPS / PDU POWER UNIT (Bottom 1U)
   ========================================================================= */
function UpsPowerUnit({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 1U Heavy Duty Battery Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.68, 0.24, 1.6]} />
        <meshStandardMaterial color="#12141A" roughness={0.45} metalness={0.7} />
      </mesh>

      {/* Front Faceplate */}
      <mesh position={[0, 0, 0.805]}>
        <planeGeometry args={[1.66, 0.22]} />
        <meshStandardMaterial color="#1A1C22" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Power LCD Display (Green / Orange Backlit Status) */}
      <mesh position={[0, 0.02, 0.81]}>
        <planeGeometry args={[0.3, 0.08]} />
        <meshBasicMaterial color="#1B3828" />
      </mesh>
      <mesh position={[-0.06, 0.02, 0.812]}>
        <planeGeometry args={[0.12, 0.04]} />
        <meshBasicMaterial color="#30D158" />
      </mesh>
      <mesh position={[0.06, 0.02, 0.812]}>
        <planeGeometry args={[0.08, 0.04]} />
        <meshBasicMaterial color="#FF9F0A" />
      </mesh>
    </group>
  );
}

/* =========================================================================
   6. SERVER RACK ENCLOSURE (Black Translucent Glass & Aluminum Frame)
   ========================================================================= */
function ServerRackEnclosure() {
  const rackWidth = 1.9;
  const rackHeight = 3.0;
  const rackDepth = 1.85;

  const pillarSize = 0.07;
  const halfW = rackWidth / 2;
  const halfH = rackHeight / 2;
  const halfD = rackDepth / 2;

  // Blinking activity light ref
  const orangeGlowRef = useRef<THREE.PointLight>(null);
  const greenGlowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (orangeGlowRef.current) {
      // Dynamic I/O amber pulse
      orangeGlowRef.current.intensity = 0.7 + Math.sin(t * 5) * 0.4;
    }
    if (greenGlowRef.current) {
      // Gentle healthy green heartbeat
      greenGlowRef.current.intensity = 0.6 + Math.cos(t * 3) * 0.2;
    }
  });

  return (
    <group>
      {/* Internal Server Room Datacenter Illumination */}
      <pointLight
        ref={orangeGlowRef}
        position={[0.2, 0.3, 0.7]}
        color="#FF9F0A"
        distance={2.5}
        intensity={0.8}
      />
      <pointLight
        ref={greenGlowRef}
        position={[-0.3, -0.4, 0.7]}
        color="#30D158"
        distance={2.5}
        intensity={0.6}
      />
      <pointLight
        position={[0, 0.9, 0.5]}
        color="#2997FF"
        distance={2.0}
        intensity={0.4}
      />

      {/* --- Rack Equipment Stack (inside the glass enclosure) --- */}
      <SwitchUnit position={[0, 0.95, 0]} />
      <FirewallUnit position={[0, 0.68, 0]} />
      <ServerUnit position={[0, 0.25, 0]} />
      <QnapNasUnit position={[0, -0.4, 0]} />
      <UpsPowerUnit position={[0, -0.98, 0]} />

      {/* --- 4 Corner Rack Structural Posts (Anodized Dark Metal) --- */}
      {[
        [-halfW, -halfD],
        [halfW, -halfD],
        [-halfW, halfD],
        [halfW, halfD],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]}>
          <boxGeometry args={[pillarSize, rackHeight, pillarSize]} />
          <meshStandardMaterial
            color="#222630"
            roughness={0.25}
            metalness={0.9}
            envMapIntensity={1.0}
          />
        </mesh>
      ))}

      {/* Top Cap & Bottom Base Plates */}
      <mesh position={[0, halfH, 0]}>
        <boxGeometry args={[rackWidth + 0.04, 0.06, rackDepth + 0.04]} />
        <meshStandardMaterial color="#1A1D24" roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0, -halfH, 0]}>
        <boxGeometry args={[rackWidth + 0.04, 0.08, rackDepth + 0.04]} />
        <meshStandardMaterial color="#14161C" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* --- Black Translucent Glass Panels (Shows Hardware Inside with LEDs) --- */}
      {/* 1. Front Glass Door */}
      <mesh position={[0, 0, halfD + 0.015]}>
        <boxGeometry args={[rackWidth - 0.08, rackHeight - 0.12, 0.02]} />
        <meshStandardMaterial
          color="#06080D"
          transparent
          opacity={0.38}
          roughness={0.15}
          metalness={0.7}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Front Door Modern Brushed Aluminum Handle */}
      <mesh position={[halfW - 0.14, 0, halfD + 0.035]}>
        <boxGeometry args={[0.025, 0.5, 0.02]} />
        <meshStandardMaterial color="#6B7280" roughness={0.2} metalness={0.95} />
      </mesh>

      {/* 2. Left Side Translucent Smoked Glass Panel */}
      <mesh position={[-halfW - 0.005, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[rackDepth - 0.08, rackHeight - 0.12, 0.015]} />
        <meshStandardMaterial
          color="#06080D"
          transparent
          opacity={0.35}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>

      {/* 3. Right Side Translucent Smoked Glass Panel */}
      <mesh position={[halfW + 0.005, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[rackDepth - 0.08, rackHeight - 0.12, 0.015]} />
        <meshStandardMaterial
          color="#06080D"
          transparent
          opacity={0.35}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>

      {/* 4. Rear Perforated Ventilation Door (Dark Metal Mesh) */}
      <mesh position={[0, 0, -halfD - 0.005]}>
        <boxGeometry args={[rackWidth - 0.08, rackHeight - 0.12, 0.02]} />
        <meshStandardMaterial
          color="#0E1015"
          roughness={0.6}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

/* =========================================================================
   7. ORBITING NEURAL NETWORK (AI Layer Embracing the Rack with Orange & Teal)
   ========================================================================= */
function OrbitingNeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  const { nodePositions, lineGeometry } = useMemo(() => {
    const nodes: [number, number, number][] = [];
    const count = 30;
    const radius = 2.65;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = (radius * 1.15) * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      nodes.push([x, y, z]);
    }

    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const p1 = new THREE.Vector3(...nodes[i]);
        const p2 = new THREE.Vector3(...nodes[j]);
        if (p1.distanceTo(p2) < 1.75) {
          points.push(p1);
          points.push(p2);
        }
      }
    }

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return { nodePositions: nodes, lineGeometry: geo };
  }, []);

  const linesObject = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: 0x5eead4,
      transparent: true,
      opacity: 0.28,
    });
    return new THREE.LineSegments(lineGeometry, mat);
  }, [lineGeometry]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.14;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Synaptic Lines */}
      <primitive object={linesObject} />

      {/* Neural Nodes: Teal, Blue, and Crisp Orange Accents */}
      {nodePositions.map((pos, idx) => {
        let nodeColor = "#5EEAD4"; // Teal
        if (idx % 3 === 0) nodeColor = "#2997FF"; // Cool Blue
        if (idx % 5 === 0) nodeColor = "#FF9F0A"; // Crisp Orange

        return (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color={nodeColor} />
          </mesh>
        );
      })}
    </group>
  );
}

/* =========================================================================
   8. SCENE COMPOSITION & INTERACTION
   ========================================================================= */
function SceneContent() {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rootRef.current) {
      // Subtle pointer tilt following the user's cursor
      const targetX = (state.pointer.x * Math.PI) / 14;
      const targetY = (-state.pointer.y * Math.PI) / 14;
      rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, targetX, 0.05);
      rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, targetY, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 6]} intensity={1.6} castShadow />
      <directionalLight position={[-5, 4, -4]} intensity={0.5} color="#5EEAD4" />
      <directionalLight position={[0, -4, 4]} intensity={0.4} color="#FF9F0A" />

      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.35}>
        <group ref={rootRef}>
          <ServerRackEnclosure />
          <OrbitingNeuralNetwork />
        </group>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.06}
        autoRotate={true}
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </>
  );
}

export function IntersectionScene({ className = "h-full w-full" }: { className?: string }) {
  return (
    <SceneWrapper cameraPosition={[0, 0, 6.0]} fov={40} className={className}>
      <SceneContent />
    </SceneWrapper>
  );
}
