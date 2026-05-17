import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../store/gameStore'

const Field = () => {
  const gameStore = useGameStore()
  const ballRef = useRef()
  const playersRef = useRef([])

  // Create field
  const fieldGeometry = new THREE.PlaneGeometry(53.33, 120)
  const fieldMaterial = new THREE.MeshStandardMaterial({ color: '#000000' })

  // Yard lines
  const yardLineGeometry = new THREE.BufferGeometry()
  const yardLinePositions = []
  for (let i = 0; i <= 100; i += 10) {
    yardLinePositions.push(-26.67, i - 60, 0.01)
    yardLinePositions.push(26.67, i - 60, 0.01)
  }
  yardLineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(yardLinePositions), 3))

  useFrame(() => {
    // Update ball position
    if (ballRef.current) {
      const ballX = (gameStore.ballPosition - 50) * 1.2
      ballRef.current.position.x = ballX
    }
  })

  return (
    <group>
      {/* Field Plane */}
      <mesh geometry={fieldGeometry} material={fieldMaterial} position={[0, 0, 0]} />

      {/* Yard Lines */}
      <lineSegments>
        <bufferGeometry attach="geometry">
          {yardLineGeometry.attributes.position && (
            <bufferAttribute attach="attributes-position" {...yardLineGeometry.attributes.position} />
          )}
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#ffffff" linewidth={2} />
      </lineSegments>

      {/* Line of Scrimmage (LOS) */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[26.67, 26.67, 0.1, 32]} />
        <meshBasicMaterial color="#0000ff" />
      </mesh>

      {/* First Down Indicator */}
      <mesh position={[2, 0, 0.02]}>
        <cylinderGeometry args={[26.67, 26.67, 0.05, 32]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>

      {/* Ball */}
      <mesh ref={ballRef} position={[-10, 0, 2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Home Team Players (Blue) */}
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh key={`home-${i}`} position={[-15, -20 + i * 4, 1]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={gameStore.homeTeam?.primaryColor || '#0000ff'} />
        </mesh>
      ))}

      {/* Away Team Players (Red) */}
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh key={`away-${i}`} position={[15, -20 + i * 4, 1]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={gameStore.awayTeam?.primaryColor || '#ff0000'} />
        </mesh>
      ))}
    </group>
  )
}

export default Field
