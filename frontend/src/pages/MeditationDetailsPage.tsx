import { Alert, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { MeditationItem } from "../components/MeditationCard";

export default function MeditationDetailsPage() {
  const { id } = useParams();
  const [meditation, setMeditation] = useState<MeditationItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/meditations/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Meditation not found");
        }
        return response.json();
      })
      .then((data: MeditationItem) => {
        setMeditation(data);
      })
      .catch(() => {
        setError("Failed to load meditation details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!meditation) {
    return <Alert severity="warning">Meditation not found.</Alert>;
  }

  return (
    <Card sx={{ maxWidth: 720, boxShadow: "0 12px 28px rgba(47,111,100,0.12)" }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h4">{meditation.title}</Typography>
          <Typography color="text.secondary">Category: {meditation.category}</Typography>
          <Typography color="text.secondary">
            Duration: {meditation.durationMinutes} minutes
          </Typography>
          <Typography>
            {meditation.description ?? "Detailed description can be added later in the full version."}
          </Typography>
          <Button
            component={Link}
            to="/meditations"
            variant="outlined"
            sx={{ alignSelf: "flex-start", textTransform: "none" }}
          >
            Back to list
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
