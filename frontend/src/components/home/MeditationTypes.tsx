import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const types = [
  {
    title: "Relaxation",
    description: "Slow, grounding sessions to release tension and restore calm.",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Focus",
    description: "Clear mental noise and strengthen concentration for work or study.",
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sleep",
    description: "Gentle bedtime practices designed to help you unwind deeply.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Breathing",
    description: "Simple breathing rhythms for fast resets and present awareness.",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function MeditationTypes() {
  return (
    <Stack spacing={3}>
      <Stack spacing={1} textAlign="center" alignItems="center">
        <Typography variant="h4">Types of Meditation</Typography>
        <Typography color="text.secondary" maxWidth={720}>
          Choose a practice style that matches your energy, mood and intention for the moment.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {types.map((item) => (
          <Card
            key={item.title}
            sx={{
              overflow: "hidden",
              border: "1px solid rgba(29,92,84,0.08)",
              boxShadow: "0 18px 32px rgba(29,92,84,0.08)",
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 24px 42px rgba(29,92,84,0.14)",
              },
            }}
          >
            <Box
              sx={{
                height: 220,
                backgroundImage: `linear-gradient(180deg, rgba(13,27,29,0.10), rgba(13,27,29,0.38)), url('${item.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h5">{item.title}</Typography>
                <Typography color="text.secondary">{item.description}</Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Stack>
  );
}
