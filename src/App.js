import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import AppRoutes from "./routes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
