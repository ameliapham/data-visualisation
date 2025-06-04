import { useRef } from "react"
import { Mesh } from "three"
import { RoundedBox } from "@react-three/drei"

type WaterProps = {
  position: [number, number, number]
  size: [number, number, number]
  nonScreenPercent: number
  screenPercent: number
};

export function Water({
  position,
  size,
  nonScreenPercent,
  screenPercent,
}: WaterProps) {
  const nonScreenRef = useRef<Mesh>(null)
  const screenRef = useRef<Mesh>(null)

  const nonScreenLevel = nonScreenPercent / 100
  const screenLevel = screenPercent / 100

  const availableHeight = size[1] - 0.04
  const nonScreenHeight = availableHeight * nonScreenLevel
  const screenHeight = availableHeight * screenLevel

  const cubeBottom = position[1] - size[1] / 2;
  const nonScreenY = cubeBottom + nonScreenHeight / 2 + 0.02
  const screenY = cubeBottom + nonScreenHeight + screenHeight / 2 + 0.02 

  const nonScreenRadius = Math.min(
    0.08,
    nonScreenHeight / 4,
    (size[0] * 0.96) / 4
  );
  const screenRadius = Math.min(0.08, screenHeight / 4, (size[0] * 0.96) / 4)

  return (
    <group>
      {nonScreenPercent > 0 && (
        <RoundedBox
          ref={nonScreenRef}
          position={[position[0], nonScreenY, position[2]]}
          args={[size[0] * 0.96, nonScreenHeight, size[2] * 0.96]}
          radius={nonScreenRadius}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#a2d2ff"
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
      )}

      {screenPercent > 0 && (
        <RoundedBox
          ref={screenRef}
          position={[position[0], screenY, position[2]]}
          args={[size[0] * 0.96, screenHeight, size[2] * 0.96]}
          radius={screenRadius}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#ffafcc"
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
      )}
    </group>
  )
}
