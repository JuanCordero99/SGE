import { Container, Typography } from "@mui/material";
import NavCard from "../components/common/navCard";


const HomePage = () => {

  return (
    <Container sx={{marginTop: 2}}>
      <Typography variant="h4">Panel Administrador</Typography>
      <NavCard title={"Gestión de usuarios"} route={"/select-user"}/>
      <NavCard title={"Gestión de clases"} route={"/manage-classes"}/>
      <NavCard title={"Reportes"} route={"/reports"}/>
      <NavCard title={"Gráficas"} route={"/graphs"}/>
    </Container>
  );
};

export default HomePage;
