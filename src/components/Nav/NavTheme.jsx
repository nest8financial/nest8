import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgba(202,202,214,0.73)",
      dark: "#bdbdbd",
      contrastText: "rgba(81,80,115,0.87)",
      light: "rgba(180,188,243,0.73)",
    },
    info: {
      main: "#223737",
      light: "#4c7171",
      dark: "#254c4c",
      contrastText: "#576469",
    },
    text: {
      primary: "rgba(51,68,94,0.87)",
      secondary: "rgba(43,84,92,0.54)",
      disabled: "rgba(38,43,49,0.38)",
      hint: "rgba(50,63,94,0.38)",
    },
  },
});
