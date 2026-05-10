import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Stack spacing={4}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 8,
          overflow: "hidden",
          position: "relative",
          color: "white",
          background: "linear-gradient(135deg, #174a44 0%, #2f6f64 44%, #87bbad 100%)",
          boxShadow: "0 24px 48px rgba(29,92,84,0.20)",
          "&::after": {
            content: '""',
            position: "absolute",
            right: -40,
            top: -40,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
          },
        }}
      >
        <Stack spacing={3} maxWidth={760} sx={{ position: "relative", zIndex: 1 }}>
          <Chip
            label="Daily ritual for balance"
            sx={{
              alignSelf: "flex-start",
              backgroundColor: "rgba(255,255,255,0.14)",
              color: "white",
              fontWeight: 700,
            }}
          />
          <Typography variant="h2">Feel calmer, sleep deeper, focus longer.</Typography>
          <Typography variant="h6" sx={{ opacity: 0.92, maxWidth: 640 }}>
            Your meditation space now has a cleaner flow, protected user area, saved sessions
            and a more polished interface built on top of the existing coursework project.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              component={Link}
              to="/meditations"
              variant="contained"
              color="secondary"
              sx={{ textTransform: "none", fontWeight: 800 }}
            >
              Explore Meditations
            </Button>
            <Button
              component={Link}
              to="/profile"
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                color: "white",
                borderColor: "rgba(255,255,255,0.38)",
              }}
            >
              My Progress
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
      </Box>
    </Stack>
  );
}
