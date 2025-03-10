import { Container, Typography } from "@mui/material";
import NavCard from "../components/common/navCard";
import theme from "../theme"

const SelectionUserPage = () => {

  return (
    <Container sx={{ backgroundColor: theme.palette.background }}>
      <Typography variant="h4" sx={{color: "s"}}>Panel Administrador</Typography>
      <NavCard title={"Gestión de alumnos"} route={"/register-user"}/>
      <NavCard title={"Gestión de docentes"} route={"/manage-teacher"}/>
    </Container>
  );
};

export default SelectionUserPage;
