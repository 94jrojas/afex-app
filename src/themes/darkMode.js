const { createTheme } = require("@mui/material/styles");

export default createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#f9aeae",
      main: "#FF0C4A",
      dark: "#af0d35",
      contrastText: "#fff",
    },
    third: {
      light: "#8EC3F2",
      main: "#1e88e5",
      dark: "#155fa0",
      contrastText: "#fff",
    },
    secondary: {
      light: "#c7b3ff",
      main: "#7C4DFF",
      dark: "#5635b2",
      contrastText: "#fff",
    },
    text: {
      primary: "#e9e9e9",
      secondary: "#b5bedc",
      disabled: "rgba(255,255,255,0.38)",
      hint: "rgba(255,255,255,0.38)",
      breadcrumb: "#8492BB",
    },
    error: {
      light: "#f47961",
      main: "#e94f30",
      dark: "#d72f0f",
      contrastText: "#fff",
    },
    success: {
      light: "#35df90",
      main: "#1fb971",
      dark: "#178d56",
    },
    warning: {
      light: "#fac661",
      main: "#f0ae2d",
      dark: "#e39708",
    },
    // divider: "rgba(1,1,1,0.12)",
    // background: { default: "#25201d", paper: "#3b3831" },
    //  background: { default: "#222326", paper: "#1b1d21" },
    background: {
      default: "#111936",
      paper: "#111936",
      paperLight: "#182142",
      paperDark: "#0c1125",
    },
  },
  shape: { borderRadius: 3 },
  typography: {
    fontFamily: "Roboto",
    h2: {
      // fontFamily: "Barlow Condensed",
      fontWeight: 600,

    },
  },

});


