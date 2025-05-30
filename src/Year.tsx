import { Text } from "@react-three/drei";

interface YearProps {
  year: string;
  position: [number, number, number];
  cubeSize: [number, number, number];
}

export function Year({ year, position, cubeSize }: YearProps) {
  const textYPosition = position[1] - cubeSize[1] / 2 + 3;
  return (
    <Text
      position={[position[0], textYPosition, position[2]]}
      fontSize={0.35}
      color="#2c3e50"
      anchorX="center"
      anchorY="middle"
      fontWeight="600"
    >
      {year}
    </Text>
  );
}

  