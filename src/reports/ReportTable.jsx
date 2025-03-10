import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const ReportTable = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchData = async () => {
      try {
        const response = await fetch("https://gse-backend.zeabur.app/sendData/getData");
        if (response.ok) {
          const result = await response.json();
          // Transformamos la respuesta de la API para que se ajuste al formato de la tabla
          const data = result.map((item) => ({
            id: item._class, // Puedes cambiar este campo por cualquier campo único
            product: "Luz", // Aquí asignamos 'Luz' al campo "Dispositivo"
            amount: `${item.status ? 'Encendida' : 'Apagada'}`, // Aquí puedes cambiarlo por un estado de la luz
            date: item.date, // Extraemos la fecha del API
            hour: item.hour, // Extraemos la hora del API
          }));
          setSalesData(data);
        } else {
          console.error("Error al obtener los datos:", response.statusText);
        }
      } catch (error) {
        console.error("Error durante la solicitud:", error);
      }
    };

    fetchData();
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: "black" }} variant="h4">Dispositivo</TableCell>
          <TableCell sx={{ color: "black" }} variant="h4">Estado</TableCell>
          <TableCell sx={{ color: "black" }} variant="h4">Fecha</TableCell>
          <TableCell sx={{ color: "black" }} variant="h4">Hora</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {salesData.map((device) => (
          <TableRow key={device.id}>
            <TableCell sx={{ color: "black" }}>{device.product}</TableCell>
            <TableCell sx={{ color: "black" }}>{device.amount}</TableCell>
            <TableCell sx={{ color: "black" }}>{device.date}</TableCell>
            <TableCell sx={{ color: "black" }}>{device.hour}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReportTable;
