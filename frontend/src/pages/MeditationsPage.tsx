import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MeditationCard, { type MeditationItem } from "../components/MeditationCard";

export default function MeditationsPage() {
  const [items, setItems] = useState<MeditationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/meditations")
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
      <Typography variant="h4">Meditations</Typography>
      <Typography color="text.secondary">
        This page fetches mock data from the Go backend and displays meditation cards.
      </Typography>

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
