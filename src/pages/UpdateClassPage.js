import React, { useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { useForm } from "react-hook-form";
import SearchBar from "../components/common/searchBar";
import { searchClassesByGroup } from "../services/classes/searchClassService";

const UpdateClassPage = () => {
  const [classes, setClasses] = useState([]);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [formData, setFormData] = useState({ group_id: "" });

  // Manejador de búsqueda
  const handleSearch = async () => {
    try {
      const data = await searchClassesByGroup(formData); // Llamada a la API
      console.log("Respuesta de la API:", data); // Verificar los datos recibidos de la API

      if (data.success) {
        const filteredClasses = data.clazzList.filter((clazz) => clazz.status === 1); // Filtrar clases con status = 1
        console.log("Clases filtradas:", filteredClasses); // Verificar las clases filtradas
        setClasses(filteredClasses); // Establecer las clases en el estado
      } else {
        setClasses([]); // Si no se encuentra ninguna clase, vaciar el array
        alert("No se encontraron clases para el grupo");
      }
    } catch (error) {
      console.error("Error al buscar clases:", error);
      setClasses([]); // Limpiar el estado si ocurre un error
    }
  };

  // Manejador de cambio de input
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, group_id: e.target.value }));
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Mostrar solo el SearchBar antes de la búsqueda */}
      <SearchBar
        title="Buscar Grupo"
        label="Grupo"
        name="group_id"
        value={formData.group_id}
        onChange={handleChange}
        onSearch={handleSearch}
        error={!!errors.group_id} // Error si no es válido
        helperText={errors.group_id?.message} // Mostrar el mensaje de error
        sx={{ width: "100%" }}
        register={register("group_id", {
          required: "El grupo es obligatorio", // Validación de campo obligatorio
          pattern: {
            value: /^[A-Za-z]\d{3}$/, // Expresión regular para validar el formato
            message: "Debe iniciar con una letra seguida de 3 números (Ej: T228, E182, M890)",
          },
        })}
      />

      {/* Mostrar las cards solo después de la búsqueda y cuando hay clases */}
      {classes.length > 0 ? (
        <Box sx={{ marginTop: 3 }}>
          {classes.map((clazz) => (
            <Card
              key={clazz.id}
              sx={{ marginBottom: 2, cursor: "pointer" }}
              onClick={() => window.location.href = `/class/edit/${clazz.id}`}
            >
              <CardContent sx={{ color: "black" }}> {/* Cambiar color a negro */}
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
                  {clazz.subject.name}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
                  {clazz.groupId}
                </Typography>
                <Typography variant="body1" sx={{ color: "black" }}>
                  {clazz.teacher.name} {clazz.teacher.surname}
                </Typography>
                <Typography variant="body2" sx={{ color: "black" }}>
                  {clazz.day} | {clazz.in_hour} - {clazz.fn_hour}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : formData.group_id && (
        <Typography variant="body1" color="error">
          No se encontraron clases para este grupo.
        </Typography>
      )}
    </Box>
  );
};

export default UpdateClassPage;
