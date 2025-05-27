import { tss } from "tss-react/mui";

export function App() {

    const { classes } = useStyles();

    return (
        <div className={classes.root}>
          <h1>Hello World</h1>
        </div>
      );
}

const useStyles = tss
    .withName({ App })
    .create(({ theme }) => ({
        root: {
            backgroundColor: "pink",
            color: "black",
            padding: theme.spacing(2),
            textAlign: "center",
        },
    }));