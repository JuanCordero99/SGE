import { MenuItem, Select as MUISelect, FormControl, InputLabel, OutlinedInput } from "@mui/material";

const Select = ({ name,label, options, value, onChange }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel shrink sx={{ color: "#26355e" }}>
        {label}
      </InputLabel>
      <MUISelect
        name={name}
        value={value}
        onChange={onChange}
        displayEmpty
        input={<OutlinedInput label={label} />}
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          color: "#26355e",
          "& .MuiInputBase-input": {
            color: "#26355e",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#26355e" },
            "&:hover fieldset": { borderColor: "#26355e" },
            "&.Mui-focused fieldset": { borderColor: "#26355e" },
          },
        }}
      >
        <MenuItem disabled value="">
          <em>{label}</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}
            sx={{
              color: "#26355e",
              "&.Mui-selected": {
                color: "#26355e",
                backgroundColor: "#f0f0f0 !important",
              },
              "&:hover": { backgroundColor: "#dcdcdc" },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};

export default Select;
