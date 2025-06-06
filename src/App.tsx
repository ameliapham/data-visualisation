import { tss } from "tss-react/mui";
import { GlobalStyles } from "tss-react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Cube } from "./Cube";
import { CameraShake, Environment } from "@react-three/drei";
import { DampedOrbitControls } from "./DampedOrbitControls";
import { CameraRigController } from "./CameraRigController";
import { Water } from "./Water";
import { Controls } from "./Controls";
import { useDataStore } from "./hooks/useDataStore";
import { Year } from "./Year";
import * as THREE from "three";
import { Suspense, useMemo } from "react";

const CAMERA_CONFIG = {
  position: [0, 2, 10] as [number, number, number],
  fov: 60,
};

const SHAKE_CONFIG = {
  maxYaw: 0.05,
  maxPitch: 0.05,
  maxRoll: 0.03,
  yawFrequency: 0.3,
  pitchFrequency: 0.3,
  rollFrequency: 0.25,
  intensity: 0.8,
  decay: false,
};

const LIGHTING_CONFIG = {
  directionalLight: {
    position: [-8, 8, 5] as [number, number, number],
    intensity: 1,
    shadowMapSize: 2048,
    shadowCameraSize: 15,
    shadowCameraFar: 50,
  },
};

const PLATFORM_CONFIG = {
  position: [0, -3.2, 0] as [number, number, number],
  rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
  size: [50, 50] as [number, number],
  color: "#F1B3C1",
};

function Lighting() {
  return (
    <>
      <ambientLight intensity={0} />
      <directionalLight
        position={LIGHTING_CONFIG.directionalLight.position}
        intensity={LIGHTING_CONFIG.directionalLight.intensity}
        castShadow
        shadow-mapSize-width={LIGHTING_CONFIG.directionalLight.shadowMapSize}
        shadow-mapSize-height={LIGHTING_CONFIG.directionalLight.shadowMapSize}
        shadow-camera-far={LIGHTING_CONFIG.directionalLight.shadowCameraFar}
        shadow-camera-left={-LIGHTING_CONFIG.directionalLight.shadowCameraSize}
        shadow-camera-right={LIGHTING_CONFIG.directionalLight.shadowCameraSize}
        shadow-camera-top={LIGHTING_CONFIG.directionalLight.shadowCameraSize}
        shadow-camera-bottom={
          -LIGHTING_CONFIG.directionalLight.shadowCameraSize
        }
      />
    </>
  );
}

function Platform({ texture }: { texture: THREE.Texture }) {
  return (
    <mesh
      position={PLATFORM_CONFIG.position}
      rotation={PLATFORM_CONFIG.rotation}
      receiveShadow
    >
      <planeGeometry args={PLATFORM_CONFIG.size} />
      <meshStandardMaterial
        color={PLATFORM_CONFIG.color}
        alphaMap={texture}
        transparent
      />
    </mesh>
  );
}

function CameraRig() {
  return (
    <>
      <DampedOrbitControls />
      <CameraRigController
        cameraBaseY={CAMERA_CONFIG.position[1]}
        cameraBaseZ={CAMERA_CONFIG.position[2]}
      />
      <CameraShake {...SHAKE_CONFIG} />
    </>
  );
}

function TimelineVisualization({data}: {data: Array<{ year: string; data: { non_screen: number; screen: number } }>}) {
  return (
    <>
      <Cube position={[-100, -100, -100]} size={[0.01, 0.01, 0.01]} />

      {data.map((item, index) => {
        const cubePosition: [number, number, number] = [index * 3 - 4.5, -2, 0];
        const cubeDimensions: [number, number, number] = [2, 2, 2];

        return (
          <group key={item.year}>
            <Cube position={cubePosition} size={cubeDimensions} />
            <Water
              position={cubePosition}
              size={cubeDimensions}
              nonScreenPercent={item.data.non_screen}
              screenPercent={item.data.screen}
            />
            <Year
              year={item.year}
              position={cubePosition}
              cubeSize={cubeDimensions}
            />
          </group>
        );
      })}
    </>
  );
}

function Scene() {
  const { selectedCountry, getTimelineData, years: storeYears,} = useDataStore();
  const platformTexture = useLoader( THREE.TextureLoader, "/textures/alpha.webp" );

  const timelineData = useMemo(() => {
    return selectedCountry
      ? getTimelineData()
      : storeYears.map((year) => ({
          year: year,
          data: { non_screen: 0, screen: 0 },
        }));
  }, [selectedCountry, getTimelineData, storeYears]);

  return (
    <>
      <Environment background={false} preset="dawn" />
      <color attach="background" args={["#FFB6C1"]} />

      <Lighting />
      <Platform texture={platformTexture} />
      <CameraRig />

      <TimelineVisualization data={timelineData} />
    </>
  );
}

export function App() {
  const { classes } = useStyles();

  return (
    <>
      <GlobalStyles
        styles={{
          "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          },
        }}
      />
      <div className={classes.root}>
        <Controls />
        <Canvas shadows camera={CAMERA_CONFIG}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

const useStyles = tss.withName({ App }).create(() => ({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
    position: "relative",
  },
}));
