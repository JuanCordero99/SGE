import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ReportChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Luces Encendidas", "Luces Apagadas"],  // Dos categorías: una para true, otra para false
    datasets: [
      {
        label: "Estado de Dispositivos",
        data: [0, 0],  // Inicialmente ambas barras tienen un valor de 0
        backgroundColor: ["#3f51b5", "#f50057"],  // Azul para true y rojo para false
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://gse-backend.zeabur.app/sendData/getData");
        const data = await response.json();

        // Inicializamos los contadores para luces encendidas y apagadas
        let lightsOn = 0;
        let lightsOff = 0;

        // Si recibimos múltiples dispositivos, recorremos cada uno
        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item.status) {
              lightsOn += 1;  // Incrementar luces encendidas
            } else {
              lightsOff += 1;  // Incrementar luces apagadas
            }
          });
        } else {
          // Si la respuesta es un solo objeto, revisamos el estado directamente
          if (data.status) {
            lightsOn = 1;  // Una luz encendida
          } else {
            lightsOff = 1;  // Una luz apagada
          }
        }

        // Actualizamos el estado de la gráfica con los nuevos datos
        setChartData({
          labels: ["Luces Encendidas", "Luces Apagadas"],
          datasets: [
            {
              label: "Estado de Dispositivos",
              data: [lightsOn, lightsOff],
              backgroundColor: ["#3f51b5", "#f50057"],
            },
          ],
        });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();  // Llamamos a la API al cargar el componente

  }, []);  // Solo se ejecuta una vez al montar el componente

  return (<Bar data={chartData} />);
};

export default ReportChart;
