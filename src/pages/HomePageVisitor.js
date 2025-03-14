import { Container, Typography } from "@mui/material";
import NavCard from "../components/common/navCard";


const HomePageVisitor = () => {
  console.log('Jola??');
  return (
    <Container sx={{marginTop: 2}}>
      <Typography variant="h4">Panel Administrador</Typography>
      <NavCard title={"Reportes"} route={"/reports"}/>
      <NavCard title={"Gráficas"} route={"/graphs"}/>
    </Container>
  );
};

export default HomePageVisitor;
