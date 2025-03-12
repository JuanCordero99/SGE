import { Container, Typography } from "@mui/material";
import NavCard from "../components/common/navCard";
import theme from "../theme"

const SelectionClassPage = () => {

  return (
    <Container sx={{ backgroundColor: theme.palette.background }}>
      <Typography variant="h4" sx={{color: "s"}}>Panel Administrador</Typography>
      <NavCard title={"Registro de clase"} route={"/register-class"}/>
      <NavCard title={"Editar una clase"} route={"/search-class"}/>
    </Container>
  );
};

export default SelectionClassPage;
