import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export type MeditationItem = {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  description?: string;
  createdAt?: string;
};

type Props = {
  meditation: MeditationItem;
};

export default function MeditationCard({ meditation }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid rgba(29,92,84,0.08)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(241,248,246,0.9))",
        boxShadow: "0 18px 36px rgba(29,92,84,0.10)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 24px 44px rgba(29,92,84,0.16)",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Chip label={meditation.category} color="primary" variant="outlined" />
          <Typography color="text.secondary">{meditation.durationMinutes} min</Typography>
        </Stack>

        <Typography variant="h6" gutterBottom>
          {meditation.title}
        </Typography>

        <Typography color="text.secondary">
          {meditation.description ?? "Simple mock meditation description for the demo UI."}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          component={Link}
          to={`/meditations/${meditation.id}`}
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
}
