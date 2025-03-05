import { Bar } from "react-chartjs-2";

const Chart = ({ labels, data }) => {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Datos",
            data,
            backgroundColor: "#26355e",
            borderColor: "#b0b0b0",
            borderWidth: 1,
          },
        ],
      }}
      options={{
        plugins: {
          legend: { labels: { color: "#26355e" } },
        },
        scales: {
          x: { ticks: { color: "#26355e" } },
          y: { ticks: { color: "#26355e" } },
        },
      }}
    />
  );
};

export default Chart;
