"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Grid, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

// Hook to track smoothed scroll progress
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const current = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          setProgress(Math.min(Math.max(current, 0), 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

// Hook to track mobile viewports
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

// 1. Stylized House for Hero, Selected Projects, and Final CTA
function GrowHausHouse({
  scrollProgress,
  reducedMotion,
  isMobile,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const foundationRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const roofRef = useRef<THREE.Mesh>(null);
  const sprout1Ref = useRef<THREE.Mesh>(null);
  const sprout2Ref = useRef<THREE.Mesh>(null);
  const sprout3Ref = useRef<THREE.Mesh>(null);

  const { blockMaterial, greenGlowMaterial, windowMaterial } = useMemo(() => {
    return {
      blockMaterial: new THREE.MeshStandardMaterial({
        color: "#1c2228",
        metalness: 0.85,
        roughness: 0.2,
      }),
      greenGlowMaterial: new THREE.MeshStandardMaterial({
        color: "#3ddc84",
        emissive: "#3ddc84",
        emissiveIntensity: 2.2,
        roughness: 0.2,
      }),
      windowMaterial: new THREE.MeshStandardMaterial({
        color: "#22c55e",
        emissive: "#3ddc84",
        emissiveIntensity: 3.2,
        roughness: 0.1,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (!reducedMotion) {
      groupRef.current.rotation.y = t * 0.22;
    }

    const isHero = scrollProgress < 0.22;
    const isFinalCta = scrollProgress >= 0.88;

    let targetX = isMobile ? 0.0 : 1.85;
    let targetY = -1.02;
    let targetZ = 0.0;
    let targetScale = isMobile ? 0.55 : 0.72;
    let disperse = 0;

    if (isHero) {
      // Hero: Desktop right side, mobile centered behind text at lower scale
      targetX = isMobile ? 0.0 : 1.85;
      targetY = -1.02;
      targetZ = 0.0;
      targetScale = isMobile ? 0.55 : 0.72;
      disperse = 0;
    } else if (isFinalCta) {
      // Final CTA: Centered in lower half of screen, leaving clear reading space for headline
      targetX = 0.0;
      targetY = -1.18;
      targetZ = 0.0;
      targetScale = isMobile ? 0.52 : 0.68;
      disperse = 0;
    } else {
      // Middle sections (Selected Concept Projects & What We Can Build):
      // Cleanly framed in the right background, never pushed off into corners
      targetX = isMobile ? 0.0 : 1.95;
      targetY = -0.98;
      targetZ = -2.2;
      targetScale = isMobile ? 0.36 : 0.48;
      disperse = Math.min((scrollProgress - 0.22) * 0.4, 0.12);
    }

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 3.5);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 3.5);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 3.5);

    const curScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(curScale, targetScale, delta * 3.5);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);

    if (bodyRef.current) bodyRef.current.position.y = 0.8 + disperse * 0.2;
    if (roofRef.current) roofRef.current.position.y = 1.7 + disperse * 0.35;
    if (sprout1Ref.current) sprout1Ref.current.position.y = 2.1 + (Math.sin(t * 2) * 0.04) + disperse * 0.45;
    if (sprout2Ref.current) sprout2Ref.current.position.y = 2.4 + (Math.sin(t * 2 + 1) * 0.04) + disperse * 0.55;
    if (sprout3Ref.current) sprout3Ref.current.position.y = 2.7 + (Math.sin(t * 2 + 2) * 0.04) + disperse * 0.65;
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 1.85, -1.02, 0]}>
      {/* Foundation Block */}
      <mesh ref={foundationRef} position={[0, 0, 0]} material={blockMaterial} castShadow>
        <boxGeometry args={[2.2, 0.35, 2.2]} />
      </mesh>

      {/* Main Ground Floor Body */}
      <mesh ref={bodyRef} position={[0, 0.8, 0]} material={blockMaterial} castShadow>
        <boxGeometry args={[1.7, 1.2, 1.7]} />
      </mesh>

      {/* Glowing Green Windows on Ground Floor */}
      <mesh position={[0, 0.8, 0.86]} material={windowMaterial}>
        <planeGeometry args={[0.9, 0.5]} />
      </mesh>
      <mesh position={[0.86, 0.8, 0]} rotation={[0, Math.PI / 2, 0]} material={windowMaterial}>
        <planeGeometry args={[0.7, 0.5]} />
      </mesh>
      <mesh position={[-0.86, 0.8, 0]} rotation={[0, -Math.PI / 2, 0]} material={windowMaterial}>
        <planeGeometry args={[0.7, 0.5]} />
      </mesh>

      {/* Gabled Roof Block */}
      <mesh ref={roofRef} position={[0, 1.7, 0]} material={blockMaterial} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.4, 0.9, 4]} />
      </mesh>

      {/* Growing Sprout Blocks (Emerald Green Brand Accent) */}
      <mesh ref={sprout1Ref} position={[-0.3, 2.1, 0.2]} material={greenGlowMaterial}>
        <boxGeometry args={[0.22, 0.35, 0.22]} />
      </mesh>
      <mesh ref={sprout2Ref} position={[0.2, 2.4, -0.2]} material={greenGlowMaterial}>
        <boxGeometry args={[0.18, 0.45, 0.18]} />
      </mesh>
      <mesh ref={sprout3Ref} position={[0.0, 2.7, 0.1]} material={greenGlowMaterial}>
        <octahedronGeometry args={[0.18]} />
      </mesh>

      {/* Inner Green Glow Point Light radiating outward */}
      <pointLight position={[0, 0.9, 0]} color="#3ddc84" intensity={4.5} distance={8} />
    </group>
  );
}

