import { AppBar, Box, Button, Chip, Toolbar, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Meditations", to: "/meditations" },
];

export default function Header() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          mt: 2,
          borderRadius: 5,
          backdropFilter: "blur(18px)",
          backgroundColor: "rgba(255,255,255,0.72)",
          border: "1px solid rgba(29,92,84,0.10)",
          boxShadow: "0 12px 30px rgba(29,92,84,0.08)",
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 1, md: 2 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #1d5c54 0%, #7db5a7 100%)",
              color: "white",
              fontWeight: 800,
            }}
          >
            M
          </Box>
          <Box>
            <Typography variant="h6" color="primary" fontWeight={800} lineHeight={1}>
              Meditation App
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Breathe. Reset. Continue.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {authenticated && (
            <Chip
              label="Authorized"
              color="primary"
              variant="outlined"
              sx={{ alignSelf: "center", display: { xs: "none", md: "inline-flex" } }}
            />
          )}
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={NavLink}
              to={item.to}
              color="primary"
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              {item.label}
            </Button>
          ))}

          {!authenticated && (
            <>
              <Button
                component={NavLink}
                to="/login"
                color="primary"
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Login
              </Button>
              <Button
                component={NavLink}
                to="/register"
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Register
              </Button>
            </>
          )}

          {authenticated && (
            <>
              <Button
                component={NavLink}
                to="/profile"
                color="primary"
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Profile
              </Button>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
