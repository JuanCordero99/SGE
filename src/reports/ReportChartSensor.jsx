import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Card, CardContent, Typography, Grid } from "@mui/material";

Chart.register(...registerables);

const ReportChart = () => {
  const [chartData, setChartData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("http://devmachape.tail0547c7.ts.net:8080/api/send/sensor/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Datos recibidos:", data);
  
      if (Array.isArray(data) && data.length > 0) {
        const labels = data.map(item => item.hour);
        const temperatureData = data.map(item => parseFloat(item.temperature));
        const humidityData = data.map(item => parseFloat(item.humidity));
  
        const newData = {
          labels: labels,
          datasets: [
            {
              label: "Temperatura (°C)",
              data: temperatureData,
              borderColor: "#3f51b5",
              fill: false,
            },
            {
              label: "Humedad (%)",
              data: humidityData,
              borderColor: "#f50057",
              fill: false,
            },
          ],
        };
  
        setChartData(newData);
      } else {
        console.error("La API no devolvió un arreglo válido o está vacío.");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Actualización cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{margin:2}}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{color:"black"}}>
              Temperatura y Humedad a lo largo del tiempo
            </Typography>
            {chartData.labels ? ( // Verificar que haya datos para graficar
              <Line data={chartData} />
            ) : (
              <Typography variant="body2">
                Cargando datos o no hay datos disponibles.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ReportChart;
