import { Container, Typography } from "@mui/material";
import ReportChart from "../reports/ReportChart";

const Reports = () => {
  return (
    <Container sx={{backgroundColor: "white"}}>
      <Typography variant="h4" sx={{color:"black"}}>Graficas de dispositivo</Typography>
      <ReportChart />
    </Container>
  );
};

export default Reports;
