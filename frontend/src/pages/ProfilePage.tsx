import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, updateCurrentUser, deleteCurrentUser, type CurrentUser } from "../api/user";
import { apiFetch } from "../api/client";
import AppContainer from "../components/ui/AppContainer";
import PageHeader from "../components/ui/PageHeader";
import { isAuthenticated, logout, setStoredUser } from "../utils/auth";

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
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    Promise.all([
      getCurrentUser(),
      apiFetch("/sessions/me").then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to load sessions");
        }
        return data as SessionItem[];
      }),
    ])
      .then(([currentUser, sessionItems]) => {
        setUser(currentUser);
        setEditEmail(currentUser.email);
        setStoredUser(currentUser);
        setSessions(sessionItems);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Failed to load profile";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const totalMinutes = useMemo(
    () => sessions.reduce((sum, session) => sum + session.durationMinutes, 0),
    [sessions],
  );

  const handleSaveProfile = async () => {
    setProfileMessage("");
    setError("");
    setSavingProfile(true);

    try {
      const updatedUser = await updateCurrentUser(editEmail);
      setUser(updatedUser);
      setStoredUser(updatedUser);
      setProfileMessage("Profile updated successfully.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update profile";
      setError(message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleDeleteAccount = async () => {
    setProfileMessage("");
    setError("");
    setDeletingAccount(true);

    try {
      await deleteCurrentUser();
      logout();
      navigate("/register");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete account";
      setError(message);
    } finally {
      setDeletingAccount(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <AppContainer>
      <Stack spacing={3}>
        <PageHeader
          eyebrow="Profile"
          title="Your meditation dashboard"
          description="Manage your account, review your progress and jump back into completed sessions."
        />

        {error && <Alert severity="error">{error}</Alert>}
        {profileMessage && <Alert severity="success">{profileMessage}</Alert>}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              xl: "0.92fr 1.28fr",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Stack spacing={3}>
            <Card
              sx={{
                border: "1px solid rgba(29,92,84,0.08)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(241,248,246,0.86))",
                boxShadow: "0 20px 38px rgba(29,92,84,0.10)",
              }}
            >
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "22px",
                        display: "grid",
                        placeItems: "center",
                        background: "linear-gradient(135deg, #1d5c54 0%, #7db5a7 100%)",
                        color: "white",
                        fontWeight: 800,
                        fontSize: 24,
                      }}
                    >
                      {user?.email?.[0]?.toUpperCase() ?? "U"}
                    </Box>
                    <Box>
                      <Typography variant="h5">Account settings</Typography>
                      <Typography color="text.secondary">
                        Update your profile email or remove the account entirely.
                      </Typography>
                    </Box>
                  </Stack>

                  <TextField
                    label="Email"
                    value={editEmail}
                    onChange={(event) => setEditEmail(event.target.value)}
                    fullWidth
                  />

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      variant="contained"
                      startIcon={<EditRoundedIcon />}
                      onClick={handleSaveProfile}
                      disabled={savingProfile}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Save changes
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteOutlineRoundedIcon />}
                      onClick={handleDeleteAccount}
                      disabled={deletingAccount}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Delete account
                    </Button>
                  </Stack>

                  <Divider />

                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Member since
                    </Typography>
                    <Typography variant="body1">
                      {user ? new Date(user.createdAt).toLocaleDateString() : "—"}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {[
                {
                  icon: <HistoryRoundedIcon fontSize="small" />,
                  label: "Total sessions",
                  value: sessions.length,
                },
                {
                  icon: <QueryBuilderRoundedIcon fontSize="small" />,
                  label: "Total minutes",
                  value: totalMinutes,
                },
                {
                  icon: <SpaRoundedIcon fontSize="small" />,
                  label: "Latest streak",
                  value: sessions.length > 0 ? "Active" : "Start now",
                },
              ].map((stat) => (
                <Paper
                  key={stat.label}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 5,
                    border: "1px solid rgba(29,92,84,0.08)",
                    background: "rgba(255,255,255,0.84)",
                  }}
                >
                  <Stack spacing={1.25}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "12px",
                        display: "grid",
                        placeItems: "center",
                        background: "linear-gradient(135deg, rgba(29,92,84,0.12), rgba(125,181,167,0.18))",
                        color: "primary.main",
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="h5">{stat.value}</Typography>
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Stack>

          <Card
            sx={{
              border: "1px solid rgba(29,92,84,0.08)",
              background: "rgba(255,255,255,0.90)",
              boxShadow: "0 22px 42px rgba(29,92,84,0.10)",
            }}
          >
            <CardContent>
              <Stack spacing={2.5}>
                <Stack spacing={0.5}>
                  <Typography variant="h5">Completed meditations</Typography>
                  <Typography color="text.secondary">
                    Revisit your recent sessions and jump back into any practice you liked.
                  </Typography>
                </Stack>

                {sessions.length === 0 && (
                  <Alert severity="info">You do not have any saved sessions yet.</Alert>
                )}

                {sessions.map((session) => (
                  <Card
                    key={session.id}
                    variant="outlined"
                    sx={{
                      borderRadius: 6,
                      borderColor: "rgba(29,92,84,0.10)",
                      background: "linear-gradient(180deg, rgba(255,255,255,1), rgba(241,248,246,0.92))",
                      boxShadow: "0 12px 24px rgba(29,92,84,0.05)",
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", md: "center" }}
                      >
                        <Stack spacing={1}>
                          <Typography variant="h6">{session.meditationTitle}</Typography>
                          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <Typography color="text.secondary">
                              Duration: {session.durationMinutes} minutes
                            </Typography>
                            <Typography color="text.secondary">
                              Date: {new Date(session.completedAt).toLocaleString()}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Button
                          component={Link}
                          to={`/meditations/${session.meditationId}`}
                          variant="contained"
                          color="primary"
                          startIcon={<PlayArrowRoundedIcon />}
                          sx={{ textTransform: "none", fontWeight: 700 }}
                        >
                          Meditate again
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </AppContainer>
  );
}
