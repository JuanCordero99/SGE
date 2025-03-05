import { Container, Typography } from "@mui/material";
import ReportTable from "../reports/ReportTable";

const Reports = () => {
  return (
    <Container sx={{backgroundColor: "white"}}>
      <Typography variant="h4" sx={{color:"black"}}>Reportes de dispositivo</Typography>
      <ReportTable />
    </Container>
  );
};

export default Reports;
