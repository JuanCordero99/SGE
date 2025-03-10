import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../components/common/Input";
import Card from "../components/common/Card";

import { registerUser } from "../services/students/newStudentService";
import { updateStudent } from "../services/students/updateStudentService";
import {deleteStudent} from "../services/students/deleteStudentService"

import SearchBar from "../components/common/searchBar";
import { searchUser } from "../services/students/searchStudentService";

const ManageStudentPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    group_id: "",
    term: 1,
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
        if (id.length === 10) {
          const userData = await searchUser(formData);
          if (userData.success) {
            setFormData({
              id: userData.student.id,
              name: userData.student.name,
              surname: userData.student.surname,
              group_id: userData.student.group_id,
              term: userData.student.term
            });
            setIsUserFound(true);
            console.log("DATA STATUS: " + userData.student.user);

          }else { userData.student.user.status === 0 ? alert("El estudiante es baja") : alert("No se encontro el estudiante");}
        } else {
          alert("La matrícula debe tener exactamente 10 caracteres.");
        }
      } catch (error) {
        console.error("Error buscando usuario:", error);
      }
    }
  };

  const onSubmit = async () => {
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
    try {
      const result = await updateStudent(formData);
      if (result) {
        alert("Alumno actualizado exitosamente");
        navigate("/home");
      } else {
        alert("Error al realizar acción");
      }
    } catch (error) {
      alert("Error durante el registro: " + error.message);
    }
  };

  const onDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este alumno?")) {
      try {
        const result = await deleteStudent(formData);
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
            {...register("name", {
              required: !isUserFound && "El nombre es obligatorio", // Solo requerido en modo registro
            })}
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
            {...register("surname", {
              required: !isUserFound && "Los apellidos son obligatorios", // Solo requerido en modo registro
            })}
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
            {...register("group_id", {
              required: "El grupo es obligatorio",
              pattern: {
                value: /^[A-Za-z]\d{3}$/,
                message: "Debe iniciar con una letra seguida de 3 números (Ej: T228, E182, M890)",
              },
            })}
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
            {...register("term", {
              required: !isUserFound && "El cuatrimestre es obligatorio", 
              valueAsNumber: true,
              min: {value: 1, message: "El cuatrimestre minimo es 1"}
            })}
            name="term"
            label="Cuatrimestre"
            value={formData.term}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.term}
            helperText={errors.term?.message}
            disabled={isUserFound} // Deshabilita en modo actualizar
          />  

          <Input
            {...register("id", {
              required: !isUserFound && "La matrícula es obligatoria", // Solo requerido en modo registro
              minLength: { value: 10, message: "La matrícula debe tener exactamente 10 caracteres" },
              maxLength: { value: 10, message: "La matrícula debe tener exactamente 10 caracteres" },
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

export default ManageStudentPage;