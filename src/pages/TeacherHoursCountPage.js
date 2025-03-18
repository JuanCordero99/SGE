import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";

const TeacherHoursTable = () => {
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Iniciando la solicitud al API...");
        const response = await fetch("http://localhost:8080/api/view/teacher/count/hours", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        console.log("Respuesta recibida:", response);
  
        if (response.ok) {
          console.log("Intentando convertir la respuesta a JSON...");
          const result = await response.json();
          console.log("JSON recibido:", result);
          setTeacherData(result.list);
        } else {
          console.error("Error al obtener los datos. Código de respuesta:", response.status);
          console.error("Texto de error de la respuesta:", response.statusText);
        }
      } catch (error) {
        console.error("Error durante la solicitud:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden", marginTop: 2, marginBottom: 2 }}>
      <Table sx={{ marginTop: 2, marginBottom: 2 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>ID Profesor</TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Nombre</TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Horas Semanales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teacherData.map((teacher, index) => (
            <TableRow key={teacher.teacher_id} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}>
              <TableCell sx={{ color: "black" }}>{teacher.teacher_id}</TableCell>
              <TableCell sx={{ color: "black" }}>{teacher.teacher_name}</TableCell>
              <TableCell sx={{ color: "black" }}>{teacher.weekly_hours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeacherHoursTable;