import { Container, Typography, Button, Box } from "@mui/material";
import NavCard from "../components/common/navCard";
import { useNavigate } from "react-router-dom";

const HomePageVisitor = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logout successful");
    navigate("/");
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 4 }}>
      <Typography variant="h4" align="center">Panel Visitante</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 400 }}>
        <NavCard title={"Reportes"} route={"/reports"}/>
        <NavCard title={"Gráficas"} route={"/graphs"}/>
        <Button variant="outlined" color="secondary" fullWidth onClick={handleLogout} sx={{ marginTop: 2 }}>
          Cerrar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default HomePageVisitor;
