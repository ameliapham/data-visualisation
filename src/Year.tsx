import { Text } from "@react-three/drei";

type YearProps = {
  year: string;
  position: [number, number, number];
  cubeSize: [number, number, number];
}

export function Year({ year, position, cubeSize }: YearProps) {
  const textYPosition = position[1] - cubeSize[1] / 2;
  const textZPosition = position[2] + cubeSize[2] / 2 + 0.8;

  return (
    <Text
      position={[position[0], textYPosition, textZPosition]}
      rotation={[-Math.PI / 2, 0, 0]}
      fontSize={0.5}
      color="#2c3e50"
      anchorX="center"
      anchorY="middle"
      fontWeight="600"
    >
      {year}
    </Text>
  );
}