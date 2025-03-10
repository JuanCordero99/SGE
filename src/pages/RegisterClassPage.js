import React, { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import {newClassService} from "../services/classes/newClassService";
import Select from "../components/common/Select";

const ManageClassPage = () => {
  const [formData, setFormData] = useState({
    subjectName: "",
    term: "",
    workerId: "",
    groupId: "",
    day: "",
    in_hour: "",
    fn_hour: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      const result = await newClassService(formData);
      if (result) {
        alert("Clase registrada exitosamente");
        navigate("/home");
      } else {
        alert("Error al crear la clase");
      }
    } catch (error) {
      alert("Error durante el registro: " + error.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: "#26355e", padding: "40px" }}
    >
      <Card title="Registro de Clase" sx={{ padding: "30px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("subjectName", {
              required: "El nombre de la materia es obligatorio",
            })}
            name="subjectName"
            label="Materia"
            value={formData.subjectName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.subjectName}
            helperText={errors.subjectName?.message}
          />

          <Select
            label="Cuatrimestre"
            name="term"
            value={formData.term}
            onChange={handleChange}
            options={[...Array(12)].map((_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
          />

          <Input
            {...register("workerId", {
              required: "El ID del profesor es obligatorio",
            })}
            name="workerId"
            label="ID del Profesor"
            value={formData.workerId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.workerId}
            helperText={errors.workerId?.message}
          />

          <Input
            {...register("groupId", {
              required: "El grupo es obligatorio",
              pattern: {
                value: /^[A-Za-z]\d{3}$/,
                message:
                  "Debe iniciar con una letra seguida de 3 números (Ej: T228)",
              },
            })}
            name="groupId"
            label="Grupo"
            value={formData.groupId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.groupId}
            helperText={errors.groupId?.message}
          />

          <Select
            label="Día"
            name="day"
            value={formData.day}
            onChange={handleChange}
            options={[
              { label: "Lunes", value: "Lunes" },
              { label: "Martes", value: "Martes" },
              { label: "Miércoles", value: "Miércoles" },
              { label: "Jueves", value: "Jueves" },
              { label: "Viernes", value: "Viernes" },
            ]}
          />

          <Input
            {...register("in_hour", {
              required: "La hora de entrada es obligatoria",
              pattern: {
                value: /^([0-9]{2}):([0-5][0-9]):([0-5][0-9])$/,
                message: "Formato inválido. Usa HH:MM:SS (24h)",
              },
            })}
            name="in_hour"
            label="Hora de entrada"
            value={formData.in_hour}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.in_hour}
            helperText={errors.in_hour?.message}
          />

          <Input
            {...register("fn_hour", {
              required: "La hora de salida es obligatoria",
              pattern: {
                value: /^([0-9]{2}):([0-5][0-9]):([0-5][0-9])$/,
                message: "Formato inválido. Usa HH:MM:SS (24h)",
              },
            })}
            name="fn_hour"
            label="Hora de salida"
            value={formData.fn_hour}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.fn_hour}
            helperText={errors.fn_hour?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px", padding: "12px" }}
          >
            Registrar Clase
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default ManageClassPage;
