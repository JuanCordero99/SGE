import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import Select from "../components/common/Select";
import { getClassService } from "../services/classes/GetSubjectService";
import { updateClassService } from "../services/classes/updateClassService";

const ManageClassPage = ({ routes }) => {
  const { idClase } = useParams();
  const [classData, setClassData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const data = await getClassService(idClase);
        setClassData(data.clazz);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchClassData();
  }, [idClase]);

  useEffect(() => {
    if (classData) {
      setFormData({
        id: classData.id,
        day: classData.day,
        groupId: classData.groupId,
        in_hour: classData.in_hour,
        fn_hour: classData.fn_hour,
        place: classData.place
      });
    }
  }, [classData]);

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
    if (!formData) return;
    try {
      const result = await updateClassService(formData);
      if (result.success) {
        alert("Clase actualizada exitosamente");
        navigate("/home");
      } else {
        alert("Error al actualizar la clase: " + result.response 
          + `\nMaestro con esa hora y clase: ${result.classFindByDTO.teacher}`);
      }
    } catch (error) {
      alert("Error durante la actualización: " + error.message);
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!formData) return null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: "#26355e", padding: "40px" }}
    >
      <Card title="Actualización de Clase" sx={{ padding: "30px" }}>
        {classData && (
          <Typography variant="h4" gutterBottom>
            {classData.subject.name} - Grupo {classData.groupId} - Profesor {classData.teacher.name} {classData.teacher.surname}
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
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
            Actualizar Clase
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default ManageClassPage;
