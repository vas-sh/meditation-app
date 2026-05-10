import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 4, md: 6 },
        borderRadius: 8,
        textAlign: "center",
        color: "white",
        background: "linear-gradient(135deg, #123d39 0%, #1d5c54 40%, #66a898 100%)",
        boxShadow: "0 24px 48px rgba(18,61,57,0.20)",
      }}
    >
      <Stack spacing={2.5} alignItems="center">
        <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
          Start your journey today
        </Typography>
        <Typography sx={{ maxWidth: 660, color: "rgba(255,255,255,0.82)" }}>
          Create a quiet moment for yourself, choose a session and begin building a healthier mental rhythm.
        </Typography>
        <Box>
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
    </Paper>
  );
}
