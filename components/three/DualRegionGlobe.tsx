"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SceneWrapper } from "./SceneWrapper";

// Convert Lat / Lon to 3D Cartesian coords on a sphere of radius R
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function DottedGlobe() {
  const globeRadius = 1.8;

  // Generate uniform points on sphere (Fibonacci sphere algorithm)
  const pointsGeometry = useMemo(() => {
    const numPoints = 850;
    const positions = new Float32Array(numPoints * 3);

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numPoints);
      const theta = Math.PI * (1 + 5 ** 0.5) * (i + 0.5);

      positions[i * 3] = globeRadius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = globeRadius * Math.cos(phi);
      positions[i * 3 + 2] = globeRadius * Math.sin(phi) * Math.sin(theta);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [globeRadius]);

  return (
    <group>
      {/* Inner dark core sphere */}
      <mesh>
        <sphereGeometry args={[globeRadius * 0.98, 32, 32]} />
        <meshStandardMaterial
          color="#08090C"
          roughness={0.7}
          metalness={0.5}
        />
      </mesh>

      {/* Dotted Sphere Surface */}
      <points geometry={pointsGeometry}>
        <pointsMaterial
          size={0.035}
          color="#3A404E"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
}

function ReplicationArc() {
  const globeRadius = 1.8;

  // Geographic coordinates
  // New York: 40.7128° N, -74.0060° W
  // Hong Kong: 22.3193° N, 114.1694° E
  const nyPos = useMemo(() => latLonToVector3(40.71, -74.0, globeRadius), [globeRadius]);
  const hkPos = useMemo(() => latLonToVector3(22.32, 114.17, globeRadius), [globeRadius]);

  // Construct elevated 3D arc between NY and HK
  const { curve, curveGeometry } = useMemo(() => {
    const midPoint = new THREE.Vector3()
      .addVectors(nyPos, hkPos)
      .multiplyScalar(0.5);

    // Elevate midpoint above the sphere surface for a dramatic arc
    midPoint.normalize().multiplyScalar(globeRadius * 1.55);

    const c = new THREE.QuadraticBezierCurve3(nyPos, midPoint, hkPos);
    const points = c.getPoints(50);
    const geo = new THREE.BufferGeometry().setFromPoints(points);

    return { curve: c, curveGeometry: geo };
  }, [nyPos, hkPos, globeRadius]);

  // Animated packet traveling along arc
  const packetRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (packetRef.current) {
      const t = (clock.getElapsedTime() * 0.4) % 1;
      const point = curve.getPoint(t);
      packetRef.current.position.copy(point);
    }
  });

  const lineObject = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: 0x2997ff,
      transparent: true,
      opacity: 0.7,
    });
    return new THREE.Line(curveGeometry, mat);
  }, [curveGeometry]);

  return (
    <group>
      {/* Glowing Arc Line */}
      <primitive object={lineObject} />

      {/* Pulsing Replication Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#5EEAD4" />
      </mesh>

      {/* New York Node Marker */}
      <group position={nyPos}>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#2997FF" />
        </mesh>
        <mesh>
          <ringGeometry args={[0.09, 0.12, 16]} />
          <meshBasicMaterial color="#2997FF" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Hong Kong Node Marker */}
      <group position={hkPos}>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#5EEAD4" />
        </mesh>
        <mesh>
          <ringGeometry args={[0.09, 0.12, 16]} />
          <meshBasicMaterial color="#5EEAD4" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function GlobeContent() {
  const globeGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (globeGroupRef.current) {
      // Slow rotation of entire earth & replication arc
      globeGroupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 4, 5]} intensity={1.5} />
      <directionalLight position={[-5, -2, -3]} intensity={0.5} color="#2997FF" />

      <group ref={globeGroupRef}>
        <DottedGlobe />
        <ReplicationArc />
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export function DualRegionGlobe({
  className = "h-[360px] w-full",
}: {
  className?: string;
}) {
  const capstoneServices = [
    "Active Directory",
    "Exchange Server",
    "Docker",
    "Nextcloud",
    "Rocket.Chat",
    "Zabbix",
    "osTicket",
  ];

  return (
    <div className="relative flex flex-col items-center">
      <div className={`relative ${className}`}>
        <SceneWrapper cameraPosition={[0, 1.2, 4.2]} fov={42}>
          <GlobeContent />
        </SceneWrapper>

        {/* Floating Instruction & Legend */}
        <div className="absolute top-2 left-3 right-3 z-10 flex flex-col gap-1 pointer-events-none">
          <span className="font-mono text-[10px] text-[var(--text-secondary)]">
            Dual-Region DR Topology · Drag to rotate
          </span>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
              New York (Site A)
            </span>
            <span className="flex items-center gap-1.5 text-[var(--accent-2)] font-semibold">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent-2)]" />
              Hong Kong (Site B)
            </span>
          </div>
        </div>
      </div>

      {/* Capstone Service Badges */}
      <div className="w-full mt-3 border-t border-[var(--border)] pt-3">
        <span className="font-mono text-[10px] uppercase text-[var(--text-secondary)] block mb-2">
          Synchronized Enterprise Services (300+ User Simulation):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {capstoneServices.map((service) => (
            <span
              key={service}
              className="rounded-md border border-[var(--border)] bg-[var(--surface-glass)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-primary)]"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
