import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { Alert, Box, Chip, CircularProgress, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import MeditationCard, { type MeditationItem } from "../components/MeditationCard";
import AppContainer from "../components/ui/AppContainer";
import PageHeader from "../components/ui/PageHeader";

const categories = ["all", "relaxation", "sleep", "focus", "stress"];

export default function MeditationsPage() {
  const [items, setItems] = useState<MeditationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

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

  const filteredItems = items.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.description ?? "").toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <AppContainer>
      <Stack spacing={3}>
        <PageHeader
          eyebrow="Library"
          title="Meditation sessions"
          description="Find a meditation that matches your current mood, attention level or evening rhythm."
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "1.45fr 0.95fr",
            },
            gap: 3,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid rgba(29,92,84,0.08)",
              background: "rgba(255,255,255,0.82)",
              boxShadow: "0 14px 32px rgba(29,92,84,0.06)",
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    background: "linear-gradient(135deg, rgba(29,92,84,0.12), rgba(125,181,167,0.18))",
                    color: "primary.main",
                  }}
                >
                  <SearchRoundedIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="h6">Search your practice</Typography>
                  <Typography color="text.secondary">
                    Look for a mood, topic or session title that fits today.
                  </Typography>
                </Box>
              </Stack>
              <TextField
                label="Search meditation"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid rgba(29,92,84,0.08)",
              background: "linear-gradient(180deg, rgba(29,92,84,0.98), rgba(47,111,100,0.92))",
              color: "white",
              boxShadow: "0 16px 34px rgba(29,92,84,0.12)",
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(255,255,255,0.12)",
                    color: "white",
                  }}
                >
                  <TuneRoundedIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="h6">Filter categories</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
                    Narrow the library and focus on the style you need right now.
                  </Typography>
                </Box>
              </Stack>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {categories.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    onClick={() => setCategory(item)}
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: 700,
                      color: category === item ? "primary.main" : "white",
                      backgroundColor: category === item ? "white" : "rgba(255,255,255,0.10)",
                    }}
                  />
                ))}
              </Box>
            </Stack>
          </Paper>
        </Box>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && filteredItems.length === 0 && (
          <Alert severity="info">No meditations match your current search or filter.</Alert>
        )}
        {!loading && !error && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {[
              {
                icon: <MenuBookRoundedIcon fontSize="small" />,
                label: "Available sessions",
                value: String(filteredItems.length),
              },
              {
                icon: <TuneRoundedIcon fontSize="small" />,
                label: "Current filter",
                value: category === "all" ? "All categories" : category,
              },
              {
                icon: <SearchRoundedIcon fontSize="small" />,
                label: "Search term",
                value: search.trim() === "" ? "No keyword" : search,
              },
            ].map((stat) => (
              <Paper
                key={stat.label}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 4,
                  border: "1px solid rgba(29,92,84,0.08)",
                  background: "rgba(255,255,255,0.82)",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "10px",
                      display: "grid",
                      placeItems: "center",
                      background: "linear-gradient(135deg, rgba(29,92,84,0.12), rgba(125,181,167,0.18))",
                      color: "primary.main",
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Box>
        )}

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
          {filteredItems.map((item) => (
            <Box key={item.id}>
              <MeditationCard meditation={item} />
            </Box>
          ))}
        </Box>
      </Stack>
    </AppContainer>
  );
}
