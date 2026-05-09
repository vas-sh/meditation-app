import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export type MeditationItem = {
  id: number;
  title: string;
  category: string;
  durationMinutes: number;
  description?: string;
};

type Props = {
  meditation: MeditationItem;
};

export default function MeditationCard({ meditation }: Props) {
  return (
    <Card sx={{ height: "100%", boxShadow: "0 12px 28px rgba(47,111,100,0.12)" }}>
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
          sx={{ textTransform: "none" }}
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
}
