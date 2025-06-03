import { useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  cameraBaseY: number;
  cameraBaseZ: number;
}

export function CameraRigController( props: Props) {
  const { cameraBaseY, cameraBaseZ } = props;
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, pointer } = useThree();

  const mouseInfluenceX = 2;
  const mouseInfluenceY = 1;

  useFrame(() => {
    camera.position.lerp(
      vec.set(
        pointer.x * mouseInfluenceX,
        cameraBaseY - pointer.y * mouseInfluenceY,
        cameraBaseZ 
      ),
      0.05
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}
