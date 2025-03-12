import { Container, Typography } from "@mui/material";
import ReportChart from "../reports/ReportChart";
import ReportChartSensor from "../reports/ReportChartSensor";

const Reports = () => {
  return (
    <Container sx={{backgroundColor: "white", marginTop:2, marginBottom:2}}>
      <Typography variant="h4" sx={{color:"black", margin:2}}>Graficas de actuadores IoT</Typography>
      <ReportChart />
      <Typography variant="h4" sx={{color:"black", margin:1}}>Graficas de sensor IoT</Typography>
      <ReportChartSensor />
    </Container>
  );
};

export default Reports;
