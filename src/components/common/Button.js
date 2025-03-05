import { Button as MUIButton } from "@mui/material";

const Button = ({ children, onClick, variant = "contained", fullWidth = false }) => {
  return (
    <MUIButton
      onClick={onClick}
      variant={variant}
      fullWidth={fullWidth}
      sx={{
        backgroundColor: "#26355e",
        color: "#ffffff",
        "&:hover": { backgroundColor: "#b0b0b0", color: "#26355e" },
      }}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
