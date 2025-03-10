import { Card as MUICard, CardContent, Typography } from "@mui/material";

const Card = ({
  title,
  children,
  sx = {},
  variant = "h4",
  colorScheme = { background: "#ffffff", text: "#000000" },
}) => {
  return (
    <MUICard
      sx={{
        backgroundColor: colorScheme.background,
        color: colorScheme.text,
        padding: "10px",
        margin: 2,
        display: "flex",
        flexDirection: "column",
        height: "auto",
        overflowY: "auto",
        maxHeight: "calc(100vh - 50px)",
        ...sx,
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}
      >
        <Typography variant={variant} color={colorScheme.text}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </MUICard>
  );
};

export default Card;