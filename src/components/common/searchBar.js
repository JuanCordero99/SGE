import React, { forwardRef } from "react";
import { Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Card from "./Card";
import Input from "./Input";

const SearchBar = forwardRef(({ title, label = "Buscar usuario", name, type = "text", error, helperText, onChange, onBlur, onSearch, value, ...rest }, ref) => {
    return (
        <Card title={title}>
            <Box display="flex" alignItems="center">
                <Input
                    label={label}
                    name={name}
                    type={type}
                    error={error}
                    helperText={helperText}
                    fullWidth
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    value={value} 
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                        margin: 2,
                        width: "50%",
                        ...rest.sx,
                    }}
                    {...rest}
                />
                <IconButton onClick={onSearch} sx={{ marginLeft: 1, backgroundColor: "#f0f0f0" }}>
                    <SearchIcon />
                </IconButton>
            </Box>
        </Card>
    );
});

export default SearchBar;
