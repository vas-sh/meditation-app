import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 4, md: 6 },
        borderRadius: 6,
        background: "linear-gradient(135deg, #2f6f64 0%, #7fb6a8 100%)",
        color: "white",
      }}
    >
      <Stack spacing={3} maxWidth={700}>
        <Typography variant="h3">Meditation for calm, focus and better sleep</Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          This demo web app shows the basic structure of a meditation platform:
          frontend pages, routing, UI components and communication with a Go backend.
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/meditations"
            variant="contained"
            color="secondary"
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Start Meditation
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
