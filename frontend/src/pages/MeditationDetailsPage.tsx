import { Alert, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../api/client";
import type { MeditationItem } from "../components/MeditationCard";
import { isAuthenticated } from "../utils/auth";

export default function MeditationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meditation, setMeditation] = useState<MeditationItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sessionMessage, setSessionMessage] = useState("");
  const [sessionError, setSessionError] = useState("");
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    apiFetch(`/meditations/${id}`)
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

  const handleStartMeditation = async () => {
    if (!meditation) {
      return;
    }

    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    setSessionMessage("");
    setSessionError("");
    setStarting(true);

    try {
      const response = await apiFetch("/sessions", {
        method: "POST",
        body: JSON.stringify({
          meditationId: meditation.id,
          durationMinutes: meditation.durationMinutes,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save session");
      }

      setSessionMessage("Meditation session saved successfully.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save session";
      setSessionError(message);
    } finally {
      setStarting(false);
    }
  };

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
    <Card
      sx={{
        maxWidth: 760,
        border: "1px solid rgba(29,92,84,0.08)",
        background: "rgba(255,255,255,0.90)",
        boxShadow: "0 22px 42px rgba(29,92,84,0.12)",
      }}
    >
      <CardContent>
        <Stack spacing={2.5}>
          <Typography variant="h4">{meditation.title}</Typography>
          <Typography color="text.secondary">Category: {meditation.category}</Typography>
          <Typography color="text.secondary">
            Duration: {meditation.durationMinutes} minutes
          </Typography>
          <Typography>
            {meditation.description ?? "Detailed description can be added later in the full version."}
          </Typography>
          {sessionMessage && <Alert severity="success">{sessionMessage}</Alert>}
          {sessionError && <Alert severity="error">{sessionError}</Alert>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartMeditation}
            disabled={starting}
            sx={{ alignSelf: "flex-start", textTransform: "none", fontWeight: 700 }}
          >
            Start Meditation
          </Button>
          <Button
            component={Link}
            to="/meditations"
            variant="outlined"
            sx={{ alignSelf: "flex-start", textTransform: "none", fontWeight: 700 }}
          >
            Back to list
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
