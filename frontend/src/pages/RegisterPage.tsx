import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { isAuthenticated } from "../utils/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(email, password);
      setSuccess("Registration successful. You can now log in.");
      setTimeout(() => {
        navigate("/login");
      }, 700);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Register failed";
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
          <Typography variant="h4">Register</Typography>
          <Typography color="text.secondary">
            Create a new account to save meditation sessions and access protected actions.
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
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
              onClick={handleRegister}
              disabled={loading}
            >
              Create account
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Go to login
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
