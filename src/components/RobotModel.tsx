'use client';

import { Suspense, useEffect, useRef, useState, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Error boundary to catch GLTF loading errors and render a fallback 3D shape
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Model loading error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback 3D shape in case the robot model fails to load
function FallbackRobot() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.005;
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.6, 0.18, 120, 16]} />
        <meshStandardMaterial
          color="#60A5FA"
          roughness={0.1}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// Simple loading indicator inside the 3D canvas
function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.03;
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color="#3B82F6" wireframe />
    </mesh>
  );
}

function Robot() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/robot.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.entries(actions).find(([name]) => name.includes('Idle'))?.[1]
        ?? actions[Object.keys(actions)[0]];
      firstAction?.reset().fadeIn(0.25).play();

      return () => {
        firstAction?.fadeOut(0.25);
      };
    }
  }, [actions]);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => {
            material.side = THREE.DoubleSide;
            material.needsUpdate = true;
          });
        }
      });
    }
  }, [scene]);

  return (
    <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.35}>
      <group ref={group} scale={0.35} position={[0, -0.65, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

export default function RobotModel() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 8], fov: 38 }}
      style={{ width: '100%', height: '100%', background: '#050b1c' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={['#050b1c']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#60A5FA" />
      <directionalLight position={[-5, 2, -5]} intensity={0.5} color="#14B8A6" />
      <pointLight position={[0, 3, 0]} intensity={1.0} color="#3B82F6" />
      
      <ErrorBoundary fallback={<FallbackRobot />}>
        <Suspense fallback={<LoadingFallback />}>
          <Robot />
        </Suspense>
      </ErrorBoundary>
      
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={false}
      />
    </Canvas>
  );
}

if (typeof window !== 'undefined') {
  try {
    useGLTF.preload('/robot.glb');
  } catch (err) {
    console.warn("Failed to preload /robot.glb:", err);
  }
}

