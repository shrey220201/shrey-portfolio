"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { SceneWrapper } from "./SceneWrapper";

export interface GraphNode {
  id: string;
  label: string;
  sublabel: string;
  category: string;
  position: [number, number, number];
  color: string;
  accentColor: string;
  geometryType: "icosahedron" | "octahedron" | "dodecahedron" | "shield" | "cylinder";
  description: string;
}

export const GRAPH_NODES: GraphNode[] = [
  {
    id: "ticket",
    label: "Incident Ingest",
    sublabel: "Event Bus",
    category: "INGRESS",
    position: [-2.5, 0.3, 0.2],
    color: "#77E7FE",
    accentColor: "#F15419",
    geometryType: "cylinder",
    description: "Inbound infrastructure alert stream from Windows Server, AD, and bare-metal telemetry.",
  },
  {
    id: "llm",
    label: "QLoRA Classifier",
    sublabel: "Llama 3.2 1B (95.5%)",
    category: "ROUTER",
    position: [-1.2, 1.1, -0.2],
    color: "#F15419",
    accentColor: "#77E7FE",
    geometryType: "octahedron",
    description: "Evaluates incident intent, affected hypervisor domain, and extracts technical entities.",
  },
  {
    id: "rag",
    label: "Hybrid Vector RAG",
    sublabel: "Qdrant Hybrid Store",
    category: "KNOWLEDGE",
    position: [-0.6, -0.9, 0.4],
    color: "#77E7FE",
    accentColor: "#F15419",
    geometryType: "dodecahedron",
    description: "Dense-sparse hybrid retrieval over enterprise storage playbooks and ZFS disaster recovery SOPs.",
  },
  {
    id: "gate",
    label: "Confidence Gate",
    sublabel: "p ≥ 0.85 Boundary",
    category: "DETERMINISTIC GATE",
    position: [0.5, 0.2, 0.0],
    color: "#F15419",
    accentColor: "#77E7FE",
    geometryType: "icosahedron",
    description: "Strict safety boundary: verifies posterior confidence score and blocks destructive shell commands.",
  },
  {
    id: "runbook",
    label: "Runbook Guidance",
    sublabel: "Verified Answer",
    category: "SYNTHESIS",
    position: [2.3, 1.2, -0.3],
    color: "#22C55E",
    accentColor: "#77E7FE",
    geometryType: "octahedron",
    description: "Generates step-by-step remediation plan with verified source citations and dry-run syntax.",
  },
  {
    id: "telemetry",
    label: "Live Health Probe",
    sublabel: "ESXi & Proxmox Probe",
    category: "VALIDATION",
    position: [2.5, 0.0, 0.3],
    color: "#77E7FE",
    accentColor: "#F15419",
    geometryType: "cylinder",
    description: "Executes read-only health checks against live hypervisors to confirm symptom status.",
  },
  {
    id: "human",
    label: "Human Escalation",
    sublabel: "HITL Fail-Safe",
    category: "SAFETY HALT",
    position: [1.9, -1.1, 0.1],
    color: "#EF4444",
    accentColor: "#F15419",
    geometryType: "shield",
    description: "Deterministic safety halt: immediately halts execution and alerts on-call engineer.",
  },
];

// Directed flow edges between nodes (sourceIndex, targetIndex)
const FLOW_EDGES: [number, number][] = [
  [0, 1], // Ingest -> QLoRA Classifier
  [1, 2], // QLoRA Classifier -> Hybrid RAG
  [2, 3], // Hybrid RAG -> Confidence Gate
  [1, 3], // QLoRA Classifier -> Confidence Gate (direct path)
  [3, 4], // Confidence Gate -> Runbook Guidance
  [3, 5], // Confidence Gate -> Live Health Probe
  [3, 6], // Confidence Gate -> Human Escalation
];

