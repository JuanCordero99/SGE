import React from "react";
import { TextField } from "@mui/material";

const Input = React.forwardRef(({ label, name, type = "text", fullWidth = true, onChange, onBlur, error, helperText, ...rest }, ref) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      fullWidth={fullWidth}
      margin="normal"
      variant="outlined"
      inputRef={ref} 
      onChange={onChange} 
      onBlur={onBlur} 
      error={!!error} 
      helperText={helperText}
      {...rest}
      sx={{
        backgroundColor: "white",
        borderRadius: "5px",
        "& .MuiInputBase-input": {
          color: "#26355e",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#26355e" },
          "&:hover fieldset": { borderColor: "#b0b0b0" },
          "&.Mui-focused fieldset": { borderColor: "#26355e" },
        },
        "& .MuiInputLabel-root": {
          color: "#abb2b9",
          "&.Mui-focused": { color: "#abb2b9", fontSize: "1.2rem" },
        },
      }}
    />
  );
});

export default Input;
