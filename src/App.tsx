import { tss } from "tss-react/mui";
import { GlobalStyles } from "tss-react";
import { Canvas } from "@react-three/fiber";
import { Cube } from "./Cube";
import { OrbitControls, Environment } from "@react-three/drei";
import { Water } from "./Water";
import { Controls } from "./Controls"; 
import { useDataStore } from "./hooks/useDataStore";
import { Year } from "./Year";

export function App() {
  const { classes } = useStyles();
  const { selectedCountry, getTimelineData } = useDataStore();

  const timelineData = selectedCountry
    ? getTimelineData()
    : [
        { year: "2005", data: { non_screen: 80, screen: 20 } },
        { year: "2010", data: { non_screen: 65, screen: 35 } },
        { year: "2015", data: { non_screen: 40, screen: 60 } },
        { year: "2024", data: { non_screen: 22, screen: 78 } },
      ];

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
        <Canvas camera={{ position: [10, 6, 8], fov: 60 }}>
          <Environment background={false} preset="warehouse" />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
          <OrbitControls />

          {timelineData.map((item, index) => {
            const cubePosition: [number, number, number] = [index * 3 - 4.5, -2, 0];
            const cubeDimensions: [number, number, number] = [2, 2, 2];

            return (
              <group key={item.year}>
                <Cube position={cubePosition} size={[2, 2, 2]} />
                <Water
                  position={cubePosition}
                  size={[2, 2, 2]}
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
