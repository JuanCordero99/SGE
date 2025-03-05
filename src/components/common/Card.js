import { Card as MUICard, CardContent, Typography } from "@mui/material";

const Card = ({ title, children }) => {
  return (
    <MUICard sx={{ backgroundColor: "#fffff", color: "#ffffff", padding: "16px", margin:2 }}>
      <CardContent>
        <Typography variant="h4" color="black">{title}</Typography>
        {children}
      </CardContent>
    </MUICard>
  );
};

export default Card;
