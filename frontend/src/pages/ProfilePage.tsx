import { Alert, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";
import { isAuthenticated } from "../utils/auth";

type SessionItem = {
  id: string;
  userId: string;
  meditationId: string;
  meditationTitle: string;
  durationMinutes: number;
  completedAt: string;
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    apiFetch("/sessions/me")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to load sessions");
        }
        setSessions(data);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Failed to load sessions";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return (
    <Card
      sx={{
        maxWidth: 760,
        border: "1px solid rgba(29,92,84,0.08)",
        background: "rgba(255,255,255,0.86)",
        boxShadow: "0 22px 42px rgba(29,92,84,0.10)",
      }}
    >
      <CardContent>
        <Stack spacing={2.5}>
          <Typography variant="h4">Profile</Typography>
          <Typography color="text.secondary">
            Here you can see the saved meditation sessions for the current user.
          </Typography>
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          {!loading && !error && sessions.length === 0 && (
            <Alert severity="info">You do not have any saved sessions yet.</Alert>
          )}
          {!loading &&
            !error &&
            sessions.map((session) => (
              <Card key={session.id} variant="outlined">
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h6">{session.meditationTitle}</Typography>
                    <Typography color="text.secondary">
                      Duration: {session.durationMinutes} minutes
                    </Typography>
                    <Typography color="text.secondary">
                      Date: {new Date(session.completedAt).toLocaleString()}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
