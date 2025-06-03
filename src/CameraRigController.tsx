import { useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function CameraRigController() {
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, mouse } = useThree();

  const cameraBaseY = 4;
  const cameraBaseZ = 10;
  const mouseInfluenceX = 2;
  const mouseInfluenceY = 1;

  useFrame(() => {
    camera.position.lerp(
      vec.set(
        mouse.x * mouseInfluenceX,
        cameraBaseY - mouse.y * mouseInfluenceY,
        cameraBaseZ
      ),
      0.05
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}
