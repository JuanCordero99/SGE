import { Container, Typography, Button, Box } from "@mui/material";
import NavCard from "../components/common/navCard";
import { useNavigate } from "react-router-dom";
import loginService from "../services/loginService";

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleLogout = async() => {
    const jsonUser = JSON.parse(localStorage.getItem("user")); const userId= jsonUser ? jsonUser.id : null;
    await loginService.logOutService(userId);
    localStorage.removeItem("user");
    alert("Logout successful");
    navigate("/");
  };

  console.log("DATA OF SESSION: " + localStorage.getItem("user"));

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 4 }}>
      <Typography variant="h4" align="center">Panel Administrador</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 400 }}>
        <NavCard title={"Gestión de usuarios"} route={"/select-user"}/>
        <NavCard title={"Gestión de clases"} route={"/manage-classes"}/>
        <NavCard title={"Reportes"} route={"/reports"}/>
        <NavCard title={"Gráficas"} route={"/graphs"}/>
        <Button variant="outlined" color="secondary" fullWidth onClick={handleLogout} sx={{ marginTop: 2 }}>
          Cerrar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
