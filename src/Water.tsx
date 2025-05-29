import { useRef } from "react";
import { Mesh } from "three";
import { RoundedBox } from "@react-three/drei"

type WaterProps = {
  position: [number, number, number]
  level: number
  size: [number, number, number]
  color?: string
  type?: "population" | "mobile"
}

export function Water({ 
  position, 
  level, 
  size, 
  color = "#4A90E2",
}: WaterProps) {
  const meshRef = useRef<Mesh>(null)
  
  const waterHeight = Math.max(size[1] * level, 0.1)
  const cubeBottom = position[1] - size[1]/2
  const waterY = cubeBottom + waterHeight/2 + 0.05
  
  const safeRadius = Math.min(0.08, waterHeight/4, (size[0] * 0.96)/4, (size[2] * 0.96)/4)

  console.log(`WaterHeight: ${waterHeight.toFixed(3)}, SafeRadius: ${safeRadius.toFixed(3)}, WaterY: ${waterY.toFixed(3)}`)

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        position={[position[0], waterY, position[2]]}
        args={[
          size[0] * 0.96,
          waterHeight,
          size[2] * 0.96
        ]}
        radius={safeRadius}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial 
          color={color}
          transparent 
          opacity={0.85}
          roughness={0.08}
          metalness={0.1}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
          transmission={0.4}
          thickness={0.5}
          ior={1.33}
        />
      </RoundedBox>

    </group>
  )
}
