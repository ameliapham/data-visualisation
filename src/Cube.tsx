import { useRef } from "react"
import { Mesh } from "three"
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei"

type CubeProps = {
  position?: [number, number, number]
  size?: [number, number, number]
}

// CONFIG : Geometry settings
const CUBE_GEOMETRY_CONFIG = {
  radius: 0.1,
  smoothness: 4,
  castShadow: true,
}

// CONFIG : Material settings (Glass effect)
const GLASS_MATERIAL_CONFIG = {
  // Transparency settings
  backside: true,
  transmission: 0.95, 
  thickness: 0.02,

  // Surface quality
  samples: 4,
  roughness: 0.05,
  metalness: 0,

  // Clearcoat settings
  clearcoat: 0.1,
  clearcoatRoughness: 0.1,

  // Physical properties
  ior : 1.45,

  // VIsual effects
  chromaticAberration: 0.01,
  distortion: 0,
  distortionScale: 0,
  temporalDistortion: 0,
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
      radius={CUBE_GEOMETRY_CONFIG.radius}
      smoothness={CUBE_GEOMETRY_CONFIG.smoothness}
      castShadow={CUBE_GEOMETRY_CONFIG.castShadow}
    >
      <MeshTransmissionMaterial {...GLASS_MATERIAL_CONFIG}/>
    </RoundedBox>
  )
}
