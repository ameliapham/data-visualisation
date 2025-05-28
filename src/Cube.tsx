type Props = {
  position?: [number, number, number];
  size?: [number, number, number];
  color?: string;
  children?: React.ReactNode;
  rotation?: [number, number, number];
  wireframe?: boolean;
};

export function Cube(props: Props) {
  const { children, color, position, size = [1, 1, 1], wireframe, ...rest } = props;

  return (
    <mesh position={position} {...rest} >
      <boxGeometry args={size}  />
      <meshBasicMaterial color={color} wireframe={wireframe} />
      {children}
    </mesh>
  );
}
