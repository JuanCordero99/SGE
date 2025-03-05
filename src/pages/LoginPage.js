// src/pages/LoginPage.js

import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/common/Input";
import { authService } from "../services/loginService"; // Importa el servicio

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const result = await authService(formData.email, formData.password);
    if (result) {
      console.log(`RESPONSE: ${result.response}`);
      if(result.user.profile == 0){
        alert("Login successful");
        navigate("/home");
      } else {
        alert("You're not an administrator ...");
      }
    } else {
      alert("Login Failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", { 
            required: "El correo es obligatorio",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "El correo no es válido"
            }
          })}
          name="email"
          label="Correo"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        
        <Input
          {...register("password", { 
            required: "La contraseña es obligatoria",
            minLength: {
              message: "La contraseña debe tener al menos 6 caracteres"
            }
          })}
          name="password"
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
        />
        {errors.password && <Typography color="error">{errors.password.message}</Typography>}

        <Button type="submit" variant="contained" fullWidth>
          Entrar
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
