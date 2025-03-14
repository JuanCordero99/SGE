import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/common/Input";
import { authService } from "../services/loginService"; // Importa el servicio
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const result = await authService(formData.email, formData.password);
    if (result) {
      console.log(`RESPONSE: ${result.response}`);
      if (result.user.profile === 0) {
        localStorage.setItem("user", JSON.stringify(result.user));
        alert("Login successful");
        navigate("/home");
      } else {
        alert("You're not an administrator ...");
      }
    } else {
      alert("Login Failed");
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google Login Success", response);
    localStorage.setItem("user", JSON.stringify(response));
    navigate("/homeVisitor");
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Login Failed", error);
    alert("Google Login Failed");
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
              value: 6,
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
      <Typography align="center" marginY={2}>O</Typography>
      <Container>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
      </Container>
    </Container>
  );
};

export default LoginPage;