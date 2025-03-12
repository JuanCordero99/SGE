import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";

const ReportTable = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/sendData/getData");
        if (response.ok) {
          const result = await response.json();
          const data = result.map((item) => ({
            id: item._class,
            product: item.device,
            amount: `${item.status ? 'Encendido' : 'Apagado'}`,
            date: item.date,
            hour: item.hour,
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
  }, []);

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden", marginTop:2, marginBottom:2 }}>
      <Table sx={{marginTop: 2, marginBottom:2}}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Dispositivo</TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Estado</TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Fecha</TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Hora</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesData.map((device, index) => (
            <TableRow key={device.id} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}>
              <TableCell sx={{color:"black"}}>{device.product.charAt(0).toUpperCase() + device.product.slice(1)}</TableCell>
              <TableCell sx={{color:"black"}}>{device.amount}</TableCell>
              <TableCell sx={{color:"black"}}>{device.date}</TableCell>
              <TableCell sx={{color:"black"}}>{device.hour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;
