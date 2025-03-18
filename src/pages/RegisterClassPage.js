import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import { newClassService } from "../services/classes/newClassService";
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
    place: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all teachers from API
    const fetchTeachers = async () => {
      try {
        const response = await fetch("https://gse-backend.zeabur.app/api/teacher/get/AllTeachers");
        const data = await response.json();
        if (data.success) {
          setTeachers(data.list);
          setFilteredTeachers(data.list); // Initialize filtered list with all teachers
        } else {
          alert("Error al obtener los maestros");
        }
      } catch (error) {
        alert("Error al obtener los maestros");
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    // Filter teachers based on search term
    setFilteredTeachers(
      teachers.filter((teacher) =>
        `${teacher.name} ${teacher.surname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, teachers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (data) => {
    if (data.in_hour >= data.fn_hour) {
      alert("La hora inicial no puede ser mayor o igual a la hora final");
      return;
    }

    // Validación: no se permiten horas medias
    const isFullHour = (hour) => /^([0-9]{2}):00:00$/.test(hour);
    if (!isFullHour(data.in_hour) || !isFullHour(data.fn_hour)) {
      alert("Las horas deben ser completas, no se permiten horas medias (ejemplo: 07:00:00, 22:00:00)");
      return;
    }
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

          <Select
            label="Profesor"
            name="workerId"
            value={formData.workerId}
            onChange={handleChange}
            options={filteredTeachers.map((teacher) => ({
              label: `${teacher.name} ${teacher.surname}`,
              value: teacher.id,
            }))}
          />

          <Input
            {...register("groupId", {
              required: "El grupo es obligatorio",
              pattern: {
                value: /^[A-Za-z]\d{3}$/,
                message: "Debe iniciar con una letra seguida de 3 números (Ej: T228)",
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
                value: /^([0-9]{2}):00:00$/,
                message: "Las horas deben ser completas. Usa HH:MM:SS (24h)",
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
                value: /^([0-9]{2}):00:00$/,
                message: "Las horas deben ser completas. Usa HH:MM:SS (24h)",
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

          <Input
            {...register("place", {
              required: "El lugar de la clase es obligatorio",
            })}
            name="place"
            label="Aula y edificio"
            value={formData.place}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.place}
            helperText={errors.place?.message}
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
