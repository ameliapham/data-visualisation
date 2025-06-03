import { Box, FormControl, Select, MenuItem, Chip, Typography,} from "@mui/material";
import { useDataStore } from "./hooks/useDataStore";
import { tss } from "tss-react/mui";

type Props = {
  className?: string;
};

export function Controls(props: Props) {
  const { className } = props;

  const { selectedCountry, availableCountries, selectCountry, clearSelection } =
    useDataStore();

  const { cx, classes } = useStyles();

  return (
    <Box className={cx(classes.root, className)}>
      <Typography variant="h6" className={classes.title}>
        Entertainment Evolution
      </Typography>

      <FormControl fullWidth className={classes.formControl}>
        <Select
          value={selectedCountry?.code || ""}
          displayEmpty
          onChange={(e) => {
            if (e.target.value) {
              selectCountry(e.target.value as string);
            }
          }}
        >
          <MenuItem value="" disabled>
            🌍 Select a country
          </MenuItem>
          {availableCountries.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              <Box className={classes.menuItemContent}>
                <span style={{ fontSize: "1.2em" }}>{country.flag}</span>
                <span>{country.name}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCountry && (
        <Box className={classes.selectedCountryContainer}>
          <Chip
            label={`${selectedCountry.flag} ${selectedCountry.name}`}
            onDelete={clearSelection}
            className={classes.chip}
          />
          <Typography variant="body2" className={classes.chipLabel}>
            {selectedCountry.context}
          </Typography>
        </Box>
      )}

      <Box className={classes.legend}>
        <Typography variant="subtitle2" className={classes.legendTitle}>
          Legend:
        </Typography>
        <Box className={classes.legendItem}>
          <Box className={classes.legendRow}>
            <Box
              className={cx(classes.legendColorBox, classes.legendColorBoxScreen)}
            />
            <Typography variant="body2" className={classes.legendText}>
              Screen-based entertainment
            </Typography>
          </Box>
          <Box className={classes.legendRow}>
            <Box
              className={cx(
                classes.legendColorBox,
                classes.legendColorBoxNonScreen
              )}
            />
            <Typography variant="body2" className={classes.legendText}>
              Non-screen entertainment
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = tss.withName({ Controls }).create(() => ({
  root: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1000,
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 20,
    borderRadius: 3,
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    minWidth: 300,
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#333",
    marginBottom: 10,
  },
  formControl: {
    marginBottom: 20,
  },
  menuItemContent: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  selectedCountryContainer: {
    marginBottom: 16,
  },
  chip: {
    marginRight: 10,
    marginBottom: 10,
  },
  chipLabel: {
    color: "#666",
    fontStyle: "italic",
    fontSize: "0.85rem",
    lineHeight: 1.4,
  },
  legend: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: "1px solid #eee",
  },
  legendTitle: {
    fontWeight: 600,
    marginBottom: 10,
    color: "#555",
  },
  legendItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  legendRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  legendColorBox: {
    width: 16,
    height: 16,
    borderRadius: 2,
    opacity: 0.8,
  },
  legendColorBoxScreen: {
    backgroundColor: "#E74C3C",
  },
  legendColorBoxNonScreen: {
    backgroundColor: "#3498DB",
  },
  legendText: {
    fontSize: "0.8rem",
  },
}));
