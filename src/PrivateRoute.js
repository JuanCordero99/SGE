import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />; // Si no hay usuario, redirige al login
  }

  if (user.profile !== 0) {
    alert("Acceso restringido: No eres administrador.");
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
