"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { SceneWrapper } from "./SceneWrapper";

interface NodeData {
  id: string;
  label: string;
  sublabel: string;
  position: [number, number, number];
  color: string;
  description: string;
}

const NODES: NodeData[] = [
  {
    id: "ticket",
    label: "Ticket Ingestion",
    sublabel: "Raw Alert",
    position: [-2.5, 0, 0],
    color: "#A1A1A6",
    description: "Inbound infrastructure alert from Windows Server, AD, or monitoring agent.",
  },
  {
    id: "classifier",
    label: "QLoRA Classifier",
    sublabel: "Llama 3.2 1B (95.5%)",
    position: [-1.2, 0.7, 0],
    color: "#2997FF",
    description: "Determines severity, affected system domain, and intent.",
  },
  {
    id: "retriever",
    label: "Vector Retriever",
    sublabel: "Qdrant Hybrid",
    position: [-0.2, -0.6, 0.4],
    color: "#5EEAD4",
    description: "Retrieves verified SOP playbooks from real documentation embeddings.",
  },
  {
    id: "gate",
    label: "Confidence Gate",
    sublabel: "Safety Filter",
    position: [0.9, 0.2, 0],
    color: "#2997FF",
    description: "Enforces deterministic boundaries: blocks destructive CLI & checks threshold.",
  },
  {
    id: "runbook",
    label: "Runbook Guidance",
    sublabel: "Verified Answer",
    position: [2.3, 0.9, -0.3],
    color: "#30D158",
    description: "Generates cited, step-by-step resolution based on grounded sources.",
  },
  {
    id: "status",
    label: "Status Check",
    sublabel: "Live Telemetry",
    position: [2.5, 0, 0.2],
    color: "#5EEAD4",
    description: "Executes read-only health probe or queries telemetry.",
  },
  {
    id: "escalation",
    label: "Human Escalation",
    sublabel: "HITL Safe Mode",
    position: [2.1, -1.0, 0],
    color: "#FF453A",
    description: "Immediately alerts senior engineer on destructive command or low confidence.",
  },
];

// Directed edges
const EDGES: [number, number][] = [
  [0, 1], // Ticket -> Classifier
  [1, 2], // Classifier -> Retriever
  [2, 3], // Retriever -> Gate
  [3, 4], // Gate -> Runbook
  [3, 5], // Gate -> Status Check
  [3, 6], // Gate -> Human Escalation
];

function GraphMesh({
  activeNodeId,
  onSelectNode,
}: {
  activeNodeId: string;
  onSelectNode: (id: string) => void;
}) {
  const lineGeometries = useMemo(() => {
    return EDGES.map(([sourceIdx, targetIdx]) => {
      const p1 = new THREE.Vector3(...NODES[sourceIdx].position);
      const p2 = new THREE.Vector3(...NODES[targetIdx].position);
      return new THREE.BufferGeometry().setFromPoints([p1, p2]);
    });
  }, []);

  // Animated packet traveling across edges
  const packetRef = useRef<THREE.Mesh>(null);
  const [currentEdgeIndex, setCurrentEdgeIndex] = useState(0);

  useFrame(({ clock }) => {
    if (packetRef.current) {
      const t = (clock.getElapsedTime() * 1.5) % 1;
      const [src, dst] = EDGES[currentEdgeIndex];
      const p1 = new THREE.Vector3(...NODES[src].position);
      const p2 = new THREE.Vector3(...NODES[dst].position);

      packetRef.current.position.lerpVectors(p1, p2, t);

      if (t > 0.98) {
        setCurrentEdgeIndex((prev) => (prev + 1) % EDGES.length);
      }
    }
  });

  const lineObjects = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: 0x2997ff,
      transparent: true,
      opacity: 0.35,
    });
    return lineGeometries.map((geo) => new THREE.LineSegments(geo, mat));
  }, [lineGeometries]);

  return (
    <group>
      {/* Connecting Edges */}
      {lineObjects.map((obj, idx) => (
        <primitive key={idx} object={obj} />
      ))}

      {/* Traveling Data Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#5EEAD4" />
      </mesh>

      {/* Nodes */}
      {NODES.map((node) => {
        const isSelected = activeNodeId === node.id;

        return (
          <group
            key={node.id}
            position={node.position}
            onClick={() => onSelectNode(node.id)}
          >
            {/* Outer halo when active */}
            {isSelected && (
              <mesh>
                <sphereGeometry args={[0.26, 16, 16]} />
                <meshBasicMaterial
                  color={node.color}
                  transparent
                  opacity={0.25}
                  wireframe
                />
              </mesh>
            )}

            {/* Core Node Sphere */}
            <mesh>
              <sphereGeometry args={[0.15, 24, 24]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isSelected ? 0.8 : 0.3}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function AgentGraph({
  className = "h-[360px] w-full",
}: {
  className?: string;
}) {
  const [selectedId, setSelectedId] = useState<string>("gate");
  const selectedNode = NODES.find((n) => n.id === selectedId) || NODES[3];

  return (
    <div className="relative flex flex-col items-center">
      <div className={`relative ${className}`}>
        <SceneWrapper cameraPosition={[0, 0, 5.5]} fov={42}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 5, 4]} intensity={1.2} />
          <pointLight position={[0, 0, 2]} intensity={0.5} color="#5EEAD4" />

          <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.25}>
            <GraphMesh
              activeNodeId={selectedId}
              onSelectNode={(id) => setSelectedId(id)}
            />
          </Float>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            autoRotate={true}
            autoRotateSpeed={0.4}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.6}
          />
        </SceneWrapper>

        {/* Floating Instruction */}
        <div className="absolute bottom-2 left-3 z-10 font-mono text-[10px] text-[var(--text-secondary)]">
          Drag to rotate · Click node for details
        </div>
      </div>

      {/* Selected Node Details Card */}
      <div className="w-full mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface-glass)] p-3 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: selectedNode.color, boxShadow: `0 0 8px ${selectedNode.color}` }}
          />
          <div>
            <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
              {selectedNode.label}
            </span>
            <span className="font-mono text-[10px] text-[var(--accent-2)] ml-2">
              [{selectedNode.sublabel}]
            </span>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {selectedNode.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
