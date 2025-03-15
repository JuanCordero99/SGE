import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../components/common/Input";
import Card from "../components/common/Card";

import { newTeacher } from "../services/teachers/newTeacherService";
import {deleteTeacher} from "../services/teachers/deleteTeacherService"

import SearchBar from "../components/common/searchBar";
import { searchUser } from "../services/teachers/searchTeacherService";

const ManageTeacherPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    firtsname: "",
    secondname: "",
    middlename: "",
    surname: ""
  });

  const [isUserFound, setIsUserFound] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
        if (id.length >= 5) {
          const userData = await searchUser(formData);
          if (userData.success) {
            setFormData({
              id: userData.teacher.id,
              name: userData.teacher.name,
              surname: userData.teacher.surname,
            });
            setIsUserFound(true);
          }else { userData.teacher.user.status === 0 ? alert("El profesor es baja") : alert("No se encontro el profesor");}
        } else {
          alert("El Id de trabajador debe tener mínimo 5 caracteres.");
        }
      } catch (error) {
        console.error("Error buscando usuario:", error);
      }
    }
  };

  const onSubmit = async () => {
    try {
      const result = await newTeacher(formData);
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

  const onDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        const result = await deleteTeacher(formData);
        if (result) {
          alert("Usuario eliminado exitosamente");
          navigate("/home");
        } else {
          alert("Error al realizar acción");
        }
      } catch (error) {
        alert("Error durante el registro: " + error.message);
      }    
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: "#26355e" }}
    >
      <SearchBar
        title="Buscar Docente"
        value={formData.id}
        onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))}
        onSearch={handleSearch}
        error={formData.id.length > 5 && formData.id.length < 10 && formData.id !== ""}
        helperText={formData.id.length > 5 && formData.id.length < 10 && formData.id !== "" ? 
          "El Id de trabajador debe tener máximo 10 caracteres" : ""}
      />

      <Card title={isUserFound ? "Editar Docente" : "Registro de Docente"}>
        <form onSubmit={handleSubmit(isUserFound ? onDelete : onSubmit)}>

          <Input
            {...register("name", {
              required: !isUserFound && "El nombre es obligatorio", // Solo requerido en modo registro
            })}
            name="name"
            label={!isUserFound ? "Primer nombre" : "Nombre"}
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isUserFound} // Deshabilita en modo actualizar
            InputLabelProps={{shrink: !!formData.name}}
          />
          
          {!isUserFound && (<Input
            name="secondname"
            label="Segundo nombre"
            value={formData.secondname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.secondname}
            helperText={errors.secondname?.message}
            disabled={isUserFound} // Deshabilita en modo actualizar
          />)}

          {!isUserFound && (<Input
            {...register("middlename", {
              required: !isUserFound && "El nombre es obligatorio", // Solo requerido en modo registro
            })}
            name="middlename"
            label="Primer apellido"
            value={formData.middlename}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.middlename}
            helperText={errors.middlename?.message}
            disabled={isUserFound} // Deshabilita en modo actualizar
          />)}  

          <Input
            {...register("surname", {
              required: !isUserFound && "Los apellidos son obligatorios", // Solo requerido en modo registro
            })}
            name="surname"
            label={!isUserFound ? "Segundo apellido" : "Apellidos"}
            value={formData.surname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.surname}
            helperText={errors.surname?.message}
            disabled={isUserFound} // Deshabilita en modo actualizar
          />

          <Input
            {...register("id", {
              required: !isUserFound && "El Id de trabajador es obligatorio",
              minLength: { value: 5, message: "El Id de trabajador debe tener 10 caracteres" },
              maxLength: { value: 10, message: "El Id de trabajador debe tener 10 caracteres" },
            })}
            name="id"
            label="Id de trabajador"
            value={formData.id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.id}
            helperText={errors.id?.message}
            disabled={isUserFound} // Deshabilita en modo actualizar
          />

          <Button type="submit" variant="contained" fullWidth disabled={isUserFound}>
            {"Registrar"}
          </Button>

          {isUserFound && (
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={onDelete}
              sx={{ marginTop: 1 }}
            >
              Eliminar Usuario
            </Button>
          )}
        </form>
      </Card>
    </Box>
  );
};

export default ManageTeacherPage;