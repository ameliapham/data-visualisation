import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export function DampedOrbitControls() {
  const controls = useRef<OrbitControlsImpl>(null);
  useFrame(() => {
    if (controls.current?.enabled) {
      controls.current.update();
    }
  });
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping={true}
      dampingFactor={0.05}
    />
  );
}