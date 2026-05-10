import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { isAuthenticated, setStoredUser } from "../utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/meditations");
    }
  }, [navigate]);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      setStoredUser(data.user);
      navigate("/meditations");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 560,
        mx: "auto",
        border: "1px solid rgba(29,92,84,0.08)",
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 24px 44px rgba(29,92,84,0.12)",
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h4">Login</Typography>
          <Typography color="text.secondary">
            Sign in to save meditation sessions and access protected backend endpoints.
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", fontWeight: 700 }}
              onClick={handleLogin}
              disabled={loading}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Create account
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
