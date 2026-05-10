import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import HotelIcon from "@mui/icons-material/Hotel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const benefits = [
  {
    title: "Reduce stress",
    description: "Slow down racing thoughts and return to a calmer emotional state.",
    icon: SelfImprovementIcon,
  },
  {
    title: "Improve focus",
    description: "Build concentration and keep your attention where it matters most.",
    icon: PsychologyAltIcon,
  },
  {
    title: "Better sleep",
    description: "Use evening sessions to relax your body and prepare for deep rest.",
    icon: HotelIcon,
  },
  {
    title: "Emotional balance",
    description: "Practice awareness and create a steadier response to daily challenges.",
    icon: FavoriteBorderIcon,
  },
];

export default function BenefitsSection() {
  return (
    <Stack spacing={3}>
      <Stack spacing={1} textAlign="center" alignItems="center">
        <Typography variant="h4">Why Meditation?</Typography>
        <Typography color="text.secondary" maxWidth={680}>
          Small moments of stillness can improve how you think, feel and recover throughout the day.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <Card
              key={benefit.title}
              sx={{
                height: "100%",
                border: "1px solid rgba(29,92,84,0.08)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(239,247,244,0.88))",
                boxShadow: "0 18px 32px rgba(29,92,84,0.08)",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 24px 42px rgba(29,92,84,0.14)",
                },
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "18px",
                      display: "grid",
                      placeItems: "center",
                      background: "linear-gradient(135deg, rgba(29,92,84,0.12), rgba(125,181,167,0.18))",
                      color: "primary.main",
                    }}
                  >
                    <Icon />
                  </Box>
                  <Typography variant="h6">{benefit.title}</Typography>
                  <Typography color="text.secondary">{benefit.description}</Typography>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Stack>
  );
}
