import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../components/common/Input";
import Card from "../components/common/Card";
import { registerUser, deleteUser } from "../services/students/userService";
import SearchBar from "../components/common/searchBar";
import { searchUser } from "../services/searchUser";

const RegisterUserPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    group_id: "",
  });

  const [isUserFound, setIsUserFound] = useState(false); 

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    const id = formData.id || "";
    if (id.trim() !== "") {
      try {
        if (id.length === 10) {
          const userData = await searchUser(formData);
          if (userData) {
            setFormData({
              id: userData.student.id,
              name: userData.student.name,
              surname: userData.student.surname,
              group_id: userData.student.group_id,
            });
            setIsUserFound(true);
          }
        } else {
          alert("La matrícula debe tener exactamente 10 caracteres.");
        }
      } catch (error) {
        console.error("Error buscando usuario:", error);
      }
    }
  };

  const onSubmit = async (formData) => {
    try {
      const result = await registerUser(formData);
      if (result) {
        alert("Usuario registrado exitosamente");
        navigate("/home");
      } else {
        alert("Error al crear el usuario");
      }
    } catch (error) {
      alert("Error durante el registro: " + error.message);
    }
  };

  const onUpdate = async () => {
    console.log("Actualizando datos ...");
  };

  const onDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      /*try {
        const result = await deleteUser(formData.id);
        if (result) {
          alert("Usuario eliminado correctamente");
          setFormData({ id: "", name: "", surname: "", group_id: "" });
          setIsUserFound(false);
        } else {
          alert("Error al eliminar el usuario");
        }
      } catch (error) {
        alert("Error al eliminar: " + error.message);
      }*/
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" sx={{ backgroundColor: "#26355e" }}>
      <SearchBar
        title="Buscar usuario"
        value={formData.id}
        onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))}
        onSearch={handleSearch}
        error={formData.id.length !== 10 && formData.id !== ""}
        helperText={formData.id.length !== 10 && formData.id !== "" ? "La matrícula debe tener 10 caracteres" : ""}
      />

      <Card title={isUserFound ? "Editar usuario" : "Registro de Usuario"}>
        <form onSubmit={handleSubmit(isUserFound ? onUpdate : onSubmit)}>
          <Input
            {...register("name", { required: "El nombre es obligatorio" })}
            name="name"
            label="Nombre"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isUserFound} // Deshabilita en modo actualizar
          />
          
          <Input
            {...register("surname", { required: "Los apellidos son obligatorios" })}
            name="surname"
            label="Apellidos"
            value={formData.surname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.surname}
            helperText={errors.surname?.message}
            disabled={isUserFound} // Deshabilita en modo actualizar
          />

          <Input
            {...register("group_id", { required: "El grupo es obligatorio" })}
            name="group_id"
            label="Grupo"
            value={formData.group_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.group_id}
            helperText={errors.group_id?.message}
          />

          <Input
            {...register("id", { 
              required: "La matrícula es obligatoria",
              minLength: { value: 10, message: "La matrícula debe tener exactamente 10 caracteres" },
              maxLength: { value: 10, message: "La matrícula debe tener exactamente 10 caracteres" }
            })}
            name="id"
            label="Matrícula"
            value={formData.id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.id}
            helperText={errors.id?.message}
            disabled={isUserFound} // Deshabilita en modo actualizar
          />

          <Button type="submit" variant="contained" fullWidth>
            {isUserFound ? "Actualizar" : "Registrar"}
          </Button>

          {isUserFound && (
            <Button 
              variant="contained" 
              color="error" 
              fullWidth 
              onClick={onDelete} 
              sx={{ marginTop: 2 }}
            >
              Eliminar Usuario
            </Button>
          )}
        </form>
      </Card>
    </Box>
  );
};

export default RegisterUserPage;
