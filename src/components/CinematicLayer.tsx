'use client';

import { useEffect, useRef } from 'react';
import styles from './CinematicLayer.module.css';

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let THREE: typeof import('three');
    let scene: import('three').Scene;
    let camera: import('three').PerspectiveCamera;
    let renderer: import('three').WebGLRenderer;
    let particles: import('three').Points;
    let geometry: import('three').BufferGeometry;
    let material: import('three').PointsMaterial;
    let disposed = false;

    const init = async () => {
      THREE = await import('three');

      const canvas = canvasRef.current;
      if (!canvas) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);

      // Particle system
      const COUNT = 280;
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(COUNT * 3);
      const sizes = new Float32Array(COUNT);
      const colors = new Float32Array(COUNT * 3);

      const colorPalette = [
        new THREE.Color('#3B82F6'),
        new THREE.Color('#60A5FA'),
        new THREE.Color('#14B8A6'),
        new THREE.Color('#93C5FD'),
        new THREE.Color('#FFFFFF'),
      ];

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        sizes[i] = Math.random() * 6 + 1;

        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      material = new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: -(e.clientY / window.innerHeight - 0.5) * 2,
        };
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      const posArray = geometry.attributes.position.array as Float32Array;
      const origins = Float32Array.from(posArray);
      const offsets = new Float32Array(COUNT).map(() => Math.random() * Math.PI * 2);

      let t = 0;
      const animate = () => {
        if (disposed) return;
        frameRef.current = requestAnimationFrame(animate);
        t += 0.003;

        for (let i = 0; i < COUNT; i++) {
          const off = offsets[i];
          posArray[i * 3]     = origins[i * 3]     + Math.sin(t * 0.7 + off) * 0.3;
          posArray[i * 3 + 1] = origins[i * 3 + 1] + Math.cos(t * 0.5 + off) * 0.2;
          posArray[i * 3 + 2] = origins[i * 3 + 2] + Math.sin(t * 0.4 + off * 1.3) * 0.15;
        }
        geometry.attributes.position.needsUpdate = true;

        // Parallax
        camera.position.x += (mouseRef.current.x * 0.4 - camera.position.x) * 0.03;
        camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.03;

        particles.rotation.y = t * 0.02;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    };

    const cleanup = init();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameRef.current);
      cleanup.then(fn => fn?.());
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
