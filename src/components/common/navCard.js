import { Card, CardActionArea, CardContent, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavCard = ({ title, route }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
        margin: 3
      }}
    >
      <CardActionArea onClick={() => navigate(route)}>
        <CardContent>
          <Typography variant="h6" sx={{ color: "#26355e", textAlign: "center", fontWeight: "bold" }}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NavCard;
