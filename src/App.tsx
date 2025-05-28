import { tss } from "tss-react/mui";
import { GlobalStyles } from "tss-react";
import { Canvas } from "@react-three/fiber";
import { Cube } from "./Cube";

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
        <Canvas>
          <Cube position={[-2, 0, 0]} size={[1, 1, 1]} />
          <Cube rotation={[0.5, 0.5, 0]} color="red" wireframe/>
          <Cube position={[2, 0, 0]} size={[1, 1, 1]} color="orange" />
        </Canvas>
      </div>
    </>
  );
}

const useStyles = tss.withName({ App }).create(() => ({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "pink",
    textAlign: "center",
  },
}));
