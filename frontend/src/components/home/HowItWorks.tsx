import LooksOneRoundedIcon from "@mui/icons-material/LooksOneRounded";
import LooksTwoRoundedIcon from "@mui/icons-material/LooksTwoRounded";
import Looks3RoundedIcon from "@mui/icons-material/Looks3Rounded";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const steps = [
  {
    title: "Choose meditation",
    description: "Browse by focus, sleep, breathing or relaxation to find the right fit.",
    icon: LooksOneRoundedIcon,
  },
  {
    title: "Start session",
    description: "Enter meditation mode with timer, breathing guidance and simple controls.",
    icon: LooksTwoRoundedIcon,
  },
  {
    title: "Track progress",
    description: "Save completed sessions and build a mindful rhythm day by day.",
    icon: Looks3RoundedIcon,
  },
];

export default function HowItWorks() {
  return (
    <Stack spacing={3}>
      <Stack spacing={1} textAlign="center" alignItems="center">
        <Typography variant="h4">How it works</Typography>
        <Typography color="text.secondary" maxWidth={720}>
          A simple flow designed to help you start quickly and stay consistent.
        </Typography>
      </Stack>

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
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <Card
              key={step.title}
              sx={{
                height: "100%",
                border: "1px solid rgba(29,92,84,0.08)",
                backgroundColor: "rgba(255,255,255,0.9)",
                boxShadow: "0 14px 30px rgba(29,92,84,0.08)",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: "linear-gradient(135deg, #1d5c54 0%, #7db5a7 100%)",
                      color: "white",
                    }}
                  >
                    <Icon />
                  </Box>
                  <Typography variant="h6">{step.title}</Typography>
                  <Typography color="text.secondary">{step.description}</Typography>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Stack>
  );
}
