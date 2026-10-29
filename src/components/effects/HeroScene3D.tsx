"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

interface BlockData {
  mesh: THREE.Mesh;
  targetPos: THREE.Vector3;
  startPos: THREE.Vector3;
  targetRot: THREE.Euler;
  startRot: THREE.Euler;
  isSprout?: boolean;
  targetScale: THREE.Vector3;
}

export default function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let isVisible = true;
    const startTime = performance.now();

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    const initialCamPos = new THREE.Vector3(5.5, 4.2, 6.8);
    camera.position.copy(initialCamPos);
    camera.lookAt(0, 0.4, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x2a2a38, 0x09090b, 0.6);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight.position.set(6, 9, 5);
    scene.add(dirLight);

    // Subtle Growth Green point light
    const greenPointLight = new THREE.PointLight(0x3ddc84, 1.8, 7);
    greenPointLight.position.set(0, 1.5, 1.2);
    scene.add(greenPointLight);

    // Root Group
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);

    // Materials
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x16161c,
      roughness: 0.6,
      metalness: 0.1,
    });
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x22222a,
      roughness: 0.5,
      metalness: 0.15,
    });
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x2d2d38,
      roughness: 0.4,
      metalness: 0.2,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x3ddc84,
      roughness: 0.25,
      metalness: 0.3,
      emissive: 0x3ddc84,
      emissiveIntensity: 0.2,
    });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x1a2e22,
      roughness: 0.2,
      metalness: 0.4,
      emissive: 0x3ddc84,
      emissiveIntensity: 0.15,
    });

    // Create low-poly stylized blocks
    const blockList: BlockData[] = [];
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [
      baseMat,
      wallMat,
      roofMat,
      accentMat,
      glassMat,
    ];

    const addBlock = (
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      targetPos: [number, number, number],
      targetRot: [number, number, number] = [0, 0, 0],
      isSprout = false
    ) => {
      geometriesToDispose.push(geo);
      const mesh = new THREE.Mesh(geo, mat);
      const tPos = new THREE.Vector3(...targetPos);
      const tRot = new THREE.Euler(...targetRot);

      // Random scattered starting pos for assembly animation
      const spread = 2.4;
      const sPos = new THREE.Vector3(
        tPos.x + (Math.random() - 0.5) * spread,
        tPos.y + (isSprout ? -1.5 : 2.5 + Math.random() * 2),
        tPos.z + (Math.random() - 0.5) * spread
      );
      const sRot = new THREE.Euler(
        tRot.x + (Math.random() - 0.5) * 1.5,
        tRot.y + (Math.random() - 0.5) * 1.5,
        tRot.z + (Math.random() - 0.5) * 1.5
      );

      const targetScale = new THREE.Vector3(1, 1, 1);
      if (isSprout) {
        mesh.scale.set(0.01, 0.01, 0.01);
      } else {
        mesh.position.copy(reducedMotion ? tPos : sPos);
        mesh.rotation.copy(reducedMotion ? tRot : sRot);
      }

      houseGroup.add(mesh);
      blockList.push({
        mesh,
        targetPos: tPos,
        startPos: sPos,
        targetRot: tRot,
        startRot: sRot,
        isSprout,
        targetScale,
      });
    };

    // 1. Foundation Base Slab
    addBlock(new THREE.BoxGeometry(3.6, 0.35, 3.2), baseMat, [0, -0.15, 0]);
    addBlock(new THREE.BoxGeometry(3.2, 0.15, 2.8), baseMat, [0, 0.1, 0]);

    // 2. Main Wall Blocks
    addBlock(new THREE.BoxGeometry(1.3, 1.4, 2.4), wallMat, [-0.75, 0.85, 0]);
    addBlock(new THREE.BoxGeometry(1.3, 1.4, 2.4), wallMat, [0.75, 0.85, 0]);
    addBlock(new THREE.BoxGeometry(0.8, 1.4, 0.4), wallMat, [0, 0.85, -1.0]);

    // 3. Entryway & Window Accents
    addBlock(new THREE.BoxGeometry(0.7, 1.1, 0.2), glassMat, [0, 0.65, 1.15]);
    addBlock(new THREE.BoxGeometry(0.5, 0.5, 0.15), glassMat, [-0.75, 1.0, 1.22]);
    addBlock(new THREE.BoxGeometry(0.5, 0.5, 0.15), glassMat, [0.75, 1.0, 1.22]);

    // 4. Gable Roof Blocks
    addBlock(new THREE.BoxGeometry(3.2, 0.25, 2.8), roofMat, [0, 1.65, 0]);
    addBlock(new THREE.BoxGeometry(2.4, 0.35, 2.5), roofMat, [0, 1.95, 0]);
    addBlock(new THREE.BoxGeometry(1.6, 0.35, 2.2), roofMat, [0, 2.3, 0]);
    addBlock(new THREE.BoxGeometry(0.8, 0.35, 1.9), roofMat, [0, 2.65, 0]);

    // 5. Chimney / Growth Spire Base
    addBlock(new THREE.BoxGeometry(0.45, 1.0, 0.45), wallMat, [0.65, 2.7, -0.4]);

    // 6. Upward Sprout / Growth Elements (GrowHaus Idea)
    addBlock(new THREE.BoxGeometry(0.28, 0.28, 0.28), accentMat, [0.65, 3.35, -0.4], [0.4, 0.4, 0], true);
    addBlock(new THREE.BoxGeometry(0.22, 0.35, 0.22), accentMat, [0.78, 3.65, -0.3], [-0.3, 0.6, 0.2], true);
    addBlock(new THREE.BoxGeometry(0.2, 0.3, 0.2), accentMat, [0.55, 3.85, -0.5], [0.2, -0.5, -0.3], true);
    addBlock(new THREE.BoxGeometry(0.16, 0.25, 0.16), accentMat, [0.68, 4.15, -0.38], [0.1, 0.3, 0.1], true);

    setIsLoaded(true);

    // Scroll tracking for single scroll-linked 3D moment
    let scrollProgress = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      scrollProgress = Math.min(scrollY / 500, 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // IntersectionObserver to pause rendering when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    const assembleDuration = 1400; // 1.4s assembly

    const animate = (timestamp: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / assembleDuration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      if (!reducedMotion) {
        // Assembly interpolation
        blockList.forEach((b) => {
          if (progress < 1) {
            b.mesh.position.lerpVectors(b.startPos, b.targetPos, ease);
            b.mesh.rotation.x = THREE.MathUtils.lerp(b.startRot.x, b.targetRot.x, ease);
            b.mesh.rotation.y = THREE.MathUtils.lerp(b.startRot.y, b.targetRot.y, ease);
            b.mesh.rotation.z = THREE.MathUtils.lerp(b.startRot.z, b.targetRot.z, ease);

            if (b.isSprout) {
              const sproutProgress = Math.max((progress - 0.4) / 0.6, 0);
              const sproutEase = 1 - Math.pow(1 - sproutProgress, 3);
              b.mesh.scale.set(sproutEase, sproutEase, sproutEase);
            }
          } else {
            // Once assembled, slowly rotate & float
            b.mesh.position.copy(b.targetPos);
            if (b.isSprout) {
              b.mesh.scale.set(1, 1, 1);
            }
          }
        });

        // Gentle idle rotation
        const time = elapsed * 0.0008;
        houseGroup.rotation.y = time * 0.4 + scrollProgress * 0.45;
        houseGroup.position.y = Math.sin(time * 1.5) * 0.06 - scrollProgress * 0.25;

        // Scroll-linked camera moment
        camera.position.x = initialCamPos.x + scrollProgress * 1.0;
        camera.position.y = initialCamPos.y + scrollProgress * 0.8;
        camera.position.z = initialCamPos.z - scrollProgress * 0.6;
        camera.lookAt(0, 0.4 + scrollProgress * 0.2, 0);
      } else {
        // Reduced motion: static position
        blockList.forEach((b) => {
          b.mesh.position.copy(b.targetPos);
          b.mesh.rotation.copy(b.targetRot);
          b.mesh.scale.set(1, 1, 1);
        });
      }

      renderer.render(scene, camera);

      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (!reducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      // Single render frame for reduced motion
      animate(performance.now());
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      // Clean up Three.js memory
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] flex items-center justify-center pointer-events-none select-none"
      aria-label="Interactive 3D low-poly GrowHaus architectural model"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.6s ease" }}
      />

      {/* Fallback & Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl border border-[#3ddc84]/30 bg-[#121216]/60 flex items-center justify-center animate-pulse">
            <div className="w-6 h-6 rounded-full bg-[#3ddc84]/20 border border-[#3ddc84]" />
          </div>
        </div>
      )}
    </div>
  );
}
