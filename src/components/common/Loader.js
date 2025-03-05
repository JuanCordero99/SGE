import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress sx={{ color: "#26355e" }} />
    </Box>
  );
};

export default Loader;
