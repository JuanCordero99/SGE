import { Table as MUITable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Table = ({ headers, data }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#ffffff" }}>
      <MUITable>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} sx={{ backgroundColor: "#26355e", color: "#ffffff" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} sx={{ color: "#26355e" }}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
