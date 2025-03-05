import { Container, Typography } from "@mui/material";
import NavCard from "../components/common/navCard";
import theme from "../theme"

const SelectionUserPage = () => {

  return (
    <Container sx={{ backgroundColor: theme.palette.background }}>
      <Typography variant="h4" sx={{color: "s"}}>Panel Administrador</Typography>
      <NavCard title={"Registro de alumnos"} route={"/register-user"}/>
      <NavCard title={"Registro de docentes"} route={"/register-class"}/>
    </Container>
  );
};

export default SelectionUserPage;
