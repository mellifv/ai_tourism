import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import KazakhGuide3D from '../components/kazakhGuide';

const ThreeScene = () => {
  return (
    <div style={{ height: '300px', width: '100%', background: 'transparent' }}>
      <Canvas
        camera={{ position: [5, 2, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Simple lighting - no environment textures */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        }>
          <KazakhGuide3D />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;