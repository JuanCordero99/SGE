import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#26355e", 
      // Azul oscuro
    },
    secondary: {
      main: "#b0b0b0", 
      // Gris
    },
    background: {
        default: "#26355e", 
      // Tarjetas en azul oscuro
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h4: {
      fontWeight: "bold",
      color: "#fffff",
    },
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
