import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import Select from "../components/common/Select";
import { getClassService } from "../services/classes/GetSubjectService";
import { updateClassService } from "../services/classes/updateClassService"; // Importa el servicio de actualización

const ManageClassPage = ({ routes }) => {
  const { idClase } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: idClase,
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

  // Obtén los datos de la clase cuando el componente se monte
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const data = await getClassService(idClase);
        setClassData(data.clazz);
        setFormData({
          id: data.clazz.id,
          day: data.clazz.day,
          in_hour: data.clazz.in_hour,
          fn_hour: data.clazz.fn_hour,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchClassData();
  }, [idClase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      const result = await updateClassService(formData); // Usa el servicio de actualización
      if (result.success) {
        alert("Clase actualizada exitosamente");
        navigate("/home");
      } else {
        alert("Error al actualizar la clase: " + result.message);
      }
    } catch (error) {
      alert("Error durante la actualización: " + error.message);
    }
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

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
            {classData.subject.name} - Grupo {classData.groupId} - Profesor{" "}
            {classData.teacher.name} {classData.teacher.surname}
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
            Actualizar Clase
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default ManageClassPage;