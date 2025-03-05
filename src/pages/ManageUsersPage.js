import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Table from "../components/common/Table";
import Card from "../components/common/Card";

const ManageUsersPage = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([
    ["Juan Pérez", "juan@example.com"],
    ["Ana López", "ana@example.com"],
    ["Carlos Torres", "carlos@example.com"],
  ]);

  const handleSearch = () => {
    console.log("Buscando:", search);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Gestión de Usuarios</Typography>
      <Card title="Buscar Usuario">
        <Input label="Buscar por nombre" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button fullWidth onClick={handleSearch}>Buscar</Button>
      </Card>
      <Box mt={4}>
        <Card title="Lista de Usuarios">
          <Table headers={["Nombre", "Correo"]} data={users} />
        </Card>
      </Box>
    </Box>
  );
};

export default ManageUsersPage;
