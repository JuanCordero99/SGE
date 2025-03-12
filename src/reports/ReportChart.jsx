import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Card, CardContent, Typography, Grid } from "@mui/material";

Chart.register(...registerables);

const ReportChart = () => {
  const [chartData, setChartData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/sendData/getData");
      const data = await response.json();
      
      const devices = ["calentador", "ventilador", "luz"];
      let newData = {};

      devices.forEach((device) => {
        let onCount = 0;
        let offCount = 0;

        data.forEach((item) => {
          if (item.device === device) {
            item.status ? onCount++ : offCount++;
          }
        });

        console.log("DATOS DE IOT: " + JSON.stringify(data));

        newData[device] = {
          labels: ["Encendido", "Apagado"],
          datasets: [
            {
              label: `Estado de ${device}`,
              data: [onCount, offCount],
              backgroundColor: ["#3f51b5", "#f50057"],
            },
          ],
        };
      });

      setChartData(newData);
      //console.log(newData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container spacing={2}>
      {Object.keys(chartData).map((device) => (
        <Grid item xs={12} sm={6} md={4} key={device}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{color:"black"}}>
                {device.charAt(0).toUpperCase() + device.slice(1)}
              </Typography>
              <Bar data={chartData[device]} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportChart;