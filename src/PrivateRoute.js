import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />; // Si no hay usuario, redirige al login
  }

  if(user.clientId == "560742763253-0kq0sri0hsr7u74h2qpo517lqejcmuls.apps.googleusercontent.com"){
    alert("Bienvenido!")
    return element;
  }if (user.profile !== 0) {
    alert("Acceso restringido: No eres administrador.");
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
