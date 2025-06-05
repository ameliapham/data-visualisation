import { Text } from "@react-three/drei";

type YearProps = {
  year: string;
  position: [number, number, number];
  cubeSize: [number, number, number];
}

const YEAR_CONFIG = {
  fontSize: 0.5,
  color: "#2c3e50",
  fontWeight: "600",
  anchorX: "center" as const,
  anchorY: "middle" as const,

  offset : {
    z: 0.8,
  },

  rotation: [-Math.PI / 2, 0, 0] as const,
}

export function Year(props: YearProps) {
  const { year, position, cubeSize } = props;
  const textYPosition = position[1] - cubeSize[1] / 2;
  const textZPosition = position[2] + cubeSize[2] / 2 + YEAR_CONFIG.offset.z;

  return (
    <Text
      position={[position[0], textYPosition, textZPosition]}
      rotation={YEAR_CONFIG.rotation}
      fontSize={YEAR_CONFIG.fontSize}
      color={YEAR_CONFIG.color}
      anchorX={YEAR_CONFIG.anchorX}
      anchorY={YEAR_CONFIG.anchorY}
      fontWeight={YEAR_CONFIG.fontWeight}
    >
      {year}
    </Text>
  );
}