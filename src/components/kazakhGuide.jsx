import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const KazakhGuide3D = () => {
  const groupRef = useRef();
  const rightArmRef = useRef();
  const leftArmRef = useRef();
  const hatRef = useRef();
  const dombraRef = useRef();
  const coatRef = useRef();
  const musicNoteRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.04;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.05;
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.3 + Math.sin(t * 2) * 0.12; // smoother wave
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.15 + Math.sin(t * 1.5) * 0.06;
    }

    if (hatRef.current) {
      hatRef.current.position.y = 1.78 + Math.sin(t * 2) * 0.01;
    }

    if (dombraRef.current) {
      dombraRef.current.rotation.z = Math.sin(t * 1.8) * 0.06;
    }

    if (coatRef.current) {
      coatRef.current.rotation.z = Math.sin(t * 1.1) * 0.015;
    }

    if (musicNoteRef.current) {
      musicNoteRef.current.position.y = 2.4 + Math.sin(t * 3) * 0.06;
      musicNoteRef.current.rotation.z = Math.sin(t * 2) * 0.4;
    }
  });

  return (
    <group ref={groupRef} scale={1.15}>
      {/* Hat */}
      <group ref={hatRef} position={[0, 1.75, 0]}>
        <mesh>
          <coneGeometry args={[0.65, 0.85, 16]} />
          <meshStandardMaterial color="#F5F5F5" />
        </mesh>

        {/* Clean flat brim */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.06, 32]} />
          <meshStandardMaterial color="#C4A484" />
        </mesh>
      </group>

      {/* Head */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.48, 16, 16]} />
        <meshStandardMaterial color="#FFE0BD" />

        {/* Eyes */}
        <mesh position={[0.16, 0.05, 0.42]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        <mesh position={[-0.16, 0.05, 0.42]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>

        {/* Smile */}
        <mesh position={[0, -0.12, 0.43]}>
          <torusGeometry args={[0.11, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </mesh>

      {/* Body / Coat */}
      <group ref={coatRef} position={[0, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.45, 0.55, 1, 16]} />
          <meshStandardMaterial color="#7A3E15" />
        </mesh>

        {/* Simplified clean chest plate */}
        <mesh position={[0, 0.22, 0.4]}>
          <boxGeometry args={[0.55, 0.25, 0.05]} />
          <meshStandardMaterial color="#D4AF37" />
        </mesh>
      </group>

      {/* Arms */}
      <group>
        <group ref={leftArmRef} position={[-0.55, 0.8, 0]} rotation={[0, 0, -0.2]}>
          <mesh>
            <cylinderGeometry args={[0.09, 0.09, 0.55, 12]} />
            <meshStandardMaterial color="#FFE0BD" />
          </mesh>
        </group>

        <group ref={rightArmRef} position={[0.55, 0.8, 0]} rotation={[0, 0, 0.2]}>
          <mesh>
            <cylinderGeometry args={[0.09, 0.09, 0.55, 12]} />
            <meshStandardMaterial color="#FFE0BD" />
          </mesh>

          {/* Dombra */}
          <group ref={dombraRef} position={[0, -0.25, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <mesh scale={[1, 1, 0.5]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#A0522D" />
            </mesh>

            <mesh position={[0, 0.55, 0]}>
              <boxGeometry args={[0.06, 0.8, 0.04]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          </group>
        </group>
      </group>

      {/* Legs */}
      <group>
        <mesh position={[-0.15, -0.55, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.55, 12]} />
          <meshStandardMaterial color="#4A3520" />
        </mesh>
        <mesh position={[0.15, -0.55, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.55, 12]} />
          <meshStandardMaterial color="#4A3520" />
        </mesh>
      </group>

      {/* Greeting */}
      <Text position={[0, 2.3, 0]} fontSize={0.23} color="#D4AF37" anchorX="center" anchorY="middle">
        Salem! 
      </Text>

      {/* Music Notes */}
      <group ref={musicNoteRef}>
        {[0, 0.25, -0.25].map((x, i) => (
          <mesh key={i} position={[x, 2.45, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#D4AF37" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default KazakhGuide3D;
