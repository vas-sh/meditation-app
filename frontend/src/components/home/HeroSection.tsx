import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 7, md: 9 },
        minHeight: { xs: 520, md: 620 },
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 9 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        backgroundImage:
          "linear-gradient(180deg, rgba(9,24,26,0.28), rgba(9,24,26,0.62)), url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 28px 60px rgba(20,44,46,0.20)",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top, rgba(136,214,196,0.26), transparent 34%), radial-gradient(circle at bottom right, rgba(41,99,92,0.36), transparent 28%)",
        },
      }}
    >
      <Stack spacing={3} maxWidth={820} sx={{ position: "relative", zIndex: 1 }}>
        <Chip
          label="Meditation for everyday balance"
          sx={{
            alignSelf: "center",
            color: "white",
            fontWeight: 700,
            backgroundColor: "rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
          }}
        />
        <Typography variant="h2" sx={{ fontSize: { xs: "2.6rem", md: "4.5rem" }, lineHeight: 1.02 }}>
          Find your calm. Improve your focus.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: 700,
            mx: "auto",
            color: "rgba(255,255,255,0.86)",
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Discover guided meditations that help you reduce stress, sleep better and stay present
          through the busiest parts of your day.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            component={Link}
            to="/meditations"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ textTransform: "none", fontWeight: 800, px: 4 }}
          >
            Start Meditation
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
