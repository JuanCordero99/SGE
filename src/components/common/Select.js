import { MenuItem, Select as MUISelect, FormControl, InputLabel } from "@mui/material";

const Select = ({ label, options, value, onChange }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel sx={{ color: "#26355e" }}>{label}</InputLabel>
      <MUISelect
        value={value}
        onChange={onChange}
        sx={{
          "& .MuiSelect-outlined": { color: "#26355e" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#26355e" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#b0b0b0" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#26355e" },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};

export default Select;
