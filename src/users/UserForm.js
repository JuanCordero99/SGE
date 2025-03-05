import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";

const UserForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("name")} label="Nombre" fullWidth margin="normal" />
      <TextField {...register("email")} label="Correo" fullWidth margin="normal" />
      <TextField {...register("password")} label="Contraseña" type="password" fullWidth margin="normal" />
      <Button type="submit" variant="contained">Guardar</Button>
    </form>
  );
};

export default UserForm;
