import { Box, FormControl, Select, MenuItem, Typography, IconButton, Fade, Slide} from "@mui/material";
import { useState } from "react";
import { useDataStore } from "./hooks/useDataStore";
import { tss } from "tss-react/mui";

type Props = {
  className?: string;
};

export function Controls(props: Props) {
  const { className } = props;
  const [showDetails, setShowDetails] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { selectedCountry, availableCountries, selectCountry, clearSelection } = useDataStore();

  const { cx, classes } = useStyles();

  return (
    <>
      {/* Collapsed Hamburger Button */}
      {isCollapsed && (
        <Fade in timeout={300}>
          <Box className={classes.hamburgerContainer}>
            <IconButton
              onClick={() => setIsCollapsed(false)}
              className={classes.hamburgerButton}
              title="Open menu"
            >
              <span className={classes.hamburgerIcon}>☰</span>
            </IconButton>
            {selectedCountry && (
              <Box className={classes.collapsedIndicator}>
                <span className={classes.collapsedFlag}>
                  {selectedCountry.flag}
                </span>
              </Box>
            )}
          </Box>
        </Fade>
      )}

      {/* Main Panel */}
      <Slide direction="right" in={!isCollapsed} timeout={400}>
        <Box className={cx(classes.root, className)}>
          {/* Close/Collapse Button */}
          <IconButton
            onClick={() => setIsCollapsed(true)}
            className={classes.collapseButton}
            title="Collapse menu"
          >
            <span className={classes.collapseIcon}>✕</span>
          </IconButton>

          <Box className={classes.content}>
            <Box className={classes.header}>
              <Typography variant="h5" className={classes.title}>
                Entertainment Journey
              </Typography>
              <Typography variant="body2" className={classes.subtitle}>
                Explore global entertainment evolution
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" className={classes.sectionLabel}>
                Choose Your Destination ✨
              </Typography>

              <FormControl fullWidth className={classes.formControl}>
                <Select
                  value={selectedCountry?.code || ""}
                  displayEmpty
                  onChange={(e) => {
                    if (e.target.value) {
                      selectCountry(e.target.value as string);
                      setShowDetails(false);
                    }
                  }}
                  className={classes.select}
                  MenuProps={{
                    PaperProps: { className: classes.menuPaper },
                  }}
                >
                  <MenuItem value="" disabled>
                    <span className={classes.placeholder}>
                      🌸 Pick a country to explore...
                    </span>
                  </MenuItem>
                  {availableCountries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      <Box className={classes.countryItem}>
                        <span className={classes.countryFlag}>
                          {country.flag}
                        </span>
                        <span className={classes.countryName}>
                          {country.name}
                        </span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {selectedCountry && (
              <Fade in timeout={600}>
                <Box className={classes.selectedCard}>
                  <Box className={classes.selectedHeader}>
                    <Box className={classes.selectedLeft}>
                      <span className={classes.selectedFlag}>
                        {selectedCountry.flag}
                      </span>
                      <Box>
                        <Typography
                          variant="h6"
                          className={classes.selectedName}
                        >
                          {selectedCountry.name}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() => setShowDetails(!showDetails)}
                      className={classes.detailsBtn}
                      title="Learn more about this country"
                    >
                      <span className={classes.detailsIcon}>
                        {showDetails ? "▼" : "▶"}
                      </span>
                    </IconButton>
                  </Box>

                  <Typography
                    variant="body2"
                    className={classes.selectedContext}
                  >
                    {selectedCountry.context}
                  </Typography>

                  {showDetails && (
                    <Fade in timeout={400}>
                      <Box className={classes.detailsSection}>
                        <Typography
                          variant="body2"
                          className={classes.detailsText}
                        >
                          More detailed insights about {selectedCountry.name}'s
                          entertainment landscape will be available here. This
                          could include cultural context, historical trends, and
                          regional preferences.
                        </Typography>
                        <Box className={classes.detailsActions}>
                          <Typography
                            variant="caption"
                            className={classes.clearAction}
                            onClick={clearSelection}
                          >
                            Clear Selection
                          </Typography>
                        </Box>
                      </Box>
                    </Fade>
                  )}
                </Box>
              </Fade>
            )}
          </Box>
        </Box>
      </Slide>

      {/* Visual Guide */}
      <Fade in timeout={1200}>
        <Box className={classes.visualGuide}>
          <Box className={classes.legendContainer}>
            <Box className={classes.legendItem}>
              <Box className={classes.legendDot} />
              <Typography variant="caption" className={classes.legendText}>
                Screen Entertainment
              </Typography>
            </Box>

            <Box className={classes.legendItem}>
              <Box className={cx(classes.legendDot, classes.legendDotAlt)} />
              <Typography variant="caption" className={classes.legendText}>
                Live Entertainment
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </>
  );
}

