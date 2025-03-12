import React, { useContext } from "react";
import { Button } from "@mui/material";
import AuthContext from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Button onClick={logout} variant="contained" color="secondary">
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