// 2. 8 Floating Screens for What We Can Build & Work (tightly clustered in right background)
function BackgroundScreens({ scrollProgress, isMobile }: { scrollProgress: number; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const screenMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#141820",
      metalness: 0.85,
      roughness: 0.2,
      emissive: "#1b4d2e",
      emissiveIntensity: 0.8,
    });
  }, []);

  const borderMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: "#3ddc84",
      wireframe: true,
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    const active = scrollProgress >= 0.18 && scrollProgress <= 0.58;
    const targetScale = active ? (isMobile ? 0.32 : 0.45) : 0.001;

    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3.5);

    if (active) {
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  const screens = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 1.5;
      return {
        id: i,
        position: [Math.cos(angle) * radius, (i % 2 === 0 ? 0.25 : -0.25), Math.sin(angle) * radius] as [number, number, number],
        rotation: [0, -angle + Math.PI / 2, 0] as [number, number, number],
      };
    });
  }, []);

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 1.8, -0.6, -2.4]} scale={[0.001, 0.001, 0.001]}>
      {screens.map((s) => (
        <group key={s.id} position={s.position} rotation={s.rotation}>
          <mesh material={screenMaterial}>
            <planeGeometry args={[1.0, 0.65]} />
          </mesh>
          <mesh material={borderMaterial} position={[0, 0, 0.01]}>
            <planeGeometry args={[1.02, 0.67]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 3. Floating Geometric Cluster for Services & Team (Contained, non-overflowing)
function ServiceCluster({ scrollProgress, isMobile }: { scrollProgress: number; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Active during Services and Team
    const active = scrollProgress >= 0.55 && scrollProgress <= 0.82;
    const targetScale = active ? (isMobile ? 0.35 : 0.46) : 0.001;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3.5);

    if (active) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0.0 : 1.75, -0.6, -1.8]} scale={[0.001, 0.001, 0.001]}>
      {/* Contained Pyramid/Cone */}
      <mesh position={[-0.6, 0.1, 0]}>
        <coneGeometry args={[0.26, 0.42, 4]} />
        <meshStandardMaterial color="#3ddc84" emissive="#3ddc84" emissiveIntensity={1.2} />
      </mesh>
      {/* Contained Box */}
      <mesh position={[0.6, 0.1, 0]}>
        <boxGeometry args={[0.32, 0.32, 0.32]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1.2} />
      </mesh>
      {/* Contained Sphere */}
      <mesh position={[0, -0.28, 0.25]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.2} />
      </mesh>
      {/* Contained Octahedron */}
      <mesh position={[-0.35, -0.25, -0.25]}>
        <octahedronGeometry args={[0.22]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.2} />
      </mesh>
      {/* Contained Dodecahedron */}
      <mesh position={[0.35, -0.25, -0.25]}>
        <dodecahedronGeometry args={[0.22]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

// 4. Glowing Waypoints for Process
function ProcessWaypoints({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const active = scrollProgress >= 0.72 && scrollProgress <= 0.88;
    const targetScale = active ? 0.8 : 0.001;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3.5);
  });

  const waypoints = useMemo(() => {
    return [
      { id: 1, pos: [-1.6, 0.1, -0.3] },
      { id: 2, pos: [-0.8, -0.2, 0] },
      { id: 3, pos: [0.0, 0.2, 0.3] },
      { id: 4, pos: [0.8, -0.2, 0] },
      { id: 5, pos: [1.6, 0.1, -0.3] },
    ];
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.5, -1.8]} scale={[0.001, 0.001, 0.001]}>
      {waypoints.map((wp) => (
        <group key={wp.id} position={wp.pos as [number, number, number]}>
          <mesh>
            <torusGeometry args={[0.24, 0.025, 16, 32]} />
            <meshStandardMaterial color="#3ddc84" emissive="#3ddc84" emissiveIntensity={2.5} />
          </mesh>
          <pointLight color="#3ddc84" intensity={1.8} distance={3.0} />
        </group>
      ))}
    </group>
  );
}

// Main 3D World Scene
function ThreeWorld({
  scrollProgress,
  reducedMotion,
  isMobile,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 6]} intensity={3.2} color="#ffffff" />
      <directionalLight position={[-8, 4, -4]} intensity={4.2} color="#3ddc84" />
      <directionalLight position={[8, -2, -3]} intensity={2.8} color="#10b981" />

      {/* Vibrant Floating Sparkles in Space */}
      <Sparkles count={35} scale={14} size={2.2} speed={0.3} color="#3ddc84" opacity={0.5} />

      {/* Reflective Floor Grid: Perfectly placed right below foundation */}
      <group position={[0, -1.22, -1.0]}>
        <Grid
          infiniteGrid
          cellSize={1.0}
          sectionSize={3.0}
          cellColor="#104222"
          sectionColor="#3ddc84"
          fadeDistance={26}
          fadeStrength={1.5}
        />
      </group>

      {/* Hero, Concept Projects & Final CTA House */}
      <Float
        speed={reducedMotion ? 0 : 1.0}
        rotationIntensity={reducedMotion ? 0 : 0.10}
        floatIntensity={reducedMotion ? 0 : 0.10}
      >
        <GrowHausHouse
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />
      </Float>

      {/* 8 Floating Screens during Build & Work */}
      <BackgroundScreens scrollProgress={scrollProgress} isMobile={isMobile} />

      {/* Service Geometric Cluster (Contained Triangles & Shapes) */}
      <ServiceCluster scrollProgress={scrollProgress} isMobile={isMobile} />

      {/* Process Waypoints */}
      <ProcessWaypoints scrollProgress={scrollProgress} />

      <AdaptiveDpr pixelated={false} />
    </>
  );
}

export default function PersistentCanvas() {
  const scrollProgress = useScrollProgress();
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Hero Ambient Emerald Glow Backdrop */}
      <div
        className="absolute top-0 right-0 w-[55vw] h-[85vh] pointer-events-none transition-opacity duration-1000"
        style={{
          background: "radial-gradient(circle at 65% 45%, rgba(61, 220, 132, 0.22) 0%, rgba(16, 185, 129, 0.08) 40%, transparent 70%)",
          opacity: scrollProgress < 0.25 ? 1 : 0.3,
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <ThreeWorld
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
}