// Single Node 3D Component with glowing rings, geometric core, and reactive halo
function Node3D({
  node,
  isSelected,
  onSelect,
}: {
  node: GraphNode;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.8;
      ring1Ref.current.rotation.x += delta * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.6;
      ring2Ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={node.position}>
      {/* Outer Click Boundary */}
      <mesh onClick={(e) => { e.stopPropagation(); onSelect(); }}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Pulsing Selection Halo Ring */}
      {isSelected && (
        <group>
          <mesh>
            <sphereGeometry args={[0.36, 24, 24]} />
            <meshBasicMaterial
              color={node.accentColor}
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[0.38, 0.44, 32]} />
            <meshBasicMaterial
              color={node.accentColor}
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      )}

      {/* Rotating Orbital Holographic Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.26, 0.012, 12, 32]} />
        <meshBasicMaterial
          color={isSelected ? node.accentColor : node.color}
          transparent
          opacity={isSelected ? 0.9 : 0.45}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.22, 0.008, 12, 28]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={isSelected ? 0.7 : 0.3}
        />
      </mesh>

      {/* Geometric Core */}
      <group ref={coreRef}>
        {node.geometryType === "icosahedron" && (
          <mesh>
            <icosahedronGeometry args={[0.16, 0]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={isSelected ? 1.6 : 0.8}
              roughness={0.15}
              metalness={0.9}
            />
          </mesh>
        )}

        {node.geometryType === "octahedron" && (
          <mesh>
            <octahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={isSelected ? 1.5 : 0.7}
              roughness={0.2}
              metalness={0.85}
            />
          </mesh>
        )}

        {node.geometryType === "dodecahedron" && (
          <mesh>
            <dodecahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={isSelected ? 1.5 : 0.75}
              roughness={0.2}
              metalness={0.85}
            />
          </mesh>
        )}

        {node.geometryType === "cylinder" && (
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.18, 6]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={isSelected ? 1.5 : 0.7}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        )}

        {node.geometryType === "shield" && (
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[0.16, 1]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={isSelected ? 1.8 : 0.9}
              roughness={0.1}
              metalness={0.95}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

// Flowing Energy Pulses & Fiber-Optic Curved Lines
function FlowEdgesAndPulses({ activeNodeId }: { activeNodeId: string }) {
  // Precompute curved spline paths for each edge
  const splines = useMemo(() => {
    return FLOW_EDGES.map(([srcIdx, dstIdx]) => {
      const p1 = new THREE.Vector3(...GRAPH_NODES[srcIdx].position);
      const p2 = new THREE.Vector3(...GRAPH_NODES[dstIdx].position);

      // Create an arched mid-point for aesthetic fiber-optic curve
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      mid.y += Math.sin(srcIdx + dstIdx) * 0.15 + 0.1;
      mid.z += (srcIdx % 2 === 0 ? 0.15 : -0.15) * dist * 0.2;

      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      const points = curve.getPoints(28);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      return { curve, geometry, srcIdx, dstIdx };
    });
  }, []);

  // Precompute lines
  const lineObjects = useMemo(() => {
    return splines.map((s) => {
      const mat = new THREE.LineBasicMaterial({
        color: 0x77e7fe,
        transparent: true,
        opacity: 0.22,
      });
      return new THREE.Line(s.geometry, mat);
    });
  }, [splines]);

  // Multi-packet animations
  const packetGroupRef = useRef<THREE.Group>(null);
  const packetRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    splines.forEach((spline, idx) => {
      const mesh = packetRefs.current[idx];
      if (mesh) {
        // Offset phases for natural traffic flow
        const speed = 0.55 + (idx % 3) * 0.15;
        const t = ((elapsed * speed + idx * 0.28) % 1);
        const pos = spline.curve.getPointAt(t);
        mesh.position.copy(pos);
      }
    });
  });

  return (
    <group>
      {/* Curved Fiber-Optic Connection Beams */}
      {splines.map((s, idx) => {
        const isConnected =
          GRAPH_NODES[s.srcIdx].id === activeNodeId ||
          GRAPH_NODES[s.dstIdx].id === activeNodeId;
        const line = lineObjects[idx];
        if (line) {
          (line.material as THREE.LineBasicMaterial).color.setHex(isConnected ? 0xf15419 : 0x77e7fe);
          (line.material as THREE.LineBasicMaterial).opacity = isConnected ? 0.65 : 0.22;
        }

        return <primitive key={idx} object={line} />;
      })}

      {/* Traveling Glowing Data Packets */}
      <group ref={packetGroupRef}>
        {splines.map((s, idx) => (
          <mesh
            key={idx}
            ref={(el) => {
              packetRefs.current[idx] = el;
            }}
          >
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial
              color={idx % 2 === 0 ? "#F15419" : "#77E7FE"}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Ground Holographic Radar Scanner Disc
function RadarGroundDisc() {
  const radarRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (radarRef.current) {
      radarRef.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <group position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <group ref={radarRef}>
        {/* Outer Ring */}
        <mesh>
          <ringGeometry args={[2.8, 2.84, 64]} />
          <meshBasicMaterial color="#77E7FE" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
        {/* Mid Ring */}
        <mesh>
          <ringGeometry args={[1.8, 1.83, 48]} />
          <meshBasicMaterial color="#F15419" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
        {/* Inner Ring */}
        <mesh>
          <ringGeometry args={[0.9, 0.92, 32]} />
          <meshBasicMaterial color="#77E7FE" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// Ambient Atmospheric Cyber Dust
function AmbientParticles() {
  const particles = useMemo(() => {
    const count = 75;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#77E7FE"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export function AgentGraph({
  className = "h-[360px] w-full",
  selectedId: externalSelectedId,
  onNodeChange,
}: {
  className?: string;
  selectedId?: string;
  onNodeChange?: (id: string) => void;
}) {
  const [internalSelectedId, setInternalSelectedId] = useState<string>("gate");
  const activeId = externalSelectedId || internalSelectedId;

  const handleSelect = (id: string) => {
    setInternalSelectedId(id);
    if (onNodeChange) onNodeChange(id);
  };

  const selectedNode = GRAPH_NODES.find((n) => n.id === activeId) || GRAPH_NODES[3];

  return (
    <div className="relative flex flex-col items-center h-full w-full">
      <div className={`relative ${className}`}>
        <SceneWrapper cameraPosition={[0, 0, 5.2]} fov={40}>
          {/* Ambient & Thematic Directional Lighting */}
          <ambientLight intensity={0.65} />
          <directionalLight position={[4, 5, 3]} intensity={1.4} color="#ffffff" />
          <pointLight position={[-3, 2, 2]} intensity={1.8} color="#F15419" distance={8} />
          <pointLight position={[3, -2, 2]} intensity={2.0} color="#77E7FE" distance={8} />

          <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.2}>
            <group>
              {/* Radar Grid Ground */}
              <RadarGroundDisc />

              {/* Ambient Cyber Particles */}
              <AmbientParticles />

              {/* Connecting Spline Beams & Pulses */}
              <FlowEdgesAndPulses activeNodeId={activeId} />

              {/* All 7 Interactive Agent Nodes */}
              {GRAPH_NODES.map((node) => (
                <Node3D
                  key={node.id}
                  node={node}
                  isSelected={activeId === node.id}
                  onSelect={() => handleSelect(node.id)}
                />
              ))}
            </group>
          </Float>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.06}
            autoRotate={true}
            autoRotateSpeed={0.35}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.7}
          />
        </SceneWrapper>

        {/* Floating Instruction overlay */}
        <div className="pointer-events-none absolute bottom-2.5 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)] bg-[var(--bg)]/80 px-2 py-0.5 rounded-full border border-[var(--border)] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-ping" />
          <span>DRAG 3D MODEL · CLICK NODES TO INSPECT</span>
        </div>
      </div>

      {/* Selected Node Details Card Docked Below Model */}
      <div className="w-full mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface-glass)] p-3 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-3.5 w-3.5 rounded-full shrink-0 shadow-md transition-all duration-300"
            style={{
              backgroundColor: selectedNode.color,
              boxShadow: `0 0 10px ${selectedNode.color}`,
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                {selectedNode.label}
              </span>
              <span
                className="font-mono text-[10px] px-1.5 py-0.2 rounded border"
                style={{
                  color: selectedNode.accentColor,
                  borderColor: `${selectedNode.accentColor}40`,
                  backgroundColor: `${selectedNode.accentColor}15`,
                }}
              >
                {selectedNode.category}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-1">
              {selectedNode.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