const useStyles = tss.withName({ Controls }).create(() => ({
  // Main panel styles
  root: {
    position: "absolute",
    top: 30,
    left: 30,
    zIndex: 1000,
    width: 360,
    background: "linear-gradient(to bottom right,rgba(255, 214, 225, 0.56),rgba(187, 162, 227, 0.35))",
    backdropFilter: "blur(12px)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  },

  // Collapsed hamburger container
  hamburgerContainer: {
    position: "absolute",
    top: 30,
    left: 30,
    padding: 10,
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },

  hamburgerButton: {
    width: 40,
    height: 40,
    background: "linear-gradient(to bottom right,rgba(255, 214, 225, 0.9),rgba(187, 162, 227, 0.7))",
    backdropFilter: "blur(12px)",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.6)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  hamburgerIcon: {
    fontSize: "1.4rem",
    color: "rgba(0,0,0,0.7)",
    fontWeight: "bold",
  },

  collapsedIndicator: {
    width: 40,
    height: 40,
    background: "linear-gradient(to bottom right,rgba(255, 214, 225, 0.9),rgba(187, 162, 227, 0.7))",
    backdropFilter: "blur(12px)",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },

  collapsedFlag: {
    fontSize: "1.2rem",
  },

  // Collapse button in top-right of panel
  collapseButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    color: "rgba(0,0,0,0.6)",
    zIndex: 1,
    "&:hover": {
      color: "rgba(0,0,0,0.8)",
    },
  },

  collapseIcon: {
    fontSize: "0.9rem",
    fontWeight: "bold",
  },

  content: {
    padding: "28px 24px",
  },

  header: {
    marginBottom: 24,
    textAlign: "center",
  },

  title: {
    fontWeight: 700,
    background: "linear-gradient(135deg, #ff8fab, #4a90e2)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "1.6rem",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    color: "rgba(0,0,0,0.65)",
    fontSize: "0.9rem",
    fontWeight: 500,
  },

  sectionLabel: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "rgba(0,0,0,0.8)",
    marginBottom: 16,
  },

  formControl: {
    "& .MuiOutlinedInput-root": {
      background: "rgba(255,255,255,0.8)",
      borderRadius: 8,
      border: "1px solid rgba(0,0,0,0.12)",
      transition: "all 0.2s ease",
      "& fieldset": {
        border: "none",
      },
      "&:hover": {
        borderColor: "rgba(255,175,204,0.5)",
      },
      "&.Mui-focused": {
        borderColor: "#ffafcc",
        boxShadow: "0 0 0 2px rgba(255,175,204,0.15)",
      },
    },
  },

  select: {
    "& .MuiSelect-select": {
      padding: "12px 16px",
      fontSize: "0.95rem",
      fontWeight: 500,
      color: "rgba(0,0,0,0.87)",
    },
  },

  menuPaper: {
    borderRadius: 8,
    marginTop: 4,
    background: "rgba(255, 209, 220, 0.9)",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    "& .MuiMenuItem-root": {
      padding: "10px 16px",
      "&:hover": {
        background: "rgba(255,175,204,0.08)",
      },
    },
  },

  placeholder: {
    color: "rgba(0,0,0,0.6)",
    fontStyle: "italic",
  },

  countryItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  countryFlag: {
    fontSize: "1.3rem",
  },

  countryName: {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "rgba(0,0,0,0.87)",
  },

  selectedCard: {
    background: "rgba(255,175,204,0.08)",
    borderRadius: 8,
    padding: 20,
    border: "1px solid rgba(255,175,204,0.2)",
  },

  selectedHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  selectedLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  selectedFlag: {
    fontSize: "2rem",
  },

  selectedName: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "rgba(0,0,0,0.87)",
  },

  detailsBtn: {
    width: 32,
    height: 32,
    background: "rgba(255,175,204,0.15)",
    color: "rgba(0,0,0,0.5)",
    "&:hover": {
      color: "rgba(0,0,0,0.6)",
    },
  },

  detailsIcon: {
    fontSize: "0.8rem",
  },

  selectedContext: {
    color: "rgba(0,0,0,0.7)",
    fontSize: "0.9rem",
    lineHeight: 1.5,
    fontStyle: "italic",
  },

  detailsSection: {
    marginTop: 16,
    padding: "16px 0",
    borderTop: "1px solid rgba(255,175,204,0.2)",
  },

  detailsText: {
    color: "rgba(0,0,0,0.65)",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    marginBottom: 12,
  },

  detailsActions: {
    display: "flex",
    justifyContent: "flex-end",
  },

  clearAction: {
    color: "rgba(255,107,138,0.8)",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: 600,
    "&:hover": {
      color: "#ff6b8a",
      textDecoration: "underline",
    },
  },

  visualGuide: {
    position: "absolute",
    top: 30,
    right: 30,
    zIndex: 999,
    background: "linear-gradient(to bottom right,rgb(255, 214, 225),rgba(183, 151, 217, 0.35))",
    backdropFilter: "blur(12px)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    padding: "16px 20px",
    minWidth: 200,
  },

  legendContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  legendDot: {
    width: 25,
    height: 25,
    borderRadius: "10%",
    background: "#ffafcc",
    border: "1px solid rgba(255,255,255,0.8)",
  },

  legendDotAlt: {
    background: "#a2d2ff",
  },

  legendText: {
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "rgba(0,0,0,0.75)",
  },
}));
