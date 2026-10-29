
"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

export default function AuroraShader({
  className = "",
  opacity = 0.28,
}: {
  className?: string;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let t = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Organic aurora layers
      const layers = [
        {
          color: "rgba(61, 220, 132, 0.45)", // Growth Green
          freq: 0.002,
          speed: 0.008,
          yOffset: 0.45,
          amplitude: 70,
        },
        {
          color: "rgba(16, 185, 129, 0.35)", // Emerald
          freq: 0.003,
          speed: 0.012,
          yOffset: 0.55,
          amplitude: 90,
        },
        {
          color: "rgba(34, 197, 94, 0.25)",
          freq: 0.0015,
          speed: 0.006,
          yOffset: 0.65,
          amplitude: 60,
        },
      ];

      layers.forEach((layer) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 15) {
          const y =
            height * layer.yOffset +
            Math.sin(x * layer.freq + t * layer.speed) * layer.amplitude +
            Math.cos(x * 0.001 - t * layer.speed * 0.5) * 30;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
        grad.addColorStop(0, layer.color);
        grad.addColorStop(1, "rgba(9, 9, 11, 0)");
        ctx.fillStyle = grad;
        ctx.fill();
      });

      t += 1;

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
