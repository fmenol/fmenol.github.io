'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

function AsciiRenderer({
  characters = ' .:-+*=%@#',
  invert = true,
  resolution = 0.15,
  fgColor = '#333',
  bgColor = 'transparent',
}: {
  characters?: string;
  invert?: boolean;
  resolution?: number;
  fgColor?: string;
  bgColor?: string;
}) {
  const { gl, size, scene, camera } = useThree();

  useEffect(() => {
    const effect = new AsciiEffect(gl, characters, { invert, resolution });
    effect.setSize(size.width, size.height);
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0';
    effect.domElement.style.left = '0';
    effect.domElement.style.color = fgColor;
    effect.domElement.style.backgroundColor = bgColor;
    effect.domElement.style.pointerEvents = 'none';
    effect.domElement.style.fontFamily = 'monospace';
    effect.domElement.style.lineHeight = '1';
    effect.domElement.style.letterSpacing = '0';

    // Hide the WebGL canvas
    gl.domElement.style.display = 'none';

    // Add ASCII effect to parent
    const parent = gl.domElement.parentElement;
    if (parent) {
      parent.appendChild(effect.domElement);
    }

    const animate = () => {
      effect.render(scene, camera);
    };

    gl.setAnimationLoop(animate);

    return () => {
      gl.setAnimationLoop(null);
      if (parent && effect.domElement.parentElement === parent) {
        parent.removeChild(effect.domElement);
      }
      gl.domElement.style.display = 'block';
    };
  }, [gl, size, scene, camera, characters, invert, resolution, fgColor, bgColor]);

  return null;
}

function Robot() {
  const geometry = useLoader(STLLoader, '/models/robotic-arm.stl');

  return (
    <mesh geometry={geometry} scale={1} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#666" flatShading />
    </mesh>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[50, 50, 50]} />
      <meshStandardMaterial color="#888" wireframe />
    </mesh>
  );
}

export default function RoboticArm3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div style={{ width: '400px', height: '400px', maxWidth: '100%', aspectRatio: '1 / 1' }} className="flex items-center justify-center">
          <pre className="text-muted text-xs">Loading 3D viewer...</pre>
        </div>
        <p className="text-muted text-xs tracking-wider">AI x Bio x VC</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div style={{ width: '400px', height: '400px', maxWidth: '100%', aspectRatio: '1 / 1', position: 'relative' }}>
        <Canvas camera={{ position: [300, 200, 300], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[100, 100, 100]} intensity={1} />
          <directionalLight position={[-100, -100, -100]} intensity={0.3} />
          <Suspense fallback={<LoadingFallback />}>
            <Center>
              <Robot />
            </Center>
          </Suspense>
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            autoRotate
            autoRotateSpeed={1}
            enablePan={false}
            minDistance={100}
            maxDistance={600}
          />
          <AsciiRenderer
            characters=" .:-+*=%@#"
            invert={false}
            resolution={0.2}
            fgColor="#333"
            bgColor="transparent"
          />
        </Canvas>
      </div>
      <p className="text-muted text-xs tracking-wider">AI x Bio x VC</p>
      <p className="text-muted text-[10px]">drag to rotate • scroll to zoom</p>
    </div>
  );
}
