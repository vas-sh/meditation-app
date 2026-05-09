import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Meditations", to: "/meditations" },
  { label: "Profile", to: "/profile" },
  { label: "Login", to: "/login" },
];

export default function Header() {
  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.88)",
          borderBottom: "1px solid rgba(47,111,100,0.12)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color="primary" fontWeight={700}>
          Meditation App
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={NavLink}
              to={item.to}
              color="primary"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
