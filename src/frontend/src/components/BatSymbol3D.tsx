import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Builds a stylized bat-symbol silhouette as an extruded shape.
 * The shape is a symmetric bat outline with outstretched wings.
 */
function useBatShapeGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();

    // Centered bat silhouette — symmetric about x=0.
    // Coordinates roughly fit within [-3, 3] x [-1, 1.2].
    shape.moveTo(0, 1.1);
    shape.quadraticCurveTo(-0.4, 0.7, -0.6, 0.5);
    shape.quadraticCurveTo(-1.1, 0.7, -1.4, 0.4);
    shape.quadraticCurveTo(-1.0, 0.1, -1.6, -0.1);
    shape.quadraticCurveTo(-2.2, -0.2, -2.6, -0.5);
    shape.quadraticCurveTo(-2.0, -0.6, -1.7, -0.9);
    shape.quadraticCurveTo(-1.3, -0.7, -1.0, -0.95);
    shape.quadraticCurveTo(-0.7, -0.6, -0.45, -0.85);
    shape.quadraticCurveTo(-0.25, -0.5, 0, -0.7);
    // mirror to right side
    shape.quadraticCurveTo(0.25, -0.5, 0.45, -0.85);
    shape.quadraticCurveTo(0.7, -0.6, 1.0, -0.95);
    shape.quadraticCurveTo(1.3, -0.7, 1.7, -0.9);
    shape.quadraticCurveTo(2.0, -0.6, 2.6, -0.5);
    shape.quadraticCurveTo(2.2, -0.2, 1.6, -0.1);
    shape.quadraticCurveTo(1.0, 0.1, 1.4, 0.4);
    shape.quadraticCurveTo(1.1, 0.7, 0.6, 0.5);
    shape.quadraticCurveTo(0.4, 0.7, 0, 1.1);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.25,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 4,
      curveSegments: 24,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);
}

function BatMesh() {
  const geometry = useBatShapeGeometry();
  const meshRef = useRef<THREE.Mesh>(null);
  const reduceMotion = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (!meshRef.current || reduceMotion) return;
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.rotation.z = Math.sin(performance.now() / 2000) * 0.05;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[0, 0, 0]} scale={0.5}>
      <meshStandardMaterial
        color="#f5c518"
        emissive="#f5c518"
        emissiveIntensity={0.6}
        metalness={0.7}
        roughness={0.25}
      />
    </mesh>
  );
}

interface BatSymbol3DProps {
  className?: string;
}

/**
 * 3D bat-symbol that rotates and emits a subtle glow.
 * Reusable in the hero section.
 */
export default function BatSymbol3D({ className }: BatSymbol3DProps) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 4]} intensity={2.2} color="#f5c518" />
        <pointLight position={[3, 2, 2]} intensity={0.8} color="#f5c518" />
        <pointLight position={[-3, -2, 2]} intensity={0.5} color="#88a" />
        <Float
          speed={reduceMotion ? 0 : 1.5}
          rotationIntensity={0.3}
          floatIntensity={0.6}
        >
          <BatMesh />
        </Float>
      </Canvas>
    </div>
  );
}

function usePrefersReducedMotion(): boolean {
  const reduceMotionRef = useRef(false);
  if (typeof window !== "undefined" && window.matchMedia) {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }
  return reduceMotionRef.current;
}
