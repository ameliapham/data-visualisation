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

export function App() {
  const { classes } = useStyles();
  const { selectedCountry, getTimelineData } = useDataStore();

  const platformTexture = useLoader(
    THREE.TextureLoader, "/textures/alpha.webp");

  const timelineData = selectedCountry
    ? getTimelineData()
    : [
        { year: "2005", data: { non_screen: 80, screen: 20 } },
        { year: "2010", data: { non_screen: 65, screen: 35 } },
        { year: "2015", data: { non_screen: 40, screen: 60 } },
        { year: "2024", data: { non_screen: 22, screen: 78 } },
      ];

  const shakeConfig = {
    maxYaw: 0.05,
    maxPitch: 0.05,
    maxRoll: 0.03,
    yawFrequency: 0.3,
    pitchFrequency: 0.3,
    rollFrequency: 0.25,
    intensity: 0.8,
    decay: false,
  };

  const initialCameraPosition: [number, number, number] = [0, 2, 10];

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
        <Canvas
          shadows
          camera={{
            position: initialCameraPosition,
            fov: 60,
          }}
        >
          <color attach="background" args={["#FFB6C1"]} />
          <Environment background={false} preset="warehouse" />
          <ambientLight intensity={0} />
          <directionalLight
            position={[8, 8, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
          />

          <DampedOrbitControls />
          <CameraRigController cameraBaseY={initialCameraPosition[1]} cameraBaseZ={initialCameraPosition[2]}/> 
          <CameraShake {...shakeConfig} />

          <mesh
            position={[0, -3.2, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial 
              color="#F1B3C1" 
              alphaMap={platformTexture}
              transparent
            />
          </mesh>
          
          {timelineData.map((item, index) => {
            const cubePosition: [number, number, number] = [index * 3 - 4.5, -2, 0,];
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
