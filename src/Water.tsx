import { useRef, useMemo } from "react"
import { Mesh } from "three"
import { RoundedBox } from "@react-three/drei"

type WaterProps = {
  position: [number, number, number]
  size: [number, number, number]
  nonScreenPercent: number
  screenPercent: number,
};

type WaterLayerProps = {
  position: [number, number, number]
  size: [number, number, number]
  height: number,
  radius: number,
  color: string
};

type WaterLayerGeometry = {
  height: number,
  y: number,
  radius: number
}

type WaterGeometry = {
  nonSceen: WaterLayerGeometry,
  screen: WaterLayerGeometry
}

type GeometryCalculationProps = {
  position: [number, number, number],
  size: [number, number, number],
  nonScreenPercent: number,
  screenPercent: number
}

const WATER_CONFIG = {
  scale: 0.96,
  padding: 0.02,
  maxRadius: 0.08,
  smoothness: 4,

  // Material properties
  material : {
    roughness: 0.08,
    metalness: 0.1,
    clearcoat: 0.9,
    clearcoatRoughness: 0.15,
    transmission: 0.4,
    thickness: 0.5,
    ior: 1.33,
    opacity: 0.85,
  },

  // Colors
  colors: {
    nonScreen: "#a2d2ff",
    screen: "#ffafcc",
  }
}

function calculateWaterHeight(props: GeometryCalculationProps) : WaterGeometry {
  const {nonScreenPercent, position, screenPercent, size} = props;

  const availableHeight = size[1] - WATER_CONFIG.padding;
  const nonScreenLevel = nonScreenPercent / 102
  const screenLevel = screenPercent / 102

  const nonScreenHeight = availableHeight * nonScreenLevel
  const screenHeight = availableHeight * screenLevel

  const cubeBottom = position[1] - size[1] / 2;

  return {
    nonSceen : {
      height: nonScreenHeight,
      y: cubeBottom + nonScreenHeight / 2 + WATER_CONFIG.padding,
      radius: Math.min(
        WATER_CONFIG.maxRadius,
        nonScreenHeight / 4,
        (size[0] * WATER_CONFIG.scale) / 4
      )
    },
    screen: {
      height: screenHeight,
      y: cubeBottom + nonScreenHeight + screenHeight / 2 + WATER_CONFIG.padding,
      radius: Math.min(
        WATER_CONFIG.maxRadius,
        screenHeight / 4,
        (size[0] * WATER_CONFIG.scale) / 4
      )
    }
  }
}

function WaterLayer(props: WaterLayerProps) {
  const { position, size, height, color, radius } = props;
  const meshRef = useRef<Mesh>(null)

  return (
    <RoundedBox
      ref={meshRef}
      position={position}
      args={[size[0] * WATER_CONFIG.scale, height, size[2] * WATER_CONFIG.scale]}
      radius={radius}
      smoothness={WATER_CONFIG.smoothness}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color={color}
        transparent
        {...WATER_CONFIG.material}
      /> 
    </RoundedBox>
  )
}


export function Water(props: WaterProps) {
  const { position, size, nonScreenPercent, screenPercent } = props;
  const geometry = useMemo(() => calculateWaterHeight({position, size, nonScreenPercent, screenPercent}), [position, size, nonScreenPercent, screenPercent]);

  return (
    <group>
      {nonScreenPercent > 0 && (
        <WaterLayer
          position={[position[0], geometry.nonSceen.y, position[2]]}
          size={size}
          height={geometry.nonSceen.height}
          radius={geometry.nonSceen.radius}
          color={WATER_CONFIG.colors.nonScreen}
        />
          
      )}

      {screenPercent > 0 && (
        <WaterLayer
          position={[position[0], geometry.screen.y, position[2]]}
          size={size}
          height={geometry.screen.height}
          radius={geometry.screen.radius}
          color={WATER_CONFIG.colors.screen}
        />
      )}
    </group>
  )
}
