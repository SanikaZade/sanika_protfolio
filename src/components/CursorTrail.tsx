'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  shape: 'circle' | 'square';
}

const PARTICLE_COUNT = 120;
const REPULSION_RADIUS = 120;
const REPULSION_STRENGTH = 6;
const RETURN_SPEED = 0.08;
const FRICTION = 0.82;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -500, y: -500 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        // ~30% squares, rest circles
        const isSquare = i % 3 === 0;
        return {
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          size: isSquare ? Math.random() * 4 + 3 : Math.random() * 2.5 + 1,
          alpha: isSquare ? Math.random() * 0.13 + 0.15 : Math.random() * 0.23 + 0.12,
          shape: isSquare ? 'square' : 'circle',
        };
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * REPULSION_STRENGTH;
          p.vy -= Math.sin(angle) * force * REPULSION_STRENGTH;
        }

        // Return to origin
        p.vx += (p.originX - p.x) * RETURN_SPEED;
        p.vy += (p.originY - p.y) * RETURN_SPEED;

        // Friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;

        // Glow for circles
        const distToMouse = Math.sqrt((mouse.x - p.x) ** 2 + (mouse.y - p.y) ** 2);
        const glowFactor = Math.max(0, 1 - distToMouse / REPULSION_RADIUS);
        
        if (p.shape === 'square') {
          // Render Square (Distinctly square, no circle glow)
          const s = (p.size + glowFactor * 3) * 2; // Make squares bigger
          const squareAlpha = p.alpha + glowFactor * 0.3;
          
          ctx.fillStyle = `rgba(147,197,253,${squareAlpha})`;
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
          
          // Subtle square outline for better visibility
          ctx.strokeStyle = `rgba(147,197,253,${squareAlpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(p.x - s / 2 - 2, p.y - s / 2 - 2, s + 4, s + 4);
        } else {
          // Render Circle with glow
          const glowAlpha = p.alpha + glowFactor * 0.35;
          const glowSize = p.size + glowFactor * 3;

          // Outer glow ring
          if (glowFactor > 0) {
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize * 2);
            gradient.addColorStop(0, `rgba(96,165,250,${glowFactor * 0.2})`);
            gradient.addColorStop(1, 'rgba(96,165,250,0)');
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowSize * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }

          // Core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size + glowFactor * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147,197,253,${glowAlpha})`;
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
