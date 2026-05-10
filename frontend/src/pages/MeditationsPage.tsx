import { Alert, Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import MeditationCard, { type MeditationItem } from "../components/MeditationCard";

export default function MeditationsPage() {
  const [items, setItems] = useState<MeditationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/meditations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load meditations");
        }
        return response.json();
      })
      .then((data: MeditationItem[]) => {
        setItems(data);
      })
      .catch(() => {
        setError("Cannot connect to backend. Start the Go server on port 8080.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 6,
          border: "1px solid rgba(29,92,84,0.08)",
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h4">Meditations</Typography>
          <Typography color="text.secondary">
            Browse your available sessions and choose the right practice for this moment.
          </Typography>
        </Stack>
      </Paper>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {items.map((item) => (
          <Box key={item.id}>
            <MeditationCard meditation={item} />
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
