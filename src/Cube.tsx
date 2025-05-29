import { useRef } from "react"
import { Mesh } from "three"
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei"

interface CubeProps {
  position?: [number, number, number]
  size?: [number, number, number]
}

export function Cube({ 
  position = [0, 0, 0], 
  size = [1, 1, 1]
}: CubeProps) {
  const meshRef = useRef<Mesh>(null)

  return (
    <RoundedBox
      ref={meshRef}
      position={position}
      args={size}
      radius={0.1}
      smoothness={4}
    >
      <MeshTransmissionMaterial
        backside={true}
        samples={4}
        thickness={0.02}
        transmission={0.95} 
        roughness={0.05}
        metalness={0}
        clearcoat={0.1}
        clearcoatRoughness={0.1}
        ior={1.45} 
        chromaticAberration={0.01}
        distortion={0}
        distortionScale={0}
        temporalDistortion={0}
      />
    </RoundedBox>
  )
}
