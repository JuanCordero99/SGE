import { Container, Typography } from "@mui/material";
import ReportTable from "../reports/ReportTable";

const Reports = () => {
  return (
    <Container sx={{backgroundColor: "white", marginTop:2, marginBottom: 2, padding: 1}}>
      <Typography variant="h4" sx={{color:"black"}}>Reportes de actuadores IoT</Typography>
      <ReportTable />
    </Container>
  );
};

export default Reports;
